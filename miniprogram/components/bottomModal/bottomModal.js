// components/bottomModal/bottomModal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowModal:Boolean,
    bottomPosition:{
      type: String,
      value:"0px"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  options: {
    styleIsolation: 'apply-shared',
    multipleSlots: true
  },
  /**
   * 组件的方法列表
   */
  methods: {
    closePanel(){
      this.setData({
        isShowModal:false
      })
    }
  }
})
