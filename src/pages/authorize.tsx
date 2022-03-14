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
    icon: 'none'
  })

  const handleAuthorize = async () => {
    const user = await Taro.getUserProfile({
      desc: '登陆'
    })
    const { avatarUrl, nickName } = user.userInfo
    const loginRes = await Taro.login()

    if (loginRes.code) {
      //发起网络请求
      const wxLogin = await $api.AuthApi.login({
        code: loginRes.code,
        avatarUrl,
        nickName
      })
      console.log(wxLogin)
      await navigateBack()
      showToast({
        title: '授权成功'
      })
      GlobalStore.setUserInfo(wxLogin.user)
      redirectTo('/pages/index/index')
    }
  }

  return (
    <View style={{ marginTop: '40%' }}>
      <AtButton type="primary" onClick={handleAuthorize}>
        点我授权
      </AtButton>
    </View>
  )
}

export default Authorize
