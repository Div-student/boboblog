// components/comment/comment.js
let userInfor = {}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blogInfo:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowLogin:false,
    isShowComment:false,
    bottomPosition: "0px"
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的方法列表
   */
  methods: {
    addComment(){
      wx.getSetting({
        success: res => {
          if(res.authSetting["scope.userInfo"]){
            this.setData({
              isShowComment:true
            })
            if(!userInfor.nickName){ // 如果没有获取存储用户信息，则存储一下用户信息
              wx.getUserInfo({
                success: res => {
                  userInfor = res.userInfo
                }
              })
            }
          }else{
            this.setData({
              isShowLogin:true
            })
          }
        }
      })
    },
    getUserInfo_success(event){
      this.setData({
        isShowLogin:false
      },res => {
        this.setData({
          isShowComment:true
        })
      })
      userInfor = event.detail
    },
    getUserInfo_fail(){

    },
    onFocus(value){
    },
    onBlur(){
      this.setData({
        bottomPosition: '0px'
      })
    },
    postComment(event){
      let content = event.detail.value.content
      let formId = event.detail.formId
      if(content.trim()!=""){
        wx.showLoading({
          title: '发布中...',
        })
        const {_id} = this.properties.blogInfo
        const {nickName, avatarUrl} = userInfor
        wx.cloud.callFunction({
          name:"getBlogList",
          data:{
            $url:'postComment',
            nickName,
            content,
            avatarUrl,
            blogId: _id
          }
        }).then(res=>{
          wx.hideLoading({
            success: (res) => {
              // 模版消息推送
              wx.cloud.callFunction({
                name: "sendMessage",
                data:{
                  content,
                  blogId: _id
                }
              }).then(res => {
                console.log('模版消息推送成功的返回===》', res)
              })
              wx.showToast({
                title: '发布成功',
              })
              content = '',
              this.setData({
                isShowComment:false
              })
              //跳转到评论详情页面
              wx.navigateTo({
                url: `../../pages/blogDetail/blogDetail?blogId=${_id}`,
              })
              this.triggerEvent("successPost")
            },
          })
        })
      }else{
        wx.showModal({
          cancelColor: 'cancelColor',
          title:'评论内容不能为空'
        })
      }
    }
  }
})
