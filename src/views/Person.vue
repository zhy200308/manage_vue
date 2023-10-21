<script >
export default {
  name:'Person',
  data(){
    return{
      imageUrl: '',
      form:{},
      user:localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):{}

    }
  },
  created() {
    // 请替换下面的 URL 为正确的后端接口路径
    this.request.get("/user/username/" + this.user.username).then(res => {
      if (res.code === '200') {
        this.form = res.data;
      }
    });
  },
  methods: {
    save() {
      this.request.post('/user', this.form).then((res) => {
        if (res) {
          this.$message.success('保存成功');
          this.$store.commit('updateUser', { ...this.$store.state.user, ...this.form });
        } else {
          this.$message.error('保存失败');
        }
      });
    },
    handleAvatarSuccess(res) {
      this.form.avatarUrl=res;
    },

  }
}

</script>

<template>
  <el-card style="width: 500px;">

    <el-form  label-width="80px" size="small">
      <el-upload
          class="avatar-uploader"
          action="http://localhost:8081/files/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          v-tooltip="'点击修改头像'" >
        <img v-if="form.avatarUrl" :src="form.avatarUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <el-form-item label="用户名" >
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" label-width="80px">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" >
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" >
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="save">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style >
.avatar-uploader{
  text-align: center;
  padding-bottom: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
