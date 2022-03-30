import { httpService } from './index'

export default {
  login: params => httpService.post('/base/login', params),
  userList: params => httpService.get('/base/userList', params),
  setAdminAuthority: params =>
    httpService.post('/base/setAdminAuthority', params),
}
