
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShowModal:false,
    blogList:[],
  },
  postBlog(){
    wx.getUserInfo({
      success:res=>{
        wx.navigateTo({
          url: `../postBlog/postBlog?nickName=${res.userInfo.nickName}&avatarUrl=${res.userInfo.avatarUrl}`,
        })
      },
      fail:()=>{
        this.setData({
          isShowModal:true
        })
      }
    })
  },
  getUserInfo_success(res){
    this.setData({
      isShowModal:false
    })
    wx.navigateTo({
      url: `../postBlog/postBlog?nickName=${res.detail.nickName}&avatarUrl=${res.detail.avatarUrl}`,
    })
  },
  getUserInfo_fail(failInfo){
    wx.showModal({
      title:'只有授权的用户才能发布信息'
    })
  },
  getBlogList(start=0, searchValue=''){
    wx.showLoading({
      title: '数据加载中....',
    })
    wx.cloud.callFunction({
      name:"getBlogList",
      data:{
        start,
        limit: 10,
        searchValue,
        $url:"getBlogList"
      }
    }).then(res=>{
      wx.stopPullDownRefresh()
      console.log('res===>', res)
      let blogList = res.result.data
      if(start > 0){
        this.data.blogList.push(...blogList)
        this.setData({
          blogList:this.data.blogList
        })
      }else{
        this.setData({
          blogList
        })
      }
      wx.hideLoading()
    })
  },

  // 点击搜索事件
  searchValue(inputValue){
    this.getBlogList(0,inputValue.detail)
  },

  // 跳转到博客详情页面
  toBlogDetai(event){
    let blogId = event.currentTarget.dataset.blogid
    console.log(blogId)
    wx.navigateTo({
      url: `../../pages/blogDetail/blogDetail?blogId=${blogId}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBlogList()
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
    this.setData({
      blogList:[]
    })
    this.getBlogList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触底事件')
    this.getBlogList(this.data.blogList.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})