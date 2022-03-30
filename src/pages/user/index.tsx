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
      case 'userList':
        navigateTo('/pages/user/list')
        break
      default:
        break
    }
  }

  return (
    <View>
      <View className={`${style.info}`}>
        {' '}
        用户: {GlobalStore.userInfo.nickName || '未登录'}
      </View>
      <View className={`${style.info}`}> ID: {GlobalStore.userInfo.id}</View>
      <AtList>
        {GlobalStore.userInfo.isAdmin >= 1 ? (
          <>
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
          </>
        ) : null}

        {GlobalStore.userInfo.isAdmin >= 2 ? (
          <>
            <AtListItem
              title="用户列表"
              arrow="right"
              onClick={() => handleClick('userList')}
            />
          </>
        ) : null}

        <AtListItem
          title={GlobalStore.userInfo.nickName ? '刷新用户信息' : '点击授权'}
          arrow="right"
          onClick={() => handleClick('authorize')}
        />
      </AtList>
    </View>
  )
}

export default User
