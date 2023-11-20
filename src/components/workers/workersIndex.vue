<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
      <SideMenu></SideMenu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import SideMenu from './SideMenu'
export default {
  name: 'workersIndex',
  components: {SideMenu}
}
</script>

<style scoped>

</style>
