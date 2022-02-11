import { httpService } from './index'

export default {
  login: params => httpService.post('/base/login', params)
}
