//index.js
//获取应用实例
var ywk = require('../../utils/ywk')
Page({
  data: {
    id: '',
    isDisable: 'disabled',
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
      this.ckDis()
  },
  chooseJob (e) {
    this.setData({
        jobIndex: e.detail.value
    })
    this.ckDis()
  },
  ckDis () {
    let dis = 'disabled'
    if (!(this.data.index === 0 || this.data.jobIndex === 0)) {
      dis = ''
    }
    this.setData({
      isDisable: dis
    })
  },
  getData () {
    let query = { rtype: 'invite' }
    if (this.data.type === 'team') {
      query.team_id = this.data.id
    } else {
      query.user_id = this.data.id
    }
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
    if (opt && opt.id) {
      this.setData({
        id: opt.id,
        type: opt.type
      })
      this.getData()
    }
  },
  submit () {
    if (this.data.isDisable === 'disabled') return false;
    let data = {
      job_id: this.data.jobObj[this.data.jobIndex].id,
      duration: this.data.objectTime[this.data.index].id,
      message: '这里是邀请的文案'
    }
    if (this.data.type === 'team') {
      data.team_id = this.data.id
    } else {
      data.user_id = this.data.id
    }
    ywk.ajaxJson('/api/proposal', data, 'POST').then((res) => {
      if (res.error_code === 0) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })

        setTimeout(function(){
          wx.navigateTo({
            url: '../profile/index'
          })
        },2000)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 2000
        })
      }
    }, (err) => {})
  }
})
