<template>
  <el-container style="height:100vh;">
    <el-aside :width="sideWidth+'px'" style="background-color: rgb(238, 241, 246);height: 100%">
      <AsideMenu :logoTextShow="logoTextShow" :logoPath="logoPath" :isCollapse="isCollapse" :Titles="Titles" :EditMsg="EditMsg" />
    </el-aside>

    <el-container>
      <el-header style ="border-bottom: 1px solid #ccc;">
        <HeaderBar :collapseBtnClass="collapseBtnClass" :collapse="isCollapse" @toggle-collapse="toggleCollapse" />

      </el-header>

      <el-main style="overflow: auto;">

        <!--展示当前页面的子路由-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
.headerBg{
  background:#47CDE6 !important;
}
.el-table-column{
  color: #ffffff;
}
.el-aside {
  color: #333;
}

</style>

<script>






import AsideMenu from "@/components/Aside.vue";
import HeaderBar from "@/components/HeaderBar.vue";

export default {
  name:"Manage",
  components:{
    HeaderBar,
    AsideMenu,
  },
  data() {
    return {

      collapseBtnClass:'el-icon-s-fold',
      isCollapse:false,
      sideWidth:200,
      Titles:'飞猪云管理系统',
      logoTextShow:true,
      logoPath: require('@/assets/logo.png'),


    }
  },

  // created() {
  //   this.load()
  // },
  methods:{
    EditMsg(){

    },

    toggleCollapse() {
      this.isCollapse = !this.isCollapse; // 切换折叠状态
      if (this.isCollapse) {
        this.sideWidth = 64;
        this.collapseBtnClass = 'el-icon-s-unfold';
        this.logoTextShow = false;
      } else {
        this.sideWidth = 200;
        this.collapseBtnClass = 'el-icon-s-fold';
        this.logoTextShow = true;
      }
    },



  }
}
</script>
