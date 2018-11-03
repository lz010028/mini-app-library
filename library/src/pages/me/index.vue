<template>
  <div class="container">
    <div class="userinfo" @click="login">
      <img class="avatar" :src="userInfo.avatarUrl" alt="">
      <p>{{ userInfo.nickName }}</p>
    </div>
    <YearProgress></YearProgress>
    <button @click="scanBook" class="btn">添加图书</button>
  </div>
</template>
<script>
  import YearProgress from '@/components/YearProgress'
  import {post, showModal} from '@/util'
  export default {
    data () {
      return {
        userInfo: {
          avatarUrl: '../../../static/img/unlogin.png',
          nickName: '点击登录'
        }
      }
    },
    created () {
      this.userInfo = wx.getStorageSync('userInfo')
    },
    methods: {
      async addBook (isbn) {
        const res = await post('/weapp/addbook', {
          isbn,
          openid: this.userInfo.openId
        })
        if (res.code === 0 && res.data.title) {
          showModal('添加成功', `${res.data.title}添加成功`)
        }
      },
      scanBook: function () {
        var self = this
        wx.scanCode({
          onlyFromCamera: true,
          success: function (res) {
            self.addBook(res.result)
          }
        })
      },
      login: function () {

      }
    },
    components: {
      YearProgress
    }
  }
</script>
<style lang="scss">
  .container {
    padding: 0 30rpx;

    .userinfo {
      margin-top: 100rpx;
      text-align: center;

      .avatar {
        width: 150rpx;
        height: 150rpx;
        margin: 20rpx;
        border-radius: 50%;
      }

      p {
        text-align: center;
      }
    }
  }
</style>
