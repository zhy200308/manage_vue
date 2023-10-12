import Vue from 'vue';
import VueRouter from 'vue-router';

import IndexView from "@/views/Manage.vue";
import Manage from "@/views/Manage.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: '主页',

    component: () => import('../views/Manage.vue'),
    children: [
      {
        path: 'home',
        name: '主页',
        component: () => import('../views/Home.vue'),
        meta: {
          breadcrumb: [
            { name: '主页', path: 'home' },
          ],
        },
      },
      {
        path: 'user',
        name: '用户管理',
        component: () => import('../views/User.vue'),
        meta: {
          breadcrumb: [
            { name: '系统管理', path: '/' }, // Update the breadcrumb path to match the root path
            { name: '用户管理', path: 'user' }, // Use 'user' as the path
          ],
        },
      },
    ],
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const isUserLoggedIn = !!localStorage.getItem('user');

  if (to.path !== '/login' && !isUserLoggedIn) {
    // 如果用户未登录且不在登录页面，重定向到登录页面
    next('/login');
  } else if (to.path === '/login' && isUserLoggedIn) {
    // 如果用户已登录且访问登录页面，重定向到主页
    next('/');
  } else {
    // 其他情况正常跳转
    localStorage.setItem("currentPathName", to.path);
    store.commit("setPath");
    store.commit("setCurrentPageName", to.name);
    store.commit("setBreadcrumb", to.meta.breadcrumb);
    next();
  }
});


export default router;
