<template>
  <el-menu
    :default-active="'/administrator'"
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
  name: 'Side',
  data () {
    return {
      navList: [
        {name: '/administrator', navItem: '预订信息'},
        {name: '/checkedIn', navItem: '入住信息'},
        {name: '/checkout', navItem: '退房名单'}
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
