var Promise = require('./bluebird')

/** ajax请求数据接口
 * [ajax请求数据接口]
 * @param  {[String]} url    [请求地址]
 * @param  {[Object||String]} data   [参数]
 * @param  {[String]} method [请求类型：默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT]
 * @return {[Promise]}        [返回结果]
 */
function ajaxJson(url, data, method = 'GET') {

    // 非get请求加上_xsrf参数
    if (method !== 'GET') {
      data = typeof (data) === 'object' ? data : {}
      data._xsrf = wx.getStorageSync('_xsrf')
    }
    let header = {
      'content-type': 'application/x-www-form-urlencoded',
      'CW-Agent': ' x/1.0.0/9.2.1/iPhone/wifi'
    }
    // 处理header的CW-Agent
    if (wx.getStorageSync('systemInfo') || wx.getStorageSync('networkType')) {
      let sys = wx.getStorageSync('systemInfo')
      let networkType = wx.getStorageSync('networkType')
      header['CW-Agent'] = `x/${sys.version}/${sys.system}/${sys.model}/${networkType}`
    }
    console.log(url)
    return new Promise((resolve, reject) => {
        wx.request({
          url: `http://m.yunwoke.com${url}?timestamp=${new Date().getTime()}`,
          data: data,
          method: method,
          header: header,
          success: function(res){
            if (res && res.data) {
              resolve(res.data)
            } else {
              reject(res)
            }
          },
          fail: function(err) {
            reject(err)
          }
        })
    });
}

module.exports = {
  ajaxJson: ajaxJson
};
