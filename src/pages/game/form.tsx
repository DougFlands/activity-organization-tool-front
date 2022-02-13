import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import {
  AtForm,
  AtInput,
  AtButton,
  AtTextarea,
  AtRadio,
  AtInputNumber
} from 'taro-ui'
import Taro from '@tarojs/taro'
import { useToast, useRouter, useModal } from 'taro-hooks'
import { $api } from '@/api'
import './index.scss'

const Menu = () => {
  const [formData, setFormData] = useState({
    name: '',
    introduction: '',
    type: 1,
    peopleNum: 1,
    id: 0
  })
  const [showToast] = useToast({
    mask: true,
    duration: 1500,
    icon: 'none'
  })

  const [showModal] = useModal({
    title: '确认操作',
    content: '确定要删除吗?'
  })

  const [routerInfo, { navigateBack }] = useRouter()

  const handleSubmit = async () => {
    if (!formData.name) {
      showToast({
        title: '请输入名称'
      })
      return
    }
    if (!formData.peopleNum) {
      showToast({
        title: '请输入人数'
      })
      return
    }
    let res
    try {
      if (routerInfo.params.id) {
        res = await $api.GameApi.update(formData)
      } else {
        res = await $api.GameApi.create(formData)
      }
    } catch (error) {
      console.log(error)
      return
    }
    await navigateBack()
    showToast({
      title: '创建成功'
    })
  }

  const handleDel = async () => {
    const result = await showModal({
      confirmText: '删除'
    })
    if (result.confirm) {
      await $api.GameApi.del(formData)
      navigateBack()
    }
  }

  const getGameInof = async id => {
    const res = await $api.GameApi.find({ id })
    setFormData(res.gameInfo)
  }

  useEffect(() => {
    if (routerInfo.params.id) {
      getGameInof(routerInfo.params.id)
    }
  }, [])

  return (
    <View className="game-form-wrapper">
      <AtForm>
        <View className="form-item">
          <View className="form-left">游戏类型:</View>
          <AtRadio
            className="form-right"
            options={[
              { label: '剧本', value: 1 },
              { label: '桌游', value: 2 }
            ]}
            value={formData.type}
            onClick={value => {
              setFormData({
                ...formData,
                type: value
              })
            }}
          />
        </View>

        <View className="form-item">
          <View className="form-left">游戏名称:</View>
          <AtInput
            className="form-right"
            name="name"
            type="text"
            placeholder="请输入..."
            value={formData.name}
            onChange={value =>
              setFormData({
                ...formData,
                name: `${value}`
              })
            }
          />
        </View>

        <View className="form-item">
          <View className="form-left">简介:</View>
          <AtTextarea
            className="form-right"
            placeholder="请输入..."
            value={formData.introduction}
            maxLength={200}
            onChange={value =>
              setFormData({
                ...formData,
                introduction: `${value}`
              })
            }
          />
        </View>

        <View className="form-item">
          <View className="form-left">人数:</View>
          <AtInput
            className="form-right"
            name="peopleNum"
            maxlength={2}
            type="number"
            placeholder="请输入..."
            value={formData.peopleNum + ''}
            onChange={value =>
              setFormData({
                ...formData,
                peopleNum: +value ? +value : formData.peopleNum
              })
            }
          />
        </View>

        <AtButton type="primary" onClick={handleSubmit}>
          提交
        </AtButton>

        {routerInfo.params.id ? (
          <AtButton type="secondary" onClick={handleDel}>
            删除
          </AtButton>
        ) : null}
      </AtForm>
    </View>
  )
}

export default Menu
