
<template>
  <div class="app-container store-outin-details">
    <div class="page-title">
      <!--标题栏-->
      <el-row :gutter="0">
        <el-col :span="23">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">出入库明细</span>
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
      <el-row :gutter="0" type="flex" justify="left">
        <el-col :span="7" class="el-col-padding">
          <span>单据日期(起)</span><span class="required-code">*</span>
          <el-date-picker class="form-item" size="small"  v-model="requestData1.createdFrom" type="date" >
          </el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col-padding">
          <span>仓 &nbsp; 库 </span>
          <el-autocomplete class="form-item" size="small" v-model="requestData1.storeName" @focus="which=2"
                      :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                      @select="handleSelect" placeholder="请选择">
            <el-button slot="append" icon="el-icon-search" @click="fixedOption.deportShow=true"></el-button>
          </el-autocomplete>
        </el-col>
        <el-col :span="6" class="el-col-padding">
          <span>单据编号</span>
          <el-input class="form-item" size="small" v-model="requestData1.orderNo"
                          @select="handleSelect" placeholder="请输入" width="160">
          </el-input>
        </el-col>
        <el-col :span="6" class="el-col-padding">
          <span>单据备注</span>
          <el-input class="form-item" size="small" v-model="requestData1.remark" @focus="which=5"
                      :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                      @select="handleSelect" placeholder="请输入">
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="0" type="flex" justify="left">
        <el-col :span="7" class="el-col-padding">
          <span>单据日期(止)</span><span class="required-code">*</span>
          <el-date-picker class="form-item" size="small"  v-model="requestData1.createdTo" type="date">
          </el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col-padding">
          <span>经手人</span>
          <el-autocomplete class="form-item" size="small" v-model="requestData1.handler" @focus="which=3"
                      :fetch-suggestions="querySearchs" :trigger-on-focus="true"
                      @select="handleSelect" placeholder="请选择">
          <el-button slot="append" icon="el-icon-search" @click="fixedOption.brokerageShow=true"></el-button>
        </el-autocomplete>
        </el-col>
        <el-col :span="11" >
          <el-button size="small" type="danger" class="btn-search"  @click="stockOptSheet">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table-contain padding">
      <el-table v-loading="loading" style="width: 100%;height:calc100%" height="100%"  :data="tableData"
                size="mini" border fit highlight-current-row :default-sort = "{prop: 'actualOptDate', order: 'descending'}">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="orderNo" label="单据编号" width="210">
          <template slot-scope="scope">
            <span class="blue1" @click="goHistory(scope.row)" style="cursor:pointer;" v-text="scope.row.orderNo"></span>
          </template>
        </el-table-column>
        <el-table-column prop="optType" label="单据类型" :formatter="typeFormatter"></el-table-column>
        <el-table-column prop="storeName" label="入库仓库"></el-table-column>
        <el-table-column prop="actualOptDate" label="单据日期 "></el-table-column>
        <el-table-column prop="totalItem" label="入库条数"></el-table-column>
        <el-table-column prop="totalQuantity" label="入库数量"></el-table-column>
        <el-table-column prop="handler" label="经手人"></el-table-column>
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
    <fixed-page2 @deportInfo="getDeportInfo" :fixedOption="fixedOption"></fixed-page2>
    <fixed-page3 @handlerInfl="getHandlerInfo" :fixedOption="fixedOption"></fixed-page3>
  </div>
</template>

<script>
import fixedPage1 from '@/components/fixed/fixedSupplier'
import fixedPage2 from '@/components/fixed/fixedNormal'
import fixedPage3 from '@/components/fixed/fixedBrokerage'
import { timeToDateFn, timeNow, monthFirstDay} from '@/utils/BbdCommon'
import { mapGetters } from 'vuex';
import { fetchOutIndetails, fetchSheetCode ,fetchGoodsList, fetchGoodsColor, fetchBrokerage, fetchSupplier, fetchDeport, fetchSaveInstroeInfo, fetchSaveInstroeInfoDraft } from '@/api/reports'
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
        handlerUserId: '', // 经手人ID
        handler: '',
        storeId: '', // 仓库ID
        storeName: '',
        remark: '', // 单据备注
        orderNo: '', // 订单编号
        optType: '' // 类型
      },
      ulshow: false,
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
    this.getSupplier()
    this.getDeport()
  },
  mounted () {
    this.getTime() // 获取时间
    this.stockOptSheet() // 获取数据
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
        this.stockOptSheet()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.requestData1.pageNum = val
        this.stockOptSheet()
      },
      // 点击查询出入库明细
      stockOptSheet(){
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
          fetchOutIndetails(_self.requestData1).then(response => {
            // 总共的条数
            _self.total = response.data.data.list.total
            _self.tableData = response.data.data.list.list
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
            return row.optType === 100
              ? "入库"
              : row.optType === 110
                ? "采购入库"
                : row.optType === 120
                  ? "销售退货"
                  : row.optType === 130
                    ? "调拨入库"
                    : row.optType === 140
                      ? "其他入库"
                      : row.optType === 200
                        ? "出库"
                        : row.optType === 210
                          ? "采购退货"
                          : row.optType === 220
                            ? "销售出库"
                            : row.optType === 230
                              ? "调拨出库"
                              : row.optType === 240 ? "其他出库" : "盘点";
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
        '130': 'inventory_in_details',//调拨入库
        '140': 'store_in_others',//其他入库
        '200': 'store_out',//出库
        '210': 'return_bill_history',//采购退货
        '220': 'store_out_sales',//销售出库
        '230': 'inventory_out_details',//调拨出库
        '240': 'store_out_others',//其他出库
        '300': 'inventory_check',//盘点
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
      this.stockOptSheet()
    },

    querySearchs (queryString, cb) {
      var restaurants
      switch (this.which) {
        case 1:
          restaurants = this.supplier
          break
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
        fetchBrokerage({pageSize: 2147483647}).then(response => {
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
        fetchSupplier({pageSize: 2147483647}).then(response => {
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
    getDeport () {
      const _self = this
      return new Promise((resolve, reject) => {
        fetchDeport({pageSize: 2147483647}).then(response => {
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
          case 1:
            return (restaurant.customerName.indexOf(queryString) > -1)
            break
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
    change (index) {
      if (index === 1) {
        this.requestData.sheetDate = timeToDateFn(new Date(this.requestData.sheetDate).getTime() / 1000, 1)
      } else if (this.requestData.expectOutStoreDate !== '' && index === 2) {
        this.requestData.expectOutStoreDate = timeToDateFn(new Date(this.requestData.expectOutStoreDate).getTime() / 1000, 1)
      }
    },

    getSupplierInfo (data) {
      this.requestData1.supplierName = data.name
      this.requestData1.supplierId = data.id
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
    fixedPage1,
    fixedPage2,
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
.page-footer {
  width: 100%;
  background-color: #f4f4f4;
  height: 95px;
  line-height: 95px;
  text-align: center;
}
</style>
<style lang="scss">

</style>
<style>
.store-outin-details .table-contain {
  height: calc(100% - 313px);
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
.store-outin-details .pagination{
  margin-top: 50px;
}
.tableHeight{
  height:439px;
}
.blue1 {
  color: #2369b5;
  user-select: none;
}
.store-outin-details .btn-search{
  margin-top: 10px;
}
.store-outin-details .el-col-padding{
  padding: 0px !important
}
.store-outin-details .el-loading-mask{
  z-index: 3;
}
.store-outin-details .required-code{
  color: #f00;
}
</style>
