import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import { map} from 'rxjs/operators';
import {FormControl, Validators} from '@angular/forms';

import {NgxSpinnerService} from 'ngx-spinner';
import {SectionService} from '../role/services/section.service';
import {Role} from '../role/models/role';
import {Section} from '../role/models/section';
import {User} from '../role/models/user';

@Component({
  selector: 'app-userofrole',
  templateUrl: './userofrole.component.html',
  styleUrls: ['./userofrole.component.css']
})
export class UserofroleComponent implements OnInit {

  description = 'Edit users of a role';
  displayedCriticalColumns = ['name', 'critical', 'action'];
  displayedColumns = ['name', 'action'];
  displayedColumnsCritical = ['name', 'critical'];
  index: number;
  index1: number;
  index2: number;
  id: number=-2;
// Role
  exampleDatabase: SectionService | null;
  dataSource: ExampleDataSource | null;
// Section
  addedDatabase: SectionService | null;
  addedDataSource: AddedDataSource | null;
// User
  addedUsersDatabase: SectionService | null;
  addedUsersDataSource: AddedUsersDataSource | null;
  newUsersDatabase: SectionService | null;
  newUsersDataSource: NewUsersDataSource | null;

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

// Role data table
  @ViewChild('r_paginator') r_paginator: MatPaginator;
  @ViewChild('r_sort') r_sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
// Added Sections data table
  @ViewChild('a_paginator') a_paginator: MatPaginator;
  @ViewChild('a_sort') a_sort: MatSort;
  @ViewChild('a_filter') a_filter: ElementRef;

// Added User data table
  @ViewChild('a_u_paginator') a_u_paginator: MatPaginator;
  @ViewChild('a_u_sort') a_u_sort: MatSort;
  @ViewChild('a_u_filter') a_u_filter: ElementRef;
  // New User data table
  @ViewChild('n_u_paginator') n_u_paginator: MatPaginator;
  @ViewChild('n_u_sort') n_u_sort: MatSort;
  @ViewChild('n_u_filter') n_u_filter: ElementRef;

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
    this.a_u_paginator._changePageSize(this.a_u_paginator.pageSize);
    this.n_u_paginator._changePageSize(this.n_u_paginator.pageSize);
  }
// Form Submit
  onSumbit() {
    setTimeout(() => {
      this.save();
    }, 2000);
    this.refreshTable();
  }

  startEdit(i: number, id: number, name: string, description: string) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;

    this.data.name = name;
    this.data.description = description;

    this.loadUsersData(this.id);
    // And lastly refresh table
    this.refreshTable();
  }
// Loading Section
  private loadUsersData(id: number) {
 // Existing Sections
    this.addedDatabase = new SectionService(this.httpClient);
    this.addedDataSource = new AddedDataSource(this.addedDatabase, this.a_paginator, this.a_sort, id);
    fromEvent(this.a_filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.addedDataSource) {
          return;
        }
        this.addedDataSource.filter1 = this.a_filter.nativeElement.value;
      });
// Existing Users
    this.addedUsersDatabase = new SectionService(this.httpClient);
    this.addedUsersDataSource = new AddedUsersDataSource(this.addedUsersDatabase, this.a_u_paginator, this.a_u_sort, id);
    fromEvent(this.a_u_filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.addedUsersDataSource) {
          return;
        }
        this.addedUsersDataSource.filter = this.a_u_filter.nativeElement.value;
      });

// New Users
    this.newUsersDatabase = new SectionService(this.httpClient);
    this.newUsersDataSource = new NewUsersDataSource(this.newUsersDatabase, this.n_u_paginator, this.n_u_sort, this.id);
    fromEvent(this.n_u_filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.newUsersDataSource) {
          return;
        }
        this.newUsersDataSource.filter = this.n_u_filter.nativeElement.value;
      });
  }
// Loading Role
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

    this.loadUsersData(this.id);
  }

  save() {
    if (this.addedIdArray.length > 0) {
      this.addedDataService.saveUsers(this.id, this.addedIdArray);
      this.addedIdArray = [];
    }
    if (this.removeIdArray.length > 0) {
      this.addedDataService.removeUsers(this.id, this.removeIdArray);
      this.removeIdArray = [];
    }
    this.refreshTable();
  }

  addUsers(i: number, user: User) {
    this.index1 = i;
    const foundIndex = this.newUsersDatabase.nUserDataChange.value.findIndex(x => x.id === user.id);
    // for delete we use splice in order to remove single object from newDatabase
    this.newUsersDatabase.nUserDataChange.value.splice(foundIndex, 1);
    // for add we use splice in order to remove single object to addedDatabase
    this.addedUsersDatabase.aUsersDataChange.value.push(user);

    const foundIdIndex = this.removeIdArray.findIndex(x => x === user.id);
    /// Suppose you removed user saved already, Next time suppose you add the user again
    if (foundIdIndex > -1) {
      this.removeIdArray.splice(foundIdIndex, 1);
    } else {
      // for saving id we use array
      this.addedIdArray.push(user.id);
    }

    this.refreshTable();
  }

  removeUsers(i: number, user: User) {
    this.index = i;
    const foundIndex = this.addedUsersDatabase.aUsersDataChange.value.findIndex(x => x.id === user.id);
    // for delete we use splice in order to remove single object from UserService
    this.addedUsersDatabase.aUsersDataChange.value.splice(foundIndex, 1);
    this.newUsersDatabase.nUserDataChange.value.push(user);
    // for removing id we use array
    const foundIdIndex = this.addedIdArray.findIndex(x => x === user.id);

    if (foundIdIndex === -1) {
      this.removeIdArray.push(user.id);
    } else {
      this.addedIdArray.splice(foundIdIndex, 1);
    }
    this.refreshTable();
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
// New Users
export class NewUsersDataSource extends DataSource<User> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData1: User[] = [];
  renderedData1: User[] = [];

  constructor(public _exampleDatabase1: SectionService,
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
      this._exampleDatabase1.nUserDataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase1.getAllNewUsersData( this._id );

    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData1 = this._exampleDatabase1.nUsersData.slice().filter((user: User) => {
          const searchStr = (user.name ).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData1.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData1 = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData1;
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
