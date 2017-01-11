//index.js
//获取应用实例
var ywk = require('../../utils/ywk')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  lower: function (e) {
    console.log('loadData')
  },
  onLoad: function () {
    var that = this
    ywk.ajaxJson('/api/jobs/search', {pagenum: 1}, 'POST').then((res) => {
      console.log("111", res)
    }, (err) => {
      console.log("222", err)
    })
  }
})
