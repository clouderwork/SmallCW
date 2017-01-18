//index.js
//获取应用实例
var ywk = require('../../utils/ywk')
Page({
  data: {},
  getData (id) {
    ywk.ajaxJson('/api/proposal', {proposal_id: id}, 'GET').then((res) => {
      wx.hideToast()
      if (res.error_code === 0) {
        let proposal = res.proposals[0]
        if (proposal.job.paymethod === 'hour') {
          proposal.money = (proposal.price * 0.9).toFixed(2)
          proposal.service = (proposal.price * 0.1).toFixed(2)
        }
        this.setData({
          proposal: proposal
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
      desc: '投标详情',
      path: '/pages/proposal-detail/index'
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
