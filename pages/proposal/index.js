var ywk = require('../../utils/ywk')
Page({
    data: {
        amount: '',
        time: ['请选择','一周以内', '一个月内', '1-3个月', '3-6个月', '6个月以上'],
        objectTime: [
            {
                id: '',
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
        id: '',
        job: {},
        selfcount: '',
        servecount: '',
        alertData: {msg: '', showClass: 'alert-show'}
    },
    onLoad (e) {
        this.setData({
            id: e.id
        })
        this.getJob()
    },
    getAmount (e) {
        this.setData({
            amount: e.detail.value
        })
    },
    chooseTime (e) {
        this.setData({
            index: e.detail.value
        })
    },
    submitProposal (e) {
        let prodata = {
            job_id: this.data.id,
            amount: this.data.amount,
            duration: this.data.index,
            message: '这里是投标的文案'
        }
        ywk.ajaxJson('/api/proposal', prodata, 'POST').then((res) => {
            if (res.error_code === 0) {
              wx.switchTab({
                url: '/pages/profile/index'
              })
            } else {
              this.setData({
                alertData: {msg: res.msg, cls: 'alert-show'}
              })

              setTimeout(() => {
                this.setData({
                  alertData: {msg: '', cls: ''}
                })
              }, 2000)
            }
        }, (err) => {
            console.log(err)
        })
    },
    getJob (e) {
        // 获取项目状态
        ywk.ajaxJson('/api/jobs', {job_id: this.data.id}).then((res) => {
            if (res.error_code === 0) {
                this.setData({
                    job: res.job
                })
            }
        }, (err) => {
            console.log(err)
        })
    },
    computserve (e) {
        this.setData({
            selfcount:(e.detail.value * 0.9).toFixed(2),
            servecount: (e.detail.value - (e.detail.value * 0.9)).toFixed(2)
        })
    }
})
