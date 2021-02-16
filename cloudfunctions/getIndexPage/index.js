// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"xiaobo-dev"
})

const TcbRouter = require('tcb-router')
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({event})

  app.router('getSwiperList', async (ctx)=>{
    const swiperList = await db.collection('swiperList').get()
    ctx.body = swiperList
  })

  app.router('getFloorList', async (ctx)=>{
    const swiperList = await db.collection('floorList').get()
    ctx.body = swiperList
  })

  app.router('getNavIcons', async (ctx)=>{
    const swiperList = await db.collection('navIcons').get()
    ctx.body = swiperList
  })

  return app.serve()
}