//index.js
var ywk = require('../../utils/ywk')

Page({
  data: {
    users: [],
    windowHeight: 100
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.showLoading()

    ywk.ajaxJson('/api/freelancers/search', {}, 'GET').then((res) => {
      if (res && res.data) {
        this.users = res.data.users
      }
      console.log(this.users)
      wx.hideLoading()
    }, (err) => {
      console.log(err)
      wx.hideLoading()
    })
  },
  onShow () {
    // 获取页面高度
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight
        })
      }
    });
  }
})
