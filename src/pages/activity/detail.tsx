import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { AtCard, AtButton } from 'taro-ui'
import { $api } from '@/api'
import { useRouter } from 'taro-hooks'
import { useStore } from '@/store'
import style from './index.scss'
import Participate from './participate'

type GameContentProps = {
  data: any
}

const activityDetail = props => {
  const [activity, setActivity] = useState({
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
    location: '',
    price: '',
    participants: 0,
    dateTime: '',
    endTime:'',
    userList: [
      // {
      //   nickName: '',
      //   isAdmin: 1,
      // },
    ],
  })
  const [routerInfo, { navigateBack }] = useRouter()

  const handleGetActivity = async () => {
    try {
      const res = await $api.ActivityApi.find({
        id: routerInfo.params.id,
      })
      setActivity(res.busAct)
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
      title={`${activity.busGame.type === 1 ? '剧本' : '桌游'}: ${
        activity.busGame.name
      }`}
      className={style.activityGameContent}
    >
      <View>发起人: {activity.user.nickName}</View>
      <View>地点: {activity.location}</View>
      <View>费用: ￥{activity.price}</View>
      <View>开始时间: {activity.dateTime}</View>
      <View>结束时间: {activity.endTime}</View>
      <View>
        人数: {activity.participants}/{activity.busGame.peopleNum}
      </View>
      <View>简介: {activity.busGame.introduction}</View>
      <View>
        {activity.userList?.map((user: any) => {
          return <View>玩家: {user.nickName}</View>
        })}
      </View>
      <Participate data={activity}/>

    </AtCard>
  )
}

export default activityDetail
