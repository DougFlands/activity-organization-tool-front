import {
  request as _request,
  addInterceptor,
  showToast,
  navigateTo,
} from '@tarojs/taro'
import { getAccountInfoSync, getSystemInfoSync } from '@tarojs/taro'
import { GlobalStore } from '@/store'
import AuthApi from './auth'
import GameApi from './game'
import ActivityApi from './activity'

// 是否为生产版
const isRelease = getAccountInfoSync()?.miniProgram?.envVersion === 'release'
// 是否为开发者工具
const isDevtools = getSystemInfoSync()?.platform === 'devtools'

export const baseApi = isDevtools
  ? process.env.apiUrl
  : isRelease
  ? process.env.apiUrl
  : process.env.apiDevUrl

enum ECode {
  OPERATION_SUCCESS = 0, // "操作成功"
  UN_AUTHORIZED = 401, // 用户无权访问
  UNAUTH_ERRO = 7, // "出错"
}

export interface IApiData {
  data: any
  code: ECode
  msg: string
}

type TOptions = Omit<_request.Option<any>, 'url'>
const interceptor = function(chain) {
  const requestParams = chain.requestParams
  requestParams.header = {
    'x-user-id': GlobalStore.userInfo.id || '',
  }

  return chain.proceed(requestParams).then(res => {
    return res
  })
}
addInterceptor(interceptor)

function checkResponse(response: IApiData) {
  const { code, msg, data } = response

  if (code === ECode.UN_AUTHORIZED) {
    navigateTo({
      url: '/pages/authorize',
    })
    showToast({
      title: msg,
      icon: 'none',
      duration: 1500,
    })

    return Promise.reject({ code, msg })
  }

  if (code !== ECode.OPERATION_SUCCESS) {
    console.log(msg)
    showToast({
      title: msg || '网络异常',
      icon: 'none',
      duration: 2000,
    })
    return Promise.reject({ code, msg })
  }
  return Promise.resolve(data)
}

function request(url: string, options: TOptions) {
  return _request<IApiData>({
    url: baseApi + url,
    ...options,
  })
    .then(async res => await checkResponse(res.data))
    .catch(error => {
      const errMsg = error.msg || error.errMsg || '服务异常'
      showToast({
        title: errMsg.includes('request:fail') ? '网络异常' : errMsg,
        icon: 'none',
      })
      return Promise.reject(error)
    })
}

export const httpService = {
  get(url: string, data?: any) {
    console.log(url, { method: 'GET', data })
    return request(url, { method: 'GET', data })
  },
  post(url: string, data: any) {
    console.log(url, { method: 'POST', data })
    return request(url, { method: 'POST', data })
  },
}

export interface IMODApiData extends IApiData {}

export const $api = {
  AuthApi,
  GameApi,
  ActivityApi,
}
