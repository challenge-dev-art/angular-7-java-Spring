import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlJSON } from './urlJSON';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  constructor(private http: HttpClient) { }

  /** Key */
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
  private _deleteKeyUrl = UrlJSON.deleteKeyUrl;
  private _takeKeyByNonEmployeeUrl = UrlJSON.takeKeyByNonEmployeeUrl;
  private _returnKeyByNonEmployeeUrl = UrlJSON.returnKeyByNonEmployeeUrl;
  private _getKeyTakeAwayByNonEmployeeByIdUrl = UrlJSON.getKeyTakeAwayByNonEmployeeByIdUrl;
  private _getTakeAwaysByNonEmployeeByKeyIdUrl = UrlJSON.getTakeAwaysByNonEmployeeByKeyIdUrl;
  private _getAllKeysTakenByNonEmployeeUrl = UrlJSON.getAllKeysTakenByNonEmployeeUrl;
  private _getAllKeysTakenByNonEmployeeByIdUrl = UrlJSON.getAllKeysTakenByNonEmployeeByIdUrl;
  private _startKeyTakeAwayForEmployeeByGuardUrl = UrlJSON.startKeyTakeAwayForEmployeeByGuardUrl;
  private _startKeyTakeAwayForEmployeeByEmployeeUrl = UrlJSON.startKeyTakeAwayForEmployeeByEmployeeUrl;
  private _acceptKeyTakeAwayByGuardUrl = UrlJSON.acceptKeyTakeAwayByGuardUrl;
  private _acceptKeyTakeAwayByEmployeeUrl = UrlJSON.acceptKeyTakeAwayByEmployeeUrl;
  private _signTakeAwayByEmployeeUrl = UrlJSON.signTakeAwayByEmployeeUrl;
  private _returnKeyByEmployeeUrl = UrlJSON.returnKeyByEmployeeUrl;
  private _getKeyTakeAwayByEmployeeByIdUrl = UrlJSON.getKeyTakeAwayByEmployeeByIdUrl;
  private _getTakeAwaysByEmployeeByKeyIdUrl = UrlJSON.getTakeAwaysByEmployeeByKeyIdUrl;
  private _getAllKeysTakenByEmployeeUrl = UrlJSON.getAllKeysTakenByEmployeeUrl;
  private _getAllKeysTakenByEmployeeByKeyIdUrl = UrlJSON.getAllKeysTakenByEmployeeByKeyIdUrl;

  /** Place */
  private _getPlacesUrl = UrlJSON.getPlacesUrl;
  private _getRoomsByPlaceUrl = UrlJSON.getRoomsByPlaceUrl;

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
  //{\r\n\t\"placeId\": \"xoDjW8OYVl\",\r\n\t\"responsibleIds\": [\r\n\t\t\"925XAGvDkx\"\r\n\t],\r\n\t\"hungarianName\": \"createdHun\",\r\n\t\"englishName\": \"createdEng\",\r\n\t\"critic\": false,\r\n\t\"quantity\": 10,\r\n\t\"secondaryApproverIds\": [\r\n\t\t\"yVNXD5YkW8\",\r\n\t\t\"RkNzrEvOa0\"\r\n\t]\r\n}
  createKey(data)
  {
    return this.http.post<any>(this._createKeyUrl, data);
  }
  //{\r\n\t\"keyId\": \"mK59QG723X\",\r\n\t\"responsibleIds\": [\r\n\t\t\"925XAGvDkx\"\r\n\t],\r\n\t\"hungarianName\": \"createHunUpd\",\r\n\t\"englishName\": \"createEngUpd\",\r\n\t\"critic\": true,\r\n\t\"quantity\": 15,\r\n\t\"secondaryApproverIds\": [\r\n\t\t\"yVNXD5YkW8\",\r\n\t\t\"RkNzrEvOa0\"\r\n\t]\r\n}
  updateKey(data)
  {
    return this.http.post<any>(this._updateKeyUrl, data);
  }
  deleteKey(id, data)
  {
    return this.http.post<any>(`${this._deleteKeyUrl}/${id}`, data);
  }
  //{\n\t\"keyId\": \"mK59QG723X\",\n\t\"tookByName\": \"Teszt Elek\",\n\t\"base64Signature\": \"base64Signature\"\n}
  takeKeyByNonEmployee(data)
  {
    return this.http.post<any>(this._takeKeyByNonEmployeeUrl, data);
  }
  // {\n\t\"takeAwayId\": \"mK59QG723X\",\n\t\"returnByName\": \"Teszt Tamas\",\n\t\"base64Signature\": \"base64Signature\"\n}
  returnKeyByNonEmployee(data)
  {
    return this.http.post<any>(this._returnKeyByNonEmployeeUrl, data);
  }
  getKeyTakeAwayByNonEmployeeById(id)
  {
    return this.http.get<any>(`${this._getKeyTakeAwayByNonEmployeeByIdUrl}/${id}`);
  }
  getTakeAwaysByNonEmployeeByKeyId(id)
  {
    return this.http.get<any>(`${this._getTakeAwaysByNonEmployeeByKeyIdUrl}/${id}`);
  }
  /*empty: true
    first: true
    last: true
    number: 0
    numberOfElements: 0
    pageable: {sort: {…}, pageNumber: 0, pageSize: 2147483647, offset: 0, paged: true, …}
    size: 2147483647
    sort: {unsorted: true, sorted: false, empty: true}
    totalElements: 0
    totalPages: 0
 */
  getAllKeysTakenByNonEmployee()
  {
    return this.http.get<any>( this._getAllKeysTakenByNonEmployeeUrl );
  }
  getAllKeysTakenByNonEmployeeById(id)
  {
    return this.http.get<any>(`${this._getAllKeysTakenByNonEmployeeByIdUrl}/${id}`);
  }
  //{\n\t\"keyId\": \"mK59QG723X\",\n\t\"tookById\": \"PEyza2XdVa\"\n}
  startKeyTakeAwayForEmployeeByGuard(data)
  {
    return this.http.post<any>(this._startKeyTakeAwayForEmployeeByGuardUrl, data);
  }
  // {\n\t\"keyId\": \"mK59QG723X\"\n}
  startKeyTakeAwayForEmployeeByEmployee(data)
  {
    return this.http.post<any>( this._startKeyTakeAwayForEmployeeByEmployeeUrl, data);
  }
  // {\n\t\"takeAwayId\": \"mK59QG723X\",\n\t\"accepted\": true\n}
  acceptKeyTakeAwayByGuard(data)
  {
    return this.http.post<any>(this._acceptKeyTakeAwayByGuardUrl, data);
  }
  // {\n\t\"takeAwayId\": \"mK59QG723X\",\n\t\"accepted\": true\n}
  acceptKeyTakeAwayByEmployee(data)
  {
    return this.http.post<any>(this._acceptKeyTakeAwayByEmployeeUrl, data);
  }
  signTakeAwayByEmployee(data)
  {
    return this.http.post<any>(this._signTakeAwayByEmployeeUrl, data);
  }
  returnKeyByEmployee(data)
  {
    return this.http.post<any>(this._returnKeyByEmployeeUrl, data);
  }
  getKeyTakeAwayByEmployeeById(id)
  {
    return this.http.get<any>( `${this._getKeyTakeAwayByEmployeeByIdUrl}/${id}`);
  }
  getTakeAwaysByEmployeeByKeyId(id)
  {
    return this.http.get<any>( `${this._getTakeAwaysByEmployeeByKeyIdUrl}/${id}`);
  }
  /* content: []
    empty: true
    first: true
    last: true
    number: 0
    numberOfElements: 0
    pageable: {sort: {…}, pageNumber: 0, pageSize: 2147483647, offset: 0, paged: true, …}
    size: 2147483647
    sort: {unsorted: true, sorted: false, empty: true}
    totalElements: 0
    totalPages: 0
 */
  getAllKeysTakenByEmployee()
  {
    return this.http.get<any>( this._getAllKeysTakenByEmployeeUrl );
  }
  getAllKeysTakenByEmployeeByKeyIdUrl(id)
  {
    return this.http.get<any>(`${this._getAllKeysTakenByEmployeeByKeyIdUrl}/${id}`);
  }

  /** place management */
  getPlaces()
  {
    return this.http.get<any>( this._getPlacesUrl );
  }
  getRoomsByPlace(id)
  {
    return this.http.get<any>( `${this._getRoomsByPlaceUrl}/${id}`);
  }
}
