import { environment } from '../../environments/environment';
const base_url = environment.baseUrl; // local environment

export const UrlJSON = {
  loginUrl: base_url + 'home/login',

  /********************************************
  ****************** KEY **********************
  *********************************************/
  getApproversUrl: base_url + 'api/keys/approvers',
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

};
