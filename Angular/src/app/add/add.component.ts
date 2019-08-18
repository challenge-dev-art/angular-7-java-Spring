import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import { map} from 'rxjs/operators';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {NgxSpinnerService} from 'ngx-spinner';
import { Key } from '../models/key.model';
import { KeyService } from '../_service/key.service';
import { ValueTransformer } from '@angular/compiler/src/util';


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
  isDelete = false;


  // Fake User
  user = 'Yilong';
  userId = 100;

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

  modal_title = '';
  modal_content = '';
  modal_success_btn = '';
  modal_cancel_btn = '';


  Places = [];
  Rooms = [];
  Approvers = [];
  placeId: any;
  Keys = [];
  updatingKey: any;

  constructor(private fb: FormBuilder, public httpClient: HttpClient,
    public dialog: MatDialog, private modalService: NgbModal, private keyService: KeyService) {
      
    }

  ngOnInit(): void {
    
    this.keyService.getPlaces().subscribe(res=>{
      if(res != null)
      {
        this.Places = res;
        for(let p = 0; p < res.length; p++)
        {
          this.Keys = [];
          this.keyService.getKeysByPlace(res[p].id).subscribe(res=>{
            if (res != null)
            {
              for( let k =0; k < res.length; k++)
              {
                this.Keys.push(res[k]);
              }
              this.dataSource.data = this.Keys as Key[];
              this.dataSource.sort = this.sort;
              // setTimeout(() => this.dataSource.paginator = this.paginator);
            }
          });
        }
        
      }
    });

    // get Approvers
    this.keyService.getApprovers().subscribe(res=>{
      if(res != null)
      {
        this.Approvers = [];
        for( let i = 0; i< res.length; i++)
        {
          let item_approver = {item_id: res[i].id, item_text: res[i].name};
          this.Approvers.push(item_approver);
        }
      }
    });

    this.keyService.getAllApproval().subscribe(res=>{
      if (res != null)
      {
        
      }
    });
    this.selectedApproverItems = [];
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
      key_englishName: ['', Validators.required],
      key_hungarianName: ['', Validators.required],
      key_building: ['', Validators.required],
      key_room: '',
      key_quality: [0, Validators.required],
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
    if(value.length < 3 && value.length != 0)
      return;
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  // Multi Select
  onItemSelect(item: any) {
    this.selectedApproverItems.push(item);
  }
  onSelectAll(items: any) {
    this.selectedApproverItems = this.Approvers;
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
    this.isDelete = false;
    this.selectedApproverItems = [];
    this.selectedDocTypeItems = [];
  }

  addkey()
  {
    this.isSubmit = true;
    if (this.keyForm.valid)
    {
      this.isAdd = false;
      this.isEdit = false;
      this.isDelete = false;

      let now = moment().format("YYYY-MM-DD HH:mm:ss");

      let responsibleIds = [];
      let index = this.getIndexResponsibles(this.keyForm.value.key_room);
      if(index >= 0)
      {
        for(let i = 0; i < this.Rooms[index].responsibles.length; i++)
        {
          responsibleIds.push(this.Rooms[index].responsibles[i].id);
        }
      }

      let secondaryApproverIds = [];
      let selectedApprovers = this.keyForm.value.approver_array;
      for(let a = 0; a < selectedApprovers.length; a++)
      {
        secondaryApproverIds.push(selectedApprovers[a].item_id);
      }

      let item_key = {
        placeId: this.keyForm.value.key_building,
        responsibleIds: responsibleIds,
        hungarianName: this.keyForm.value.key_hungarianName,
        englishName: this.keyForm.value.key_englishName,
        critic: this.keyForm.value.special_key,
        quantity: parseInt(this.keyForm.value.key_quality),
        secondaryApproverIds: secondaryApproverIds
      }

      this.keyService.createKey(item_key).subscribe(res=>{
        this.Keys.reverse().push(item_key);
        this.Keys.reverse();
        this.dataSource.data = this.Keys as Key[];
        setTimeout(() =>  {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
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

      if (this.Keys[index].englishName == this.keyForm.value.key_englishName)
      {
        this.isNeededWhenUpdate = true;
        return;
      }
      else
      {
        this.isAdd = false;
        this.isEdit = false;
        this.isDelete = false;

        let responsibleIds = [];

        let index_room = this.getIndexResponsibles(this.keyForm.value.key_room);
        if(index_room >= 0)
        {
          for(let i = 0; i < this.Rooms[index_room].responsibles.length; i++)
          {
            responsibleIds.push(this.Rooms[index_room].responsibles[i].id);
          }
        }

        let secondaryApproverIds = [];
        let selectedApprovers = this.keyForm.value.approver_array;
        for(let a = 0; a < selectedApprovers.length; a++)
        {
          secondaryApproverIds.push(selectedApprovers[a].item_id);
        }

        let item_key = {
          keyId: this.updatingKey,
          placeId: this.keyForm.value.key_building,
          responsibleIds: responsibleIds,
          hungarianName: this.keyForm.value.key_hungarianName,
          englishName: this.keyForm.value.key_englishName,
          critic: this.keyForm.value.special_key,
          quantity: parseInt(this.keyForm.value.key_quality),
          secondaryApproverIds: secondaryApproverIds
        }

        this.keyService.updateKey(item_key).subscribe(res=>{
          if(index >= 0)
          {
            this.Keys[index].englishName = this.keyForm.value.key_englishName;
            this.Keys[index].hungarianName = this.keyForm.value.key_hungarianName;
            this.Keys[index].placeId = this.keyForm.value.key_building;
            this.Keys[index].responsibleIds =  responsibleIds;
            this.Keys[index].hungarianName = this.keyForm.value.key_hungarianName;
            this.Keys[index].englishName = this.keyForm.value.key_englishName;
            this.Keys[index].critic = this.keyForm.value.special_key;
            this.Keys[index].quantity = parseInt(this.keyForm.value.key_quality);
            this.Keys[index].secondaryApproverIds = secondaryApproverIds;
            this.dataSource.data = this.Keys as Key[];
            setTimeout(() =>  {
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            });
          }
        });
      }
    }
    else return;
  }

  getIndexUpdatedItem(id)
  {
    let updateItem = this.Keys.find(this.findIndexToUpdate, id);
    let index = this.Keys.indexOf(updateItem);
    return index;
  }

  findIndexToUpdate(newItem) { 
    return newItem.id === this;
  }

  getIndexResponsibles(id)
  {
    let item = this.Rooms.find(this.findIndexToUpdate, id);
    let index = this.Rooms.indexOf(item);
    return index;
  }

  goback()
  {
    this.isAdd = false;
    this.isEdit = false;
    this.isDelete = false;
    this.isChecked = false;
    this.keyFormInitial();
  }

  editKey(value)
  {
    this.updatingKey = value.id;
    this.isEdit = true;
    this.isAdd = false;
    this.isDelete = false;
    this.selectedKeyId = value.id;
    this.keyForm.controls['key_englishName'].setValue(value.englishName);
    this.keyForm.controls['key_hungarianName'].setValue(value.hungarianName);
    this.keyForm.controls['key_building'].setValue(value.place.id);
    // this.keyForm.controls['key_room'].setValue(value.room);
    this.keyForm.controls['key_quality'].setValue(parseInt(value.quantity));
    this.keyForm.controls['special_key'].setValue(value.critic);
    this.isChecked = value.critic;
    this.selectedApproverItems = [];
    for (let i = 0; i < value.secondaryApprovers.length; i++)
    {
      let item = {item_id: value.secondaryApprovers[i].id, item_text: value.secondaryApprovers[i].lastName + ' ' + value.secondaryApprovers[i].firstName };
      this.selectedApproverItems.push(item);
    }
    this.keyForm.controls['approver_array'].setValue(this.selectedApproverItems);
    this.keyForm.controls['upload_type'].setValue(this.selectedDocTypeItems);
  }

  keyFormInitial()
  {
    this.isSubmit = false;
    this.isDelete = false;
    this.isNeededWhenUpdate = false;
  }

  openDeleteModal(value, content)
  {
    this.modal_title = '';
    this.modal_content = 'Are you sure you want to delete key: ' + value.name;
    this.modal_success_btn = 'Yes';
    this.modal_cancel_btn = 'No';

    this.isDelete = true;
    this.selectedKeyId = value.id;
    this.keyForm.controls['key_englishName'].setValue(value.englishName);
    this.keyForm.controls['key_building'].setValue(value.building);
    this.keyForm.controls['key_room'].setValue(value.room);
    this.keyForm.controls['key_quality'].setValue(value.quality);
    this.keyForm.controls['special_key'].setValue(value.isSpecial);
    this.isChecked = value.isSpecial;
    this.selectedApproverItems = value.approver_array;
    this.selectedDocTypeItems = value.upload_type;
    this.keyForm.controls['approver_array'].setValue(this.selectedApproverItems);
    this.keyForm.controls['upload_type'].setValue(this.selectedDocTypeItems);

    let dId = value.id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'})
        .result.then((result) => {
          this.keyService.deleteKey(dId, {}).subscribe(res=>{
            console.log(res);
          });
          let index = this.getIndexUpdatedItem(dId);
          if(index >= 0)
          {
            this.Keys.splice(index, 1);
            this.dataSource.data = this.Keys as Key[];
            this.isAdd = false;
            this.isEdit = false;
            this.isDelete = false;
            this.keyFormInitial();
          }
        }, (reason) => {});
  }

  loadPlaces(buildingId)
  {
    if ( buildingId != null && buildingId != undefined)
      this.placeId = buildingId;
    if (this.placeId != undefined )
    {
      this.keyService.getRoomsByPlace(buildingId).subscribe(res=>{
        if(res != null)
        {
          this.Rooms = res;
        }
      });
    }
  }
}
