<template>
  <div>
    <el-button class="bu" style="display: inline;background-color: deepskyblue" @click="dialogFormVisible = true">添加</el-button>
    <el-dialog
      title="房间信息添加"
      :visible.sync="dialogFormVisible">
      <el-form style="text-align: left" ref="dataForm">
        <el-form-item>
          <el-form-item label="房间号" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="form.number" autocomplete="off" style="margin-left: "></el-input>
          </el-form-item>
          <el-form-item label="房间类型" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="form.type" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="房间数" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="form.pcount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="床数" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="form.bcount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="form.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="form.rinformation" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="酒店ID" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="form.hid" autocomplete="off"></el-input>
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
export default {
  name: 'AddRoom',
  data () {
    return {
      dialogFormVisible: false,
      room: [],
      formLabelWidth: '120px',
      form: {
        number: '',
        type: '',
        pcount: '',
        bcount: '',
        price: '',
        rinformation: '',
        hid: ''
      }
    }
  },
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
        .post('/addRoom', {
          number: this.form.number,
          type: this.form.type,
          pcount: this.form.pcount,
          bcount: this.form.bcount,
          price: this.form.price,
          rinformation: this.form.rinformation,
          hid: this.form.hid
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('onSubmit')
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
