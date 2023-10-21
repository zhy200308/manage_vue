<template>
  <el-menu :default-openeds="['1', '3']" style="min-height: 100vh;overflow-x: hidden"
           background-color="rgb(48,65,86)"
           text-color="#fff"
           active-text-color="#00EEF2"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div style="height: 60px;line-height: 60px ;text-align: center" >
      <img :src="logoPath" style="width: 40px;position: relative;top: 15px;margin-right: 5px ;">
      <b style="color: white;font-family: 方正小标宋_GBK ;font-size: 17px" v-show="logoTextShow" >{{Titles}}</b>
    </div>


    <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>
      <span>主页</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/user">
        <i class="el-icon-menu"></i>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="/files">
        <i class="el-icon-folder-opened"></i>
        <span>文件管理</span>
      </el-menu-item>
    </el-submenu>

  </el-menu>



</template>
<style scoped>

</style>

<script>
export default {
  name:"Aside",
  props: {
    sideWidth: Number,
    isCollapse:Boolean,
    logoPath:String,
    logoTextShow:Boolean,
    Titles:String
  },

};
</script>
