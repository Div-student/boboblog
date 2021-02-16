const MAX_IMGS = 9
const db = wx.cloud.database({
  env:'xiaobo-dev'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    wordsCount:0,
    keyHeight: 0,
    imgList:[],
    showAdd:true, //是否显示添加图片按钮
    imgCount:9,
    postContent:''
  },
  getText(res){
    let postContent = res.detail.value
    this.setData({
      wordsCount:postContent.length,
      postContent
    })
  },
  focusText(res){
    let keyHeight = res.detail.height
    this.setData({
      keyHeight
    })
  },
  blurText(){
    this.setData({
      keyHeight:0
    })
  },
  chooseImg(){
    if(this.data.imgCount > 0){
      wx.chooseImage({
        count: this.data.imgCount,
        success:res => {
          const imgUrls = res.tempFilePaths
          this.data.imgList.push(...imgUrls)
          this.setData({
            imgList:this.data.imgList,
            imgCount:MAX_IMGS - this.data.imgList.length
          })
          // 判断当前已选择图片个数是否显示添加图片按钮
          if(this.data.imgCount === 0){
            this.setData({
              showAdd:false
            })
          }
        }
      })
    }
  },
  deletImg(e){
    let tempIndex = e.currentTarget.dataset.index
    this.data.imgList.splice(tempIndex, 1)
    this.setData({
      imgList:this.data.imgList
    })
    if(this.data.imgList.length < 9){
      this.setData({
        showAdd:true
      })
    }
  },
  viewImg(e){
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.imgurl
    })
  },
  postBlog(){
    if(this.data.postContent.trim().length > 0){
      wx.showLoading({
        title: '发布中',
        mask:true
      })
      let promiseArray = []
      this.data.imgList.forEach(i=>{
        let tempFileName = new Date().getTime()+'-' + Math.floor(Math.random()*10000000000000) + /\.\w+$/.exec(i)
        let promiseItem = new Promise((resolve,reject)=>{
          wx.cloud.uploadFile({
            filePath: i,
            cloudPath:`boboMall/${tempFileName}`,
            success: item => {
              resolve(item.fileID)
            },
            fail: error => {
              reject(error)
            }
          })
        })
        promiseArray.push(promiseItem)
      })
      Promise.all(promiseArray).then(res => {
        db.collection("post").add({
          data:{
            ...this.data.userInfo,
            img:res,
            content: this.data.postContent,
            createTime: db.serverDate()
          }
        }).then(res => {
          wx.hideLoading()
          wx.showToast({
            title: '发布成功'
          })
          wx.navigateBack()
          // 刷新页面
          let currentPage = getCurrentPages()
          currentPage[currentPage.length - 2].onPullDownRefresh()
        })
      }).catch(err=>{
        wx.hideLoading()
        wx.showToast({
          title: '发布失败',
        })
        console.error(err)
      })
    }else{
      wx.showModal({
        cancelColor: 'cancelColor',
        title:"请输入内容"
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:options
    })
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