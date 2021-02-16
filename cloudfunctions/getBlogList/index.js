// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"xiaobo-dev"
})
const tcbRouter = require('tcb-router')
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new tcbRouter({event})

  app.router('getBlogList', async ctx=>{
    let inputValue = event.searchValue
    let o = {}
    if(inputValue.trim()){
      o={
        content:db.RegExp({
          regexp:inputValue,
          options:'i'
        })
      }
    }
    const resList = await db.collection('post').where(o).skip(event.start).limit(event.limit)
    .orderBy('createTime', 'desc').get()
    ctx.body = resList
  })

  app.router('postComment', async ctx => {
    const res = await db.collection('comment').add({
      data:{
        blogId:event.blogId,
        postTime: db.serverDate(),
        content:event.content,
        nickName: event.nickName,
        avatarUrl: event.avatarUrl
      }
    })
    ctx.body = res
  })

  app.router('getBlogById', async ctx => {
    const blogInfo = await db.collection('post').where({
      _id: event.blogId
    }).get()

    // 查询博客对应的评论
    let commentRes = {
      data:[]
    }

    // 获取评论的总数
    const countRes = await db.collection('comment').where({
      blogId:event.blogId
    }).count()
    let maxCount = countRes.total

    // 根据博客评论总数计算出需要查询的次数
    let searchCount = Math.ceil(maxCount/100)
    let promiseList = []

    // 循环遍历查询数据库，用promise.all获取查询的结果
    if(searchCount > 0){
      for(let i=0; i<searchCount; i++ ){
        let request = db.collection("comment").where({
          blogId:event.blogId
        }).skip(i*100).limit(100).orderBy('postTime','desc').get()
        promiseList.push(request)
      }
      commentRes = (await Promise.all(promiseList)).reduce((add, cur)=>{
        return {
          data: add.data.concat(cur.data)
        }
      })
    }
    ctx.body = {
      blogInfo,
      commentRes
    }
  })

  return app.serve()
}