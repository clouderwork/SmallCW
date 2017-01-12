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

    // 微信授权
    if (!wx.getStorageSync('session_key')) {
      wx.login({
        success: function(res) {
          if (res.code) {
            //获取微信code
            ywk.ajaxJson('/api/weixin/minip/code', {code: res.code}).then((res) => {
              if (res && res.data) {
                wx.setStorageSync('session_key', res.data.session_key || '')
              }
            })
            // 获取用户数据保存入库
            wx.getUserInfo({
              success: function(user) {
                console.log(user)
                var userInfo = user.userInfo
                userInfo.openid = user.openid
                ywk.ajaxJson('/api/weixin/minip/bind', userInfo, 'POST').then((resp) => {})
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
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
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo: null
  }
})
