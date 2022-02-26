import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtList, AtListItem, AtButton } from 'taro-ui'
import { useRouter } from 'taro-hooks'
import { useStore } from '@/store'

import style from './index.scss'

const User = () => {
  const { GlobalStore } = useStore()
  const [routerInfo, { navigateTo }] = useRouter()
  const handleClick = (page: string) => {
    switch (page) {
      case 'activity':
        navigateTo('/pages/activity/form')
        break
      case 'activityList':
        navigateTo('/pages/activity/list')
        break
      case 'game':
        navigateTo('/pages/game/index')
        break
      case 'authorize':
        navigateTo('/pages/authorize')
        break
      default:
        break
    }
  }

  return (
    <View>
      <View> 用户: {GlobalStore.userInfo.nickName}</View>
      <AtList>
        <AtListItem
          title="游戏列表"
          arrow="right"
          onClick={() => handleClick('game')}
        />
        <AtListItem
          title="创建活动"
          arrow="right"
          onClick={() => handleClick('activity')}
        />
        <AtListItem
          title="我发起的活动"
          arrow="right"
          onClick={() => handleClick('activityList')}
        />
        <AtListItem
          title="点击授权"
          arrow="right"
          onClick={() => handleClick('authorize')}
        />
      </AtList>
    </View>
  )
}

export default User
