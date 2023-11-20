<template>
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">客户信息</h3>
    <el-button style="float: right" class="sch"><AddCustomer></AddCustomer></el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        label="ID"
        width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="密码"
        width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="性别"
        width="70">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="手机号"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="邮箱"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-colum
        label="身份证"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.idcard }}</span>
        </template>
      </el-table-colum>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button class="sch" @click="edit(scope.row)"><EditCustomer></EditCustomer></el-button>
          <el-button class="sch1" @click="delt(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script>
import AddCustomer from './AddCustomer'
import EditCustomer from './EditCustomer'
export default {
  name: 'CustomerInformation',
  components: {AddCustomer, EditCustomer},
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    edit (item) {
      console.log(item)
      this.$store.commit('setcustomer', item)
    },
    delt (id) {
      console.log(id)
      this.$confirm('此操作将永久删除该客户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('/delete1', {id: id}).then(resp => {
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
      this.$axios.post('/returnUser').then(resp => {
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
  float: right;
  width: 70px;
  height: 40px;
  padding: 0px;
  border-style: none;
}
.sch1{
  float: right;
  width: 70px;
  height: 40px;
  padding: 0px;
  border-style: none;
  background-color: red;
}
</style>
