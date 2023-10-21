<script>
import security from '../util/SIdentify.vue'
export default {
  name:"Login",
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
          {min:3,max:8,message:'长度为3到8个字符',trigger:'blur'}
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
        this.login()
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
    login() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          if (!this.code) {
            this.$message.error("验证码错误");
            this.refreshCode(); // 刷新验证码
            return;
          }
          // 检查用户输入的验证码是否与服务器生成的验证码匹配
          if (this.code !== this.identifyCode) {
            this.$message.error("验证码错误");
            this.refreshCode(); // 刷新验证码
            return;
          }
          // 继续进行登录逻辑
          this.request.post("/user/login", this.user).then(res => {
            if (res.code ==='200') {
              localStorage.setItem("user",JSON.stringify(res.data))//将用户信息储存到浏览器
              this.$message.success("欢迎登录");
              this.$router.push({path:'/'}).then(()=>{
                window.location.reload();
              });

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
    <div style="margin: 150px auto;background-color: #fff;width: 310px;height: 330px;padding: 20px;border-radius: 10px ">
      <div class="title-container " style="margin: 20px 0">
        <h3 class="title" style="text-align: center ;font-size: 20px ;margin: 0px ;padding-top: 0px ;font-family: 方正小标宋_GBK ;color:rgb(36,37,37)" >后台管理系统</h3>
      </div>
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item prop="username">
          <el-input  size="medium" style="margin: 5px 0" prefix-icon="el-icon-user" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input  size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
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
        <el-button type="primary" size="medium" autocomplete="off" style="border-radius: 10px" @click="login">登录</el-button>
        <el-button type="success" size="medium" autocomplete="off" style="border-radius: 10px" @click="$router.push('/register')">注册</el-button>
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
