import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import { useStore } from '@/store'
import Activity from '../activity/index'
import User from '../user/index'
import './index.scss'

const Index = () => {
  const { GlobalStore } = useStore()
  const [current, setCurrent] = useState(0)
  const tabList = [
    { title: '活动', iconType: 'home' },
    { title: '我的', iconType: 'user' }
  ]

  const handleClick = (page: number) => {
    setCurrent(page)
  }

  return (
    <View className="app-wrapper">
      <View className="app-wrapper-main">
        {current === 0 ? <Activity /> : <User />}
      </View>
      <AtTabBar
        tabList={tabList}
        fixed
        onClick={handleClick}
        current={current}
        customStyle={{
          display: GlobalStore.userInfo.isAdmin ? 'flex' : 'block'
        }}
      />
    </View>
  )
}

export default Index
