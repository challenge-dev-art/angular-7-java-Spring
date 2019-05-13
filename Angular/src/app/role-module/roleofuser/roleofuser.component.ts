import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import { map} from 'rxjs/operators';

import {NgxSpinnerService} from 'ngx-spinner';
import {SectionService} from '../role/services/section.service';
import {Role} from '../role/models/role';
import {User} from '../role/models/user';

@Component({
  selector: 'app-roleofuser',
  templateUrl: './roleofuser.component.html',
  styleUrls: ['./roleofuser.component.css']
})
export class RoleofuserComponent implements OnInit {

  description = 'Edit roles of a user';
  displayedCriticalColumns = ['name', 'critical', 'action'];
  displayedColumns = ['name', 'action'];
  index: number;
  index1: number;
  index2: number;
  id: number=-2;
// Role
  newRolesDatabase: SectionService | null;
  newRolesDataSource: NewRolesDataSource | null;
  addedRolesDatabase: SectionService | null;
  addedRolesDataSource: AddedRolesDataSource | null;
// User
  usersDatabase: SectionService | null;
  usersDataSource: UsersDataSource | null;

  addedIdArray: number[] = [];
  removeIdArray: number[] = [];
  data:Role = new Role();

  constructor(public httpClient: HttpClient,
              public addedDataService: SectionService,
              private spinner: NgxSpinnerService) {}

// Role data table
  @ViewChild('a_r_paginator') a_r_paginator: MatPaginator;
  @ViewChild('a_r_sort') a_r_sort: MatSort;
  @ViewChild('a_r_filter') a_r_filter: ElementRef;

  @ViewChild('n_r_paginator') n_r_paginator: MatPaginator;
  @ViewChild('n_r_sort') n_r_sort: MatSort;
  @ViewChild('n_r_filter') n_r_filter: ElementRef;

// User data table
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
    this.a_r_paginator._changePageSize(this.a_r_paginator.pageSize);
    this.a_u_paginator._changePageSize(this.a_u_paginator.pageSize);
    this.n_r_paginator._changePageSize(this.n_r_paginator.pageSize);
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

    this.loadRolesData(this.id);
    // And lastly refresh table
    this.refreshTable();
  }
// Loading Section
  private loadRolesData(id: number) {
    // New Roles
    this.newRolesDatabase = new SectionService(this.httpClient);
    this.newRolesDataSource = new NewRolesDataSource(this.newRolesDatabase, this.n_r_paginator, this.n_r_sort, id);
    fromEvent(this.n_r_filter.nativeElement, 'keyup')
      .subscribe(() => {

        if (!this.newRolesDataSource) {
          return;
        }
        this.newRolesDataSource.filter = this.n_r_filter.nativeElement.value;
      });

    // Existing Roles
    this.addedRolesDatabase = new SectionService(this.httpClient);
    this.addedRolesDataSource = new AddedRolesDataSource(this.addedRolesDatabase, this.a_r_paginator, this.a_r_sort, id);
    fromEvent(this.a_r_filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.addedRolesDataSource) {
          return;
        }
        this.addedRolesDataSource.filter = this.a_r_filter.nativeElement.value;
      });

  }
// Loading Role
  public loadData() {
    // New Users
    this.usersDatabase = new SectionService(this.httpClient);
    this.usersDataSource = new UsersDataSource(this.usersDatabase, this.a_u_paginator, this.a_u_sort, this.id);
    fromEvent(this.a_u_filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.usersDataSource) {
          return;
        }
        this.usersDataSource.filter = this.a_u_filter.nativeElement.value;
      });

    this.loadRolesData(this.id);
  }

  save() {
    if (this.addedIdArray.length > 0) {
      this.addedDataService.saveRoles(this.id, this.addedIdArray);
      this.addedIdArray = [];
    }
    if (this.removeIdArray.length > 0) {
      this.addedDataService.removeRoles(this.id, this.removeIdArray);
      this.removeIdArray = [];
    }
    this.refreshTable();
  }

  addRoles(i: number, role: Role) {
    this.index1 = i;
    const foundIndex = this.newRolesDatabase.dataChange.value.findIndex(x => x.id === role.id);
    this.newRolesDatabase.dataChange.value.splice(foundIndex, 1);
    this.addedRolesDatabase.addedDataChange.value.push(role);

    const foundIdIndex = this.removeIdArray.findIndex(x => x === role.id);
    if (foundIdIndex > -1) {
      this.removeIdArray.splice(foundIdIndex, 1);
    } else {
      this.addedIdArray.push(role.id);
    }
    this.refreshTable();
  }

  removeRoles(i: number, role: Role)
  {
      this.index = i;
      const foundIndex = this.addedRolesDatabase.addedDataChange.value.findIndex(x => x.id === role.id);
      // for delete we use splice in order to remove single object from UserService
      this.addedRolesDatabase.addedDataChange.value.splice(foundIndex, 1);
      this.newRolesDatabase.dataChange.value.push(role);
      // for removing id we use array
      const foundIdIndex = this.addedIdArray.findIndex(x => x === role.id);

      if (foundIdIndex === -1) {
        this.removeIdArray.push(role.id);
      } else {
        this.addedIdArray.splice(foundIdIndex, 1);
      }
      this.refreshTable();
  }
}

// Entire Roles
export class NewRolesDataSource extends DataSource<Role> {
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
              public _sort: MatSort,
              public _id: number) {
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

    this._exampleDatabase.getNewRolesWithUserData(this._id);


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

// New Users
export class UsersDataSource extends DataSource<User> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: User[] = [];
  renderedData: User[] = [];

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
      this._exampleDatabase.nUserDataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllUsersData();

    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.nUsersData.slice().filter((user: User) => {
          const searchStr = (user.name ).toLowerCase();
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
// Added Roles
export class AddedRolesDataSource extends DataSource<Role> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Role[] = [];
  renderedData: Role[] = [];
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
  connect(): Observable<Role[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.addedDataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginate.page
    ];

    this._exampleDatabase.getAddedRolesWithUserData( this._id );

    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.addedData.slice().filter((role: Role) => {
          const searchStr = (role.name ).toLowerCase();
          this.addedIdArray.push(role.id);
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginate.pageIndex * this._paginate.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginate.pageSize);
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
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
