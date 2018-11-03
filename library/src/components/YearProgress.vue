<template>
  <div class="progress-bar">
    <progress :percent="persent" show-info="true"></progress>
    <p>{{ years }}已经过去的{{ days }}天</p>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        passDays: 0,
        currentPage: 82,
        totalPage: 1300
      }
    },
    methods: {
      isLeapTear: function () {
        const year = new Date().getFullYear()
        if (year % 400 === 0) {
          return true
        } else if (year % 4 === 0 && year % 100 !== 0) {
          return true
        } else {
          return false
        }
      },
      getDayOfYear: function () {
        return this.isLeapTear ? 366 : 365
      }
    },
    computed: {
      years: function () {
        return new Date().getFullYear()
      },
      days: function () {
        let start = new Date()
        start.setMonth(0)
        start.setDate(1)
        // start 是今年的第一天
        let current = new Date()
        return (current - start) / (1000 * 3600 * 24)
      },
      persent: function () {
        return (this.days * 100 / this.getDayOfYear()).toFixed(1)
      }
    }
  }
</script>
<style lang="scss">
  .progress-bar {
    width: 100%;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 40px;

    progress {
      margin-bottom: 10px;
    }
  }
</style>
