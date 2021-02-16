// pages/blogDetail/blogDetail.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    blogInfo:{},
    commentList:[]
  },
  getBlogDetail(id){
    wx.cloud.callFunction({
      name: "getBlogList",
      data:{
        $url:'getBlogById',
        blogId:id
      }
    }).then(res => {
      console.log(res)
      const tempInfo = res.result.blogInfo.data
      let commentList = res.result.commentRes.data
      if(tempInfo.length > 0){
        this.setData({
          commentList,
          blogInfo:tempInfo[0]
        })
      }
    })
  },
  successPost(){
    console.log('评论成功')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBlogDetail(options.blogId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})