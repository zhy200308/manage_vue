// store/index.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPathName: '',
    currentPageName: '',
    breadcrumb: [],
  },
  mutations: {
    setPath(state) {
      state.currentPathName = localStorage.getItem("currentPathName");
    },
    setCurrentPageName(state, name) {
      state.currentPageName = name;
    },
    setBreadcrumb(state, breadcrumb) {
      state.breadcrumb = breadcrumb;
    },
  },
  actions: {},
  modules: {},
});
