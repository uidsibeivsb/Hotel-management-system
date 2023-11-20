<template>
  <div>
    <el-button class="bu" style="display: inline" @click="dialogFormVisible = true">更 改</el-button>
    <el-dialog
      title="酒店信息更改"
      :visible.sync="dialogFormVisible">
      <el-form style="text-align: left" ref="dataForm">
        <el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="hotel.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="hotel.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="hotel.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth" prop="abs">
            <el-input type="textarea" v-model="hotel.describe" autocomplete="off"></el-input>
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
  name: 'EditHotel',
  data () {
    return {
      dialogFormVisible: false,
      room: [],
      formLabelWidth: '120px',
      form: {
        id: '',
        name: '',
        phone: '',
        address: '',
        describe: '',
        pohotoaddress: ''
      }
    }
  },
  computed: mapState(['hotel', 'Phone']),
  mounted: function () {
  },
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
        .post('/updateHotel', {
          id: this.hotel.id,
          name: this.hotel.name,
          phone: this.hotel.phone,
          address: this.hotel.address,
          describ: this.hotel.describe,
          photoaddress: this.hotel.photoaddress,
          aphone: this.Phone
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('onSubmit')
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
