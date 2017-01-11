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
        pagenum: this.data.searchData.pagenum++
      }
    })
    this.getData()
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
    ywk.ajaxJson('/api/jobs/search', this.searchData, 'POST').then((res) => {
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
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight
        })
      }
    })
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
  }
})
