// components/findSearch/findSearch.js
let searchValue = ''
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeHolder:{
      type:String,
      value:"请输入值"
    }
  },
  externalClasses:["iconfont","icon-search"],

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getInputValu(value){
      searchValue = value.detail.value
    },
    searchValue(){
      this.triggerEvent('searchValue', searchValue)
    }
  }
})
