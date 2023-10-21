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
    redirect:'/home',
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
      {
        path: 'files',
        name: '文件管理',
        component: () => import('../views/Files.vue'),
        meta: {
          breadcrumb: [
            { name: '系统管理', path: '/' }, // Update the breadcrumb path to match the root path
            { name: '文件管理', path: 'files' }, // Use 'user' as the path

          ],
        },
      },


      {
        path: 'person',
        name: '个人信息',
        component: () => import('../views/Person.vue'),
        meta: {
          breadcrumb: [
            { name: '主页', path: '/' }, // Update the breadcrumb path to match the root path
            { name: '个人信息', path: 'person' }, // Use 'user' as the path

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
  {
    path: '/register',
    name: '注册',
    component: () => import('../views/Register.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  // const isUserLoggedIn = !!localStorage.getItem('user');
  //
  // if (to.path !== '/login' && !isUserLoggedIn) {
  //   // 如果用户未登录且不在登录页面，重定向到登录页面
  //   next('/login');
  // } else if (to.path === '/login' && isUserLoggedIn) {
  //   // 如果用户已登录且访问登录页面，重定向到主页
  //   next('/');
  // }else if (to.path!== '/register' && isUserLoggedIn) {
  //   // 如果用户未登录且访问注册页面，重定向到主页或其他适当的页面
  //   next('/register');
  // }else {
    // 其他情况正常跳转
    localStorage.setItem("currentPathName", to.path);
    store.commit("setPath");
    store.commit("setCurrentPageName", to.name);
    store.commit("setBreadcrumb", to.meta.breadcrumb);
    next();
  // }
});


export default router;
