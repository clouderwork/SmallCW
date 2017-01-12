var ywk = require('../../utils/ywk')

Page({
  data: {},
  onLoad (e) {
    this.getComment(e.id)
  },
  onShow () {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight
        })
      }
    })
  },
  getComment (id) {
    ywk.ajaxJson('/api/freelancers/evaluate', { user_id: id }, 'GET').then((res) => {
      console.log(res)
      if (res.error_code === 0) {
        this.setData({
          comments: res.evaluates,
          count: res.count
        })
      }
    }, (err) => {
      console.log(err)
    })
  }
})
