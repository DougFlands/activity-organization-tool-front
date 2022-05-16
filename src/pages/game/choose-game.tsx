import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtList, AtListItem, AtButton, AtPagination } from 'taro-ui'
import { $api } from '@/api'

import style from './index.scss'

const Game = props => {
  const [gameType, setGameType] = useState(0)
  const [list, setList] = useState<TGame[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const handleClick = i => {
    setPage(1)
    setGameType(i)
  }

  const handlePageChange = data => {
    setPage(data.current)
  }

  const fetch = async () => {
    const res = await $api.GameApi.findList({
      page,
      pageSize: 10,
      type: gameType + 1,
    })
    setList(res.list)
    setTotal(res.total)
  }

  useEffect(() => {
    fetch()
  }, [gameType, page])

  const tabList = [{ title: '剧本' }, { title: '桌游' }]

  return (
    <View className={style.gameChooseWrapper}>
      <AtTabs
        current={gameType}
        tabList={tabList}
        onClick={handleClick}
        className={style.tabs}
      ></AtTabs>
      <AtList className={style.list}>
        {list.map(item => {
          return (
            <AtListItem
              title={item.name}
              key={item.id}
              onClick={() => props.handleChoose(item)}
            />
          )
        })}
      </AtList>
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

export default Game
