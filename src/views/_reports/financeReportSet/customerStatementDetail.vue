
<template>
  <div class="app-container customer-statement-detail">
    <div class="page-title">
      <!--标题栏-->
      <el-row :gutter="0">
        <el-col :span="23">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">客户对账单-明细</span>
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
      <!--查询栏-->
      <el-row :gutter="0" type="flex" justify="center">
        <el-col :span="7" class="el-col-padding">
          <span>单据日期(起)</span>
          <el-date-picker class="form-item" size="small"  v-model="requestData1.createdFrom" type="date" >
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <span>客 &nbsp;&nbsp; 户</span>
          <el-autocomplete class="form-item" size="small" v-model="requestData1.customerName" @focus="which=5" :fetch-suggestions="querySearchs" placeholder="请选择"
            :trigger-on-focus="true"
            @select="handleSelect">
            <el-button slot="append" icon="el-icon-search" @click="fixedOption.supplierShow=true"></el-button>
          </el-autocomplete>
        </el-col>
        <el-col :span="6" class="el-col-padding">
          <span>单据来源(全部) </span>
          <el-select class="form-item" size="small" v-model="requestData1.type" @focus="which=2"
                      :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                      @select="handleSelect" placeholder="请选择">
            <el-option label="销售出库" value="110"></el-option>
            <el-option label="采购退货" value="120"></el-option>
            <el-option label="调拨出库" value="130"></el-option>
            <el-option label="应收增加" value="310"></el-option>
            <el-option label="应收减少" value="320"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <span>单据备注</span>
          <el-input class="form-item" size="small" v-model="requestData1.remark"  placeholder="请输入">
          </el-input>
        </el-col>

      </el-row>
      <el-row :gutter="0" type="flex" justify="left">
        <el-col :span="7" class="el-col-padding">
          <span>单据日期(止)</span>
          <el-date-picker class="form-item" size="small"  v-model="requestData1.createdTo" type="date">
          </el-date-picker>
        </el-col>
        <el-col :span="5" >
          <el-button size="small" type="danger" class="btn-search"  @click="coustomerStateDetail">查询</el-button>
        </el-col>
      </el-row>
      <!-- <el-checkbox class="form-item" v-model="showCancel">显示作废</el-checkbox> -->
    </div>
    <div class="table-contain padding">
      <el-table v-loading="loading" style="width: 100%;height:calc100%" height="100%"  :data="tableData"
                size="mini" border fit highlight-current-row :default-sort = "{prop: 'businessDate', order: 'descending'}" :summary-method="getSummaries" show-summary>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="businessDate" label="单据日期 ">
        </el-table-column>
        <el-table-column prop="type" label="单据来源" :formatter="typeFormatter"></el-table-column>
        <el-table-column prop="businessNo" label="单据编号" width="210">
          <!-- <template slot-scope="scope">
            <span class="blue1" @click="goHistory(scope.row)" style="cursor:pointer;" v-text="scope.row.businessNo"></span>
          </template> -->
        </el-table-column>
        <el-table-column prop="receivableMoney" label="应收金额"></el-table-column>
        <el-table-column prop="actualMoney" label="实收金额"></el-table-column>
        <!-- <el-table-column prop="totalQuantity" label="应收余额"></el-table-column> -->
        <el-table-column prop="remark" label="备注"></el-table-column>
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
    <fixed-page1 @supplierInfo="getSupplierInfo" :fixedOption="fixedOption"></fixed-page1>
  </div>
</template>

<script>
import fixedPage1 from '@/components/fixed/fixedSupplier'
import { timeToDateFn, timeNow, monthFirstDay} from '@/utils/BbdCommon'
import { mapGetters } from 'vuex';
import { getCustomerStatementDetail, fetchSupplier } from '@/api/reports'
export default {
  name: 'storeOutIndetails',
  data () {
    return {
      loading: true,
      total: 0,
      requestData1: {
      pageNum: 1, // 当前页数
      pageSize: 15, // 页码大小
      createdFrom: monthFirstDay(), // 单据日期起
      createdTo: timeNow(1), // 单据日期止
      customerName: '', // 客户
      customerId: '',
      remark: '', // 单据备注
      type: '' // 单据来源
      },
      ulshow: false,
      fixedOption: {
        supplierShow: false,
      },
      tableData: [],
      which: 1,
      brokerage: [],
      deport: [],
      customer: [], // 客户
      value: ''
    }
  },
  created () {
    this.getSupplier() // 客户
  },
  mounted () {
    this.getTime() // 获取时间
    this.coustomerStateDetail() // 获取数据
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
        this.coustomerStateDetail()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.requestData1.pageNum = val
        this.coustomerStateDetail()
      },
      // 客户对账单-明细
      coustomerStateDetail(){
        this.loading = true
        if(this.requestData1.handler === ""){
          this.requestData1.handlerUserId = ''
        }
        if(this.requestData1.storeName === ""){
          this.requestData1.storeId = ''
        }
        // 获取时间
        this.requestData1.createdTo = timeToDateFn(new Date(this.requestData1.createdTo).getTime() / 1000, 1)
        this.requestData1.createdFrom = timeToDateFn(new Date(this.requestData1.createdFrom).getTime() / 1000, 1)

        const _self = this
        return new Promise((resolve, reject) => {
          getCustomerStatementDetail(_self.requestData1).then(response => {
            // 总共的条数
            // console.log(response.data.list.list[0].businessNo);
            _self.total = response.data.list.total
            _self.tableData = response.data.list.list
            _self.loading = false
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
      })
      },
      // 过滤类型
      typeFormatter: function(row, column) {
            return row.type === 110
              ? "销售出库"
              : row.type === 120
                ? "采购退货"
                : row.type === 130
                  ? "调拨出库"
                    : row.type === 310 ? "应收增加" : "应收减少";
            },
      // 设置默认时间
      getTime(){
        var nowTime = new Date()
        this.requestData1.createdTo  = timeToDateFn(new Date(nowTime).getTime() / 1000, 1)
      },

    // 点击跳转到详情页
    goHistory ({ optType, orderId }) {
      // orderId : 订单id
      let obj = {
        '100': 'stock_in_bill_storage',//入库
        '110': 'stock_in_bill_storage',//采购入库
        '120': 'sale_bill_history',//销售退货
        '130': 'store_in_transfers',//调拨入库
        '140': 'store_in_others',//其他入库
        '200': 'store_out',//出库
        '210': 'stock_sales_back',//采购退货
        '220': 'store_out_sales',//销售出库
        '230': 'store_out_transfers',//调拨出库
        '240': 'store_out_others',//其他出库
        '300': 'store_inventory',//盘点
      }
      this.$router.push({
        name: obj[optType],
        query: { orderId }
      })
    },
    // 刷新页面功能
    uploadData(){
      // 默认参数
      this.requestData1 = {
        pageNum: 1,
        pageSize: 15,
        createdFrom: monthFirstDay(),
        createdTo: timeNow(1),
        handlerUserId: '',
        storeId: '',
        remark: '',
        orderNo: ''
      }
      this.coustomerStateDetail()
    },

    tranfer (data) {
      this.requestData.purchaseGoodsList = []
      for (var i = 0; i < data.length; i++) {
        if (data[i].goodsNo !== '') {
          this.requestData.purchaseGoodsList.push(data[i])
        }
      }
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
        if (index === 1 || index === 2 || index === 3 || index === 6) {
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
          restaurants = this.customer
          break
        default:
          break
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    // 客户
    getSupplier() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchSupplier({pageSize: 2147483647})
          .then(response => {
            this.customer = response.data.data.list.list;
            // console.log(this.customer)
            for (var i = 0; i < this.customer.length; i++) {
              this.customer[i].value = this.customer[i].customerName;
            }
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },

    createFilter (queryString) {
      return (restaurant) => {
        switch (this.which) {
          case 5:
            return (restaurant.customerName.indexOf(queryString) > -1)
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
        case 5:
          this.requestData1.customerId = item.customerId
          this.requestData1.customerName = item.value
          break
        default:
          break
      }
    },
    getSupplierInfo (data) {
      this.requestData1.customerName = data.name
      this.requestData1.customerId = data.id
    },
  },
  components: {
    fixedPage1
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
<style lang="scss">

</style>
<style>
.customer-statement-detail .table-contain {
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
.customer-statement-detail .pagination{
  margin-top: 50px;
}
.customer-statement-detail .tableHeight{
  height:439px;
}
.blue1 {
  color: #2369b5;
  user-select: none;
}
.btn-search{
  margin-top: 10px;
}
.el-col-padding{
  padding: 0px !important
}
.customer-statement-detail .el-loading-mask{
  z-index: 3;
}
</style>
