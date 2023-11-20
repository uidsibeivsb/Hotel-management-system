<template>
  <el-menu
    :default-active="'/employeeInformation'"
    router
    active-text-color="red"
    class="categories">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      <i class="el-icon-menu"></i>
      {{ item.navItem }}
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'SideMenu',
  data () {
    return {
      navList: [
        {name: '/employeeInformation', navItem: '员工信息'},
        {name: '/customerInformation', navItem: '客户信息'},
        {name: '/hotelInformation', navItem: '酒店信息'},
        {name: '/roomInformation', navItem: '房间信息'},
        {name: '/dataPresentation', navItem: '销售统计'}
      ]
    }
  }
}
</script>

<style scoped>
.categories {
  position: fixed;
  margin-left: 50%;
  left: -600px;
  top: 180px;
  width: 150px;
}
button{
  background-color: white;
  border-style: none;
}
</style>
