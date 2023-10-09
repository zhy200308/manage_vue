import Vue from 'vue'
import VueRouter from 'vue-router'

import IndexView from "@/views/Manage.vue";
import Manage from "@/views/Manage.vue";
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {path: '/', name: '首页', redirect:"/home" ,component: ()=>import('../views/Manage.vue'),
    children:[
      {path: 'home', name: '首页' ,component: ()=>import('../views/Home.vue')},
      {path: 'User', name: '首页' ,component: ()=>import('../views/User.vue')}
    ]
  },]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//路由守卫
router.beforeEach((to,from,next) => {
  localStorage.setItem("currentPathName",to,name)
  store.commit("setPath")
  next()
})
export default router
