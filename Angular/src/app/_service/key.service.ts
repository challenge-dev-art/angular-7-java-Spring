import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlJSON } from './urlJSON';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  constructor(private http: HttpClient) { }

  private _getApproversUrl = UrlJSON.getApproversUrl;
  private _getAllApprovalsUrl = UrlJSON.getAllApprovalsUrl;
  private _createKeyUrl = UrlJSON.createKeyUrl;
  private _getResponsiblesByKeyUrl = UrlJSON.getResponsiblesByKeyUrl;

  getApprovers()
  {
    return this.http.get<any>(this._getApproversUrl);
  }
  getAllApproval()
  {
    return this.http.get<any>( this._getAllApprovalsUrl );
  }
  createKey(data)
  {
    return this.http.post<any>(this._createKeyUrl, data);
  }
  getResponsiblesByKey(id)
  {
    return this.http.get<any>(`${this._getResponsiblesByKeyUrl}/${id}`);
  }
}
