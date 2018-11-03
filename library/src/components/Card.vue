<template>
  <a :href="detailUrl">
    <div class="book-card">
      <div class="thumb" @click.stop="preview">
        <img :src="book.image" class="image" mode="aspectFit" alt="">
      </div>
      <div class="detail">
        <div class="row">
          <div class="left text-primary">{{book.title}}</div>
          <div class="right text-primary">
            {{book.rate}}
            <Rate :value="book.rate"></Rate>
          </div>
        </div>
        <div class="row">
          <div class="left">{{book.author}}</div>
          <div class="right">浏览量:{{ book.count }}</div>
        </div>
        <div class="row">
          <div class="left">{{book.publisher}}</div>
          <div class="right">{{ book.user_info.nickName }}</div>
        </div>
      </div>
    </div>
  </a>
</template>
<script>
  import Rate from '@/components/Rate.vue'
  export default {
    props: ['book'],
    components: {
      Rate
    },
    data () {},
    computed: {
      detailUrl: function () {
        return '/pages/detail/main?id=' + this.book.id
      }
    },
    methods: {
      preview () {
        wx.previewImage({
          current: this.book.image,
          urls: [this.book.image]
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .book-card {
    padding: 5px;
    margin-top: 5px;
    font-size: 14px;
    overflow: hidden;
    margin-bottom: 5px;

    .thumb {
      width: 90px;
      height: 90px;
      float: left;
      margin: 0 auto;
      overflow: hidden;

      .image {
        max-width: 100%;
        max-height: 100%;
      }
    }

    .detail {
      margin-left: 100px;
      .row {
        line-height: 20px;
        margin-bottom: 3px;
        overflow: hidden;

        .right {
          float: right;
        }

        .left {
          float: left;
          margin-right: 80px;
        }
      }
    }
  }
</style>
