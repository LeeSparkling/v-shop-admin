import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入全局css文件
import './assets/css/style.css'
//引入element.js
import './plugins/element'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
