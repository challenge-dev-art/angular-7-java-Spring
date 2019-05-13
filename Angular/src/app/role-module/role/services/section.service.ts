import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { Section } from '../models/section';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Role} from '../models/role';
import {User} from '../models/user';

@Injectable()
export class SectionService {

  private readonly API_URL = 'http://localhost:8081/api';

  aDataChange: BehaviorSubject<Section[]> = new BehaviorSubject<Section[]>([]);

  nDataChange: BehaviorSubject<Section[]> = new BehaviorSubject<Section[]>([]);
  // Temporarily stores data from dialogs
  aDialogData: any;

  nDialogData: any;

  constructor (private httpClient: HttpClient) {}

  get aData(): Section[] {
    return this.aDataChange.value;
  }

  get nData(): Section[] {
    return this.nDataChange.value;
  }

  getAllAddedSections(id: number): void {
    this.httpClient.get<Section[]>(this.API_URL + '/sections/' + id).subscribe(data => {
        this.aDataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }
  getAllNewSections(id: number): void {
    this.httpClient.get<Section[]>(this.API_URL + '/sections/un/' + id).subscribe(data => {
        this.nDataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }

  save (id: number, addedIdArray: number[]): void {
    this.httpClient.post(this.API_URL + '/sections/add/' + id , addedIdArray, {responseType: 'text'}).subscribe(data => {
        this.dialogData = data;
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      });
  }
  remove (id: number, removeIdArray: number[]): void {
    this.httpClient.post(this.API_URL + '/sections/remove/' + id , removeIdArray, {responseType: 'text'}).subscribe(data => {
        this.dialogData = data;
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      });
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////          Role           /////////////////////////
  dataChange: BehaviorSubject<Role[]> = new BehaviorSubject<Role[]>([]);
  addedDataChange: BehaviorSubject<Role[]> = new BehaviorSubject<Role[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  nState: number = 0;

  get data(): Role[] {
    return this.dataChange.value;
  }

  get addedData(): Role[] {
    return this.addedDataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getState() {
    return this.nState;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.httpClient.get<Role[]>(this.API_URL + '/roles').subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }

  addIssue (role: Role): void {
    this.nState = 0;
    this.httpClient.post(this.API_URL + `/roles/create`, role).subscribe(data => {
        this.dialogData = data;
        this.nState = 1;
        alert('Successfully added');
      },
      (err: HttpErrorResponse) => {
        this.nState = -1;
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      });
  }

  updateIssue (id: number, role: Role): void {
    this.httpClient.put(this.API_URL + '/roles/' + id, role).subscribe(data => {
        this.dialogData = data;
        alert('Successfully edited');
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      });
  }

  deleteIssue (id: number): void {
    this.httpClient.delete(this.API_URL + '/roles/' + id, { responseType: 'text' }).subscribe(data => {
        alert('Successfully deleted');
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      });
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////             User                /////////////////////////////////////////////////////

  aUsersDataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  nUserDataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // Temporarily stores data from dialogs
  aUserData: any;

  nUserData: any;

  get aUsersData(): User[] {
    return this.aUsersDataChange.value;
  }

  get nUsersData(): User[] {
    return this.nUserDataChange.value;
  }

  getAllAddedUsersData(id: number): void {
    this.httpClient.get<User[]>(this.API_URL + '/users/' + id).subscribe(data => {
        this.aUsersDataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }
  getAddedRolesWithUserData(id: number): void {
    this.httpClient.get<Role[]>(this.API_URL + '/roles/' + id).subscribe(data => {
      this.addedDataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }
  getNewRolesWithUserData(id: number): void {
    this.httpClient.get<Role[]>(this.API_URL + '/roles/un/' + id).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
      });
  }
  getAllNewUsersData(id: number): void {
    this.httpClient.get<User[]>(this.API_URL + '/users/un/' + id).subscribe(data => {
        this.nUserDataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }
  getAllUsersData(): void {
    this.httpClient.get<User[]>(this.API_URL + '/users').subscribe(data => {
      this.nUserDataChange.next(data);
    },
      (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
      });
  }

  saveUsers (id: number, addedIdArray: number[]): void {
    this.httpClient.post(this.API_URL + '/users/add/' + id , addedIdArray, {responseType: 'text'}).subscribe(data => {
        alert('successful added');
      },
      (error: HttpErrorResponse) => {
        return 'Error occurred. Details: ' + error.name + ' ' + error.message;
      });
  }
  removeUsers (id: number, removeIdArray: number[]): void {
    this.httpClient.post(this.API_URL + '/users/remove/' + id , removeIdArray, {responseType: 'text'}).subscribe(data => {
       // alert('success');
      },
      (err: HttpErrorResponse) => {
        return 'Error occurred. Details: ' + err.name + ' ' + err.message;
      });
  }

  saveRoles(id: number, addedIdArray: number[]): void {
    this.httpClient.post(this.API_URL + '/roles/add/' + id, addedIdArray, { responseType: 'text'}).subscribe(data => {
      alert('success');
      },
      (error: HttpErrorResponse) => {
        return 'Error occurred. Details: ' + error.name + ' ' + error.message;
      })
  }
  removeRoles(id: number, removeIdArray: number[]): void {
    this.httpClient.post(this.API_URL + '/roles/remove/' + id, removeIdArray, { responseType: 'text'}).subscribe(data => {

    },
      (err: HttpErrorResponse)=> {
      return 'Error occurred. Details: ' + err.name + ' ' + err.message;
      })
  }
}
