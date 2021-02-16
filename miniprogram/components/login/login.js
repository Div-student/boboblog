// components/login/login.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowModal:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  

  /**
   * 组件的方法列表
   */
  methods: {
    on_getUserInfo(event){
      console.log(event)
      if(event.detail.userInfo){
        this.triggerEvent("getUserInfo_success", event.detail.userInfo)
      }else{
        this.triggerEvent("getUserInfo_fail", 'getUserInfo failed')
      }
    },
  }
})
