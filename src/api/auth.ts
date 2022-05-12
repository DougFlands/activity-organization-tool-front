import { httpService } from './index'

export default {
  login: params => httpService.post('/base/login', params),
  userList: params => httpService.get('/user/userList', params),
  setAdminAuthority: params =>
    httpService.post('/user/setAdminAuthority', params),
  getBanUserList: params => httpService.get('/user/banUserList', params),
  banUser: params => httpService.post('/user/banUser', params),
}
