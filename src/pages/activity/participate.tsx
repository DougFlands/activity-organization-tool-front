// 参加按钮组件
import { View } from '@tarojs/components'
import React, { useState, useEffect } from 'react'
import { AtButton } from 'taro-ui'
import { $api } from '@/api'
import { useToast, useModal } from 'taro-hooks'
import { useStore } from '@/store'
import style from './index.scss'
const Participate = props => {
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
    props.data.isInvolved = true
    props.data.participants = 1
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
    props.data.isInvolved = false

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

  const handleClick = () => {
    props.handleClick && props.handleClick()
  }

  // 检查是否已删除
  const checkIsDel = () => {
    const time = new Date(props.data.deleteTime).getTime()
    return time > 0
  }
  // 检查活动时间是否过期
  const checkDataTime = () => {
    const d = new Date(props.data.dateTime).getTime()
    const n = new Date().getTime()
    return n > d
  }
  useEffect(() => {
    console.log('参加', props.data.showInvolved)
  }, [])

  //   删除按钮
  const renderBtnDel = () => {
    if (props.data.edit && !checkDataTime()) {
      return (
        <AtButton
          type="primary"
          size="small"
          className={`${style.btn} ${style.btnDel}`}
          onClick={handleDelActivity}
        >
          删除
        </AtButton>
      )
    }
  }

  // 参与按钮
  const renderBtnInvolved = () => {
    if (
      !props.data.edit &&
      props.data.showInvolved &&
      +props.data.participants < props.data.busGame.peopleNum &&
      !props.data.isInvolved
    ) {
      return (
        <AtButton
          type="primary"
          size="small"
          className={`${style.btn} ${style.btnInvolved}`}
          onClick={handleInvolvedActivity}
        >
          参加
        </AtButton>
      )
    }
  }

  const renderBtnExit = () => {
    if (
      !props.data.edit &&
      !props.data.showInvolved &&
      !checkDataTime() &&
      !checkIsDel()
    ) {
      return (
        <AtButton
          type="primary"
          size="small"
          className={`${style.btn} ${style.btnExit}`}
          onClick={handleExisActivity}
        >
          退出
        </AtButton>
      )
    }
  }

  return (
    <View>
      {renderBtnDel()}
      {renderBtnInvolved()}
      {renderBtnExit()}
    </View>
  )
}

export default Participate
