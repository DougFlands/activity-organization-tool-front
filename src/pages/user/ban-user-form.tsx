import React, { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import {
  AtForm,
  AtInput,
  AtButton,
  AtTextarea,
  AtRadio,
  AtInputNumber,
} from 'taro-ui'
import Taro from '@tarojs/taro'
import { useToast, useRouter } from 'taro-hooks'
import { useStore } from '@/store'
import { $api } from '@/api'
import style from './index.scss'

const BanUserForm = () => {
  const { GlobalStore } = useStore()

  const [formData, setFormData] = useState({
    content: '',
    playerId: 0,
    dmId: 0,
    status: 1,
  })
  const [status, setStatus] = useState({
    name: '',
    globle: false,
  })
  const [showToast] = useToast({
    mask: true,
    duration: 1500,
    icon: 'none',
  })

  const [routerInfo, { navigateBack }] = useRouter()

  const handleSubmit = async () => {
    if (!formData.content) {
      showToast({
        title: '请输入拉黑原因',
      })
      return
    }
    try {
      console.log(formData)
      const res = await $api.AuthApi.banUser({
        ...formData,
        dmId: status.globle ? 0 : GlobalStore.userInfo.id,
        status: status.globle ? 2 : 1,
      })
    } catch (error) {
      console.log(error)
      return
    }
    await navigateBack()
    showToast({
      title: '拉黑成功',
    })
  }

  useEffect(() => {
    console.log(routerInfo)
    setFormData({
      ...formData,
      playerId: +((routerInfo.params.id as unknown) as string),
    })
    setStatus({
      ...status,
      name: routerInfo.params.name as string,
      globle: !!routerInfo.params.globle,
    })
  }, [])

  return (
    <View className={style.banUserFormWrapper}>
      <AtForm>
        <View>
          将:
          <Text className={style.text}> {status.name}</Text>
        </View>
        <View>
          拉入
          <Text className={style.text}>
            {' '}
            {status.globle ? '全局' : '个人'}{' '}
          </Text>
          黑名单
        </View>
        <View className={style.formItem}>
          <View className={style.formLeft}>拉黑原因:</View>
          <AtTextarea
            className={style.formRight}
            placeholder="请输入..."
            value={formData.content}
            maxLength={200}
            onChange={value =>
              setFormData({
                ...formData,
                content: `${value}`,
              })
            }
          />
        </View>
        <AtButton
          type="primary"
          onClick={handleSubmit}
          className={style.submit}
        >
          提交
        </AtButton>
      </AtForm>
    </View>
  )
}

export default BanUserForm
