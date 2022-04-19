import React, { useState } from 'react'
import { View, Button } from '@tarojs/components'
import {
  AtModal,
  AtModalContent,
  AtModalAction,
  AtModalHeader,
  AtTimeline,
  AtList,
  AtListItem,
  AtAvatar,
} from 'taro-ui'
import { useRouter, useRequestSubscribeMessage, useToast } from 'taro-hooks'
import { useStore } from '@/store'

import style from './index.scss'

const User = () => {
  const [modalIsOpened, setModalIsOpened] = useState(false)

  const { GlobalStore } = useStore()
  const [routerInfo, { navigateTo }] = useRouter()

  const [show] = useToast({
    mask: true,
    duration: 500,
    icon: 'none',
  })

  const [requestSubscribeMessage] = useRequestSubscribeMessage()

  // 增加通知机会
  const addSubscribeCount = async () => {
    const res = await requestSubscribeMessage(process.env.templateID)
    console.log(res)
    show({
      title: '活动通知次数 + 3',
    })
  }

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
      case 'about':
        setModalIsOpened(true)
        break

      default:
        break
    }
  }

  return (
    <View className={style.home}>
      <View className={style.header}>
        {GlobalStore.userInfo.nickName ? (
          <AtAvatar image={GlobalStore.userInfo.avatarUrl}></AtAvatar>
        ) : null}
        <View className={style.right}>
          <View className={`${style.info}`}>
            {GlobalStore.userInfo.nickName || '未登录'}
          </View>
          <View className={`${style.info}`}>ID: {GlobalStore.userInfo.id}</View>
        </View>
      </View>

      <AtList>
        {GlobalStore.userInfo.isAdmin >= 1 ? (
          <>
            <AtListItem
              title="游戏列表"
              arrow="right"
              onClick={() => handleClick('game')}
              iconInfo={{ size: 16, color: '#6190e8', value: 'playlist' }}
            />
            <AtListItem
              title="创建活动"
              arrow="right"
              onClick={() => handleClick('activity')}
              iconInfo={{ size: 16, color: '#6190e8', value: 'add-circle' }}
            />
            <AtListItem
              title="我发起的活动"
              arrow="right"
              onClick={() => handleClick('activityList')}
              iconInfo={{ size: 16, color: '#6190e8', value: 'calendar' }}
            />
            <AtListItem
              title="增加活动人满通知次数"
              arrow="right"
              onClick={addSubscribeCount}
              iconInfo={{ size: 16, color: '#6190e8', value: 'add' }}
            />
          </>
        ) : null}

        {GlobalStore.userInfo.isAdmin >= 2 ? (
          <>
            <AtListItem
              title="用户列表"
              arrow="right"
              onClick={() => handleClick('userList')}
              iconInfo={{ size: 16, color: '#6190e8', value: 'user' }}
            />
          </>
        ) : null}

        <AtListItem
          title={GlobalStore.userInfo.nickName ? '刷新用户信息' : '点击授权'}
          arrow="right"
          onClick={() => handleClick('authorize')}
        />
        <AtListItem
          title="关于本小程序"
          arrow="right"
          onClick={() => handleClick('about')}
        />
      </AtList>

      <AtModal isOpened={modalIsOpened}>
        <AtModalHeader>小程序逻辑</AtModalHeader>
        <AtModalContent>
          <AtTimeline
            pending
            items={[
              {
                title: '注册',
                content: [
                  '我的 - 授权，然后找蚊子或者大叔提权到管理员',
                  '提升完后 我的 - 刷新用户信息',
                ],
              },
              {
                title: '参与',
                content: [
                  '首页点击参与即可参加，点击活动可查看详情，详情中可以查看参与的人',
                ],
              },
              {
                title: '非DM可以不用往下看了',
              },
              {
                title: '操作逻辑',
                content: ['先新建游戏，然后发起活动，发起活动时选择游戏。'],
              },
              {
                title: '新建游戏',
                content: [
                  '我的 - 游戏列表 - 新建',
                  '游戏可以重复使用，请勿重复创建相同的游戏',
                ],
              },
              {
                title: '新建活动',
                content: [
                  '我的 - 活动列表 - 新建',
                  '之后可以在我发起的活动中查看',
                ],
              },
            ]}
          ></AtTimeline>
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => setModalIsOpened(false)}>确定</Button>
        </AtModalAction>
      </AtModal>
    </View>
  )
}

export default User
