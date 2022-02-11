import { httpService } from './index'

export default {
  create: params => httpService.post('/busGame/createBusGame', params),
  find: params => httpService.get('/busGame/findBusGame', params),
  findList: params => httpService.get('/busGame/getBusGameList', params),
  del: params => httpService.post('/busGame/deleteBusGame', params),
  update: params => httpService.post('/busGame/updateBusGame', params)
}
