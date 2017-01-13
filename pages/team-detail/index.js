var ywk = require('../../utils/ywk')
var util = require('../../utils/util')

Page({
  data: {
    profile: {},
    portfolios: [],
    contracts: [],
    team_id: ''
  },
  onLoad (e) {
    this.getData(e.team_id)
    this.getPortfolio(e.team_id)
    this.getContract(e.team_id)
    this.setData({ id: e.team_id })
    this.setData({
      team_id: e.team_id
    })
  },
  getData (id) {
    ywk.ajaxJson('/api/team/profile', {team_id: id}).then((res) => {
      if (res.error_code === 0) {
        let profile = res.profile
        profile.levelStr = util.getLevel(profile.level)
        profile.englishStr = util.getLanguagesLevel(profile.english)
        profile.languages = profile.languages.map((item) => {
          item.langStr = util.getLanguagesLevel(item.level)
          return item;
        })
        this.setData({
          'profile': profile
        })
      }
    }, (err) => {
      console.log(err)
    })
  },
  // 获取成功案例
  getPortfolio (id) {
    ywk.ajaxJson('/api/team/portfolio', {team_id: id}).then((res) => {
      if (res.error_code === 0) {
        let portfolio = res.portfolio.map((item) => {
          item.amoutStr = util.getRange(item.amount_range)
          return item;
        })
        this.setData({
          'portfolios': res.portfolio
        })
      }
    }, (err) => {
      console.log(err)
    })
  },
  filterTime (time) {
    let date = new Date(time.replace(/-/g, '/'))
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month > 9 ? month : '0' + month
    let day = date.getDay()
    day = day > 9 ? day : '0' + day
    return year + '/' + month + '/' + day
  },
  // 获取工作历史及反馈
  getContract (id) {
    ywk.ajaxJson('/api/freelancers/contract', {team_id: id, identify: 't'}).then((res) => {
      if (res.error_code === 0) {
        let contracts = res.contracts.map((item) => {
          item.paymethodStr = item.paymethod === 'fixed' ? '固定价格工作' : '小时制工作'
          item.time = this.filterTime(item.start_at) + '-' + this.filterTime(item.end_at)
          let allAva = item.evaluate.team.exchange + item.evaluate.team.punctual + item.evaluate.team.cooper + item.evaluate.team.quality + item.evaluate.team.skill
          item.allAva = ((((allAva / 5).toFixed(1)) / 1) / 5) * 100
          return item
        })
        this.setData({
          'contracts': contracts
        })
      }
    }, (err) => {
      console.log(err)
    })
  },
  onShareAppMessage () {
    return {
      title: '云沃克',
      desc: this.data.profile.name,
      path: 'pages/project-detail/index?team_id=' + this.data.id
    }
  },
  goMember () {
    wx.navigateTo({
      url: `../team-member/index?team_id=${this.data.team_id}`
    })
  }
})
