import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtPagination } from 'taro-ui'
import { $api } from '@/api'
import { useStore } from '@/store'
import pageback from '@/hooks/pageback'
import GameContent from './game-content'
import style from './index.scss'

type ListProps = {
  activityType: number
}

// 本人创建的活动
const CanList = (props: ListProps) => {
  const [gameList, setGameList] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const { GlobalStore } = useStore()
  const [pageHide] = pageback(false)

  const handlePageChange = data => {
    setPage(data.current)
  }

  const fetch = async () => {
    const res = await $api.ActivityApi.findList({
      page,
      pageSize: 10,
      userId: GlobalStore.userInfo.id,
    })
    res.list?.forEach(item => {
      item.edit = true
    })
    setGameList(res.list || [])
    setTotal(res.total)
  }

  const handleReset = () => {
    handlePageChange({ current: 1 })
    fetch()
  }

  useEffect(() => {
    if (pageHide) return
    fetch()
  }, [page, pageHide])

  return (
    <View className={style.activityListWrapper}>
      <View className={style.list}>
        {gameList.map((item, index) => {
          return (
            <View key={index} className={style.content}>
              <GameContent
                data={item}
                handleReset={handleReset}
                showDone={true}
              />
            </View>
          )
        })}
      </View>
      <AtPagination
        total={total}
        pageSize={10}
        current={page}
        onPageChange={handlePageChange}
        className={style.pagination}
      />
    </View>
  )
}

export default CanList
