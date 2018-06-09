<template>
  <div class="app-container sales-month">
    <div class="page-title">
      <!--标题栏-->
      <el-row :gutter="0">
        <el-col :span="23">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">销售月报表</span>
          </el-row>
        </el-col>
        <el-col :span="1">
          <el-row type="flex" justify="end">
            <el-button size="small" type="primary" @click="uploadData">刷新</el-button>
            <el-button size="small" type="primary">打印</el-button>
          </el-row>
        </el-col>
      </el-row>
      <div class="line"></div>
    </div>
    <div class="term-search">
      <div style="margin-top: 10px">
        <el-checkbox-group  size="small" fill="#E6A23C">
          <el-checkbox-button :class="{color: isIndex === index }" v-for="(time, index) in times" :label="time" :key="time.name"  @click.native.stop.prevent="handleTime(time, index)">{{time.name}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <!--查询栏-->
      <el-row :gutter="0" type="flex" justify="center">
        <el-col :span="7" class="el-col-padding">
          <span>单据日期(起)</span>
          <el-date-picker class="form-item" size="small"  v-model="requestData1.fromDate" type="date" >
          </el-date-picker>
        </el-col>
        <el-col :span="6" class="el-col-padding">
          <span>仓 &nbsp; 库 </span>
          <el-autocomplete class="form-item" size="small" v-model="requestData1.storeName" @focus="which=2"
                      :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                      @select="handleSelect" placeholder="请选择">
              <el-button slot="append" icon="el-icon-search" @click="fixedOption.deportShow=true"></el-button>
          </el-autocomplete>
        </el-col>
      <el-col :span="6" class="el-col-padding">
          <span>经手人</span>
          <el-autocomplete class="form-item" size="small" v-model="requestData1.handler" @focus="which=3"
                      :fetch-suggestions="querySearchs" :trigger-on-focus="true"
                      @select="handleSelect" placeholder="请选择">
          <el-button slot="append" icon="el-icon-search" @click="fixedOption.brokerageShow=true"></el-button>
        </el-autocomplete>
      </el-col>
      <el-col :span="5" class="el-col-padding">
      </el-col>
      </el-row>
      <el-row :gutter="0" type="flex" justify="center">
        <el-col :span="7" class="el-col-padding">
          <span>单据日期(止)</span>
          <el-date-picker class="form-item" size="small"  v-model="requestData1.toDate" type="date" >
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-button size="small" type="danger" class="btn-search"  @click="saleStatMonth">查询</el-button>
        </el-col>
        <el-col :span="11">
        </el-col>
      </el-row>
    </div>
    <div class="table-contain padding">
      <el-table v-loading="loading" style="width: 100%;height:calc100%" height="100%"  :data="tableData"
                size="mini" border fit highlight-current-row :default-sort = "{prop: 'statDate', order: 'descending'}"  show-summary>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="statDate" label="统计日期"></el-table-column>
        <el-table-column prop="sheetCount" label="销售单数量"></el-table-column>
        <el-table-column prop="incomeMoney" label="销售收入"></el-table-column>
        <el-table-column prop="receiptMoney" label="销售回款"></el-table-column>
        <el-table-column prop="addedMoney" label="新增应收款"></el-table-column>
      </el-table>
      <el-col class="pagination">
        <el-row :span="24" type="flex" justify="center" align="middle" >
          <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="requestData1.pageNum"
        :page-sizes="[15, 30, 45, 60, 75]"
        :page-size="requestData1.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
        </el-row>
    </el-col>
    </div>
    <fixed-page2 @deportInfo="getDeportInfo" :fixedOption="fixedOption"></fixed-page2>
    <fixed-page3 @handlerInfl="getHandlerInfo" :fixedOption="fixedOption"></fixed-page3>
  </div>
</template>

<script>
import fixedPage2 from '@/components/fixed/fixedNormal'
import fixedPage3 from '@/components/fixed/fixedBrokerage'
import { timeToDateFn, dateNow, monthFirstDay, yesterday, weekFirstDay, weekLastDay, threeMonthFirstDay, thisWeek,beforeMonthFirstDay, beforeMonthLastDay} from '@/utils/BbdCommon'
import { mapGetters } from 'vuex';
import { getSalesDayStatistic, fetchBrokerage, fetchDeport } from '@/api/reports'
export default {
  name: 'SalesMonthStatistic',
  data () {
    return {
      loading: true,
      total: 0,
      requestData1: {
        pageNum: 1, // 当前页数
        pageSize: 15, // 页码大小
        fromDate: monthFirstDay(), // 单据日期起
        toDate: dateNow(), // 单据日期止
        handlerUserId: '', // 经手人ID
        handler: '',
        storeId: '', // 仓库ID
        storeName: '',
      },
      ulshow: false,
      isIndex:4,
      times:[{
        'name': '昨日',
        'start' : yesterday,
        'end': yesterday
      },{
        'name': '今日',
        'start' : dateNow,
        'end': dateNow
      },{
        'name': '本周',
        'start' : thisWeek,
        'end': dateNow
      },{
        'name': '上周',
        'start' : weekFirstDay,
        'end': weekLastDay
      },{
        'name': '本月',
        'start' : monthFirstDay,
        'end': dateNow
      },{
        'name': '上月',
        'start' : beforeMonthFirstDay,
        'end': beforeMonthLastDay
      },{
        'name': '最近三月',
        'start' : threeMonthFirstDay,
        'end': dateNow
      }],
      fixedOption: {
        supplierShow: false,
        deportShow: false,
        brokerageShow: false
      },
      tableData: [],
      optType: [],
      which: 1,
      brokerage: [],
      deport: [],
      supplier: [],
      querySelectArr: [],
      value: '',
      autofocus: false,
      x: 1,
      y: 0,
    }
  },
  created () {
    this.getBrokerage()
    this.getDeport()
  },
  mounted () {
    this.getTime() // 获取时间
    this.saleStatMonth() // 获取数据
  },
  computed: {
    ...mapGetters([
      "tenantId"
    ])
  },
  methods: {
    // 分页
    handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.requestData1.pageSize = val
        this.saleStatMonth()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.requestData1.pageNum = val
        this.saleStatMonth()
      },
      // 销售月报表
      saleStatMonth(){
        this.loading = true
        if(this.requestData1.handler === ""){
          this.requestData1.handlerUserId = ''
        }
        if(this.requestData1.storeName === ""){
          this.requestData1.storeId = ''
        }
        // 获取时间
        this.requestData1.toDate = timeToDateFn(new Date(this.requestData1.toDate).getTime() / 1000, 1)
        this.requestData1.fromDate = timeToDateFn(new Date(this.requestData1.fromDate).getTime() / 1000, 1)

        const _self = this
        return new Promise((resolve, reject) => {
          getSalesDayStatistic(_self.requestData1).then(response => {
            // 总共的条数
            _self.total = response.data.total
            _self.tableData = response.data.list
            _self.loading = false
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
      })
      },
      // 设置默认时间
      getTime(){
        var nowTime = new Date()
        this.requestData1.toDate  = timeToDateFn(new Date(nowTime).getTime() / 1000, 1)
      },
      handleTime(time, index) {
        // 改变当前按钮的背景颜色
        this.isIndex = index
        this.requestData1.pageNum = 1
        // 把时间重新赋值，并发送请求
        this.requestData1.toDate = time.end()
        this.requestData1.fromDate = time.start()
        this.saleStatMonth()
      },
    // 刷新页面功能
    uploadData(){
      // 默认参数
      this.requestData1 = {
        pageNum: 1,
        pageSize: 15,
        fromDate: monthFirstDay(),
        toDate:timeNow(1),
        handlerUserId: '',
        handler: '',
        storeId: '',
        storeName: '',
      }
      this.saleStatMonth()
    },

    querySearchs (queryString, cb) {
      var restaurants
      switch (this.which) {
        case 2:
          restaurants = this.deport
          break
        case 3:
          restaurants = this.brokerage
          break
        default:
          break
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    getBrokerage () {
      const _self = this
      return new Promise((resolve, reject) => {
        fetchBrokerage().then(response => {
          this.brokerage = response.data.data.list.list
          for (var i = 0; i < this.brokerage.length; i++) {
            this.brokerage[i].value = this.brokerage[i].userName
          }
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    getDeport () {
      const _self = this
      return new Promise((resolve, reject) => {
        fetchDeport({pageSize: 1000}).then(response => {
          this.deport = response.data.data.storeInfoList.list
          for (var i = 0; i < this.deport.length; i++) {
            this.deport[i].value = this.deport[i].storeName
          }
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },

    createFilter (queryString) {
      return (restaurant) => {
        switch (this.which) {
          case 2:
            return (restaurant.storeName.indexOf(queryString) > -1)
            break
          case 3:
            return (restaurant.userName.indexOf(queryString) > -1)
            break
          default:
            break
        }
      }
    },
    // 选择仓库和经手人
    handleSelect (item) {
      let searchInfos
      switch (this.which) {
        case 2:
          this.requestData1.storeId = item.storeId
          this.requestData1.storeName = item.value
          break
        case 3:
          this.requestData1.handlerUserId = item.userId
          this.requestData1.handler = item.value
          break
        default:
          break
      }
    },
    getDeportInfo (data) {
      this.requestData1.storeName = data.name
      this.requestData1.storeId = data.id
    },
    getHandlerInfo (data) {
      this.requestData1.handler = data.name;
      this.requestData1.handlerUserId = data.id;
    },
  },
  components: {
    fixedPage2,
    fixedPage3
  }
}
</script>
<style type="text/scss" scoped lang="scss">
.term-search {
  margin-bottom: 10px;
  font-size: 12px;
  color:#575757;
  .el-row {
    margin: 0px !important;
  }
}
.title {
  font-size: 24px;
}
.form-item {
  width: 66%;
  margin-top: 10px;
}
.btn-select{
  background-color: #FE9451;
  color:#fff;
  margin-left: 200px;
}
.form-btn {
  margin-top: 10px;
  margin-left: 10px;
}
.page-title {
  line-height: 45px;
  .title {
    font-size: 24px;
    color: #575757;
  }
  button {
    margin-top: 5px;
  }
  .line {
    width: 100%;
    height: 5px;
    border-bottom: 3px solid #d4d8e1;
  }
}
</style>


<style>
.sales-month .table-contain {
  height: calc(100% - 283px);
  margin-bottom: 40px;

}
.el-table th {
  text-align: center;
}
.padding .el-table--mini td {
  padding: 1px !important;
}
.padding .el-table td > .cell {
  height: 27px;
  line-height: 27px;
  padding: 0px;
  text-indent: 10px;
}
.padding .el-table th > .cell,
.padding .el-table td > .cell {
  /* text-align: center; */
  width: 100%;
  position: relative;
  overflow: visible;
}
.padding el-table td > .cell .el-input {
  position: relative;
  top: -11px;
}
.padding .el-table td > .cell span input {
  height: 26px;
  line-height: 26px;
}
.el-table td > .cell span {
  display: block;
  width: 100%;
  height: 100%;
}
.pagination{
  margin-top: 50px;
}
.tableHeight{
  height:439px;
}
.blue1 {
  color: #2369b5;
  user-select: none;
}
.btn-search{
  margin-top: 10px;
}
.sales-month .el-col-padding{
  padding: 0px !important
}
.sales-month .el-loading-mask{
  z-index: 3;
}
.sales-month .is-scrolling-none {
  height: 451px !important;
}
/* 设置时间选择按钮 */
.sales-month .color{
  background-color: #E6A23C;
  color:#fff;
}
.sales-month .el-checkbox-button__inner{
  background-color: rgba(255, 255, 255, 0);
  color:inherit;
}
</style>
