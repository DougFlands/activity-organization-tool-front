import { View } from '@tarojs/components'
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
              活动日期: {props.data.dateTime?.slice(0, 10)}{' '}
              {props.data.dateTime?.slice(11, 16)} -{' '}
              {props.data.endTime?.slice(11, 16)}
            </View>
          )}
        </View>
        <View>游戏人数: {props.data.busGame.peopleNum}人</View>
        <View>已参与: {props.data.participants}人</View>
      </View>
      {
        <Participate
          data={props.data}
          handleClick={props.handleClick}
          handleReset={props.handleReset}
        />
      }
    </AtCard>
  )
}

export default GameContent
