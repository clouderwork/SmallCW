var ywk = require('../../utils/ywk')

Page({
  data: {
    pagenum: 1
  },
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
  filterTime (time) {
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month > 9 ? month : '0' + month
    let day = date.getDay()
    day = day > 9 ? day : '0' + day
    return year + '-' + month + '-' + day
  },
  getComment (id) {
    ywk.ajaxJson('/api/freelancers/evaluate', { user_id: id, pagenum: this.data.pagenum }, 'GET').then((res) => {
      console.log(res)
      if (res.error_code === 0) {
        this.setData({
          comments: res.evaluates.map((item) => {
            item.create_at = this.filterTime(item.create_at)
            item.num = ((item.cooper + item.exchange + item.punctual + item.quality + item.skill)/25) * 180 + 6
            return item
          }),
          count: res.count,
          pagenum: res.pagenum + 1
        })
      }
    }, (err) => {
      console.log(err)
    })
  }
})
