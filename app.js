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

<<<<<<< HEAD
    // 微信授权
    // if (wx.getStorageSync('session_key')) {
      wx.login({
        success: function(res) {
          if (res.code) {
            //获取微信code
            ywk.ajaxJson('/api/weixin/minip/code', {code: res.code}).then((codeRes) => {
              if (codeRes && codeRes.data) {
                wx.setStorageSync('session_key', codeRes.data.session_key || '')
              }
              // 获取用户数据保存入库
              wx.getUserInfo({
                success: function(user) {
                  var userInfo = {};
                  let obj = user.userInfo;
                  userInfo.openid = codeRes.data.openid;
                  userInfo.nickname = obj.nickName;
                  userInfo.gender = obj.gender;
                  userInfo.province = obj.province;
                  userInfo.city = obj.city;
                  userInfo.country = obj.country;
                  userInfo.avatar = obj.avatarUrl;
                  ywk.ajaxJson('/api/weixin/minip/bind', userInfo, 'POST').then((resp) => {})
                }
              })
            })

          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    // }
=======
    if (!wx.getStorageSync('CODE')) {
      ywk.ajaxJson('/static/locale/locale-zh-cn.json', {}).then((res) => {
        wx.setStorageSync('CODE', res.CODE || {})
      })
    }
>>>>>>> yzj/master

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
<<<<<<< HEAD
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
=======
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
>>>>>>> yzj/master
  }
})
