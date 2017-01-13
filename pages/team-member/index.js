//index.js
var ywk = require('../../utils/ywk')

Page({
  data: {
    teams: [],
    windowHeight: 100,
    team_id: ''
  },
  onLoad (opt) {
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    })
    if (opt && opt.team_id) {
      this.setData({
        team_id: opt.team_id
      })
      this.getData()
    }
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
  getData () {
    ywk.ajaxJson('/api/team/member', {team_id: this.data.team_id, status: 'member'}, 'GET').then((res) => {
      if (res.error_code === 0) {
        let members = res.members.map((item) => {
          let titleStr = '管理员'
          if (item.mtype === 'staff') {
            titleStr = '成员'
          } else if (item.mtype === 'owner') {
            titleStr = '团队负责人'
          }
          item.titleStr = titleStr;
          return item;
        });
        this.setData({
          teams: members
        });
      }
      wx.hideToast()
    }, (err) => {
      wx.hideToast()
    })
  }
})
