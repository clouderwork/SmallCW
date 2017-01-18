//index.js
//获取应用实例
var ywk = require('../../utils/ywk')
Page({
  data: {},
  getData (id) {
    ywk.ajaxJson('/api/proposal', {proposal_id: id}, 'GET').then((res) => {
      wx.hideToast()
      if (res.error_code === 0) {
        let invite = res.proposals[0]
        this.setData({
          invite: invite
        })
      } else {
        console.log(res)
      }
    }, (err) => {
      wx.hideToast()
    })
  },
  onShareAppMessage () {
    return {
      title: '云沃客',
      desc: '邀请内容',
      path: '/pages/invite-detail/index'
    }
  },
  onLoad (e) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    this.getData(e.id)
  }
})
