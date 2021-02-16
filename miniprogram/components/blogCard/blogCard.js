// components/blogCard/blogCard.js
import formateDate from '../../utils/formateDate'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blogList:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    createTime: ''
  },
  observers: {
    ['blogList.createTime'](val){
      let createTime = formateDate(new Date(val))
      this.setData({
        createTime
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    previewIng(event){
      let currentUrl = event.currentTarget.dataset.imgurl
      wx.previewImage({
        urls: this.data.blogList.img,
        current:currentUrl
      })
    }
  }
})
