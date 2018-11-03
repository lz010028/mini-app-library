<template>
  <div class="bookinfo">
    <div class="thumb">
      <img :src="info.image" class="back" mode="aspectFill"/>
      <img :src="info.image" class="image" mode="aspectFit"/>
      <div class="info">
        <div class="title">{{info.title}}</div>
        <div class="author">{{info.author}}</div>
      </div>
    </div>
    <div class="detail">
      <img
        :src="userInfo.image"
        mode="scaleToFill"
        class="avatar"
        lazy-load="false"
      />
      {{ userInfo.nickName }}
      <div class="right text-primary">
        {{ info.rate }}分
        <Rate :value="info.rate"></Rate>
      </div>
    </div>
    <div class="detail">
      {{ info.publisher }}
      <div class="right">
        ￥{{ info.price }}
      </div>
    </div>
    <div class="tags">
      <div class="badge" v-for="(item, index) in info.tags" :key="index">
        {{item}}
      </div>
    </div>
    <div class="summary">
      <p v-for="(item, index) in info.summary" :key="index">
        {{item}}
      </p>
    </div>
  </div>
</template>

<script>
import Rate from '@/components/Rate'
export default {
  props: ['info'],
  created () {},
  components: {
      Rate
    },
  computed: {
      userInfo() {
        return this.info.user_info || {};
      }
    }
}
</script>

<style lang="scss">
  .bookinfo {

    .badge {
      display: inline-block;
      margin: 5px;
      padding: 2px 5px;
      font-size: 12px;
      border-radius: 10px;
      border: 1px solid #ea5a49;
      color: #ea5a49;
    }

    .summary {
      margin-top: 10px;
      padding: 10px 15px;

      p {
        font-size: 14px;
        text-indent: 2em;
      }
    }

    .right {
      float: right;
    }

    .detail {
      padding: 5px 10px;

      .avatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        vertical-align: middle;
      }
    }

    .thumb {
      width: 750rpx;
      height: 500rpx;
      overflow: hidden;
      position: relative;

      .back {
        width: 100%;
        filter: blur(15px);
      }

      .image {
        position: absolute;
        width: 100%;
        height: 300rpx;
        left: 0;
        top: 30rpx;
      }

      .info {
        width: 100%;
        color: #fff;
        position: absolute;
        left: 0;
        top: 340 rpx;
        font-size: 14px;
        text-align: center;

        .title {
          font-size: 18px;
          line-height: 30px;
        }
      }
    }
  }


</style>
