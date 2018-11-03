<template>
  <div>
      <TopSwiper :topBooks="tops"></TopSwiper>
      <Card v-for="(item, index) in books" :key="index" :book="item"></Card>
      <p class="text-foot" v-if="!more">没有更多数据</p>
  </div>
</template>
<script>
  import {get} from '@/util'
  import Card from '@/components/Card.vue'
  import TopSwiper from '@/components/TopSwiper.vue'
  export default {
    components: {
      Card,
      TopSwiper
    },
    data () {
      return {
        books: [],
        page: 0,
        more: true,
        tops: []
      }
    },
    methods: {
      async getBooks (init) {
        wx.showNavigationBarLoading()
        const books = await get('/weapp/getbooks', {page: this.page})
        if (books.list.length < 10 && this.page > 0) {
          this.more = false
        }
        if (init) {
          this.init = 0
          this.more = true
          this.books = books.list
          wx.stopPullDownRefresh()
        } else {
        // 下拉刷新books 数组拼接
          this.books = this.books.concat(books.list)
        }
        wx.hideNavigationBarLoading()
      },
      async getTop () {
        const tops = await get('/weapp/top')
        this.tops = tops.list
        console.log(this.tops)
      }
    },
    onPullDownRefresh () {
      this.getBooks(true)
      this.getTop()
    },
    onReachBottom () {
      console.log('到底了')
      if (!this.more) {
        return false
      }
      this.page += 1
      this.getBooks()
    },
    onShow () {
      this.getBooks(true)
      this.getTop()
    }
  }
</script>
<style></style>
