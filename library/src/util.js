/**
 * Created by LiangZhao on 2018/7/19.
 * desc: 工具函数库
 */
import config from './config'

// http get工具函数获取上数据
export function get (url, data) {
  return request(url, 'GET', data)
}

// http post工具函数获取上数据
export function post (url, data) {
  return request(url, 'POST', data)
}

// http request
export function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          console.log(res.data.data.msg)
          showModal('Error', res.data.data.msg)
          reject(res.data)
        }
      }
    })
  })
}

// 提示性showModal
export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}

// 简单的提示性弹框
export function showSuccess (msg) {
  wx.showToast({
    title: msg,
    icon: 'success',
    mask: true,
    cancelColor: '#ea3f3f'
  })
}
