import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtPagination } from 'taro-ui'
import { $api } from '@/api'
import GameContent from './game-content'

import './index.scss'

type ListProps = {
  activityType: number
}

// 可参加的活动
const CanList = (props: ListProps) => {
  const [gameList, setGameList] = useState([{}])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const handlePageChange = data => {
    setPage(data.current)
  }

  const fetch = async () => {
    const res = await $api.ActivityApi.findList({
      page,
      pageSize: 20
    })
    res.list.forEach(item => {
      item.showInvolved = true
    })
    setGameList(res.list)
    setTotal(res.total)
  }

  useEffect(() => {
    fetch()
  }, [page])

  return (
    <View className="activity-can-list-wrapper">
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

export default CanList
