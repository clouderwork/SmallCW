var ywk = require('../../utils/ywk')
Page({
  data: {
    username: '',
    password: '',
    hide: true,
    redirect: ''
  },
  signin (e) {
    if (this.data.username && this.data.password) {
      wx.showToast({
        title: '登录中',
        icon: 'loading',
        duration: 10000
      })
      ywk.ajaxJson('/api/user/signin', this.data, 'POST').then((res) => {
        if (res.error_code === 0) {
          wx.setStorageSync('session_token', res.session_token || '')
          this.getRole()
        } else {
          console.log(res)
        }
      }, (err) => {
        wx.hideToast()
      })
    }
  },
  getRole () {
    ywk.ajaxJson('/api/v1.1/user/role', {}, 'GET').then((res) => {
      if (res.error_code === 0) {
        let role = 'f'
        if (res.current_id === res.roles.client.id) {
          role = 'c'
        } else if(res.current_id === res.roles.freelancer.id) {
          role = 'f'
        }
        wx.setStorageSync('role', role)
        wx.setStorageSync('roles', res.roles)
        let url = this.data.redirect ? this.data.redirect : 'pages/profile/index'
        wx.navigateTo({
          url: url
        })
      }
    }, (err) => {
      wx.hideToast()
      console.log(err)
    })
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
  },
  change () {
    let newValue = !this.data.hide
    this.setData({
      hide: newValue
    })
  },
  onLoad (opt) {
    if (opt && opt.redirect) {
      this.setData({
        redirect: decodeURIComponent(opt.redirect)
      })
    }
  }
})
