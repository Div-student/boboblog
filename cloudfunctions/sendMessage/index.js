// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // 查询当前评论的blog所属的用户openId
  let result = await db.collection("post").where({
    _id: event.blogId
  }).get()
  let openId = result.data[0]._openid
  let res = await cloud.openapi.subscribeMessage.send({
    touser: openId,
    page: `pages/blogDetail/blogDetail?blogId=${event.blogId}`,
    data: {
      thing4:{
        value: "评论成功",
      },
      thing1:{
        value: event.content
      }
    },
    templateId: 'vz9DjeiABQ63xTXis-jQ-ltnFdM6rrc4xeLVtOVc7w8',
    miniprogramState:"developer"
  })
  return res
}