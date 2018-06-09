
<template>
  <div class="app-container check-payable">
    <div class="page-title">
      <!--标题栏-->
      <el-row :gutter="0">
        <el-col :span="23">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">查应付</span>
          </el-row>
        </el-col>
        <el-col :span="1">
          <el-row type="flex" justify="end">
            <el-button size="small" type="primary" @click="uploadData">刷新</el-button>
            <el-button size="small" type="primary" @click="printBtn">打印</el-button>
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
          <el-date-picker class="form-item" size="small"  v-model="requestData1.createdFrom" type="date" >
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <span>供应商</span>
          <el-autocomplete class="form-item" size="small" v-model="requestData1.customerName" @focus="which=5" :fetch-suggestions="querySearchs" placeholder="请选择"
            :trigger-on-focus="true"
            @select="handleSelect">
            <el-button slot="append" icon="el-icon-search" @click="fixedOption.supplierShow=true"></el-button>
          </el-autocomplete>
        </el-col>
        <el-col :span="6" class="el-col-padding"></el-col>
        <el-col :span="5"></el-col>
      </el-row>
      <el-row :gutter="0" type="flex" justify="left">
        <el-col :span="7" class="el-col-padding">
          <span>单据日期(止)</span>
          <el-date-picker class="form-item" size="small"  v-model="requestData1.createdTo" type="date">
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <span>经手人</span>
          <el-autocomplete class="form-item" size="small" v-model="requestData1.operStaff" @focus="which=3"
                      :fetch-suggestions="querySearchs" placeholder="请选择" :trigger-on-focus="true"
                      @select="handleSelect" >
            <el-button slot="append" icon="el-icon-search" @click="fixedOption.brokerageShow=true"></el-button>
          </el-autocomplete>
        </el-col>
        <el-col :span="5" >
          <el-button size="small" type="danger" class="btn-search"  @click="checkPayable">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table-contain padding">
      <el-table v-loading="loading" style="width: 100%;height:calc100%" height="100%"  :data="tableData"
                size="mini" border fit highlight-current-row :default-sort = "{prop: 'actualOptDate', order: 'descending'}" :summary-method="getSummaries" show-summary>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="orderNo" label="操作" width="140">
          <template slot-scope="scope">
            <el-button class= "operation" @click="goHistory(scope.row)" type="text" size="mini">付款</el-button>
            <!-- <el-button class= "operation" @click="goHistory(scope.row)" type="text" size="mini">对账到单据</el-button> -->
            <el-button class= "operation" @click="goDetail" type="text" size="mini">对账到明细</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="businessLeader" label="业务负责人"></el-table-column>
        <el-table-column prop="customerName" label="供应商名称"></el-table-column>
        <el-table-column prop="financialOfficer" label="财务负责人"></el-table-column>
        <el-table-column prop="operStaff" label="操作员"></el-table-column>
        <el-table-column prop="debitBalance" label="应付金额"></el-table-column>
      </el-table>
      <el-col class="pagination">
        <el-row :span="24" type="flex" justify="center" align="middle" >
          <el-pagination
          v-if="paginationShow"
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
    <fixed-page1 @supplierInfo="getSupplierInfo" :fixedOption="fixedOption"></fixed-page1>
    <fixed-page3 @handlerInfl="getHandlerInfo" :fixedOption="fixedOption"></fixed-page3>
  </div>
</template>

<script>
import fixedPage1 from '@/components/fixed/fixedSupplier'
import fixedPage3 from '@/components/fixed/fixedBrokerage'
import { timeToDateFn, dateNow, monthFirstDay, yesterday, weekFirstDay, weekLastDay, threeMonthFirstDay, thisWeek,beforeMonthFirstDay, beforeMonthLastDay} from '@/utils/BbdCommon'
import { mapGetters } from 'vuex';
import { getCheckPayable, fetchBrokerage, fetchSupplier } from '@/api/reports'
export default {
  name: 'storeOutIndetails',
  data () {
    return {
      paginationShow: true,
      loading: true,
      total: 0,
      requestData1: {
        pageNum: 1, // 当前页数
        pageSize: 15, // 页码大小
        createdFrom: monthFirstDay(), // 单据日期起
        createdTo: dateNow(), // 单据日期止
        // handlerUserId: '', // 经手人ID
        operStaff: '', // 经手人
        customerName: '', // 供应商
        customerID: '' // 供应商id
      },
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
        brokerageShow: false
      },
      tableData: [],
      which: 1,
      brokerage: [],
      value: '',
    }
  },
  created () {
    this.getBrokerage()
    this.getSupplier()
  },
  mounted () {
    this.getTime() // 获取时间
    this.checkPayable() // 获取数据
  },
  computed: {
    ...mapGetters([
      "tenantId"
    ])
  },
  methods: {
    // 打印
    printBtn(){
      let newstr = document.getElementsByClassName('app-container')[0].innerHTML;
      console.log(newstr)
      window.document.body.innerHTML = newstr;
      let oldstr = window.document.body.innerHTML;
      window.print();
      window.location.reload();   //解决打印之后按钮失效的问题
      window.document.body.innerHTML = oldstr;
      return false;
    },
    // 分页
    handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.requestData1.pageSize = val
        this.checkPayable()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.requestData1.pageNum = val
      this.checkPayable()
    },
    // 设置默认时间
    getTime(){
      var nowTime = new Date()
      this.requestData1.createdTo  = timeToDateFn(new Date(nowTime).getTime() / 1000, 1)
    },
    handleTime(time, index) {
      // 改变当前按钮的背景颜色
      this.isIndex = index
      this.requestData1.pageNum = 1
      // 把时间重新赋值，并发送请求
      this.requestData1.createdTo = time.end()
      this.requestData1.createdFrom = time.start()
      this.checkPayable()
    },

    // 查应收
    checkPayable(){
      this.paginationShow = false
      this.loading = true
      if(this.requestData1.customerName === ""){
        this.requestData1.customerID = ''
      }
      // 获取时间
      this.requestData1.createdTo = timeToDateFn(new Date(this.requestData1.createdTo).getTime() / 1000, 1)
      this.requestData1.createdFrom = timeToDateFn(new Date(this.requestData1.createdFrom).getTime() / 1000, 1)

      const _self = this
      return new Promise((resolve, reject) => {
        getCheckPayable(_self.requestData1).then(response => {
          // 总共的条数
          _self.total = response.data.list.total
          _self.tableData = response.data.list.list
          _self.loading = false
          _self.paginationShow = true
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    // 点击跳转到详情页
    goHistory (data) {
      // 应付金额，供应商
      console.log(data)
      this.$router.push({
        name: 'payment_sheet',
        query: { data }
      })
    },
    // 对账到明细
    goDetail(){
      this.$router.push({
        name: 'customer_statement_detail',
      })
    },
    // 刷新页面功能
    uploadData(){
      // 默认参数
      this.requestData1 = {
        pageNum: 1,
        pageSize: 15,
        createdFrom: monthFirstDay(),
        createdTo: dateNow(),
        operStaff: '',
        customerID: ''
      }
      this.checkPayable()
    },

    // 求和的方法
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 1 || index === 2 || index === 3 || index === 4 || index === 5) {
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index]
        }
      })
      return sums
    },
    querySearchs (queryString, cb) {
      var restaurants
      switch (this.which) {
        case 5:
          restaurants = this.supplier
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
        fetchBrokerage({pageSize: 10000}).then(response => {
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
    getSupplier () {
      const _self = this
      return new Promise((resolve, reject) => {
        fetchSupplier().then(response => {
          this.supplier = response.data.data.list.list
          for (var i = 0; i < this.supplier.length; i++) {
            this.supplier[i].value = this.supplier[i].customerName
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
          case 5:
            return (restaurant.customerName.indexOf(queryString) > -1)
            break
          case 3:
            return (restaurant.userName.indexOf(queryString) > -1)
            break
          default:
            break
        }
      }
    },
    // 选择客户和经手人
    handleSelect (item) {
      let searchInfos
      switch (this.which) {
        case 5:
          this.requestData1.customerID = item.customerId
          this.requestData1.customerName = item.value
          break
        case 3:
          // this.requestData1.handlerUserId = item.userId
          this.requestData1.operStaff = item.value
          break
        default:
          break
      }
    },
    getSupplierInfo (data) {
      this.requestData1.customerName = data.name
      this.requestData1.customerID = data.id
    },
    getHandlerInfo (data) {
      this.requestData1.operStaff = data.name;
      // this.requestData1.handlerUserId = data.id;
    },
  },
  components: {
    fixedPage1,
    fixedPage3
  }
}
</script>
<style type="text/scss" scoped lang="scss">
.remark {
  margin-top: 10px;
  box-shadow: 10px -8px 10px -10px #aaa, 5px 8px 10px -10px #aaa;
  .el-input__inner {
    border-color: #f2f2f2;
  }
}
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
<style lang="scss">

</style>
<style>
.check-payable .table-contain {
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
.check-payable .el-table td{
  padding: 1px 0 !important;
}
.check-payable .pagination{
  margin-top: 45px;
}
.check-payable .tableHeight{
  height:439px;
}
.check-payable  .blue1 {
  color: #2369b5;
  user-select: none;
}
.check-payable .btn-search{
  margin-top: 10px;
}
.check-payable .el-col-padding{
  padding: 0px !important
}
.check-payable .el-loading-mask{
  z-index: 3;
}
/* 设置时间选择按钮 */
.check-payable .color{
  background-color: #E6A23C;
  color:#fff;
}
.check-payable .el-checkbox-button__inner{
  background-color: rgba(255, 255, 255, 0);
  color:inherit;
}
.check-payable .operation:hover{
  background-color: #0bcd90;
  color:#fff;
}
</style>
