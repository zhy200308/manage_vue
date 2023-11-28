<script >
import user from "@/views/User.vue";

export default {
  name:"HeaderBar",
  data(){
    return{
      // user:localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):{}
    }
  },

  props: {
    collapseBtnClass:String,
    collapse: Boolean, // 在这里接收 collapse 属性
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    breadcrumb() {
      return this.$store.state.breadcrumb;
    },
  },
  // mounted() {
  //   this.identifyCode = '';
  //   this.makeCode(this.identifyCodes, 4);
  //   document.addEventListener('keyup', this.enterKeyup);
  //
  //   // 从 localStorage 中获取用户信息
  //   const userJSON = localStorage.getItem("user");
  //   if (userJSON) {
  //     this.user = JSON.parse(userJSON);
  //   }
  // },
  methods: {

    toggleCollapse() {
      console.log('Logout method triggered');  // 添加这行来确认方法是否被触发
      this.$emit("toggle-collapse"); // 触发自定义事件 "toggle-collapse"
    },
    logout() {
      // 清除用户会话信息
      localStorage.removeItem('user');
      localStorage.removeItem('token'); // 清除用户数据和token

      this.$store.commit('clearToken'); // 清除 Vuex 中的 JWT（如果有）

      this.$store.commit('clearUser'); // 清除 Vuex 中的用户数据

      this.$message.success("退出成功");

      // 跳转到登录页面
      this.$router.replace('/login');
    },
    ToPerson() {
      // 检查当前路径是否已经是 '/person'
      if (this.$route.path !== '/person') {
        // 只有当当前路径不是 '/person' 时才进行跳转
        this.$router.push('/person');
      }
    },
  },

};
</script>

<template>

  <div style="font-size: 12px ;line-height: 60px;display: flex">
    <div style="flex: 1;font-size: 22px">
      <span :class="collapseBtnClass" style="cursor: pointer" @click="toggleCollapse"></span>

      <el-breadcrumb separator="/" style="display: inline-block; margin-left:20px">

        <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index" :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </el-breadcrumb>

    </div>

    <el-dropdown style="width: 150px ;cursor:pointer">
      <div style="display: inline-block">
        <img :src="user.avatarUrl" alt=""
        style="width: 30px;border-radius: 50%;position: relative;top: 10px;right: 5px">
        <i class="el-icon-arrow-down" style="font-size: 18px;color: #242525;font-weight: bolder"></i>
        <span style="color: #242525 ;font-size: 18px;font-family: 仿宋-GB2312 ;font-weight: bolder">{{user.nickname}}</span>
      </div>

      <el-dropdown-menu slot="dropdown" style="width: 100px;text-align: center">
        <el-dropdown-item style="font-size: 14px;padding: 5px 0">
          <span @click="ToPerson">个人信息</span>
        </el-dropdown-item>
        <el-dropdown-item style="font-size: 14px;padding: 5px 0"><span @click="logout">退出登录</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>


</template>

<style >

</style>
