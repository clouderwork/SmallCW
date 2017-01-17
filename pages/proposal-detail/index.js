//index.js
//获取应用实例
var ywk = require('../../utils/ywk')
Page({
  data: {},
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
      } else {
        wx.hideToast()
        console.log(res)
      }
    }, (err) => {
      wx.hideToast()
    })
  },
  onShareAppMessage () {
    return {
      title: '云沃客',
      desc: '投标详情',
      path: '/pages/proposal-detail/index'
    }
  },
  onLoad () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    this.getData()
  },
  bindViewTap (e) {
    let id = e.currentTarget.dataset.jid
    wx.navigateTo({
      url: `../project-detail/index?id=${id}`
    })
  }
})
