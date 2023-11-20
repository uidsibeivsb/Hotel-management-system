<template>
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">我的预定</h3>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        label="操作时间"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="预订时间"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.orderTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="截止时间"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.totime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="名称"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.hotel }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="房间号"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.room }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="地址"
        width="350">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="choose"
        label="操作"
      width="180">
        <template slot-scope="scope">
          <el-button class="sch" @click="delt(scope.row.id)">退订</el-button>
          <el-button class="sch" @click="edit(scope.row.id)"><EditRoom></EditRoom></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script>
import EditRoom from './EditRoom'
export default {
  name: 'Person',
  components: {EditRoom},
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    edit (id) {
      console.log(id)
      this.$store.commit('setperson', id)
    },
    delt (id) {
      console.log(id)
      this.$confirm('此操作将永久删除该预订, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('/deleteOrder', {id: id}).then(resp => {
            if (resp && resp.status === 200) {
              this.loadorder()
            }
          })
      }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    loadorder () {
      var _this = this
      this.$axios.post('/returnOrders').then(resp => {
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
  margin: 90px auto;
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
  float: right;
  width: 70px;
  height: 40px;
  padding: 0px;
  border-style: none;
}
</style>
