type TBusGame = {
  type: number
  name: string
  introduction: string
  peopleNum: number
}

type TUser = {
  id?: number
  createdTime?: string
  updatedTime?: string
  deleteTime?: string
  openID?: string
  nickName: string
  isAdmin?: number
}

interface IActivity {
  busGame: TBusGame
  gameId: number
  user: TUser
  userId: number
  location: string
  price: string
  participants: number
  dateTime: string
  endTime: string
  userList: TUser[]
  showInvolved: boolean
  isInvolved: boolean
}

type TGame = {
  createdTime: string
  deleteTime: string
  id: number
  introduction: string
  name: string
  peopleNum: number
  type: number
  updatedTime: string
}

type TPlayer = {
  id: number
  createdTime: string
  updatedTime: string
  deleteTime: string
  openID: string
  nickName: string
  isAdmin: number
}

type TDm = {
  id: number
  createdTime: string
  updatedTime: string
  deleteTime: string
  openID: string
  nickName: string
  isAdmin: number
}

interface IBanUserItem {
  id: number
  createdTime: string
  updatedTime: string
  deleteTime: string
  playerId: number
  player: TPlayer
  dmId: number
  dm: TDm
  status: number
  content: string
}
