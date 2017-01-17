//index.js
//获取应用实例
var ywk = require('../../utils/ywk')
Page({
  data: {
    role: '',
    invites: [],
    proposals: []
  },
  filterTime (time) {
    let date = new Date(time.replace(/-/g, '/'))
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month > 9 ? month : '0' + month
    let day = date.getDate()
    day = day > 9 ? day : '0' + day
    return year + '-' + month + '-' + day
  },
  getData () {
    ywk.ajaxJson('/api/user/profile', 'GET').then((res) => {
      if (res.error_code === 0) {
        console.log(res)
        this.setData({
          profile: res.profile
        })
      } else if (res.error_code === 80001) {
        wx.hideToast()
        // 去登录页面
        wx.navigateTo({
          url: '../signin/index'
        })
      } else {
        wx.hideToast()
        console.log(res)
      }
    }, (err) => {
      wx.hideToast()
    })
  },
  getRole () {
    ywk.ajaxJson('/api/v1.1/user/role', 'GET').then((res) => {
      wx.hideToast()
      if (res.error_code === 0) {
        this.setData({
          role: res.role
        })
        this.getInfo()
      }
    }, (err) => {
      wx.hideToast()
    })
  },
  getInfo () {
    if (this.role === 'f') {
      // 服务方获取我的投标
      ywk.ajaxJson('/api/proposal', {operate: 'active'}, 'GET').then((res) => {
        console.log(rress)
      }, (err) => {
        console.log(err)
      })
    } else if (this.role === 'c') {
      // 需求方获取我的邀请
      ywk.ajaxJson('/api/proposal', {operate: 'invite'}, 'GET').then((res) => {
        console.log(rress)
      }, (err) => {
        console.log(err)
      })
    }
  },
  onShareAppMessage () {
    return {
      title: '云沃客',
      desc: '个人中心',
      path: '/pages/profile/index'
    }
  },
  onLoad () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    this.getData()
    // this.getRole()
  },
  bindViewTap (e) {
    let id = e.currentTarget.dataset.jid
    wx.navigateTo({
      url: `../project-detail/index?id=${id}`
    })
  }
})
