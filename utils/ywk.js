var Promise = require('./bluebird')

function assemblingData (data) {
    data = typeof (data) === 'object' ? data : {}
    data.xhrFields = wx.getStorageSync('_xsrf')
    data._xsrf = wx.getStorageSync('_xsrf')
    // // 处理开发环境丢失用户信息的情况
    // data.session_token = Cookies.get('session_token')
    return data
}

/** ajax请求数据接口
 * [ajax请求数据接口]
 * @param  {[String]} url    [请求地址]
 * @param  {[Object||String]} data   [参数]
 * @param  {[String]} method [请求类型：默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT]
 * @return {[Promise]}        [返回结果]
 */
function ajaxJson(url, data, method = 'GET') {
    data = assemblingData(data)
    console.log(data)
    return new Promise((resolve, reject) => {
        wx.request({
          url: `http://m.yunwoke.com${url}?timestamp=${new Date().getTime()}`,
          data: data,
          method: method,
          header: {
            _xsrf: wx.getStorageSync('_xsrf')
          },
          success: function(res){
            resolve(res)
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
