// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import * as echarts from 'echarts'

Vue.use(echarts)
Vue.prototype.$echarts = echarts

var axios = require('axios')
axios.defaults.baseURL = 'http://172.21.120.25:8443/api'
// axios.defaults.withCredentials = true
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false /* 阻止vue 在启动时生成生产提示 */

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.username) {
      next()
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
}
)

/* eslint-disable no-new */
new Vue({
  el: '#app', /* 连接index.html */
  render: h => h(App),
  router,
  store,
  components: {App},
  template: '<App/>'
})
