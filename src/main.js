import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../src/assets/gloable.css';
import request from '@/util/request'
import store from "@/store";


Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.$request = request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
