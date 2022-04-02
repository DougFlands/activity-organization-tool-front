import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
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

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '首页',
    })
  })

  return (
    <View className={style.activityWrapper}>
      <AtTabs current={activityType} tabList={tabList} onClick={handleClick}>
        <AtTabsPane current={activityType} index={0} className={style.tabsPane}>
          <View className={style.pane}>
            <CanParticipateList activityType={activityType} />
          </View>
        </AtTabsPane>
        <AtTabsPane current={activityType} index={1} className={style.tabsPane}>
          <View className={style.pane}>
            <InvolvedList activityType={activityType} />
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  )
}

export default Activity
