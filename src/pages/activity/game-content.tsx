import { View, } from '@tarojs/components'
import { AtCard } from 'taro-ui'
import { useRouter } from 'taro-hooks'
import style from './index.scss'
import Participate from './participate'
import React, { useState, useEffect } from 'react'

const GameContent = props => {
  const [routerInfo, { navigateTo }] = useRouter()

  // 跳转详情
  const handleJumpDetail = () => {
    if (checkIsDel()) return
    navigateTo(`/pages/activity/detail?id=${props.data.id}`)
  }

  // 检查是否已删除
  const checkIsDel = () => {
    const time = new Date(props.data.deleteTime).getTime()
    return time > 0
  }
  useEffect(() => {
    console.log(props.data)
    console.log(props.data.showInvolved)
}, [])
  return (
    <AtCard
      title={`${props.data.busGame.type === 1 ? '剧本' : '桌游'}: ${props.data.busGame.name
        }`}
      className={style.activityGameContent}
    >
      <View onClick={handleJumpDetail}>
        <View>发起人: {props.data.user.nickName}</View>
        <View>地点: {props.data.location}</View>
        <View>费用: ￥{props.data.price}</View>
        <View>开始时间: {props.data.dateTime}</View>
        <View>
          人数: {props.data.participants}/{props.data.busGame.peopleNum}
        </View>
      </View>
      {
        <Participate data={props.data} />
      }
    </AtCard >
  )
}

export default GameContent
