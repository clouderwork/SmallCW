//index.js
//获取应用实例
var ywk = require('../../utils/ywk')
Page({
  data: {
    windowHeight: 0
  },
  lower: function (e) {
    console.log('loadData')
  },
  onLoad: function () {
    var that = this
    wx.getSystemInfo({
      success: ( res ) => {
        this.setData({
          windowHeight: res.windowHeight
        })
      }
    })
    ywk.ajaxJson('/api/jobs/search', {pagenum: 1}, 'POST').then((res) => {
      console.log("111", res)
    }, (err) => {
      console.log("222", err)
    })
  },
  bindViewTap () {
    wx.navigateTo({
      url: '../project-detail/index?id=ca7e238e1920a854'
    })
  }
})
