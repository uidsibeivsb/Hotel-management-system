<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
      <Side></Side>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import Side from './Side'
export default {
  name: 'AdministratorIndex',
  components: {Side}
}
</script>

<style scoped>

</style>
