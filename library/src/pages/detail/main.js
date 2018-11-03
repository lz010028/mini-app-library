import Vue from 'vue'
import Detail from './index'

Vue.config.productionTip = false

const app = new Vue(Detail)

app.$mount()

export default {
  config: {
    enablePullDownRefresh: true
  }
}
