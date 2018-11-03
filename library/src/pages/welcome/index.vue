<template>
  <div class="container">
    <button class="entry-btn"
            open-type='getUserInfo'
            withCredentials
            lang='zh_CN'
            @click="getUserInfo">获取用户信息</button>
  </div>
</template>
<script>
  import qcloud from 'wafer2-client-sdk'
  import config from '@/config'
  import {showSuccess} from '@/util'
  export default {
    created () {
      wx.checkSession({
        success: function () {
          let user = wx.getStorageSync('userInfo')
          if (user) {
            showSuccess('已登录')
            setTimeout(() => {
              wx.switchTab({
                url: '../books/main'
              })
            }, 2000)
          }
        },
        fail: function () {
          wx.login()
        }
      })
    },
    methods: {
      async getUserInfo () {
        wx.getUserInfo({
          success: function (res) {
            // 设置登录地址
            qcloud.setLoginUrl(config.loginUrl)
            qcloud.login({
              success: function () {
                qcloud.request({
                  url: config.userUrl,
                  login: true,
                  success: function (res) {
                    showSuccess('登录成功')
                    let data = res.data.data
                    wx.setStorageSync('userInfo', data)
                    setTimeout(() => {
                      wx.switchTab({
                        url: '../books/main'
                      })
                    }, 2000)
                  }
                })
              },
              fail: function (err) {
                console.log('登录失败', err)
              }
            })
          }
        })
      }
    }
  }
</script>
<style>
  .container {
    width: 100%;
    height: 100%;
    position: absolute;
    background-size: cover;
    background: url("http://5b0988e595225.cdn.sohucs.com/images/20180714/f32e9c2a53514c4db19725b8a4c9fb74.jpeg") no-repeat center;
  }

  .entry-btn {
    width: 80%;
    height: 90rpx;
    border-radius: 45rpx;
    line-height: 90rpx;
    margin-top: 50%;
  }
</style>
