var ywk = require('../../utils/ywk')
var app = getApp()
Page({
  data: {
    phone: '',
    vcode: '',
    password: '',
    hide: true,
    alertData: {msg: ''},
    showPhone: false,
    showVcode: false,
    showPass: false,
    disabled: true,
    codeDis: true,
    secode: 60,
    noSend: true,
    first: true
  },
  upTimes () {
    let timer = setInterval(() => {
      if (this.data.secode > 0) {
        this.setData({
          secode: this.data.secode - 1
        })
      } else {
        this.setData({
          secode: 60,
          noSend: true
        })
        clearInterval(timer)
      }
    }, 1000)
  },
  getCode () {
    if (!this.data.codeDis) {
      ywk.ajaxJson('/api/verifycode', {vtype: 'register', phone: this.data.phone}, 'POST').then((res) => {
        if (res.error_code === 0) {
          wx.showToast({
            title: '发送成功',
            icon: 'success',
            duration: 200
          })
          this.setData({
            noSend: false,
            secode: 59,
            first: false
          })
          this.upTimes()
        } else {
          let msg = res.error_code === 20633 ? '手机号已注册' : wx.getStorageSync('CODE')[res.error_code]
          this.setData({
            noSend: true,
            alertData: {msg: msg}
          })
          setTimeout(() => {
            this.setData({
              alertData: {msg: ''}
            })
          }, 2000)
        }
      }, (err) => {
      })
    }
  },
  register (e) {
    this.setData({
      disabled: true
    })
    wx.showToast({
      icon: 'loading',
      duration: 10000
    })
    ywk.ajaxJson('/api/user/signup', {rtype: '2', name: 'ywk', phone: this.data.phone, password: this.data.password, vcode: this.data.vcode}, 'POST').then((res) => {
      if (res.error_code === 0) {
        wx.hideToast()
        wx.setStorageSync('session_token', res.session_token)
        wx.setStorageSync('role', 'f')
        this.setData({
          disabled: false
        })
        wx.switchTab({
          url: '/pages/project/index'
        })
      } else {
        this.setData({
          disabled: false
        })
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
  },
  change () {
    let newValue = !this.data.hide
    this.setData({
      hide: newValue
    })
  },
  focusPhone (e) {
    this.setData({
      showPhone: !!e.detail.value,
      showVcode: false,
      showPass: false
    })
  },
  focusCode (e) {
    this.setData({
      showVcode: !!e.detail.value,
      showPhone: false,
      showPass: false
    })
  },
  focusPwd (e) {
    this.setData({
      showPass: !!e.detail.value,
      showPhone: false,
      showVcode: false
    })
  },
  inputPhone (e) {
    this.setData({
      phone: e.detail.value,
      showPhone: !!e.detail.value,
      codeDis: !/^1[34578]\d{9}$/.test(e.detail.value)
    })
    this.checkDis()
  },
  inputCode (e) {
    this.setData({
      vcode: e.detail.value,
      showVcode: !!e.detail.value
    })
    this.checkDis()
  },
  inputPwd (e) {
    this.setData({
      password: e.detail.value,
      showPass: !!e.detail.value
    })
    this.checkDis()
  },
  checkDis () {
    if (/^1[34578]\d{9}$/.test(this.data.phone) && this.data.vcode && this.data.password) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },
  delPhone () {
    this.setData({
      phone: '',
      showPhone: false,
      codeDis: true
    })
    this.checkDis()
  },
  delVcode () {
    this.setData({
      vcode: '',
      showVcode: false
    })
    this.checkDis()
  },
  delValue () {
    this.setData({
      password: '',
      showPass: false
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
  },
  signin () {
    wx.navigateTo({
      url: '../signin/index'
    })
  }
})
