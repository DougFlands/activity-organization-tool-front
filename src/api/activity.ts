import { httpService } from './index'

export default {
  create: params => httpService.post('/busAct/createBusActivity', params),
  find: params => httpService.get('/busAct/findBusActivity', params),
  findList: params => httpService.get('/busAct/getBusActivityList', params),
  del: params => httpService.post('/busAct/deleteBusActivity', params),
  update: params => httpService.post('/busAct/updateBusActivity', params),
  // 参加或删除
  involvedOrExitActivities: params =>
    httpService.post('/busAct/involvedOrExitActivities', params),
  involvedActivityList: params =>
    httpService.post('/busAct/GetBusInvolvedActivityList', params)
}
