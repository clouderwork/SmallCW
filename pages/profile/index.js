//index.js
//获取应用实例
var ywk = require('../../utils/ywk')
Page({
  data: {
    role: '',
    invites: [],
    proposals: [],
    id: '',
    from: 'profile',
    roleName: '服务方身份'
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
    ywk.ajaxJson('/api/user/profile', {}, 'GET').then((res) => {
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
    ywk.ajaxJson('/api/v1.1/user/role', {}, 'GET').then((res) => {
      wx.hideToast()
      if (res.error_code === 0) {
        let role = 'f'
        let name = '需求方身份'
        let id = ''
        if (res.current_id === res.roles.client.id) {
          role = 'c'
          name = '服务方身份'
          id = res.roles.freelancer.id
        } else if(res.current_id === res.roles.freelancer.id) {
          role = 'f'
          name = '需求方身份'
          id = res.roles.client.id
        }
        this.setData({
          role: role,
          roleName: name,
          roles: res.roles,
          id: id
        })
        this.getInfo()
      }
    }, (err) => {
      wx.hideToast()
    })
  },
  getInfo () {
    if (this.data.role === 'f') {
      // 服务方获取我的投标
      ywk.ajaxJson('/api/proposal', {operate: 'active'}, 'GET').then((res) => {
        this.setData({
          proposals: res.proposals
        })
      }, (err) => {
        console.log(err)
      })
    } else if (this.data.role === 'c') {
      // 需求方获取我的邀请
      ywk.ajaxJson('/api/proposal', {operate: 'invite'}, 'GET').then((res) => {
        console.log(rress)
      }, (err) => {
        console.log(err)
      })
    }
  },
  changeRole () {
    ywk.ajaxJson('/api/user/role', {id: this.data.id}, 'PUT').then((res) => {
      if (res.error_code === 0) {
        this.getData()
        this.getRole()
      }
    }, (err) => {
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
    this.getData()
    this.getRole()
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
