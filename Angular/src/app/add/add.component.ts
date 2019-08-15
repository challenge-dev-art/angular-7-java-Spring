import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import { map} from 'rxjs/operators';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

import {NgxSpinnerService} from 'ngx-spinner';
import { Key } from '../models/key.model';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, AfterViewInit {

  /* Admin: 10, Basic User: 0, Approve User: 1, Reception User: 2 */ 
  
  public dataSource = new MatTableDataSource<Key>();
  public displayedColumns = ['name', 'state'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  keyForm: FormGroup;
  userType = '1';
  isAdd = false;
  isEdit = false;
  isSubmit = false;
  
  KeyArray = [{id: 1, name: 'key 1', building: 'sanhaojie', room: '7-1',door: 3, isSpecial: true, 
                      approver_array: [{item_id: 3, item_text: 'Pune', item_images: "assets/images/users/d1.jpg"}, {item_id: 4, item_text: "Navsari", item_images: "assets/images/users/d2.jpg"}],upload_type: ['pdf']},
              {id: 2, name: "ker 2", building: "bu 2", room: "r 3", door: "dw", isSpecial: true, approver_array: [{item_id: 4, item_text: "Navsari", item_images: "assets/images/users/d2.jpg"}], upload_type: ['doc']}];

  dropdownApproverList = [];
  selectedApproverItems = [];
  dropdownApproverSettings = {};

  dropdownDocTypeList = [];
  selectedDocTypeItems = [];
  dropdownDocTypeSettings = {};

  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  isChecked = false;
  selectedKeyId: any;
  isNeededWhenUpdate = false;

  constructor(private fb: FormBuilder, public httpClient: HttpClient,
    public dialog: MatDialog) {
      
    }

  ngOnInit(): void {
    this.dataSource.data = this.KeyArray as Key[];
    this.dataSource.sort = this.sort;
    // setTimeout(() => this.dataSource.paginator = this.paginator);

    this.dropdownApproverList = [
      { item_id: 1, item_text: 'Mumbai', item_images: 'assets/images/users/1.jpg' },
      { item_id: 2, item_text: 'Bangaluru', item_images: 'assets/images/users/2.jpg' },
      { item_id: 3, item_text: 'Pune', item_images: 'assets/images/users/3.jpg' },
      { item_id: 4, item_text: 'Navsari', item_images: 'assets/images/users/4.jpg' },
      { item_id: 5, item_text: 'New Delhi', item_images: 'assets/images/users/5.jpg' }
    ];
    this.selectedApproverItems = [
      { item_id: 3, item_text: 'Pune', item_images: 'assets/images/users/d1.jpg' },
      { item_id: 4, item_text: 'Navsari', item_images: 'assets/images/users/d2.jpg' }
    ];
    this.dropdownApproverSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };

    this.dropdownDocTypeList = ['doc', 'pdf', 'jpg'];
    this.selectedDocTypeItems = ['doc'];
    this.dropdownDocTypeSettings =   {
      "singleSelection": true,
      "selectAllText": "Select All",
      "unSelectAllText": "UnSelect All",
      "allowSearchFilter": true,
      "closeDropDownOnSelection": false
    }

    this.keyForm = this.fb.group({
      key_name: ['', Validators.required],
      key_building: ['', Validators.required],
      key_room: ['', Validators.required],
      key_door: ['', Validators.required],
      special_key: false,
      approver_array: [this.selectedApproverItems],
      upload_type: [this.selectedDocTypeItems]
    }, {});
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  get f() {
    return this.keyForm.controls;
  }

  // Angular Material Datatable
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  // Multi Select
  onItemSelect(item: any) {
  //  console.log(item);
  }
  onSelectAll(items: any) {
  //  console.log(items);
  }

  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownApproverSettings = Object.assign({}, this.dropdownApproverSettings, { allowSearchFilter: this.ShowFilter });
  }

  handleLimitSelection() {
      if (this.limitSelection) {
        this.dropdownApproverSettings = Object.assign({}, this.dropdownApproverSettings, { limitSelection: 2 });
      } else {
        this.dropdownApproverSettings = Object.assign({}, this.dropdownApproverSettings, { limitSelection: null });
      }
  }

  checkSpecialKey(value)
  {
    this.isChecked = value.checked;
  }

  goAddKey()
  {
    this.isAdd = true;
    this.isEdit = false;
  }

  addkey()
  {
    this.isSubmit = true;
    if (this.keyForm.valid)
    {
      this.isAdd = false;
      this.isEdit = false;
      let new_key = {id: this.KeyArray.length + 1, name: this.keyForm.value.key_name, building: this.keyForm.value.key_building, room: this.keyForm.value.key_room,
                      door: this.keyForm.value.key_door, isSpecial: this.keyForm.value.special_key, approver_array: this.selectedApproverItems, upload_type: this.selectedDocTypeItems};
      this.KeyArray.push(new_key);

      this.dataSource.data = this.KeyArray as unknown as Key[];
      setTimeout(() =>  {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
      this.keyFormInitial();
    }
    else return;
  }

  keypressKeyName()
  {
    this.isNeededWhenUpdate = false;
  }

  updateKey()
  {
    this.isSubmit = true;
    if (this.keyForm.valid)
    {
      let index = this.getIndexUpdatedItem(this.selectedKeyId);

      if (this.KeyArray[index].name == this.keyForm.value.key_name)
      {
        this.isNeededWhenUpdate = true;
        return;
      }
      else
      {
        this.isAdd = false;
        this.isEdit = false;
        if(index >= 0)
        {
          this.KeyArray[index].name = this.keyForm.value.key_name;
          this.KeyArray[index].building = this.keyForm.value.key_building;
          this.KeyArray[index].room = this.keyForm.value.key_room;
          this.KeyArray[index].door = this.keyForm.value.key_door;
          this.KeyArray[index].isSpecial = this.keyForm.value.special_key;
          this.KeyArray[index].approver_array = this.selectedApproverItems;
          this.KeyArray[index].upload_type = this.selectedDocTypeItems;
        }
      }
    }
    else return;
  }

  getIndexUpdatedItem(id)
  {
    let updateItem = this.KeyArray.find(this.findIndexToUpdate, id);
    let index = this.KeyArray.indexOf(updateItem);
    return index;
  }

  findIndexToUpdate(newItem) { 
    return newItem.id === this;
  }

  goback()
  {
    this.isAdd = false;
    this.isEdit = false;
    this.keyFormInitial();
  }

  editKey(value)
  {
    this.isEdit = true;
    this.isAdd = false;
    this.selectedKeyId = value.id;
    this.keyForm.controls['key_name'].setValue(value.name);
    this.keyForm.controls['key_building'].setValue(value.building);
    this.keyForm.controls['key_room'].setValue(value.room);
    this.keyForm.controls['key_door'].setValue(value.door);
    this.keyForm.controls['special_key'].setValue(value.isSpecial);
    this.isChecked = value.isSpecial;
    this.selectedApproverItems = value.approver_array;
    this.selectedDocTypeItems = value.upload_type;
    this.keyForm.controls['approver_array'].setValue(this.selectedApproverItems);
    this.keyForm.controls['upload_type'].setValue(this.selectedDocTypeItems);
  }

  keyFormInitial()
  {
    this.isSubmit = false;
    this.isNeededWhenUpdate = false;
    this.keyForm.controls.key_name.setValue('');
    this.keyForm.controls.key_building.setValue('');
    this.keyForm.controls.key_room.setValue('');
    this.keyForm.controls.key_door.setValue('');
    this.keyForm.controls.special_key.setValue(false);
    this.selectedApproverItems = [];
    this.selectedDocTypeItems = [];
    this.keyForm.controls.approver_array.setValue(this.selectedApproverItems);
    this.keyForm.controls.upload_type.setValue(this.selectedDocTypeItems);
  }
}
