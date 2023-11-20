<template>
  <div>
    <el-button class="bu" style="display: inline" @click="dialogFormVisible = true">更 改</el-button>
    <el-dialog
      title="客户信息更改"
      :visible.sync="dialogFormVisible">
      <el-form style="text-align: left" ref="dataForm">
        <el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="customer.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="customer.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="customer.sex" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="customer.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="customer.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="customer.IDcard" autocomplete="off"></el-input>
          </el-form-item>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'EditCustomer',
  data () {
    return {
      dialogFormVisible: false,
      room: [],
      formLabelWidth: '120px',
      form: {
        id: '',
        name: '',
        password: '',
        sex: '',
        phone: '',
        email: '',
        IDcard: ''
      }
    }
  },
  mounted: function () {
  },
  computed: mapState(['customer']),
  methods: {
    loadp () {
      var _this = this
      this.$axios.post('/rooms', {
        cid: _this.form.cid
      }).then(resp => {
        if (resp && resp.status === 200) {
          _this.room = resp.data
          console.log(_this.room)
        }
      })
    },
    onSubmit () {
      this.$axios
        .post('/updateUser', {
          id: this.customer.id,
          name: this.customer.name,
          password: this.customer.password,
          sex: this.customer.sex,
          phone: this.customer.phone,
          email: this.customer.email,
          idcard: this.customer.IDcard
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('onSubmit')
            this.loadp()
          } else {
            this.loadp()
          }
        })
    }
  }
}
</script>

<style scoped>
.bu{
  width: 65px;
  height: 40px;
  padding: 0px;
  border-style: none;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
</style>
