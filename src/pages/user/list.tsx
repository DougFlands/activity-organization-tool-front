import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { AtInput, AtButton, AtPagination } from 'taro-ui'
import { useToast, useModal } from 'taro-hooks'
import { $api } from '@/api'

import style from './index.scss'

const UserList = () => {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [ID, setID] = useState('')
  const [showModal] = useModal({
    title: '确认操作',
  })
  const [show] = useToast({
    mask: true,
    duration: 1500,
    icon: 'none',
  })

  const handlePageChange = data => {
    setPage(data.current)
  }

  const fetch = async () => {
    if (ID !== '' && !+ID) {
      show({
        title: 'ID输入错误',
      })
      return
    }
    console.log(ID)
    const res = await $api.AuthApi.userList({
      page,
      pageSize: 10,
      userId: ID ? +ID : '',
    })
    setList(res.list)
    setTotal(res.total)
  }

  const setAuth = async item => {
    const result = await showModal({
      content: `确定要对 id: ${item.id} ${
        item.isAdmin === 0 ? '提权' : '降权'
      } 吗？`,
      confirmText: '确认',
    })
    if (result.confirm) {
      const res = await $api.AuthApi.setAdminAuthority({
        userId: item.id,
        isAdmin: item.isAdmin === 0 ? 1 : 0,
      })
      await fetch()
      show({
        title: '操作成功',
      })
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <View className={style.userListWrapper}>
      <AtInput
        name="value"
        title="搜索ID"
        type="text"
        placeholder="请输入ID"
        value={ID}
        onChange={v => setID(v + '')}
      >
        <AtButton size="small" className={style.search} onClick={fetch}>
          搜索
        </AtButton>
      </AtInput>
      <View className={style.list}>
        {list.map((item: any) => {
          return (
            <View key={item.id} className={style.listItem}>
              <View>
                <text className={style.id}>{item.id}: </text>
                <text>{item.nickName}</text>
              </View>

              {item.isAdmin === 0 ? (
                <AtButton
                  type="primary"
                  size="small"
                  onClick={() => setAuth(item)}
                  className={style.up}
                >
                  提权
                </AtButton>
              ) : (
                <AtButton
                  type="primary"
                  size="small"
                  className={style.down}
                  onClick={() => setAuth(item)}
                >
                  降权
                </AtButton>
              )}
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

export default UserList
