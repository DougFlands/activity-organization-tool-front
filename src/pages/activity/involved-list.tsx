import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtPagination } from 'taro-ui'
import { $api } from '@/api'
import { useStore } from '@/store'
import GameContent from './game-content'

import './index.scss'

type ListProps = {
  activityType: number
}

// 已参加的活动
const InvolvedList = (props: ListProps) => {
  const [gameList, setGameList] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const { GlobalStore } = useStore()

  const handlePageChange = data => {
    setPage(data.current)
  }

  const fetch = async () => {
    const res = await $api.ActivityApi.involvedActivityList({
      page,
      pageSize: 20,
      userId: GlobalStore.userInfo.id
    })
    const list = res.list.map(item => {
      return {
        ...item,
        ...item.busActivity
      }
    })
    setGameList(list)
    setTotal(res.total)
  }

  useEffect(() => {
    fetch()
  }, [page])

  return (
    <View className="activity-involved-list-wrapper">
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
        total={total}
        pageSize={10}
        current={page}
        className="pagination"
      />
    </View>
  )
}

export default InvolvedList
