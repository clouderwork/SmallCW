//index.js
//获取应用实例
var ywk = require('../../utils/ywk')
Page({
  data: {
    role: wx.getStorageSync('role') || '',
    invites: [],
    proposals: [],
    from: 'profile',
    profileLoad: false,
    listLoad: false
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
  getProfile () {
    ywk.ajaxJson('/api/user/profile', {}, 'GET').then((res) => {
      wx.hideToast()
      if (res.error_code === 0) {
        this.setData({
          profile: res.profile,
          profileLoad: true
        })
      } else if (res.error_code === 80001) {
        // 去登录页面
        wx.navigateTo({
          url: '../signin/index'
        })
      } else {
        console.log(res)
      }
    }, (err) => {
      wx.hideToast()
      console.log(err)
    })
  },
  getInfo () {
    if (this.data.role === 'f') {
      // 服务方获取我的投标
      ywk.ajaxJson('/api/proposal', {operate: 'active'}, 'GET').then((res) => {
        wx.hideToast()
        this.setData({
          proposals: res.proposals,
          listLoad: true
        })
      }, (err) => {
        wx.hideToast()
        console.log(err)
      })
    } else if (this.data.role === 'c') {
      // 需求方获取我的邀请
      ywk.ajaxJson('/api/proposal', {operate: 'invite'}, 'GET').then((res) => {
        wx.hideToast()
        this.setData({
          invites: res.proposals,
          listLoad: true
        })
      }, (err) => {
        wx.hideToast()
        console.log(err)
      })
    }
  },
  changeRole () {
    let roles = wx.getStorageSync('roles')
    console.log(roles)
    let id = this.data.role === 'c' ? roles.freelancer.id : roles.client.id
    ywk.ajaxJson('/api/user/role', {id: id}, 'PUT').then((res) => {
      if (res.error_code === 0) {
        this.data.profileLoad = false
        this.data.listLoad = false
        this.setData({
          role: this.data.role === 'c' ? 'f' : 'c'
        })
        console.log(this.data.role)
        wx.setStorageSync('role', this.data.role)
        this.getProfile()
        this.getInfo()
      }
    }, (err) => {
      console.log(err)
    })
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
    this.getProfile()
    this.getInfo()
  },
  goFreelancer () {
    wx.navigateTo({
      url: `../freelancer/index`
    })
  },
  goProject () {
    wx.navigateTo({
      url: `../project/index`
    })
  }
})
