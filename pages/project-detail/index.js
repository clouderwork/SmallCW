var ywk = require('../../utils/ywk')

Page({
  data: {},
  onLoad (e) {
    this.getDetail(e.id)
  },
  getDetail (id) {
    ywk.ajaxJson('/api/jobs', { job_id: id }, 'GET').then((res) => {
      console.log(res)
      this.setData({
        job: res.job
      })
    }, (err) => {
      console.log(err)
    })
  }
})
