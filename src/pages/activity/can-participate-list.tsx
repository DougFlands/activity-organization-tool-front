import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtPagination } from 'taro-ui'
import { $api } from '@/api'
import pageback from '@/hooks/pageback'
import GameContent from './game-content'

import style from './index.scss'

type ListProps = {
  activityType: number
}

// 所有活动
const CanList = (props: ListProps) => {
  const [activityList, setActivityList] = useState<IActivity[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageHide] = pageback(false)

  const handlePageChange = data => {
    setPage(data.current)
  }

  const fetch = async () => {
    const res = await $api.ActivityApi.findList({
      page,
      pageSize: 10,
    })
    res.list?.forEach(item => {
      item.showInvolved = true
    })

    setActivityList(activityListFilter(res.list || []))

    setTotal(res.total)
  }

  const activityListFilter = (list: IActivity[]) => {
    // 已满
    const fullList: IActivity[] = []
    // 已参加
    const involvedList: IActivity[] = []
    // 进行中
    const progressList: IActivity[] = []

    list.forEach(item => {
      // 已满
      if (item.participants > item.busGame.peopleNum) {
        fullList.push(item)
      } else if (item.isInvolved) {
        involvedList.push(item)
      } else {
        progressList.push(item)
      }
    })
    return [...progressList, ...fullList, ...involvedList]
  }

  const handleClick = () => {
    if (page === 1) {
      fetch()
    } else {
      handlePageChange({ current: 1 })
    }
  }

  useEffect(() => {
    if (pageHide) return
    if (props.activityType === 0) {
      fetch()
    }
  }, [page, props.activityType, pageHide])

  return (
    <View className={style.activityCanListWrapper}>
      <View className={style.list}>
        {activityList.map((item, index) => {
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
