import { environment } from '../../environments/environment';
const base_url = environment.baseUrl; // local environment

export const UrlJSON = {
  loginUrl: base_url + 'home/login',

  /********************************************
  ****************** Display Image ****************
  *********************************************/
  displayImageUrl: base_url,

  /********************************************
  ****************** KEY ****************
  *********************************************/
  getApproversUrl: base_url + 'api/keys/approvers',
  getAllApprovalsUrl: base_url + 'api/keys/all',
  createKeyUrl: base_url + 'api/keys/add',
  getResponsiblesByKeyUrl: base_url + 'api/keys/responsibles'


};
