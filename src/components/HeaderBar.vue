<script >
import user from "@/views/User.vue";

export default {
  name:"HeaderBar",
  data(){
    return{
      user:localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):{}
    }
  },
  props: {
    collapseBtnClass:String,
    collapse: Boolean, // 在这里接收 collapse 属性
  },
  computed: {
    breadcrumb() {
      return this.$store.state.breadcrumb;
    },
  },

  methods: {

    toggleCollapse() {
      console.log('Logout method triggered');  // 添加这行来确认方法是否被触发
      this.$emit("toggle-collapse"); // 触发自定义事件 "toggle-collapse"
    },
    logout() {
      // 清除用户会话信息
      localStorage.removeItem('user');
      this.$message.success("退出成功");
      // 跳转到登录页面
      this.$router.replace('/login');
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
        <i class="el-icon-arrow-down" style="margin-right: 15px  ;font-size: 18px;color: #242525;font-weight: bolder"></i>
        <span style="color: #242525 ;font-size: 18px;font-family: 仿宋-GB2312 ;font-weight: bolder">{{user.nickname}}</span>
      </div>

      <el-dropdown-menu slot="dropdown" style="width: 100px;text-align: center">
        <el-dropdown-item style="font-size: 14px;padding: 5px 0">个人信息</el-dropdown-item>
        <el-dropdown-item style="font-size: 14px;padding: 5px 0"><span @click="logout">退出登录</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>


</template>

<style >

</style>
