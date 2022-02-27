import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtList, AtListItem, AtButton, AtPagination } from 'taro-ui'
import { useRouter } from 'taro-hooks'
import { useDidShow, useDidHide } from '@tarojs/taro'
import { $api } from '@/api'

import style from './index.scss'

const Game = () => {
  const [gameType, setGameType] = useState(0)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  // 判断是否从表单返回用
  const [pageHide, setPageHide] = useState(false)

  const [routerInfo, { navigateTo }] = useRouter()

  const handleClick = async i => {
    setGameType(i)
  }
  const handlerCreateGame = (params = { id: '' }) => {
    navigateTo(`/pages/game/form?id=${params.id || ''}`)
  }
  const tabList = [{ title: '全部' }, { title: '剧本' }, { title: '桌游' }]

  const handleJumpDetail = (detail = { id: '' }) => {
    handlerCreateGame({
      id: detail.id
    })
  }

  const handlePageChange = data => {
    setPage(data.current)
  }

  const fetch = async () => {
    const res = await $api.GameApi.findList({
      page,
      pageSize: 10,
      type: gameType ? gameType : ''
    })
    setList(res.list)
    setTotal(res.total)
  }

  useEffect(() => {
    fetch()
  }, [gameType, page])

  useDidShow(() => {
    if (pageHide) {
      setPageHide(false)
      fetch()
    }
  })

  useDidHide(() => {
    setPageHide(true)
  })

  return (
    <View className={style.gameWrapper}>
      <AtTabs
        current={gameType}
        tabList={tabList}
        onClick={handleClick}
        className={style.tabs}
      ></AtTabs>
      <AtList className={style.list}>
        {list.map((item: any) => {
          return (
            <AtListItem
              title={item.name}
              arrow="right"
              key={item.id}
              onClick={() => {
                handleJumpDetail(item)
              }}
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
      <AtButton
        type="primary"
        size="small"
        className={style.btn}
        onClick={() => handlerCreateGame({ id: '' })}
      >
        新建游戏
      </AtButton>
    </View>
  )
}

export default Game
