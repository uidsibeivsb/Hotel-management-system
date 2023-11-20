<template>
  <div>
    <el-button class="bu" style="display: inline" @click="dialogFormVisible = true">更 改</el-button>
    <el-dialog
      title="员工信息更改"
      :visible.sync="dialogFormVisible">
      <el-form style="text-align: left" ref="dataForm">
        <el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="employ.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="employ.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="employ.sex" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="employ.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="employ.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="employ.position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属酒店" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="employ.hotelname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="薪资" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="employ.salary" autocomplete="off"></el-input>
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
  name: 'EditEmployee',
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
        position: '',
        salary: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value2: ''
    }
  },
  mounted: function () {
  },
  computed: mapState(['employ']),
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
      console.log(this.employ.id)
      this.$axios
        .post('/updateStaff', {
          id: this.employ.id,
          name: this.employ.name,
          password: this.employ.password,
          sex: this.employ.sex,
          phone: this.employ.phone,
          email: this.employ.email,
          position: this.employ.position,
          salary: this.employ.salary,
          hotelName: this.employ.hotelname
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
