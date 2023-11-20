<template>
  <el-card class="trainsNumber">
    <div>
      <el-card class="carNumber-card">
        <div style="font-size: 18px">酒店销售统计</div>
        <div>
          <div ref="main" id="myLine" style="width: 100%; height: 250px"></div>
        </div>
      </el-card>
    </div>
  </el-card>

</template>

<script>
export default {
  name: 'DataPresentation',
  data () {
    return {
      myLine_option: {
        title: {
          text: '',
          x: '100px'
        },
        tooltip: {trigger: 'axis'},
        legend: {
          orient: 'horizontal',
          x: 'right',
          y: 'top',
          data: ['酒店入住流水']
        },
        grid: {
          top: '16%',
          left: '8%',
          right: '8%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          name: '时间',
          type: 'category',
          data: [],
          axisLabel: {
            rotate: 10000,
            interval: 0
          }
        },
        yAxis: {},
        series: {
          name: '酒店入住流水',
          type: 'line',
          smooth: true,
          data: [],
          itemStyle: {
            normal: {
              color: '#FFAE00',
              lineStyle: {
                color: '#397FFF'
              }
            }
          },
          areaStyle: {
            /* normal: { origin: 'start', color: 'rgba(57,127,255,.1)', opacity: 1 }, */
            normal: {
              color: {
                type: 'linear', // 设置线性渐变
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(57,127,255,.1)' // 0% 处的颜色
                }, {
                  offset: 1, color: '#fff' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          }
        }
      }
    }
  },
  mounted: function () {
    this.created()
  },
  watch: {
    data: {
      handler: function () {
        this.initChart()
      },
      deep: true
    }
  },
  methods: {
    created () {
      this.$axios.post('returnMoney').then((response) => {
        console.log(response)
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i].money)
          this.myLine_option.xAxis.data.push(response.data[i].time)
          this.myLine_option.series.data.push(response.data[i].money)
        }
        console.log(this.myLine_option.xAxis.data)
        console.log(this.myLine_option.series.data)
        this.initChart()
      })
    },
    initChart () {
      var myLine = this.$echarts.init(document.getElementById('myLine'))
      myLine.setOption(this.myLine_option)
    }
  }
}
</script>

<style scoped>

</style>
