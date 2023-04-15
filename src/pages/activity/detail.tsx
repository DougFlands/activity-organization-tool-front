import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { AtCard, AtDivider, AtButton } from 'taro-ui'
import { $api } from '@/api'
import { useRouter, useToast, useModal } from 'taro-hooks'
import { useStore } from '@/store'
import style from './index.scss'
import Participate from './participate'

const activityDetail = () => {
  const { GlobalStore } = useStore()
  const [showModal] = useModal({
    title: '确认操作',
  })
  const [show] = useToast({
    mask: true,
    title: '踢出成功',
    duration: 1500,
    icon: 'none',
  })
  const [activity, setActivity] = useState<IActivity>({
    id: null,
    busGame: {
      type: 0,
      name: '',
      introduction: '',
      peopleNum: 0,
    },
    gameId: 0,
    user: {
      nickName: '',
    },
    rminedDate: 0,
    userId: 0,
    location: '',
    price: '',
    participants: 0,
    dateTime: '',
    endTime: '',
    userList: [],
    showInvolved: true,
    isInvolved: false,
  })
  const [routerInfo, { navigateBack }] = useRouter()

  const handleGetActivity = async () => {
    try {
      const res = await $api.ActivityApi.find({
        id: routerInfo.params.id,
      })
      setActivity({
        showInvolved: !res.busAct.isInvolved,
        edit: routerInfo.params.edit,
        ...res.busAct,
      })
    } catch (error) {
      console.log(error)
      return
    }
  }

  const handlerKickUser = async user => {
    console.log(user)
    const result = await showModal({
      confirmText: '踢出',
      content: `踢出玩家: ${user.nickName}`,
    })
    try {
      await $api.ActivityApi.involvedOrExitActivities({
        userId: user.id,
        activityId: activity.id,
        status: 0,
      })
    } catch (error) {
      console.log(error)
      return
    }
    await handleGetActivity()
    show()
  }

  // DM 踢出玩家
  const renderKickBtn = user => {
    if (GlobalStore.userInfo.id === activity.userId) {
      return (
        <AtButton
          type="primary"
          size="small"
          className={`${style.btn} ${style.btnExit} ${style.btnKick}`}
          onClick={() => handlerKickUser(user)}
        >
          踢出玩家
        </AtButton>
      )
    }
  }

  const renderUser = user => {
    return (
      <View className={style.userItem}>
        {user.nickName}
        {renderKickBtn(user)}
      </View>
    )
  }

  const rminedDateFormat = (value: number) => {
    switch (value) {
      case 0:
        return '不限制'
      case 1:
        return '工作日'
      case 2:
        return '周末'
      default:
        return ''
    }
  }

  useEffect(() => {
    handleGetActivity()
  }, [])

  return (
    <AtCard
      title={`${activity.busGame.type === 1 ? '剧本' : '桌游'}: ${
        activity.busGame.name
      }`}
      className={style.activityGameContent}
    >
      <View>DM: {activity.user.nickName}</View>
      <View>地点: {activity.location || '线上'}</View>
      <View>
        费用: {activity.price === '0' ? '免费' : `￥${activity.price}`}
      </View>
      {activity.dateTime === '2099-12-31 23:59:59' ? (
        '活动日期: 待定'
      ) : (
        <View>
          活动日期: {activity.dateTime?.slice(0, 10)}{' '}
          {activity.dateTime?.slice(11, 16)} - {activity.endTime?.slice(11, 16)}
        </View>
      )}

      {
        <View>
          {activity.dateTime === '2099-12-31 23:59:59' &&
            `待定限制: ${rminedDateFormat(activity.rminedDate)}`}
        </View>
      }

      <View>游戏人数: {activity.busGame.peopleNum}人</View>
      <View>已参与: {activity.participants}人</View>
      <View>简介: {activity.busGame.introduction}</View>
      <View>
        {activity.userList ? (
          <View>
            <AtDivider
              content="已参与玩家"
              fontColor="#2d8cf0"
              lineColor="#2d8cf0"
            />
            {activity.userList
              .slice(0, activity.busGame.peopleNum)
              .map((user: TUser) => {
                return renderUser(user)
              })}
          </View>
        ) : null}
        {activity.userList?.slice(activity.busGame.peopleNum, 1000)?.length >
        0 ? (
          <View>
            <AtDivider content="备胎" fontColor="#2d8cf0" lineColor="#2d8cf0" />

            {activity.userList
              ?.slice(activity.busGame.peopleNum, 1000)
              .map((user: TUser) => {
                return renderUser(user)
              })}
          </View>
        ) : null}
      </View>
      <Participate data={activity} handleClick={handleGetActivity} />
    </AtCard>
  )
}

export default activityDetail
