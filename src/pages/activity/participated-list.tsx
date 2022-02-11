import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtPagination } from 'taro-ui'
import GameContent from './game-content'

import './index.scss'

type ListProps = {
  activityType: number
}

const ParticipatedList = (props: ListProps) => {
  const handleClick = i => {
    setCurrent(i)
  }

  const [current, setCurrent] = useState(1)
  const [gameList, setGameList] = useState([{}])

  return (
    <View className="activity-participated-list-wrapper">
      <View className="list">
        {gameList.map((item, index) => {
          return (
            <View key={index} className="content">
              <GameContent data={item} />
            </View>
          )
        })}
      </View>
      <AtPagination
        total={50}
        pageSize={10}
        current={current}
        className="pagination"
      />
    </View>
  )
}

export default ParticipatedList
