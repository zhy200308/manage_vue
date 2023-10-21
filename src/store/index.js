import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPathName: '',
    currentPageName: '',
    breadcrumb: [],
    user: JSON.parse(localStorage.getItem("user")) || {},
  },
  mutations: {
    clearToken(state) {
      state.token = null;
    },
    setPath(state) {
      state.currentPathName = localStorage.getItem("currentPathName");
    },
    setCurrentPageName(state, name) {
      state.currentPageName = name;
    },
    setBreadcrumb(state, breadcrumb) {
      state.breadcrumb = breadcrumb;
    },
    updateUser(state, newUser) {
      state.user = newUser;
      localStorage.setItem("user", JSON.stringify(newUser));
    },
  },
  actions: {},
  modules: {},
});
