
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import Vuex from 'vuex'
import projectrouter from './router'
import vueXmobile from 'vue-xmobile'
import store from './module/store'
import echarts from 'echarts'
import '@/assets/icons/index.js'
// import demorouter from '../node_modules/vue-xmobile/src/demos/routes.js'

let router = vueXmobile.getRouter()
router.addRoutes(projectrouter)
// router.addRoutes(demorouter)

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

Vue.use(Router)
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
