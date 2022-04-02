import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtPagination } from 'taro-ui'
import { $api } from '@/api'
import GameContent from './game-content'

import style from './index.scss'

type ListProps = {
  activityType: number
}

// 所有活动
const CanList = (props: ListProps) => {
  const [gameList, setGameList] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const handlePageChange = data => {
    setPage(data.current)
  }

  const fetch = async () => {
    const res = await $api.ActivityApi.findList({
      page,
      pageSize: 10,
    })
    res.list.forEach(item => {
      item.showInvolved = true
    })
    setGameList(res.list)
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
    if (props.activityType === 0) {
      fetch()
    }
  }, [page, props.activityType])

  return (
    <View className={style.activityCanListWrapper}>
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

export default CanList
