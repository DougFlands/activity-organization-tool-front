import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtTextarea, AtRadio } from 'taro-ui'
import { useStore } from '@/store'
import { $api } from '@/api'
import { useToast, useRouter, useModal } from 'taro-hooks'

const Authorize = () => {
  const { GlobalStore } = useStore()
  const [routerInfo, { navigateBack, redirectTo }] = useRouter()
  const [showToast] = useToast({
    mask: true,
    duration: 1500,
    icon: 'none',
  })

  const [form, serForm] = useState({
    username: '',
    wpdsname: '',
  })

  const handleAuthorize = async () => {
    if (!form.username) {
      showToast({
        title: '请输入用户名',
      })
      return
    }
    if (form.wpdsname !== '豪门') {
      showToast({
        title: '请输入wpds最爱的剧本系列(两个字)',
      })
      return
    }
    const loginRes = await Taro.login()
    if (loginRes.code) {
      //发起网络请求
      const wxLogin = await $api.AuthApi.login({
        code: loginRes.code,
        nickName: form.username,
      })
      await navigateBack()
      showToast({
        title: '授权成功',
      })
      GlobalStore.setUserInfo(wxLogin.user)
      redirectTo('/pages/index/index')
    }
  }

  return (
    <View>
      <AtForm>
        <AtInput
          name="userName"
          title="群内的名字"
          type="text"
          placeholder="请输入在wpds鱼塘群的名称"
          value={form.username}
          onChange={v => {
            serForm({ ...form, username: v + '' })
          }}
        />
        <AtInput
          name="wpdsname"
          title="系列名称"
          type="text"
          placeholder="wpds最爱的剧本系列(两个字)"
          value={form.wpdsname}
          onChange={v => {
            serForm({ ...form, wpdsname: v + '' })
          }}
        />
      </AtForm>
      <View>如果你不知道wpds最爱的剧本系列，请直接问他，或在群里提问。</View>
      <View>提示: 两个字</View>
      <AtButton type="primary" onClick={handleAuthorize}>
        {GlobalStore.userInfo.nickName ? '点我刷新' : '点我授权'}
      </AtButton>
    </View>
  )
}

export default Authorize
