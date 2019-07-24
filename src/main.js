// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import  { routes } from './routes'
Vue.use(VueRouter)

Vue.config.productionTip = false
const router = new VueRouter({
  mode:'hash',
  routes,

})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
});

