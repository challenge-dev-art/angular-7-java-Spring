import { environment } from '../../environments/environment';
const base_url = environment.baseUrl; // local environment

export const UrlJSON = {
  loginUrl: base_url + 'home/login',

  /********************************************
  ****************** KEY **********************
  *********************************************/
  getAllApprovalsUrl: base_url + 'api/keys/all',
  getResponsiblesByKeyUrl: base_url + 'api/keys/responsibles',
  getKeysByPlaceUrl: base_url + 'api/keys',
  getApprovalsOfCurrentUserUrl: base_url + 'api/keys/me',
  getAllApprovalsByCurrentUserAsApplierUrl: base_url + 'api/keys/applier',
  getAllApprovalsByApplierUrl: base_url + 'api/keys/applier',
  getActiveKeyApprovalsUrl: base_url + 'api/keys/active',
  submitApprovalUrl: base_url + 'api/keys/submitApproval',
  approveKeyApprovalUrl: base_url + 'api/keys/approve',
  declineKeyApprovalUrl: base_url + 'api/keys/decline',
  revokeKeyApprovalUrl: base_url + 'api/keys/revoke',
  createKeyUrl: base_url + 'api/keys/add',
  updateKeyUrl: base_url + 'api/keys/update',
  deleteKeyUrl: base_url + 'api/keys/delete',
  takeKeyByNonEmployeeUrl: base_url + 'api/keys/takeKeyByNonEmployee',
  returnKeyByNonEmployeeUrl: base_url + 'api/keys/returnKeyByNonEmployee',
  getKeyTakeAwayByNonEmployeeByIdUrl: base_url + 'api/keys/getKeyTakeAwayByNonEmployeeById',
  getTakeAwaysByNonEmployeeByKeyIdUrl: base_url + 'api/keys/getTakeAwaysByNonEmployeeByKeyId',
  getAllKeysTakenByNonEmployeeUrl: base_url + 'api/keys/getAllKeysTakenByNonEmployee',
  getAllKeysTakenByNonEmployeeByIdUrl: base_url + 'api/keys/getAllKeysTakenByNonEmployeeById',
  startKeyTakeAwayForEmployeeByGuardUrl: base_url + 'api/keys/startKeyTakeAwayForEmployeeByGuard',
  startKeyTakeAwayForEmployeeByEmployeeUrl: base_url + 'api/keys/startKeyTakeAwayForEmployeeByEmployee',
  acceptKeyTakeAwayByGuardUrl: base_url + 'api/keys/acceptKeyTakeAwayByGuard',
  acceptKeyTakeAwayByEmployeeUrl: base_url + 'api/keys/acceptKeyTakeAwayByEmployee',
  signTakeAwayByEmployeeUrl: base_url + 'http://51.15.192.122:8889/api/keys/signTakeAwayByEmployee',
  returnKeyByEmployeeUrl: base_url + 'api/keys/returnKeyByEmployee',
  getKeyTakeAwayByEmployeeByIdUrl: base_url + 'api/keys/getKeyTakeAwayByEmployeeById',
  getTakeAwaysByEmployeeByKeyIdUrl: base_url + 'api/keys/getTakeAwaysByEmployeeByKeyId',
  getAllKeysTakenByEmployeeUrl: base_url + 'api/keys/getAllKeysTakenByEmployee',
  getAllKeysTakenByEmployeeByKeyIdUrl: base_url + 'api/keys/getAllKeysTakenByEmployeeByKeyId',

  /********************************************
  ****************** Places ********************
  *********************************************/
  getPlacesUrl: base_url + 'api/place/places',
  getRoomsByPlaceUrl: base_url + 'api/place/room',

  /********************************************
  ****************** AssetExport **************
  *********************************************/
  getApproversUrl: base_url + 'api/asset/approvers',

};
