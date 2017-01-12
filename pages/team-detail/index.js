var ywk = require('../../utils/ywk')
var util = require('../../utils/util')

Page({
  data: {},
  onLoad (e) {
    this.getData(e.id)
  },
  getData (id) {
    ywk.ajaxJson('/api/freelancers/profile', {team_id: id}).then((res) => {
      if (res.error_code === 0) {
        console.log(res)
        this.setData({
          'team': res.profile
        })
      }
    }, (err) => {
      console.log(err);
    })
  }
})