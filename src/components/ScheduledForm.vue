<template>
  <div>
    <el-button class="bu" style="display: inline" @click="dialogFormVisible = true">预 订</el-button>
    <el-dialog
      title="酒店预定"
      :visible.sync="dialogFormVisible">
      <el-form style="text-align: left" ref="dataForm">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in IMG" :key="item.src">
            <img :src="item" alt="" width="300px" height="200px">
          </el-carousel-item>
        </el-carousel>
        <el-form-item>
          <h2 align="center">{{hr.hotelname}}</h2>
          <h3>联系方式：{{hr.phone}}</h3>
          <h3>地址：{{hr.address}}</h3>
          <h3>请选择入住时间：</h3>
          <div class="block">
            <el-date-picker
              v-model="value2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <br>
          <el-button @click="loadorder">查询可预订房间</el-button>
        </el-form-item>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            label="房间号"
            width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.number }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="类别"
            width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="价格"
            width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="容纳人数"
            width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.pcount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="床数"
            width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.bcount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="描述"
            width="300">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.rinformation }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.state }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="choose"
            label="操作">
            <template slot-scope="scope">
              <el-checkbox @change="out(scope.row)" label="选择" border></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
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
  name: 'ScheduledForm',
  data () {
    return {
      dialogFormVisible: false,
      room: [],
      form: {
        id: '',
        phone: '',
        address: '',
        price: '',
        time: '',
        hotelname: '',
        cid: '',
        number: ''
      },
      listroom: [],
      tableData: [],
      IMG: [
        require('../assets/1.jpg'),
        require('../assets/2.jpg'),
        require('../assets/3.jpg'),
        require('../assets/4.jpg')
      ],
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
  computed: mapState(['hr', 'Phone']),
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
      console.log(this.$store.state.hr.id)
      this.$axios.post('/returnRoomById', {
        hid: this.$store.state.hr.id
      }).then(resp => {
        if (resp && resp.status === 200) {
          _this.tableData = resp.data
          console.log(_this.tableData)
        }
      })
    },
    out (item) {
      var flag = 1
      if (flag === 0) {
        for (var i = 0; i < this.listroom.length; i++) {
          if (this.listroom[i] === item.id) {
            this.listroom[i] = ''
          }
        }
        flag = 1
      } else {
        console.log(this.listroom)
        this.listroom.push(item.id)
        flag = 0
      }
    },
    onSubmit () {
      console.log(this.value2)
      this.$axios
        .post('/addOrder', {
          rid: this.listroom,
          phone: this.$store.state.Phone,
          time: this.value2
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
  width: 50px;
  height: 30px;
  padding: 0px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
