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
    timeIndex: '0',
    jobIndex: '0',
    jobs: ['请选择'],
    jobObj: [],
    alertData: {msg: '', showClass: 'alert-show'}
  },
  chooseTime (e) {
      this.setData({
          timeIndex: e.detail.value
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
    if (parseInt(this.data.timeIndex) !== 0 && parseInt(this.data.jobIndex) !== 0) {
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
      } else if (res.error_code === 80001) {
        let url = encodeURIComponent(`../job-invite/index?id=${this.data.id}&type=${this.data.type}`)
        wx.navigateTo({
          url: `../signin/index?redirect=${url}`
        })
      }
      wx.hideToast()
    }, (err) => {
      console.log(err)
    })
  },
  onLoad (opt) {
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    })
    if (opt && opt.id) {
      this.setData({
        id: opt.id,
        type: opt.type
      })
      this.getData()
    }
  },
  submit () {
    if (this.data.timeIndex === 0 || this.data.jobIndex === 0 || this.data.isDisable === 'disabled') return false;
    let data = {
      job_id: this.data.jobObj[this.data.jobIndex - 1].id,
      duration: this.data.objectTime[this.data.timeIndex - 1].id,
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
          wx.switchTab({
            url: '/pages/profile/index'
          })
        },2000)
      } else {
        this.setData({
          alertData: {msg: wx.getStorageSync('CODE')[res.error_code]}
        })

        setTimeout(() => {
          this.setData({
            alertData: {msg: ''}
          })
        }, 2000)
      }
    }, (err) => {})
  }
})
