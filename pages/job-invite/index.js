//index.js
//获取应用实例
var ywk = require('../../utils/ywk')
Page({
  data: {
    id: '',
    type: 'team',
    time: ['请选择', '一周以内', '一个月内', '1-3个月', '3-6个月', '6个月以上'],
    objectTime: [
        {
            id: 0,
            name: '请选择'
        },
        {
            id: 5,
            name: '一周以内'
        },
        {
            id: 4,
            name: '一个月内'
        },
        {
            id: 3,
            name: '1-3个月'
        },
        {
            id: 2,
            name: '3-6个月'
        },
        {
            id: 1,
            name: '6个月以上'
        }
    ],
    index: 0,
    jobIndex: 0,
    jobs: ['请选择'],
    jobObj: [
      {
        id: 0,
        name: '请选择'
      }
    ]
  },
  chooseTime (e) {
      this.setData({
          index: e.detail.value
      })
  },
  chooseJob (e) {
    this.setData({
        jobIndex: e.detail.value
    })
  },
  getData () {
    let query = { rtype: 'invite' }
    if (this.data.type === 'team') {
      query.team_id = this.data.id
    }
    console.log('getData')
    ywk.ajaxJson(`/api/jobs/invite`, query).then((res) => {
      let job = this.data.jobs
      let jobObj = this.data.jobObj
      if (res.error_code === 0) {
        res.jobs.map((item) => {
          job.push(item.name)
          jobObj.push({id: item.job_id, name: item.name})
        })
        this.setData({
          jobs: job,
          jobObj: jobObj
        })
      }
    }, (err) => {
      console.log(err)
    })
  },
  onShareAppMessage () {
    return {
      title: '云沃客',
      desc: '邀请内容',
      path: `/pages/job-invate/index?id=${this.data.id}&type=${this.data.type}`
    }
  },
  onLoad (opt) {
    console.log(opt)
    if (opt && opt.id) {
      this.setData({
        id: opt.id,
        type: opt.type
      })
      this.getData()
    }
  }
})
