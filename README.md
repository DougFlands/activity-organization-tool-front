# 后端
## 游戏列表
ID int
createTime
updateTime
createUserId

type string 1 剧本 2 桌游
name string 
introduction longstring
peopleNum int


## 活动
ID int
createTime
updateTime
createUserId

gameId string 
location string 
price string
date string
time string


## 用户
userId
token

# 参加活动
userid
actid
status  参加状态 0退出 1参加

# TODO