import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { useReady } from '@tarojs/taro'
import { AtTabs, AtTabsPane, AtPagination } from 'taro-ui'
import { $api } from '@/api'
import { useStore } from '@/store'
import GameContent from './game-content'
import style from './index.scss'

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
      pageSize: 10,
      userId: GlobalStore.userInfo.id,
    })
    const list = res.list?.map(item => {
      return {
        ...item,
        ...item.busActivity,
      }
    })
    setGameList(list || [])
    setTotal(res.total)
  }

  const handleClick = () => {
    if (page === 1) {
      fetch()
    } else {
      handlePageChange({ current: 1 })
    }
  }

  useEffect(() => {
    if (props.activityType === 1) {
      fetch()
    }
  }, [page, props.activityType])

  return (
    <View className={style.activityInvolvedListWrapper}>
      <View className={style.list}>
        {gameList.map((item, index) => {
          return (
            <View key={index} className={style.content}>
              <GameContent data={item} handleClick={handleClick} />
            </View>
          )
        })}
      </View>
      <AtPagination
        total={total}
        pageSize={10}
        onPageChange={handlePageChange}
        current={page}
        className={style.pagination}
      />
    </View>
  )
}

export default InvolvedList
