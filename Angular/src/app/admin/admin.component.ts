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

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {

  /* Admin: 10, Basic User: 0, Approve User: 1, Reception User: 2 */ 
  
  public dataSource = new MatTableDataSource<Key>();
  public displayedColumns = ['main'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  userType = '1';
  
  KeyArray = [];

  dropdownApproverList = [];
  selectedApproverItems = [];

  dropdownDocTypeList = [];
  selectedDocTypeItems = [];

  specApprovedListColumns = [
    { prop: 'item_text' },
    { name: 'approver' },
    { name: 'date' }
  ];

  disabled = false;
  ShowFilter = false;
  limitSelection = false;

  modal_title = '';
  modal_content = '';
  modal_success_btn = '';
  modal_cancel_btn = '';
  step = 0;

  constructor(private fb: FormBuilder, public httpClient: HttpClient,
    public dialog: MatDialog, private modalService: NgbModal) {
      
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

    this.dropdownDocTypeList = ['doc', 'pdf', 'jpg'];
    this.selectedDocTypeItems = ['doc'];
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Angular Material Datatable
  public doFilter = (value: string) => {
    if(value.length < 3 && value.length != 0)
      return;
    this.dataSource.filter = value.trim().toLocaleLowerCase();
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

  // accordian panel
  setStep(index: number) {
    this.step = index;
  }

  filterRow(filterKey, data): any[] {
    if(filterKey.length < 3 && filterKey.length != 0)
      return;
  
    return data.approver_array.filter(row => {
      const isPartialNameMatch = row.item_text.indexOf(filterKey) !== -1 || !filterKey;
      return isPartialNameMatch;
    });
  }
}
