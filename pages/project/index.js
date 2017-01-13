//index.js
//获取应用实例
var ywk = require('../../utils/ywk')
Page({
  data: {
    projects: [],
    pagenum: 1,
    count: 0
  },
  filterTime (time) {
    let date = new Date(time.replace(/-/g, '/'))
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month > 9 ? month : '0' + month
    let day = date.getDate()
    day = day > 9 ? day : '0' + day
    return year + '/' + month + '/' + day
  },
  getData () {
    if (this.data.count !== 0 && this.data.count <= (this.data.pagenum - 1) * 10) {
      return
    }
    let data = {
      pagenum: this.data.pagenum,
      sortord: '{"create_at":"desc"}'
    }
    ywk.ajaxJson('/api/jobs/search', data, 'POST').then((res) => {
      wx.hideToast()
      if (res.error_code === 0) {
        console.log(res)
        this.setData({
          projects: this.data.projects.concat(res.jobs.map((item) => {
            item.publish_at = this.filterTime(item.publish_at)
            return item
          })),
          pagenum: res.pagenum + 1,
          count: res.count
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
  },
  onShareAppMessage () {
    return {
      title: '云沃克',
      desc: '项目列表',
      path: 'pages/project/index'
    }
  }
})
