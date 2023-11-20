<!--suppress ALL -->
<template>
  <el-menu
    :default-active="'/index'"
    router
    mode="horizontal"
    background-color="white"
    text-color="#222"
    active-text-color="red"
    style="min-width: 1200px">
    <p style="align-items: center;font-size: 30px">酒店管理系统</p>
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>
    <a href="/login" style="color: #222;float: right;padding: 20px;">登录</a>
    <a href="/person" style="color: #222;float: right;padding-top: 20px;"><img src="../assets/img.png" width="35px" height="30px" alt=""></a>
  </el-menu>
</template>
<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      navList: [
        {name: '/index', navItem: '首页'},
        {name: '/workers', navItem: '管理员'},
        {name: '/administrator', navItem: '工作人员'}
      ]
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}

span {
  pointer-events: none;
}

p{
  margin: 0px;
}
</style>
