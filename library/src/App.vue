<script>
  export default {
    async created () {
    /**
    *  const res = await get('/weapp/demo')
    *  console.log('小程序启动了')
    * */
    },
    methods: {
    }
  }
</script>
<style lang="scss">

  .page-title {
    line-height: 40px;
    font-size: 14px;
    padding-left: 10px;
    margin: 0;
  }
  .right {
    float: right;
  }

  .btn {
    color: white;
    background: #ea5a49;
    margin-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 4px;
    font-size: 16px;
    line-height: 40px;
    height: 40px;
    width: 100%;

    &:active {
      background: #fa5a49;
    }
  }

  .text-primary {
    color: #ea5149;
  }

  .text-foot {
    line-height: 3em;
    font-size: 12px;
    text-align: center;
  }
  
  .btn {
    color: #fff;
    line-height: 35px;
    text-align: center;
    
    &.btn-long {
      width: 80%;
    }
    
    &.btn-active {
      background: #ea5149;
    }
  }
</style>
