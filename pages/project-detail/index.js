var ywk = require('../../utils/ywk')
var WxParse = require('../../wxParse/wxParse.js')

let format = {
  getDuration (val) {
    let str = '大于6个月'
    switch (val) {
    case 1:
      str = '大于6个月'
      break
    case 2:
      str = '3到6个月'
      break
    case 3:
      str = '1到3个月'
      break
    case 4:
      str = '不到1个月'
      break
    default:
      str = '小于1周'
      break
    }
    return str
  },
  getHour (val) {
    let str = '超过30小时每周'
    val = parseInt(val)
    switch (val) {
    case 1:
      str = '超过30小时每周'
      break
    case 2:
      str = '小于30小时每周'
      break
    case 3:
      str = '不确定'
      break
    default:
      break
    }
    return str
  },
  getLevel (level) {
    if (level === 'entry') {
      return '入门级'
    } else if (level === 'middle') {
      return '中间级'
    } else {
      return '专家级'
    }
  },
  getStage (val) {
    let str = '有设计'
    switch (val) {
    case 'design':
      str = '有设计'
      break
    case 'introduction':
      str = '有详细的需求说明'
      break
    case 'idea':
      str = '只有一个想法'
      break
    default:
      str = '啥也没有'
      break
    }
    return str
  }
}

Page({
  data: {
    panel: 'base'
  },
  onLoad (e) {
    this.getDetail(e.id)
    this.setData({ id: e.id })
  },
  getDetail (id) {
    ywk.ajaxJson('/api/jobs', { job_id: id }, 'GET').then((res) => {
      console.log(res)
      let job = res.job
      job.hourPrice = '< 100元/时'
      if (job.level === 'middle') { job.hourPrice = '100 - 300元/时' }
      if (job.level === 'expert') { job.hourPrice = '> 300元/时'}
      job.duration = format.getDuration(job.duration)
      job.workload = format.getHour(job.workload)
      job.level = format.getLevel(job.level)
      job.stage = format.getStage(job.stage)
      this.setData({
        job: job
      })
      // 处理html渲染
      let article = job.description
      let that = this;
      WxParse.wxParse('article', 'html', article, that, 5)
    }, (err) => {
      console.log(err)
    })
  },
  changePanel (e) {
    console.log(e.currentTarget.dataset.panel)
    this.setData({
      panel: e.currentTarget.dataset.panel
    })
  },
  onShareAppMessage () {
    return {
      title: '云沃克',
      desc: this.data.job.name,
      path: 'pages/project-detail/index?id=' + this.data.id
    }
  }
})
