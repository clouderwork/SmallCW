//index.js
var ywk = require('../../utils/ywk')

Page({
  data: {
    users: [],
    windowHeight: 100,
    search: {
      pagenum: 1,
      ftype: 'all'
    },
    count: 0
  },
  //事件处理函数
  goDetail: function(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../freelancer-detail/index?id=' + id
    })
  },
  onLoad: function () {
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    })
    this.getData();
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
  lower (e) {
    if (this.data.search.pagenum * 10 < this.data.count) {
      let search = Object.assign({}, this.data.search, {pagenum: ++this.data.search.pagenum})
      this.setData({
        'search': search
      })
      this.getData()
    }
  },
  getData () {
    ywk.ajaxJson('/api/freelancers/search', this.data.search, 'GET').then((res) => {
      if (res.error_code === 0) {
        this.setData({
          users: this.data.users.concat(res.users),
          count: res.count
        });
      }
      wx.hideToast()
    }, (err) => {
      wx.hideToast()
    })
  }
})
