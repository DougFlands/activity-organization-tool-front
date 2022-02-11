import React from 'react'
import { observer } from 'mobx-react'
import { observable, makeObservable } from 'mobx'
import Taro from '@tarojs/taro'

class Store {
  @observable userInfo = {
    id: 0,
    openID: '',
    avatarUrl: '',
    nickName: '',
    isAdmin: 1
  }

  constructor() {
    makeObservable(this)
  }

  setUserInfo(data) {
    this.userInfo = {
      ...this.userInfo,
      ...data
    }
    Taro.setStorageSync('userInfo', JSON.stringify(this.userInfo))
  }
}

const GlobalStore = new Store()
let userInfo = Taro.getStorageSync('userInfo')
if (userInfo) {
  userInfo = JSON.parse(userInfo)
  GlobalStore.setUserInfo(userInfo)
}

export interface IGlobalStore extends Store {}

export const storesContext = React.createContext({
  GlobalStore
})
export interface IStore {
  GlobalStore: IGlobalStore
}
const useStore = () => React.useContext(storesContext)
export { observer, useStore, GlobalStore }
