<script >
export default {
  name:"HeaderBar",
  props: {
    collapseBtnClass:String,
    collapse: Boolean, // 在这里接收 collapse 属性
  },
  computed: {
    currentPathName() {
      return this.$store.state.currentPathName;
    },
  },
  watch: {
    currentPathName(newVal, oldVal) {
      console.log(newVal);
      // 在这里可以执行当 currentPathName 变化时的逻辑
    },
  },
  methods: {

    toggleCollapse() {
      this.$emit("toggle-collapse"); // 触发自定义事件 "toggle-collapse"
    },
    // 其他方法和内容
  },
};
</script>

<template>

  <div style="font-size: 12px ;line-height: 60px;display: flex">
    <div style="flex: 1;font-size: 22px">
      <span :class="collapseBtnClass" style="cursor: pointer" @click="toggleCollapse"></span>
      <el-breadcrumb separator="/" style="display: inline-block; margin-left:20px  ">
        <el-breadcrumb-item :to="'/'"  >主页</el-breadcrumb-item>
        <el-breadcrumb-item>{{currentPathName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-dropdown style="width: 100px ;cursor:pointer">
      <i class="el-icon-arrow-down" style="margin-right: 15px  ;font-size: 18px;color: #242525;font-weight: bolder"></i>
      <span style="color: #242525 ;font-size: 18px;font-family: 仿宋-GB2312 ;font-weight: bolder">王小虎</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
        <el-dropdown-item>注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>


</template>

<style >

</style>
