import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import './assets/styles/base.css'
import './assets/styles/normalize.css'
import router from './router'
import store from './store'


Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)

new Vue({
  router,
  store,
  render: h => h(App),
  comments: {App},
  template: '<App>',
}).$mount('#app')
