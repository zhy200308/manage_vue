<script>
import security from '../util/SIdentify.vue'
export default {
  name:"Register",
  components: {
    security
  },
  data(){
    return{
      user:{},
      code:'',
      identifyCodes:'1234567890abcdefghijklmnopqrstuvwxyz',
      identifyCode:'',
      checked:false,
      rules:{
        username:[
          {required:true,message:'请输入用户名',trigger:'blur'},
          {min:3,max:8,message:'长度为3到8个字母',trigger:'blur'}
        ],nickname:[
          {required:true,message:'请输入中文昵称',trigger:'blur'},
        ], password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 30, message: '密码为8到30个字符', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/;
              if (regex.test(value)) {
                callback();
              } else {
                callback(new Error('密码必须包含大写英文字母、小写英文字母和数字'));
              }
            },
            trigger: 'blur'
          }
        ],confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 8, max: 30, message: '密码为8到30个字符', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/;
              if (regex.test(value)) {
                callback();
              } else {
                callback(new Error('密码必须包含大写英文字母、小写英文字母和数字'));
              }
            },
            trigger: 'blur'
          }
        ],email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: '请输入有效的邮箱地址',
            trigger: 'blur'
          }
        ]

      }
    }
  },
  mounted() {
    this.identifyCode=''
    this.makeCode(this.identifyCodes,4)
    document.addEventListener('keyup', this.enterKeyup)
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.enterKeyup)
  },
  methods: {
    enterKeyup(e) {
      if (e.keyCode === 13) {
        this.register()
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ]
      }
    },
    register() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          if (!this.code) {
            this.$message.error("请输入验证码");
            return;
          }
          // 检查用户输入的验证码是否与服务器生成的验证码匹配
          if (this.code !== this.identifyCode) {
            this.$message.error("验证码错误");
            return;
          }
          if(this.user.confirmPassword!==this.user.password){
            this.$message.error("两次输入密码不一致")
            return false;
          }
          // 继续进行注册逻辑
          this.request.post("/user/register", this.user).then(res => {
            if (res.code ==='200') {
              // localStorage.setItem("user",JSON.stringify(res.data))//将用户信息储存到浏览器
              this.$message.success("注册成功");
              this.$router.push('/login');
            } else {
              this.$message.error(res.msg);

            }
          });
        } else {
          return false;
        }
      });

    }

  }
}
</script>

<template>
  <div class="wrapper">
    <div style="margin: 100px auto;background-color: #fff;width: 350px;height: 500px;padding: 20px;border-radius: 10px ">
      <div class="title-container " style="margin: 10px 0">
        <h3 class="title" style="text-align: center ;font-size: 25px ;margin: 0px ;padding-top: 0px ;font-family: 方正小标宋_GBK ;color:rgb(36,37,37)" >后台管理系统</h3>
      </div>
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" size="medium" style="margin: 3px 0" prefix-icon="el-icon-user" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input placeholder="请输入昵称" size="medium" style="margin: 3px 0 " prefix-icon="el-icon-suitcase" v-model="user.nickname"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" size="medium" style="margin: 3px 0" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input placeholder="确认密码" size="medium" style="margin: 3px 0" prefix-icon="el-icon-lock" show-password v-model="user.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input placeholder="请输入邮箱" size="medium" style="margin: 3px 0 " prefix-icon="el-icon-message" v-model="user.email"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="14"
          ><el-input
              placeholder="验证码"
              v-model="code"
              clearable
              prop="security"
          >
          </el-input>
          </el-col>
          <el-col :span="10">
            <div class="code" @click="refreshCode">
              <security :identifyCode="identifyCode"></security>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div style="margin: 10px 0;text-align: center">
        <el-button type="primary" size="medium" autocomplete="off" style="border-radius: 10px" @click="register">注册</el-button>
        <el-button type="success" size="medium" autocomplete="off" style="border-radius: 10px" @click="$router.push('/login')">返回登录</el-button>
      </div>
    </div>
  </div>
</template>

<style >
.wrapper{
  height: 100vh;
  background-image: linear-gradient(to bottom right,#FC466B,#3F5EFB);
  overflow: hidden;
}
</style>
