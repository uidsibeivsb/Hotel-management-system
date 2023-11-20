<template>
  <div>
    <el-button class="bu" style="display: inline" @click="dialogFormVisible = true">更 改</el-button>
    <el-dialog
      title="房间信息更改"
      :visible.sync="dialogFormVisible">
      <el-form style="text-align: left" ref="dataForm">
        <el-form-item>
          <el-form-item label="房间号" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="Room.number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="房间类型" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="Room.type" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="房间数" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="Room.pcount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="床数" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="Room.bcount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="Room.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth" prop="abs">
            <el-input type="text" v-model="Room.rinformation" autocomplete="off"></el-input>
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
import {mapState} from 'vuex'
export default {
  name: 'EditRoom',
  data () {
    return {
      dialogFormVisible: false,
      room: [],
      formLabelWidth: '120px',
      form: {
        id: '',
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
  computed: mapState(['Room']),
  methods: {
    onSubmit () {
      this.$axios
        .post('/updateRoom', {
          id: this.Room.id,
          number: this.Room.number,
          type: this.Room.type,
          pcount: this.Room.pcount,
          bcount: this.Room.bcount,
          price: this.Room.price,
          rinformation: this.Room.rinformation,
          hid: this.Room.hid
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
