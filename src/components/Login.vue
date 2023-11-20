<template>
    <el-form class="login-container" label-position="left"
             label-width="0px">
      <h3 class="login_title">系统登录</h3>
      <el-form-item>
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="loginForm.value" placeholder="权限选择">
          <el-option
            v-for="item in loginForm.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <h3 style="color: red">{{loginForm.msg}}</h3>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: deepskyblue;border: none" v-on:click="login">登录</el-button>
      </el-form-item>
      <el-form-item>
        <h3><router-link to="/enroll" style="text-decoration: none; color: deepskyblue">新用户注册</router-link></h3>
      </el-form-item>
    </el-form>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        NAME: '',
        msg: '',
        options: [{
          value: '1',
          label: '客户登录'
        }, {
          value: '3',
          label: '工作人员登录'
        }, {
          value: '2',
          label: '管理员登录'
        }],
        value: ''
      },
      responseResult: []
    }
  },
  methods: {
    login () {
      var _this = this
      _this.$store.commit('setphone', this.loginForm.username)
      this.$axios
        .post('/login', {
          phone: this.loginForm.username,
          password: this.loginForm.password,
          request: this.loginForm.value
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            _this.$store.commit('login', _this.loginForm)
            var path = this.$route.query.redirect
            this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
          } else {
            this.loginForm.msg = '账号或密码错误！'
            this.$router.replace({path: '/login'})
          }
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>

<style scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: deepskyblue;
}
</style>
