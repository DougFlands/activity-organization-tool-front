import React, { useState } from 'react'
import { View, Picker, Text } from '@tarojs/components'
import {
  AtForm,
  AtInput,
  AtButton,
  AtModal,
  AtModalContent,
  AtModalAction,
} from 'taro-ui'
import { useToast, useRouter, useRequestSubscribeMessage } from 'taro-hooks'
import { $api } from '@/api'
import ChooseGame from '../game/choose-game'
import style from './index.scss'

const Form = () => {
  const [routerInfo, { navigateBack }] = useRouter()

  const [requestSubscribeMessage] = useRequestSubscribeMessage()
  const [formData, setFormData] = useState({
    gameId: '',
    gameName: '',
    location: '',
    price: '',
    date: '',
    time: '',
    dateTime: '',
  })
  const [showModal, setShowModal] = useState(false)
  const [show] = useToast({
    mask: true,
    duration: 1500,
    icon: 'none',
  })

  const handleChoose = e => {
    console.log(e)
    setFormData({
      ...formData,
      gameId: e.id,
      gameName: e.name,
    })
    setShowModal(false)
  }

  const handleSubmit = async () => {
    console.log(formData)
    if (!formData.gameId) {
      show({
        title: '请选择游戏',
      })
      return
    }
    if (!formData.location) {
      show({
        title: '请输入地点',
      })
      return
    }
    if (!formData.price) {
      show({
        title: '请输入费用',
      })
      return
    }
    if (!formData.date) {
      show({
        title: '请选择日期',
      })
      return
    }
    if (!formData.time) {
      show({
        title: '请选择时间',
      })
      return
    }
    formData.dateTime = `${formData.date} ${formData.time}:00`
    if (new Date(formData.dateTime).getTime() < new Date().getTime()) {
      show({
        title: '选择的时间小于当前时间',
      })
      return
    }
    let res
    try {
      if (routerInfo.params.id) {
        res = await $api.ActivityApi.update(formData)
      } else {
        res = await $api.ActivityApi.create(formData)
      }
    } catch (error) {
      console.log(error)
      return
    }
    await requestSubscribeMessage(process.env.templateID)
    await navigateBack()
    show({
      title: '创建成功',
    })
  }

  const handleClickChooseGame = () => {
    setShowModal(true)
  }

  const startDate = () => new Date().toJSON().slice(0, 10)

  return (
    <View className={style.activityFormWrapper}>
      <AtForm>
        <View className={style.formItem}>
          <View className={style.formLeft}>游戏:</View>
          <View className={`${style.formRight} ${style.game}`}>
            <Text>
              {formData.gameId ? (
                <Text>{formData.gameName}</Text>
              ) : (
                <Text className={style.text}>请选择游戏</Text>
              )}
            </Text>
            <AtButton
              onClick={handleClickChooseGame}
              className={style.btn}
              type="secondary"
            >
              请选择游戏
            </AtButton>
          </View>
        </View>

        <View className={style.formItem}>
          <View className={style.formLeft}>游戏地点:</View>
          <AtInput
            className={style.formRight}
            name="location"
            type="text"
            placeholder="请输入..."
            value={formData.location}
            onChange={value =>
              setFormData({
                ...formData,
                location: `${value}`,
              })
            }
          />
        </View>

        <View className={style.formItem}>
          <View className={style.formLeft}>费用:</View>
          <AtInput
            className={style.formRight}
            name="price"
            type="number"
            placeholder="请输入..."
            value={formData.price + ''}
            onChange={value =>
              setFormData({
                ...formData,
                price: `${+value ? value : formData.price}`,
              })
            }
          />
        </View>

        <View className={style.formItem}>
          <View className={style.formLeft}>日期:</View>
          <Picker
            mode="date"
            onChange={({ detail: { value } }) => {
              setFormData({
                ...formData,
                date: `${value}`,
              })
            }}
            value={formData.date}
            start={startDate()}
            className={style.picker}
          >
            {formData.date ? (
              <View className={style.text}>{formData.date}</View>
            ) : (
              <View>请选择日期</View>
            )}
          </Picker>
        </View>

        <View className={style.formItem}>
          <View className={style.formLeft}>时间:</View>
          <Picker
            mode="time"
            onChange={({ detail: { value } }) => {
              setFormData({
                ...formData,
                time: `${value}`,
              })
            }}
            value={formData.time}
            className={style.picker}
          >
            {formData.time ? (
              <View className={style.text}>{formData.time}</View>
            ) : (
              <View>请选择时间</View>
            )}
          </Picker>
        </View>

        <AtButton type="primary" onClick={handleSubmit}>
          提交
        </AtButton>
        <View className={style.tips}>
          <View>提交后会索取通知权限</View>
          <View>开启记住后不会弹窗，会自动授权</View>
          <View>当活动人满后发出通知</View>
          <View>每次增加活动会增加3次通知机会</View>
          <View>3次机会用完后人满不会通知(微信限制)</View>
          <View>可以在我的页面手动增加通知次数</View>
        </View>
      </AtForm>

      <AtModal isOpened={showModal}>
        <AtModalContent>
          <ChooseGame handleChoose={handleChoose} />
        </AtModalContent>
        <AtModalAction>
          <AtButton onClick={() => setShowModal(false)} size="small">
            取消
          </AtButton>
        </AtModalAction>
      </AtModal>
    </View>
  )
}

export default Form
