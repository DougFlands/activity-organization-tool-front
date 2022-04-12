import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { AtCard, AtButton } from 'taro-ui'
import { $api } from '@/api'
import { useToast, useModal, useRouter } from 'taro-hooks'
import { useStore } from '@/store'
import style from './index.scss'

type GameContentProps = {
  data: any
}

const GameContent = props => {
  const [routerInfo, { navigateTo }] = useRouter()

  const [show] = useToast({
    mask: true,
    duration: 1500,
    icon: 'none',
  })
  const [showModal] = useModal({
    title: '确认操作',
    content: '确定要删除吗?',
  })
  const { GlobalStore } = useStore()

  const handleInvolvedActivity = async () => {
    if (checkDataTime()) {
      show({
        title: '活动已过期',
      })
      return
    }
    try {
      const res = await $api.ActivityApi.involvedOrExitActivities({
        userId: GlobalStore.userInfo.id,
        activityId: props.data.id,
        status: 1,
      })
    } catch (error) {
      console.log(error)
      return
    }

    handleClick()
    show({
      title: '参与成功',
    })
  }

  const handleExisActivity = async () => {
    if (checkDataTime()) {
      show({
        title: '活动已过期',
      })
      return
    }
    try {
      const res = await $api.ActivityApi.involvedOrExitActivities({
        userId: GlobalStore.userInfo.id,
        activityId: props.data.id,
        status: 0,
      })
    } catch (error) {
      console.log(error)
      return
    }

    handleClick()
    show({
      title: '退出成功',
    })
  }

  const handleDelActivity = async () => {
    const result = await showModal({
      confirmText: '删除',
    })
    if (result.confirm) {
      try {
        const res = await $api.ActivityApi.del({
          id: props.data.id,
        })
      } catch (error) {
        console.log(error)
        return
      }

      handleClick()
      props.handleReset()
      show({
        title: '删除成功',
      })
    }
  }

  // 跳转详情
  const handleJumpDetail = () => {
    navigateTo(`/pages/activity/detail?id=${props.data.id}`)
  }

  const handleClick = () => {
    props.handleClick && props.handleClick()
  }

  // 检查活动时间是否过期
  const checkDataTime = () => {
    const d = new Date(props.data.dateTime).getTime()
    const n = new Date().getTime()
    return n > d
  }

  return (
    <AtCard
      title={`${props.data.busGame.type === 1 ? '剧本' : '桌游'}: ${
        props.data.busGame.name
      }`}
      className={style.activityGameContent}
    >
      <View onClick={handleJumpDetail}>
        {!props.data.edit && props.data.isInvolved ? (
          <View className={style.isInvolved}>已参加</View>
        ) : null}
        <View>发起人: {props.data.user.nickName}</View>
        <View>地点: {props.data.location}</View>
        <View>费用: ￥{props.data.price}</View>
        <View>开始时间: {props.data.dateTime}</View>
        <View>
          人数: {props.data.participants}/{props.data.busGame.peopleNum}
        </View>
      </View>

      {props.data.edit ? (
        checkDataTime() ? null : (
          <AtButton
            type="primary"
            size="small"
            className={`${style.btn} ${style.btnDel}`}
            onClick={handleDelActivity}
          >
            删除
          </AtButton>
        )
      ) : props.data.showInvolved ? (
        +props.data.participants < props.data.busGame.peopleNum &&
        !props.data.isInvolved ? (
          <AtButton
            type="primary"
            size="small"
            className={`${style.btn} ${style.btnInvolved}`}
            onClick={handleInvolvedActivity}
          >
            参加
          </AtButton>
        ) : null
      ) : checkDataTime() ? null : (
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
