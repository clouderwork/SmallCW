//index.js
//获取应用实例
var ywk = require('../../utils/ywk')
Page({
  data: {
    windowHeight: 0,
    projects: [],
    searchData: {
      pagenum: 1
    }
  },
  lower () {
    this.setData({
      searchData: {
        pagenum: that.data.searchData.pagenum++
      }
    })
    this.getData()
  },
  getData () {
    ywk.ajaxJson('/api/jobs/search', this.searchData, 'POST').then((res) => {
      wx.hideToast()
      if (res.error_code === 0) {
        this.setData({
          projects: this.data.projects.concat(res.jobs)
        })
      } else {
        console.log(res)
      }
    }, (err) => {
      wx.hideToast()
    })
  },
  onLoad () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight
        })
      }
    })
    this.getData()
  }
})
