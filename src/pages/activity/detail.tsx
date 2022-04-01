import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { AtCard, AtButton } from 'taro-ui'
import { $api } from '@/api'
import { useRouter } from 'taro-hooks'
import { useStore } from '@/store'
import style from './index.scss'

type GameContentProps = {
  data: any
}

const activityDetail = props => {
  const [activityType, setActivityType] = useState({
    busGame: {
      type: 0,
      name: '',
      introduction: '',
      peopleNum: 0,
    },
    gameId: 1,
    user: {
      nickName: '',
    },
    userId: 1,
    location: '23',
    price: '22',
    participants: 2,
    dateTime: '2022-04-05 00:00:00',
    userList: [
      {
        nickName: 'test1',
        isAdmin: 1,
      },
    ],
  })
  const [routerInfo, { navigateBack }] = useRouter()

  const handleGetActivity = async () => {
    try {
      const res = await $api.ActivityApi.find({
        id: routerInfo.params.id,
      })
      setActivityType(res.busAct)
    } catch (error) {
      console.log(error)
      return
    }
  }

  useEffect(() => {
    handleGetActivity()
  }, [])

  return (
    <AtCard
      title={`${activityType.busGame.type === 1 ? '剧本' : '桌游'}: ${
        activityType.busGame.name
      }`}
      className={style.activityGameContent}
    >
      <View>发起人: {activityType.user.nickName}</View>
      <View>地点: {activityType.location}</View>
      <View>费用: ￥{activityType.price}</View>
      <View>开始时间: {activityType.dateTime}</View>
      <View>
        人数: {activityType.participants}/{activityType.busGame.peopleNum}
      </View>
      <View>
        {activityType.userList.map(user => {
          return <View>玩家: {user.nickName}</View>
        })}
      </View>
    </AtCard>
  )
}

export default activityDetail
