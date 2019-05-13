import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SectionService} from '../services/section.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {DeleteDialogComponent} from '../dialog/delete/delete.dialog.component';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import { map} from 'rxjs/operators';
import {FormControl, Validators} from '@angular/forms';

import {NgxSpinnerService} from 'ngx-spinner';

import {Role} from '../models/role';
import {Section} from '../models/section';
import {User} from '../models/user';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

    description = 'Role administration';
    displayedCriticalColumns = ['name', 'critical', 'action'];
    displayedColumns1 = ['name'];
    exampleDatabase: SectionService | null;
    addedUsersDatabase: SectionService | null;
    addedUsersDataSource: AddedUsersDataSource | null;
    dataSource: ExampleDataSource | null;
    index: number;
    index1: number;
    index2: number;
    id: number=-2;

    addedDatabase: SectionService | null;
    newDatabase: SectionService | null;
    addedDataSource: AddedDataSource | null;
    newDataSource: NewDataSource | null;
    addedIdArray: number[] = [];
    removeIdArray: number[] = [];
    data:Role = new Role();

    constructor(public httpClient: HttpClient,
                public dialog: MatDialog,
                public addedDataService: SectionService,
                private spinner: NgxSpinnerService,
                public dataService: SectionService) {}

    formControl = new FormControl('', [
      Validators.required
    ]);

    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Required field' :
        '';
    }
  // Role data table
    @ViewChild('r_paginator') r_paginator: MatPaginator;
    @ViewChild('r_sort') r_sort: MatSort;
    @ViewChild('filter') filter: ElementRef;
  // Added Sections data table
    @ViewChild('a_paginator') a_paginator: MatPaginator;
    @ViewChild('a_sort') a_sort: MatSort;
    @ViewChild('a_filter') a_filter: ElementRef;
  // New Sections data table
    @ViewChild('n_paginator') n_paginator: MatPaginator;
    @ViewChild('n_sort') n_sort: MatSort;
    @ViewChild('n_filter') n_filter: ElementRef;
  // Added User data table
    @ViewChild('a_u_paginator') a_u_paginator: MatPaginator;
    @ViewChild('a_u_sort') a_u_sort: MatSort;
    @ViewChild('a_u_filter') a_u_filter: ElementRef;

    ngOnInit() {
      this.id = -2;
      this.loadData();
    }

    refresh() {
      this.loadData();
    }
    private refreshTable() {
      // Refreshing table using paginator
      this.r_paginator._changePageSize(this.r_paginator.pageSize);
      this.a_paginator._changePageSize(this.a_paginator.pageSize);
      this.n_paginator._changePageSize(this.n_paginator.pageSize);
      this.a_u_paginator._changePageSize(this.a_u_paginator.pageSize);
    }
  // When click 'New Role' button
    addNew() {
      this.id = -1;
      this.data.name = '';
      this.data.description = '';
      this.loadData();
      this.addedIdArray = [];
      this.removeIdArray = [];
    }
  // Form Submit
    onSumbit() {

      if (this.id === -1)
      {
        this.dataService.addIssue(this.data);
        setTimeout(() => {
          this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
          this.id = this.dataService.getDialogData().id;
          this.save();
        }, 2000);
      }
      else
      {
        this.dataService.updateIssue(this.id, this.data);
        // When using an edit things are little different, firstly we find record inside DataService by id
        setTimeout(()=>{
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
          this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
          this.save();
        }, 2000);
      }
      this.refreshTable();
    }

    startEdit(i: number, id: number, name: string, description: string) {
      this.id = id;
      // index row is used just for debugging proposes and can be removed
      this.index = i;

      this.data.name = name;
      this.data.description = description;

      this.loadSectionData(this.id);
      // And lastly refresh table
      this.refreshTable();
    }

    deleteItem(i: number, id: number, name: string, description: string) {
      this.index = i;
      this.id = id;
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: { id: id, name: name, description: description}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
          // for delete we use splice in order to remove single object from DataService
          this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
          this.refreshTable();
        }
      });
    }

    private loadSectionData(id: number) {
 // Existing Section
      this.addedDatabase = new SectionService(this.httpClient);
      this.addedDataSource = new AddedDataSource(this.addedDatabase, this.a_paginator, this.a_sort, id);
      fromEvent(this.a_filter.nativeElement, 'keyup')
        .subscribe(() => {
          if (!this.addedDataSource) {
            return;
          }
          this.addedDataSource.filter1 = this.a_filter.nativeElement.value;
        });
  // New Section
      this.newDatabase = new SectionService(this.httpClient);
      this.newDataSource = new NewDataSource(this.newDatabase, this.n_paginator, this.n_sort, id);
      fromEvent(this.n_filter.nativeElement, 'keyup')
        .subscribe(() => {
          if (!this.newDataSource) {
            return;
          }
          this.newDataSource.filter = this.n_filter.nativeElement.value;
        });
  // Existing User
      this.addedUsersDatabase = new SectionService(this.httpClient);
      this.addedUsersDataSource = new AddedUsersDataSource(this.addedUsersDatabase, this.a_u_paginator, this.a_u_sort, id);
      fromEvent(this.a_u_filter.nativeElement, 'keyup')
        .subscribe(() => {
          if (!this.addedUsersDataSource) {
            return;
          }
          this.addedUsersDataSource.filter = this.a_u_filter.nativeElement.value;
        });
    }

    public loadData() {
      this.exampleDatabase = new SectionService(this.httpClient);
      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.r_paginator, this.r_sort);
      fromEvent(this.filter.nativeElement, 'keyup')
        .subscribe(() => {

          if (!this.dataSource) {
            return;
          }
          this.dataSource.filter = this.filter.nativeElement.value;
        });

      this.loadSectionData(this.id);
    }

    add(i: number, section: Section) {
      this.index1 = i;
      const foundIndex = this.newDatabase.nDataChange.value.findIndex(x => x.id === section.id);
      // for delete we use splice in order to remove single object from newDatabase
      this.newDatabase.nDataChange.value.splice(foundIndex, 1);
      // for add we use splice in order to remove single object to addedDatabase
      this.addedDatabase.aDataChange.value.push(section);

      const foundIdIndex = this.removeIdArray.findIndex(x => x === section.id);
      /// Suppose you removed section saved already, Next time suppose you add the section again
      if (foundIdIndex > -1) {
        this.removeIdArray.splice(foundIdIndex, 1);
      } else {
        // for saving id we use array
        this.addedIdArray.push(section.id);
      }
      this.refreshTable();
    }

    remove(i: number, section: Section) {
      this.index = i;
      const foundIndex = this.addedDatabase.aDataChange.value.findIndex(x => x.id === section.id);
      // for delete we use splice in order to remove single object from SectionService
      this.addedDatabase.aDataChange.value.splice(foundIndex, 1);
      this.newDatabase.nDataChange.value.push(section);
      // for removing id we use array
      const foundIdIndex = this.addedIdArray.findIndex(x => x === section.id);

      if (foundIdIndex === -1) {
        this.removeIdArray.push(section.id);
      } else {
        this.addedIdArray.splice(foundIdIndex, 1);
      }
      this.refreshTable();
    }

    save() {
      // this.spinner.show();
      if (this.addedIdArray.length > 0) {
        this.addedDataService.save(this.id, this.addedIdArray);
        this.addedIdArray = [];
      }
      if (this.removeIdArray.length > 0) {
        this.addedDataService.remove(this.id, this.removeIdArray);
        this.removeIdArray = [];
      }
    }
}
// Roles
export class ExampleDataSource extends DataSource<Role> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Role[] = [];
  renderedData: Role[] = [];

  constructor(public _exampleDatabase: SectionService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Role[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllIssues();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((role: Role) => {
          const searchStr = (role.name + role.description).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: Role[]): Role[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'description': [propertyA, propertyB] = [a.description, b.description]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
// Added Sections
export class AddedDataSource extends DataSource<Section> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter1(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData1: Section[] = [];
  renderedData1: Section[] = [];
  addedIdArray: number[] = [];

  constructor(public _exampleDatabase: SectionService,
              public _paginate: MatPaginator,
              public _sort: MatSort,
              public _id: number) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginate.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Section[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.aDataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginate.page
    ];

    this._exampleDatabase.getAllAddedSections( this._id );

    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData1 = this._exampleDatabase.aData.slice().filter((section: Section) => {
          const searchStr = (section.name ).toLowerCase();
          this.addedIdArray.push(section.id);
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData1.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginate.pageIndex * this._paginate.pageSize;
        this.renderedData1 = sortedData.splice(startIndex, this._paginate.pageSize);
        return this.renderedData1;
      }
    ));
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: Section[]): Section[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
// New Sections
export class NewDataSource extends DataSource<Section> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData2: Section[] = [];
  renderedData2: Section[] = [];

  constructor(public _exampleDatabase1: SectionService,
              public _paginator: MatPaginator,
              public _sort: MatSort,
              public _id: number) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Section[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase1.nDataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase1.getAllNewSections( this._id );

    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData2 = this._exampleDatabase1.nData.slice().filter((section: Section) => {
          const searchStr = (section.name ).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData2.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData2 = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData2;
      }
    ));
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: Section[]): Section[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
// Added Users
export class AddedUsersDataSource extends DataSource<User> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: User[] = [];
  renderedData: User[] = [];
  addedIdArray: number[] = [];

  constructor(public _exampleDatabase: SectionService,
              public _paginator: MatPaginator,
              public _sort: MatSort,
              public _id: number) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<User[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.aUsersDataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllAddedUsersData( this._id );


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.aUsersData.slice().filter((user: User) => {
          const searchStr = (user.name ).toLowerCase();
          this.addedIdArray.push(user.id);
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: User[]): User[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
