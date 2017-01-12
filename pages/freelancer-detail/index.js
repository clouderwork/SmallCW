//logs.js
var ywk = require('../../utils/ywk')

Page({
  data: {
    id: '',
    profile: {},
    project: [],
    jobs: [],
    edus: [],
    teams: [],
    descShow: 'down',
    descClass: 'desc-down',
    descImg: './images/icon-down.png'
  },
  onLoad: function (opt) {
    if (opt && opt.id) {
      this.setData({
        id: opt.id
      })
      this.getBasicInfo();
      this.getProject();
      this.getjobs();
      this.getEdus();
      this.getTeam();
    }
  },
  // 获取用户基本信息
  getBasicInfo () {
    ywk.ajaxJson('/api/freelancers/profile', {uuid: this.data.id}).then((res) => {
      if (res.error_code === 0) {
        let profile = res.profile;
        profile.workloadStr = '超过30小时每周'
        if (res.profile.workload === 2) {
          profile.workloadStr = '超过30小时每周'
        } else if (res.profile.workload === 3) {
          profile.workloadStr = '超过30小时每周'
        }
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
      console.log(JSON.stringify(res))
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
      console.log(JSON.stringify(res))
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
  },
  bindViewTap (e) {
    let id = e.currentTarget.dataset.fid
    wx.navigateTo({
      url: `../comment/index?id=${id}`
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
<<<<<<< HEAD
  },
  // 展示收起显示描述
  changeShow () {
    let state = 'down'
    if (this.data.descShow === 'down') {
      state = 'up'
    }
    this.setData({
      descShow: state,
      descClass: `desc-${state}`,
      descImg: `./images/icon-${state}.png`
    })
=======
>>>>>>> 9acba15009d70a9f8eed48bc3d274e677ccaff80
  }
})
