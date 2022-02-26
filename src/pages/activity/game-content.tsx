import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { AtCard, AtButton } from 'taro-ui'
import { $api } from '@/api'
import { useToast, useModal } from 'taro-hooks'
import style from './index.scss'

type GameContentProps = {
  data: any
}

const GameContent = props => {
  const [show] = useToast({
    mask: true,
    duration: 1500,
    icon: 'none'
  })
  const [showModal] = useModal({
    title: '确认操作',
    content: '确定要删除吗?'
  })

  const handleInvolvedActivity = async () => {
    try {
      const res = await $api.ActivityApi.involvedOrExitActivities({
        userId: props.data.userId,
        activityId: props.data.id,
        status: 1
      })
    } catch (error) {
      console.log(error)
      return
    }

    show({
      title: '参与成功'
    })
  }

  const handleExisActivity = async () => {
    try {
      const res = await $api.ActivityApi.involvedOrExitActivities({
        userId: props.data.userId,
        activityId: props.data.id,
        status: 0
      })
    } catch (error) {
      console.log(error)
      return
    }

    show({
      title: '退出成功'
    })
  }

  const handleDelActivity = async () => {
    const result = await showModal({
      confirmText: '删除'
    })
    if (result.confirm) {
      try {
        const res = await $api.ActivityApi.del({
          id: props.data.id
        })
      } catch (error) {
        console.log(error)
        return
      }

      show({
        title: '删除成功'
      })
      props.handleReset()
    }
  }

  return (
    <AtCard
      title={`${props.data.busGame.type}: ${props.data.busGame.name}`}
      className={style.activityGameContent}
    >
      <View>发起人: {props.data.user.nickName}</View>
      <View>地点: {props.data.location}</View>
      <View>费用: ￥{props.data.price}</View>
      <View>开始时间: {props.data.dateTime}</View>
      <View>
        {/* TODO:  */}
        人数: {props.data.participants}/{props.data.busGame.peopleNum}
      </View>
      {props.data.edit ? (
        <AtButton
          type="primary"
          size="small"
          className={`${style.btn} ${style.btnDel}`}
          onClick={handleDelActivity}
        >
          删除
        </AtButton>
      ) : props.data.showInvolved ? (
        <AtButton
          type="primary"
          size="small"
          className={`${style.btn} ${style.btnInvolved}`}
          onClick={handleInvolvedActivity}
        >
          参加
        </AtButton>
      ) : (
        <AtButton
          type="primary"
          size="small"
          className={`${style.btn} ${style.btnExit}`}
          onClick={handleExisActivity}
        >
          退出
        </AtButton>
      )}
    </AtCard>
  )
}

export default GameContent
