<template>
  <div class="swiper">
    <swiper
      :indicator-dots="true"
      indicator-active-color="#ea5a49"
      :autoplay="true"
      current="0"
      interval="6000"
      duration="1000"
      :circular="true"
    >
      <div v-for="(item, index) in imgUrls" :key="index">
        <swiper-item>
          <img mode="aspectFit"
               class="slide-image"
               @click="handleDetailBook(it)"
               :src="it.image"
               v-for="(it, idx) in item"
               :key="idx" alt="">
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
  export default {
    props: ["topBooks"],
    computed: {
      imgUrls () {
        let res = this.topBooks;
        return [res.slice(0, 3), res.slice(3, 6), res.slice(6)];
      }
    },
    methods: {
      handleDetailBook(data) {
        wx.navigateTo({
          url: "/pages/detail/main?id=" + data.id
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .swiper {
    margin-top: 5px;

    .slide-image {
      width: 33%;
      height: 250 rpx;
    }
  }
</style>

