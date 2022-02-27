import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import CanParticipateList from './can-participate-list'
import InvolvedList from './involved-list'
import style from './index.scss'

const Activity = () => {
  const [activityType, setActivityType] = useState(0)

  const handleClick = i => {
    setActivityType(i)
  }
  const tabList = [{ title: '所有活动' }, { title: '已参加' }]

  return (
    <View className={style.activityWrapper}>
      <AtTabs current={activityType} tabList={tabList} onClick={handleClick}>
        <AtTabsPane current={activityType} index={0}>
          <View className={style.pane}>
            <CanParticipateList activityType={activityType} />
          </View>
        </AtTabsPane>
        <AtTabsPane current={activityType} index={1}>
          <View className={style.pane}>
            <InvolvedList activityType={activityType} />
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  )
}

export default Activity
