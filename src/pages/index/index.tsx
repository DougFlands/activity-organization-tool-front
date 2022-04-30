import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import { useModal } from 'taro-hooks'
import { useStore } from '@/store'
import Activity from '../activity/index'
import User from '../user/index'
import style from './index.scss'

const Index = () => {
  const { GlobalStore } = useStore()
  const [current, setCurrent] = useState(0)
  const updateManager = Taro.getUpdateManager()
  const [showModal] = useModal({
    title: '更新提示',
    content: '新版本已经准备好，请重启应用!',
    showCancel: false,
  })

  const tabList = [
    { title: '活动', iconType: 'home' },
    { title: '我的', iconType: 'user' },
  ]

  const handleClick = (page: number) => {
    setCurrent(page)
  }

  const init = async () => {
    // 检查更新
    updateManager.onCheckForUpdate(res => {
      // 请求完新版本信息的回调
      console.log('检查更新: ', res.hasUpdate)
    })
    updateManager.onUpdateReady(async () => {
      await showModal()
      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()
    })
  }

  useEffect(() => {
    init()
  })

  return (
    <View className={style.appWrapper}>
      <View>{current === 0 ? <Activity /> : <User />}</View>
      <AtTabBar
        tabList={tabList}
        fixed
        onClick={handleClick}
        current={current}
        className={style.tab}
      />
    </View>
  )
}

export default Index
