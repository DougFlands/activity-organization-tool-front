import { View, } from '@tarojs/components'
import { AtCard } from 'taro-ui'
import { useRouter } from 'taro-hooks'
import style from './index.scss'
import Participate from './participate'

const GameContent = props => {
  const [routerInfo, { navigateTo }] = useRouter()

  // 跳转详情
  const handleJumpDetail = () => {
    navigateTo(`/pages/activity/detail?id=${props.data.id}`)
  }

  return (
    <AtCard
      title={`${props.data.busGame.type === 1 ? '剧本' : '桌游'}: ${props.data.busGame.name
        }`}
      className={style.activityGameContent}
    >
      <View onClick={handleJumpDetail}>
        { props.data.isInvolved ? (
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
      <Participate data={props.data}/>
    </AtCard>
  )
}

export default GameContent
