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
  private _getKeysByPlaceUrl = UrlJSON.getKeysByPlaceUrl;
  private _getApprovalsOfCurrentUserUrl = UrlJSON.getApprovalsOfCurrentUserUrl;
  private _getAllApprovalsByCurrentUserAsApplierUrl = UrlJSON.getAllApprovalsByCurrentUserAsApplierUrl;
  private _getAllApprovalsByApplierUrl = UrlJSON.getAllApprovalsByApplierUrl;
  private _getActiveKeyApprovalsUrl = UrlJSON.getActiveKeyApprovalsUrl;
  private _submitApprovalUrl = UrlJSON.submitApprovalUrl;
  private _approveKeyApprovalUrl = UrlJSON.approveKeyApprovalUrl;
  private _declineKeyApprovalUrl = UrlJSON.declineKeyApprovalUrl;
  private _revokeKeyApprovalUrl = UrlJSON.revokeKeyApprovalUrl;
  private _getResponsiblesByKeyUrl = UrlJSON.getResponsiblesByKeyUrl;
  private _createKeyUrl = UrlJSON.createKeyUrl;
  private _updateKeyUrl = UrlJSON.updateKeyUrl;

  getApprovers()
  {
    return this.http.get<any>(this._getApproversUrl);
  }
  getAllApproval()
  {
    return this.http.get<any>( this._getAllApprovalsUrl );
  }
  getKeysByPlace(placeid)
  {
    return this.http.get<any>(`${this._getKeysByPlaceUrl}/${placeid}`);
  }
  getApprovalsOfCurrentUser()
  {
    return this.http.get<any>( this._getApprovalsOfCurrentUserUrl);
  }
  getAllApprovalsByCurrentUserAsApplier()
  {
    return this.http.get<any>( this._getAllApprovalsByCurrentUserAsApplierUrl );
  }
  getAllApprovalsByApplier(applierId)
  {
    return this.http.get<any>( `${this._getAllApprovalsByApplierUrl}/${applierId}`);
  }
  getActiveKeyApprovals()
  {
    return this.http.get<any>( this._getActiveKeyApprovalsUrl );
  }
  // {\r\n\t\"keyId\": \"mK59QG723X\",\r\n\t\"approverId\": \"925XAGvDkx\",\r\n\t\"otherExporter\": false,\r\n\t\"from\": \"2018-10-01 8:00\",\r\n\t\"untilRevocation\": true,\r\n\t\"to\": \"2018-10-01 12:00\",\r\n\t\"reason\": \"kell.\"\r\n}
  submitApproval(data)
  {
    return this.http.post<any>( this._submitApprovalUrl, data);
  }
  approveKeyApproval(id, data) // mK59QG723X
  {
    return this.http.post<any>(`${this._approveKeyApprovalUrl}/${id}`, data);
  }
  // {\n\t\"reason\": \"nem\"\n}
  declineKeyApproval(id, data) // K2p41Vmq
  {
    return this.http.post<any>(`${this._declineKeyApprovalUrl}/${id}`, data);
  }
  revokeKeyApproval(data)
  {
    return this.http.post<any>(this._revokeKeyApprovalUrl, data);
  }
  getResponsiblesByKey(id)
  {
    return this.http.get<any>(`${this._getResponsiblesByKeyUrl}/${id}`);
  }
  createKey(data)
  {
    return this.http.post<any>(this._createKeyUrl, data);
  }
  updateKey(data)
  {
    return this.http.post<any>(this._updateKeyUrl, data);
  }

}
