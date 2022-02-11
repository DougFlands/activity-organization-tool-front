import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import CanList from './can-list'
import ParticipatedList from './participated-list'

import './index.scss'

const Activity = () => {
  const [activityType, setActivityType] = useState(0)

  const handleClick = i => {
    console.log(i)
    setActivityType(i)
  }
  const tabList = [{ title: '可参加' }, { title: '已参加' }]

  return (
    <View className="activity-wrapper">
      <AtTabs current={activityType} tabList={tabList} onClick={handleClick}>
        <AtTabsPane current={activityType} index={0}>
          <View className="pane">
            <CanList activityType={activityType} />
          </View>
        </AtTabsPane>
        <AtTabsPane current={activityType} index={1}>
          <View className="pane">
            <ParticipatedList activityType={activityType} />
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  )
}

export default Activity
