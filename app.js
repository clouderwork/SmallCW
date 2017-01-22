//app.js
var ywk = require('./utils/ywk')

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    if (!wx.getStorageSync('_xsrf')) {
      // 获取_xsrf
      ywk.ajaxJson('/api/user/signed', {}).then((res) => {
        if (res && res._xsrf) {
          wx.setStorageSync('_xsrf', res._xsrf || '')
        }
      })
    }

    if (!wx.getStorageSync('CODE')) {
      ywk.ajaxJson('/static/locale/locale-zh-cn.json', {}).then((res) => {
        wx.setStorageSync('CODE', res.CODE || {})
      })
    }

    //  获取系统信息
    this.getSystemInfo();
  },
  getSystemInfo: function() {
    wx.getNetworkType({
      success: function(res) {
        wx.setStorageSync('networkType', res.networkType);
      }
    })

    let systemInfo = wx.getSystemInfoSync();
    if (systemInfo.model) {
      wx.setStorageSync('systemInfo', systemInfo)
    };
  },
  // 检查并跳转页面
  ckAndNav (url, currentUrl) {
    if (wx.getStorageSync('role')) {
      wx.navigateTo({
        url: url
      })
    } else {
      let site = currentUrl ? encodeURIComponent(currentUrl) : encodeURIComponent(url)
      wx.navigateTo({
        url: `../signin/index?redirect=${site}`
      })
    }
  }
})
