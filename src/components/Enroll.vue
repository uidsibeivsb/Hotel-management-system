<template>
  <el-form class="login-container" label-position="left" label-width="0px">
    <h3 class="login_title">用户注册</h3>
    <el-form-item>
      <el-input type="text" name="must" v-model.trim="EnrollForm.username" auto-complete="off" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" name="must" v-model.trim="EnrollForm.sex" auto-complete="off" placeholder="性别"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" name="must" v-model.trim="EnrollForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" name="must" v-model.trim="EnrollForm.phone" auto-complete="off" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" name="must" v-model.trim="EnrollForm.idcard" auto-complete="off" placeholder="身份证号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" name="must" v-model.trim="EnrollForm.email" auto-complete="off" placeholder="邮箱号"><template slot="append">.com</template></el-input>
    </el-form-item>
    <el-form-item>
      <el-h3 style="color: red">{{EnrollForm.msg}}</el-h3>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: deepskyblue;border: none" v-on:click="Enroll">注册并登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Enroll',
  data () {
    return {
      EnrollForm: {
        username: '',
        password: '',
        phone: '',
        email: '',
        address: '',
        sex: '',
        idcard: ''
      },
      responseResult: []
    }
  },
  methods: {
    Enroll () {
      var dp = document.getElementsByName('must')
      var countj = 0
      for (var i = 0; i < dp.length; i++) {
        if (dp[i].value === '') {
          countj++
        }
      }
      console.log(dp.length, countj)
      console.log(this.EnrollForm.username)
      console.log(this.EnrollForm.password)
      console.log(this.EnrollForm.phone)
      console.log(this.EnrollForm.email)
      console.log(this.EnrollForm.address)
      console.log(this.EnrollForm.sex)
      if (countj > 0) {
        alert('用户名或密码不能为空！')
      } else {
        this.$axios
          .post('/enroll1', {
            name: this.EnrollForm.username,
            password: this.EnrollForm.password,
            phone: this.EnrollForm.phone,
            email: this.EnrollForm.email,
            sex: this.EnrollForm.sex,
            idcard: this.EnrollForm.idcard
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              this.$router.replace({path: '/index'})
            } else {
              this.EnrollForm.msg = '请正确填写账号和密码！'
              this.$router.replace({path: '/enroll'})
            }
          })
          .catch(failResponse => {
          })
      }
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
