import { httpService } from './index'

export default {
  login: params => httpService.post('/base/login', params),
  userList: params => httpService.get('/user/userList', params),
  setAdminAuthority: params =>
    httpService.post('/user/setAdminAuthority', params),
}
