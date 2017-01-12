//logs.js
var ywk = require('../../utils/ywk')

Page({
  data: {
    id: '',
    profile: {},
    project: [],
    jobs: [],
    edus: [],
    teams: []
  },
  onLoad: function (opt) {
    if (opt && opt.id) {
      this.setData({
        id: opt.id
      })
      this.getBasicInfo()
      this.getProject()
    }

  },
  // 获取用户基本信息
  getBasicInfo () {
    ywk.ajaxJson('/api/user/profile', {uuid: this.data.id}).then((res) => {
      console.log(res)
      if (res.error_code === 0) {
        this.setData({
          'profile': res.profile
        })
      }
    }, (err) => {
      console.log(err);
    })
  },
  // 获取项目经历
  getProject () {
    ywk.ajaxJson('/api/portfolio', {user_id: this.data.id}, (res) => {
      console.log(res)
      if (res.error_code === 0) {
        this.setData({
          'project': res.portfolios
        })
      }
    })
  },
  // 获取工作经历
  getjobs () {
    ywk.ajaxJson('/api/employment', {user_id: this.data.id}).then((res) => {
      console.log(res)
      if (res.error_code === 0) {
        this.setData({
          'jobs': res.employments
        })
      }
    }, (err) => {
      console.log(err);
    })
  },
  // 获取教育经历
  getEdus () {
    ywk.ajaxJson('/api/education', {user_id: this.data.id}).then((res) => {
      console.log(res)
      if (res.error_code === 0) {
        this.setData({
          'edus': res.educations
        })
      }
    }, (err) => {
      console.log(err);
    })
  },
  // 获取服务方所在团队
  getTeam () {
    ywk.ajaxJson('/api/user/team', {user_id: this.data.id}).then((res) => {
      console.log(res)
      if (res.error_code === 0) {
        this.setData({
          'teams': res.teams
        })
      }
    }, (err) => {
      console.log(err);
    })
  }
})
