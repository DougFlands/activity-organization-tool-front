import { View, } from '@tarojs/components'
import { AtCard } from 'taro-ui'
import { useRouter } from 'taro-hooks'
import style from './index.scss'
import Participate from './participate'

const GameContent = props => {
  const [routerInfo, { navigateTo }] = useRouter()

  // 跳转详情
  const handleJumpDetail = () => {
    if (checkIsDel()) return
    navigateTo(`/pages/activity/detail?id=${props.data.id}`)
  }

<<<<<<< HEAD
=======
  const handleClick = () => {
    props.handleClick && props.handleClick()
  }

  // 检查活动时间是否过期
  const checkDataTime = () => {
    const d = new Date(props.data.dateTime).getTime()
    const n = new Date().getTime()
    return n > d
  }

  // 检查是否已删除
  const checkIsDel = () => {
    const time = new Date(props.data.deleteTime).getTime()
    return time > 0
  }

>>>>>>> origin/master
  return (
    <AtCard
      title={`${props.data.busGame.type === 1 ? '剧本' : '桌游'}: ${props.data.busGame.name
        }`}
      className={style.activityGameContent}
    >
      <View onClick={handleJumpDetail}>
<<<<<<< HEAD
        { props.data.isInvolved ? (
=======
        {checkIsDel() ? (
          <View className={style.isDel}>活动已被删除</View>
        ) : !props.data.edit && props.data.isInvolved ? (
>>>>>>> origin/master
          <View className={style.isInvolved}>已参加</View>
        ) : null}

        <View>发起人: {props.data.user.nickName}</View>
        <View>地点: {props.data.location}</View>
        <View>费用: ￥{props.data.price}</View>
        <View>开始时间: {props.data.dateTime}</View>
        <View>
          人数: {props.data.participants}/{props.data.busGame.peopleNum}
        </View>
      </View>
<<<<<<< HEAD
      <Participate data={props.data}/>
=======

      {props.data.edit ? (
        checkDataTime() ? null : (
          <AtButton
            type="primary"
            size="small"
            className={`${style.btn} ${style.btnDel}`}
            onClick={handleDelActivity}
          >
            删除
          </AtButton>
        )
      ) : props.data.showInvolved ? (
        +props.data.participants < props.data.busGame.peopleNum &&
        !props.data.isInvolved ? (
          <AtButton
            type="primary"
            size="small"
            className={`${style.btn} ${style.btnInvolved}`}
            onClick={handleInvolvedActivity}
          >
            参加
          </AtButton>
        ) : null
      ) : checkDataTime() || checkIsDel() ? null : (
        <AtButton
          type="primary"
          size="small"
          className={`${style.btn} ${style.btnExit}`}
          onClick={handleExisActivity}
        >
          退出
        </AtButton>
      )}
>>>>>>> origin/master
    </AtCard>
  )
}

export default GameContent
