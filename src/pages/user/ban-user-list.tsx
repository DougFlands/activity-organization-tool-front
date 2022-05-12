import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import Taro, { useDidShow, useDidHide } from '@tarojs/taro'
import {
  AtTabs,
  AtTabsPane,
  AtButton,
  AtPagination,
  AtFloatLayout,
} from 'taro-ui'
import { useToast, useModal } from 'taro-hooks'
import { useStore } from '@/store'
import { $api } from '@/api'
import style from './index.scss'

const BanUserList = () => {
  const { GlobalStore } = useStore()
  const [banUserListType, setBanUserListType] = useState(0)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [floatLayoutStatus, setFloatLayoutStatus] = useState(false)
  const [floatLayoutText, setFloatLayoutText] = useState('')

  const tabList = [{ title: '个人黑名单' }, { title: '全局黑名单' }]

  const handleClick = i => {
    setBanUserListType(i)
    setTotal(0)
    setList([])
    setPage(1)
  }

  const getList = async () => {
    const res = await $api.AuthApi.getBanUserList({
      page,
      pageSize: 10,
      status: banUserListType + 1,
      dmId: banUserListType ? 0 : GlobalStore.userInfo.id,
    })
    setList(res.list)
    setTotal(res.total)
  }

  const handlePageChange = data => {
    setPage(data.current)
  }

  const handleClickPlayer = (text: string) => {
    setFloatLayoutText(text)
    setFloatLayoutStatus(true)
  }

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '黑名单 (点击玩家查看拉黑详情)',
    })
    getList()
  }, [page, banUserListType])

  return (
    <View className={style.banUserListWrapper}>
      <AtTabs current={banUserListType} tabList={tabList} onClick={handleClick}>
        {tabList.map((_, i) => (
          <AtTabsPane
            current={banUserListType}
            index={i}
            className={style.tabsPane}
          >
            <View className={style.pane}>
              <BanUserItem
                data={list}
                banUserListType={i}
                handleRefresh={getList}
                handleClickPlayer={handleClickPlayer}
              ></BanUserItem>
              <AtPagination
                total={total}
                pageSize={10}
                onPageChange={handlePageChange}
                current={page}
                className={style.pagination}
              />
            </View>
          </AtTabsPane>
        ))}
      </AtTabs>
      <AtFloatLayout
        isOpened={floatLayoutStatus}
        onClose={() => setFloatLayoutStatus(false)}
        title="拉黑详情"
      >
        {floatLayoutText}
      </AtFloatLayout>
    </View>
  )
}

const BanUserItem = props => {
  const [showToast] = useToast({
    mask: true,
    duration: 1500,
    icon: 'none',
  })
  const [showModal] = useModal({
    title: '确认操作',
    content: '确定要取消拉黑吗?',
    confirmText: '确认',
  })

  const { GlobalStore } = useStore()
  const handleSubmit = async (item: any) => {
    console.log(item)
    const result = await showModal()
    if (!result.confirm) return
    try {
      await $api.AuthApi.banUser({
        id: item.id,
        status: 0,
      })
    } catch (error) {
      console.log(error)
      return
    }
    await showToast({
      title: '取消拉黑成功',
    })
    props.handleRefresh && props.handleRefresh()
  }
  useEffect(() => {
    console.log(props)
  })
  return (
    <View className={style.banUserItemWrapper}>
      {props.data?.map(item => (
        <View
          className={style.banUserItem}
          onClick={() => props.handleClickPlayer(item.content)}
        >
          <View>
            {item.playerId}: {item.player.nickName}
          </View>
          {props.banUserListType === 1 &&
          GlobalStore.userInfo.isAdmin < 2 ? null : (
            <AtButton
              size="small"
              type="primary"
              onClick={() => handleSubmit(item)}
              className={style.btn}
            >
              解除拉黑
            </AtButton>
          )}
        </View>
      ))}
    </View>
  )
}

export default BanUserList
