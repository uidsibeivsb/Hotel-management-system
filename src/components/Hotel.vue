<template>
  <div>
    <el-row style="height: 840px;">
      <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
      <el-tooltip effect="dark" placement="right"
                  v-for="item in hotels.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  :key="item.id">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">名称：{{item.name}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px;width: 400px">
          <span>联系方式：{{item.phone}}</span> <br>
          <span>酒店介绍：{{item.describ}}</span>
        </p>
        <p slot="content" style="width: 380px" class="abstract">地址：{{item.address}}</p>
        <el-card style="width: 380px;margin-bottom: 20px;height: 270px;float: left;margin-right: 15px" class="book"
                 bodyStyle="padding:10px" shadow="hover">
          <div class="cover">
            <img :src="item.photoaddress" alt="封面">
          </div>
          <div class="info">
            <div class="title">{{item.name}}</div>
          </div>
          <div class="author">{{item.address}} <button class="sch" @click="edit(item)"><ScheduledForm class="sch" ref="scheduledForm"></ScheduledForm></button></div>
        </el-card>
      </el-tooltip>
    </el-row>
    <el-row>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="hotels.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import SearchBar from './SearchBar'
import ScheduledForm from './ScheduledForm'
export default {
  name: 'Hotel',
  components: {SearchBar, ScheduledForm},
  data () {
    return {
      hotels: [],
      currentPage: 1,
      pagesize: 3
    }
  },
  mounted: function () {
    this.loadBooks()
  },
  methods: {
    loadBooks () {
      var _this = this
      this.$axios.post('/returnHotel').then(resp => {
        if (resp && resp.status === 200) {
          _this.hotels = resp.data
          console.log(_this.hotels)
        }
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage)
    },
    searchResult () {
      var _this = this
      this.$axios
        .post('/returnHotelByName', {
          name: this.$refs.searchBar.keywords
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.hotels = resp.data
          }
        })
    },
    edit (item) {
      console.log(item)
      this.$store.commit('setALL', item)
    }
  }
}
</script>

<style scoped>
.cover {
  width: 360px;
  height: 200px;
  margin-bottom: 7px;
  overflow: hidden;
  cursor: pointer;
}

img {
  width: 360px;
  height: 200px;
  /*margin: 0 auto;*/
}

.title {
  font-size: 14px;
  text-align: left;
}

.author {
  color: #333;
  width: 360px;
  font-size: 13px;
  margin-bottom: 6px;
  text-align: left;
}

.abstract {
  display: block;
  line-height: 17px;
}

a {
  text-decoration: none;
}

a:link, a:visited, a:focus {
  color: #3377aa;
}

.sch{
  float: right;
  width: 45px;
  height: 30px;
  padding: 0px;
  border-style: none;
}
</style>
