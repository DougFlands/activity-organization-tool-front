import { View, Picker, Button } from '@tarojs/components'
import {
  AtCard,
  AtModal,
  AtForm,
  AtModalContent,
  AtModalHeader,
  AtModalAction,
} from 'taro-ui'
import { useRouter, useToast } from 'taro-hooks'
import style from './index.scss'
import Participate from './participate'
import React, { useState, useEffect } from 'react'
import { $api } from '@/api'

const GameContent = props => {
  const [routerInfo, { navigateTo }] = useRouter()
  const [doneModalStatus, setDoneModalStatus] = useState(false)
  const [timeForm, setTimeForm] = useState({
    date: '',
    endTime: '',
  })
  const [show] = useToast({
    mask: true,
    duration: 1500,
    icon: 'none',
  })

  // 跳转详情
  const handleJumpDetail = () => {
    if (checkIsDel()) return
    navigateTo(
      `/pages/activity/detail?id=${props.data.id}${
        props.data.edit ? '&edit' : ''
      }`,
    )
  }

  const handleDoneActivity = async () => {
    try {
      await $api.ActivityApi.update({
        id: props.data.id,
        createdTime: props.data.createdTime,
        endTime: `${timeForm.date} ${timeForm.endTime}`,
      })
    } catch (error) {
      console.log(error)
      return
    }
    await props.handleReset()
    setDoneModalStatus(false)
    show({
      title: '结束成功',
    })
  }

  // 检查是否已删除
  const checkIsDel = () => {
    const time = new Date(props.data.deleteTime).getTime()
    return time > 0
  }

  const timeSlice = (time: string, start: number, end: number) => {
    return time ? time.slice(start, end) : time
  }

  const startDate = () => new Date().toJSON().slice(0, 10)

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
  useEffect(() => {}, [])
  return (
    <AtCard
      title={`${props.data.busGame.type === 1 ? '剧本' : '桌游'}: ${
        props.data.busGame.name
      }`}
      className={style.activityGameContent}
    >
      <View onClick={handleJumpDetail}>
        {checkIsDel() ? (
          <View className={style.isDel}>活动已被删除</View>
        ) : !props.data.edit && props.data.isInvolved ? (
          <View className={style.isInvolved}>已参加</View>
        ) : null}

        <View>DM: {props.data.user.nickName}</View>
        <View>地点: {props.data.location || '线上'}</View>
        <View>
          费用: {props.data.price === '0' ? '免费' : `￥${props.data.price}`}
        </View>
        <View>
          {props.data.dateTime === '2099-12-31 23:59:59' ? (
            '活动日期: 待定'
          ) : (
            <View>
              活动日期: {timeSlice(props.data.dateTime, 0, 10)}{' '}
              {timeSlice(props.data.dateTime, 11, 16)} -{' '}
              {timeSlice(props.data.endTime, 11, 16)}
            </View>
          )}
        </View>
        {
          <View>
            {props.data.dateTime === '2099-12-31 23:59:59' &&
              `待定限制: ${rminedDateFormat(props.data.rminedDate)}`}
          </View>
        }
        <View>游戏人数: {props.data.busGame.peopleNum}人</View>
        <View>已参与: {props.data.participants}人</View>
      </View>
      <AtModal
        isOpened={doneModalStatus}
        cancelText="取消"
        confirmText="确认"
        onCancel={() => setDoneModalStatus(false)}
        className={style.activityFormWrapper}
      >
        <AtModalHeader>结束活动</AtModalHeader>
        <AtModalContent>
          <AtForm>
            <View className={style.formItem}>
              <View className={style.formLeft}>活动日期:</View>
              <Picker
                mode="date"
                onChange={({ detail: { value } }) => {
                  setTimeForm({
                    ...timeForm,
                    date: value,
                  })
                }}
                value={timeForm.date}
                start={startDate()}
                className={style.picker}
              >
                {timeForm.date ? (
                  <View className={style.text}>{timeForm.date}</View>
                ) : (
                  <View>请选择日期</View>
                )}
              </Picker>
            </View>
            <View className={style.formItem}>
              <View className={style.formLeft}>结束时间:</View>
              <Picker
                mode="time"
                onChange={({ detail: { value } }) => {
                  setTimeForm({
                    ...timeForm,
                    endTime: `${value}`,
                  })
                }}
                value={timeForm.endTime}
                className={style.picker}
              >
                {timeForm.endTime ? (
                  <View className={style.text}>{timeForm.endTime}</View>
                ) : (
                  <View>请选择时间</View>
                )}
              </Picker>
            </View>
          </AtForm>
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => setDoneModalStatus(false)}>取消</Button>{' '}
          <Button onClick={handleDoneActivity}>确定</Button>
        </AtModalAction>
      </AtModal>
      {
        <Participate
          data={props.data}
          handleClick={props.handleClick}
          handleReset={props.handleReset}
          showDone={props.showDone}
          handleDoneActivity={() => setDoneModalStatus(true)}
        />
      }
    </AtCard>
  )
}

export default GameContent
