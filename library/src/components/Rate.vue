<template>
  <div class="rate">
    <span>☆☆☆☆☆</span>
    <div class="cover" :style="style">
      ★★★★★
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      value: {type: ['Number', 'String'], default: '0'}
    },
    computed: {
      style: function () {
        return `width: ${this.value * 10}%;`
      }
    }
  }
</script>
<style lang="scss" scoped>
  .rate {
    position: relative;
    display: inline-block;
    letter-spacing: 0;

    .cover {
      top: 0;
      left: 0;
      width: 0;
      overflow: hidden;
      position: absolute;
      display: inline-block;
    }
  }
</style>
