//index.js
var ywk = require('../../utils/ywk')

Page({
  data: {
    users: [],
    windowHeight: 100,
    search: {
      pagenum: 1,
      ftype: 'all'
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.showToast({
      title: '',
      icon: 'loading'
    })
    ywk.ajaxJson('/api/freelancers/search', this.data.search, 'GET').then((res) => {
      if (res.error_code === 0) {
        this.setData({
          users: res.users
        });
      }
      wx.hideToast()
    }, (err) => {
      wx.hideToast()
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
