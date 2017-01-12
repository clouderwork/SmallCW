//index.js
//获取应用实例
var ywk = require('../../utils/ywk')
Page({
  data: {
    projects: [],
    pagenum: 0
  },
  filterTime (time) {
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month > 9 ? month : '0' + month
    let day = date.getDay()
    day = day > 9 ? day : '0' + day
    return year + '/' + month + '/' + day
  },
  getData () {
    this.setData({
      pagenum: this.data.pagenum++
    })
    ywk.ajaxJson('/api/jobs/search', {pagenum: this.data.pagenum}, 'POST').then((res) => {
      wx.hideToast()
      if (res.error_code === 0) {
        this.setData({
          projects: this.data.projects.concat(res.jobs.map((item) => {
            item.publish_at = this.filterTime(item.publish_at)
            return item
          }))
        })
      } else {
        console.log(res)
      }
    }, (err) => {
      wx.hideToast()
    })
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
  onShareAppMessage () {
    return {
      title: '我的小程序',
      desc: '我的小程序',
      path: '/pages/project/index'
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
