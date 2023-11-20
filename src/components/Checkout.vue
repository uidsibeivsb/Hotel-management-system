<template>
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">已退房名单</h3>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        label="入住时间"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.intime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="截至日期"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.outtime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="客户姓名"
        width="140">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="客户电话"
        width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="名称"
        width="140">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.hotel }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="房间号"
        width="140">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.room }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="办理人"
        width="140">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.people }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script>
export default {
  name: 'Checkout',
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    loadorder () {
      var _this = this
      this.$axios.post('/returnoutHotel').then(resp => {
        if (resp && resp.status === 200) {
          _this.tableData = resp.data
          console.log(_this.tableData)
        }
      })
    }
  },
  data () {
    return {
      tableData: []
    }
  },
  mounted: function () {
    this.loadorder()
  }
}
</script>

<style scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: auto;
  width: 900px;
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
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.sch{
  width: 70px;
  height: 40px;
  padding: 0px;
  float: right;
}
</style>
