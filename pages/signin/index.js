var ywk = require('../../utils/ywk')
Page({
  data: {
    username: '',
    password: ''
  },
  signin (e) {
    if (this.data.username && this.data.password) {
      wx.showToast({
        title: '登录中',
        icon: 'loading',
        duration: 10000
      })
      ywk.ajaxJson('/api/user/signin', this.data, 'POST').then((res) => {
        wx.hideToast()
        if (res.error_code === 0) {
          wx.setStorageSync('session_token', res.session_token || '')
          wx.navigateTo({
            url: '../profile/index'
          })
        } else {
          console.log(res)
        }
      }, (err) => {
        wx.hideToast()
      })
    }
  },
  getUsername (e) {
    this.setData({
      username: e.detail.value
    })
  },
  getPassword (e) {
    this.setData({
      password: e.detail.value
    })
  }
})
