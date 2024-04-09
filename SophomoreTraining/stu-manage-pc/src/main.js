import Vue from 'vue'
import ElementUI from 'element-ui'
import './assets/styles/reset.css'
import './assets/styles/base.css'
import 'element-ui/lib/theme-chalk/index.css'
import Moment from 'moment'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import store from './store'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)

const echarts = require('echarts');
Vue.prototype.$echarts = echarts
Vue.prototype.$moment = Moment

new Vue({
  router,
  store,
  render: h => h(App),
  comments: {App},
  template: '<App>'
}).$mount('#app')
