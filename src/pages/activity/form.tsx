import React, { useState } from 'react'
import { View, Picker, Text } from '@tarojs/components'
import {
  AtForm,
  AtInput,
  AtButton,
  AtModal,
  AtModalContent,
  AtModalAction
} from 'taro-ui'
import { useToast, useRouter, useModal } from 'taro-hooks'
import { $api } from '@/api'
import ChooseGame from '../game/choose-game'
import './index.scss'

const Form = () => {
  const [routerInfo, { navigateBack }] = useRouter()

  const [formData, setFormData] = useState({
    gameId: '',
    gameName: '',
    location: '',
    price: '',
    date: '',
    time: '',
    dateTime: ''
  })
  const [showModal, setShowModal] = useState(false)
  const [show, hide] = useToast({
    mask: true,
    duration: 2000,
    icon: 'none'
  })

  const handleChoose = e => {
    console.log(e)
    setFormData({
      ...formData,
      gameId: e.id,
      gameName: e.name
    })
    setShowModal(false)
  }

  const handleSubmit = async () => {
    console.log(formData)
    if (!formData.gameId) {
      show({
        title: '请选择游戏'
      })
      return
    }
    if (!formData.location) {
      show({
        title: '请输入地点'
      })
      return
    }
    if (!formData.price) {
      show({
        title: '请输入费用'
      })
      return
    }
    if (!formData.date) {
      show({
        title: '请选择日期'
      })
      return
    }
    if (!formData.time) {
      show({
        title: '请选择时间'
      })
      return
    }
    formData.dateTime = `${formData.date} ${formData.time}:00`
    let res
    if (routerInfo.params.id) {
      res = await $api.ActivityApi.update(formData)
    } else {
      res = await $api.ActivityApi.create(formData)
    }
    console.log(res)
    show({
      title: '创建成功',
      duration: 2000
    })
    await navigateBack()
    show({
      title: '创建成功',
      duration: 2000
    })
  }

  const handleClickChooseGame = () => {
    setShowModal(true)
  }

  return (
    <View className="activity-form-wrapper">
      <AtForm>
        <View className="form-item">
          <View className="form-left">游戏:</View>
          <View className="form-right game">
            <Text>
              {formData.gameId ? (
                <Text>{formData.gameName}</Text>
              ) : (
                <Text className="text">请选择游戏</Text>
              )}
            </Text>
            <AtButton onClick={handleClickChooseGame} className="btn">
              选择游戏
            </AtButton>
          </View>
        </View>

        <View className="form-item">
          <View className="form-left">游戏地点:</View>
          <AtInput
            className="form-right"
            name="location"
            type="text"
            placeholder="请输入..."
            value={formData.location}
            onChange={value =>
              setFormData({
                ...formData,
                location: `${value}`
              })
            }
          />
        </View>

        <View className="form-item">
          <View className="form-left">费用:</View>
          <AtInput
            className="form-right"
            name="price"
            type="number"
            placeholder="请输入..."
            value={formData.price + ''}
            onChange={value =>
              setFormData({
                ...formData,
                price: `${+value ? value : formData.price}`
              })
            }
          />
        </View>

        <View className="form-item">
          <View className="form-left">日期:</View>
          <Picker
            mode="date"
            onChange={({ detail: { value } }) => {
              setFormData({
                ...formData,
                date: `${value}`
              })
            }}
            value={formData.date}
            className="picker"
          >
            {formData.date ? (
              <View className="text">{formData.date}</View>
            ) : (
              <View>请选择日期</View>
            )}
          </Picker>
        </View>

        <View className="form-item">
          <View className="form-left">时间:</View>
          <Picker
            mode="time"
            onChange={({ detail: { value } }) => {
              setFormData({
                ...formData,
                time: `${value}`
              })
            }}
            value={formData.time}
            className="picker"
          >
            {formData.time ? (
              <View className="text">{formData.time}</View>
            ) : (
              <View>请选择时间</View>
            )}
          </Picker>
        </View>

        <AtButton type="primary" onClick={handleSubmit}>
          提交
        </AtButton>
      </AtForm>

      <AtModal isOpened={showModal}>
        <AtModalContent>
          <ChooseGame handleChoose={handleChoose} />
        </AtModalContent>
        <AtModalAction>
          <AtButton onClick={() => setShowModal(false)}>取消</AtButton>
        </AtModalAction>
      </AtModal>
    </View>
  )
}

export default Form
