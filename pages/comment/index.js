var ywk = require('../../utils/ywk')

Page({
  data: {},
  onLoad (e) {
    this.getComment(e.id)
  },
  onShow () {
    // 获取页面高度
    if (wx.getStorageSync('systemInfo')) {
      let sys = wx.getStorageSync('systemInfo')
      this.setData({
        windowHeight: sys.windowHeight
      });
    }
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
