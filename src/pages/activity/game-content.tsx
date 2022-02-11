import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { AtCard, AtButton } from 'taro-ui'
import './index.scss'

type GameContentProps = {
  data: any
}

const GameContent = props => {
  const handleClick = () => {}
  const tabList = [{ title: '全部' }, { title: '已参加' }]
  const [current, setCurrent] = useState(1)

  return (
    <AtCard extra="豪门5" title="剧本:" className="activity-game-content">
      <View>发起人: 猩猩</View>
      <View>地点: 科学馆 92咖啡</View>
      <View>费用: ￥30</View>
      <View>开始时间: 2022-01-01 16:00</View>
      <View>人数: 2/6</View>
      {true ? (
        <AtButton type="primary" size="small" className="btn">
          参加
        </AtButton>
      ) : (
        <AtButton type="secondary" size="small" className="btn">
          退出
        </AtButton>
      )}
    </AtCard>
  )
}

export default GameContent
