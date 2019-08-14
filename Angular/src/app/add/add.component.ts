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
  
  KeyArray = [
    {id: 1, name: 'key 1'},
    {id: 2, name: 'key 2'},
    {id: 3, name: 'key 3'},
    {id: 4, name: 'key 4'},
    {id: 5, name: 'key 5'},
    {id: 6, name: 'key 6'},
    {id: 7, name: 'key 7'},
    {id: 8, name: 'key 8'},
    {id: 9, name: 'key 9'},
    {id: 10, name: 'key 10'},
    {id: 11, name: 'key 11'},
  ]

  constructor(private fb: FormBuilder, public httpClient: HttpClient,
    public dialog: MatDialog) {
      
    }

  ngOnInit(): void {
    this.dataSource.data = [] as Key[];
    this.dataSource.data = this.KeyArray as Key[];
    this.dataSource.sort = this.sort;
    // setTimeout(() => this.dataSource.paginator = this.paginator);

    this.keyForm = this.fb.group({
      key_name: ['', Validators.required],
      key_building: ['', Validators.required],
      key_room: ['', Validators.required],
      key_door: ['', Validators.required],
      special_key: false,
      approver_array: new FormControl({ value: []}),
      upload_type: new FormControl({ value: ['doc', 'pdf', '']})
    }, {});

    console.log(this.keyForm);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  get f() {
    return this.keyForm.controls;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
