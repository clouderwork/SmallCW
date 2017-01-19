var ywk = require('../../utils/ywk')
var app = getApp()
Page({
  data: {
    username: '',
    password: '',
    hide: true,
    redirect: '',
    alertData: {msg: ''},
    disabled: false,
    showUser: false,
    showPass: true,
    disabled: true
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
          this.setData({
            alertData: {msg: wx.getStorageSync('CODE')[res.error_code]}
          })

          setTimeout(() => {
            this.setData({
              alertData: {msg: ''}
            })
          }, 2000)
          wx.hideToast()
        }
      }, (err) => {
        wx.hideToast()
      })
      app.getSystemInfo()
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
        if (this.data.redirect) {
          wx.navigateTo({
            url: this.data.redirect
          })
        } else {
          wx.switchTab({
            url: '/pages/profile/index'
          })
        }
      }
    }, (err) => {
      wx.hideToast()
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
  showDelUser (e) {
    if (e.detail.value) {
      this.setData({
        showUser: true
      })
    } else {
      this.setData({
        showUser: false
      })
    }
    this.checkDis()
  },
  showDelPass (e) {
    if (e.detail.value) {
      this.setData({
        showPass: false
      })
    } else {
      this.setData({
        showUser: true
      })
    }
    this.checkDis()
  },
  checkDis () {
    if (this.data.showUser && !this.data.showPass) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },
  delUser () {
    this.setData({
      username: '',
      showUser: false
    })
    this.checkDis()
  },
  delValue () {
    this.setData({
      password: '',
      showPass: true
    })
    this.checkDis()
  },
  onLoad (opt) {
    if (opt && opt.redirect) {
      this.setData({
        redirect: decodeURIComponent(opt.redirect)
      })
    }
  },
  goProject () {
    wx.switchTab({
      url: '../project/index'
    })
  },
  goFreelancer () {
    wx.switchTab({
      url: '../freelancer/index'
    })
  }
})
