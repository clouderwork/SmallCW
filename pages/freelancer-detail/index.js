//logs.js
var ywk = require('../../utils/ywk')
var util = require('../../utils/util')
var app = getApp()
Page({
  data: {
    id: '',
    profile: {},
    projects: [],
    jobs: [],
    edus: [],
    teams: [],
    descShow: 'down',
    descClass: 'desc-down',
    descImg: './images/icon-down.png'
  },
  onLoad (opt) {
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    })
    this.setData({
      role: wx.getStorageSync('role')
    })
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
        profile.workloadStr = util.getHour(profile.workload)
        profile.englishStr = util.getLanguagesLevel(profile.english)
        profile.languages = profile.languages.map((item) => {
          item.langStr = util.getLanguagesLevel(item.level)
          return item;
        })
        profile.canWork = profile.workload > 0 ? '目前可工作' : '目前不想工作'
        this.setData({
          'profile': res.profile
        })
      }
      wx.hideToast()
    }, (err) => {
      wx.hideToast()
      console.log(err);
    })
  },
  // 获取项目经历
  getProject () {
    ywk.ajaxJson('/api/portfolio', {user_id: this.data.id}).then((res) => {
      if (res.error_code === 0) {
        this.setData({
          'projects': res.portfolios
        })
      }
    }, (err) => {
      console.log(err);
    })
  },
  // 获取工作经历
  getjobs () {
    ywk.ajaxJson('/api/employment', {user_id: this.data.id}).then((res) => {
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
      if (res.error_code === 0) {
        let edus = res.educations.map((item) => {
          item.degreeStr = util.getDegree(item.degree)
          return item
        })
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
      if (res.error_code === 0) {
        this.setData({
          'teams': res.teams
        })
      }
    }, (err) => {
      console.log(err);
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
  },
  invite () {
    app.ckAndNav(`../job-invite/index?id=${this.data.id}&type=user`, `../freelancer-detail/index?id=${this.data.id}`)
  },
  onShareAppMessage () {
    return {
      title: '云沃客',
      desc: this.data.profile.nickname,
      path: 'pages/freelancer-detail/index?id=' + this.data.id
    }
  }
})
