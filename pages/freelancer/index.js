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
      if (res.error_code === 0) {
        this.setData({
          users: res.users
        });
      }
      wx.hideLoading()
    }, (err) => {
      wx.hideLoading()
    })
  },
  onShow () {
    // 获取页面高度
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight
        });
      }
    });
  },
  lower (e) {
    console.log('lower')
  }
})
