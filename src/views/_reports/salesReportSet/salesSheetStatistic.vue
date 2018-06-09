<template>
  <div class="app-container sales-sheet-statistic">
    <div class="page-title">
      <!--标题栏-->
      <el-row :gutter="10" >
        <el-col :span="23">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">销售单据统计</span>
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
        <el-col :span="8">
          <span>单据日期(起)</span>
          <el-date-picker class="form-item" size="small" v-model="requestData1.createdFrom" type="date">
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <span>单据编号</span>
          <el-input class="form-item" size="small" v-model="requestData1.orderNo" @select="handleSelect" placeholder="请输入">
          </el-input>
        </el-col>
        <el-col :span="6">
          <span>客户</span>
          <el-autocomplete class="form-item" size="small" v-model="requestData1.customerName" @focus="which=5" :fetch-suggestions="querySearchs" placeholder="请选择"
            :trigger-on-focus="true"
            @select="handleSelect">
            <el-button slot="append" icon="el-icon-search" @click="fixedOption.supplierShow=true"></el-button>
          </el-autocomplete>
        </el-col>
        <el-col :span="6">
          <span>出库仓库</span>
          <el-autocomplete class="form-item" size="small" v-model="requestData1.storeName" @focus="which=2"
                      :fetch-suggestions="querySearchs" placeholder="请选择" :trigger-on-focus="true"
                      @select="handleSelect">
        <el-button slot="append" icon="el-icon-search" @click="fixedOption.deportShow=true"></el-button>
      </el-autocomplete>
        </el-col>
      </el-row>
      <el-row :gutter="0" type="flex" justify="left">
        <el-col :span="8">
          <span>单据日期(止)</span>
          <el-date-picker class="form-item" size="small" v-model="requestData1.createdTo" type="date">
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <span>品名/编号</span>
          <el-autocomplete class="form-item" size="small" v-model="requestData1.goodsName" @focus="which=1"
                      :fetch-suggestions="querySearchs" :trigger-on-focus="true"
                      @select="handleSelect" placeholder="请选择">
            <!-- <el-button slot="append" icon="el-icon-search" @click="fixedOption.deportShow=true"></el-button> -->
          </el-autocomplete>
        </el-col>
        <el-col :span="6">
          <span>颜色</span>
          <el-autocomplete class="form-item" size="small" v-model="requestData1.goodsColorNo" @focus="which=4"
                      :fetch-suggestions="querySearchs" :trigger-on-focus="true"
                      @select="handleSelect" placeholder="请选择">
            <!-- <el-button slot="append" icon="el-icon-search" @click="fixedOption.brokerageShow=true"></el-button> -->
          </el-autocomplete>
        </el-col>
        <el-col :span="6">
          <span>单据备注</span>
          <el-input class="form-item" size="small" v-model="requestData1.remark"  placeholder="请输入">
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="0" type="flex" justify="left">
        <el-col :span="8">
          <span class="align-left">经手人</span>
          <el-autocomplete class="form-item handle" size="small" v-model="requestData1.handler" @focus="which=3"
                      :fetch-suggestions="querySearchs" placeholder="请选择" :trigger-on-focus="true"
                      @select="handleSelect" >
            <el-button slot="append" icon="el-icon-search" @click="fixedOption.brokerageShow=true"></el-button>
          </el-autocomplete>
        </el-col>
        <el-col :span="9">
          <el-button size="small" type="danger" class="btn-search" @click="salesSheetCount">查询</el-button>
        </el-col>
        <el-col :span="9">
        </el-col>
      </el-row>
    </div>
    <div class="table-contain padding">
      <el-table v-loading="loading" style="width: 100%;height:calc100%" height="100%" :data="tableData" size="mini" border fit highlight-current-row :default-sort = "{prop: 'sheetDate', order: 'descending'}">
        <el-table-column type="index" label="序号" width="50" fixed></el-table-column>
        <el-table-column prop="sheetDate" label="单据日期" fixed  min-width="100"></el-table-column>
        <el-table-column prop="optType" label="单据类型" :formatter="typeFormatter" fixed ></el-table-column>
        <el-table-column prop="orderNo" label="单据编号" fixed min-width="150">
          <!-- <template slot-scope="scope">
            <span class="blue1" style="cursor:pointer;" v-text="scope.row.orderNo"></span>
          </template> -->
        </el-table-column>
        <el-table-column prop="customerName" label="客户"></el-table-column>
        <el-table-column prop="saleGoods.goodsNo" label="商品编号"></el-table-column>
        <el-table-column prop="saleGoods.goodsName" label="品名" width="110"></el-table-column>
        <el-table-column prop="saleGoods.goodsColorNo" label="颜色"></el-table-column>
        <el-table-column prop="saleStoreName" label="仓库" min-width="110"></el-table-column>
        <el-table-column prop="saleGoods.saleUnit" label="单位"></el-table-column>
        <el-table-column prop="saleGoods.bookingItemCount" label="出库条数"></el-table-column>
        <el-table-column prop="saleGoods.bookingQuantity" label="出库数量"></el-table-column>
        <el-table-column prop="saleGoods.saleUnit" label="结算单位"></el-table-column>
        <el-table-column prop="saleGoods.salePrice" label="单价"></el-table-column>
        <el-table-column prop="saleGoods.totalSaleMoney" label="金额"></el-table-column>
        <el-table-column prop="totalMoney" label="合计"></el-table-column>
        <el-table-column prop="settleMoney" label="应收"></el-table-column>
        <el-table-column prop="settledMoney" label="已收"></el-table-column>
        <el-table-column prop="arrearsMoney" label="欠款"></el-table-column>
        <el-table-column prop="handler" label="经手人"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
      <el-col class="pagination">
        <el-row :span="24" type="flex" justify="center" align="middle">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="requestData1.pageNum" :page-sizes="[15, 30, 45, 60, 75]" :page-size="requestData1.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
import fixedPage1 from "@/components/fixed/fixedSupplier";
import fixedPage2 from "@/components/fixed/fixedNormal";
import fixedPage3 from "@/components/fixed/fixedBrokerage";
import { timeToDateFn, timeNow, monthFirstDay } from "@/utils/BbdCommon";
import { mapGetters } from "vuex";
import { getSalesSheetStatistic, fetchSheetCode, fetchGoodsList, fetchGoodsColor, fetchBrokerage, fetchSupplier, fetchDeport, } from "@/api/reports";
export default {
  name: "salesSheetStatistic",
  data() {
    return {
      loading: false,
      requestData1: {
        pageNum: 1, // 当前页数
        pageSize: 15, // 页码大小
        createdFrom: monthFirstDay(), // 单据日期起
        createdTo: timeNow(1), // 单据日期止
        orderNo: "", // 单据编号
        handler: "", // 经手人
        handlerUserId: "", // 经手人ID
        customerName: "", // 客户名称
        customerId: "", // 客户id
        storeName: "", // 出库仓库
        storeId: "", // 出库仓库ID
        goodsName: "", // 品名/编号
        goodsColorNo: "", // 颜色
        goodsColorId: "",
        remark: "" , // 订单备注
      },
      tableData: [],
      goods: [], // 搜索列表的品名
      color: [], // 搜索列表的颜色
      brokerage: [], // 经手人
      deport: [], // 仓库
      customer: [], // 客户
      total: 0,
      which: 1,
      ulshow: false,
      fixedOption: { // 弹窗显示
        supplierShow: false,
        deportShow: false,
        brokerageShow: false
      },
      optType: [],
      supplier: [],
      value: "",
    };
  },
  created() {
    this.salesSheetCount() // 销售单据统计
    this.getGoods() // 品名
    this.getSupplier() // 客户
    this.getBrokerage() // 经手人
    this.getDeport() // 仓库
    this.reset()
  },
  mounted() {
    this.getTime(); // 获取时间
  },
  computed: {
    ...mapGetters(["tenantId"])
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.requestData1.pageSize = val;
      this.salesSheetCount();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.requestData1.pageNum = val;
      this.salesSheetCount();
    },
    //销售单据统计
    salesSheetCount() {
        this.loading = true
        if(this.requestData1.customerName === ""){
          this.requestData1.customerId = ''
        }
        if(this.requestData1.goodsColorNo === ""){
        this.requestData1.goodsColorId = ''
        }
        if(this.requestData1.goodsName === ""){
        this.requestData1.goodsId = ''
        }
        if(this.requestData1.storeName === ""){
          this.requestData1.storeId = ''
        }
        if(this.requestData1.handler === ""){
          this.requestData1.handlerUserId = ''
        }

      // 获取时间
      this.requestData1.createdTo = timeToDateFn(new Date(this.requestData1.createdTo).getTime() / 1000, 1)
      this.requestData1.createdFrom = timeToDateFn(new Date(this.requestData1.createdFrom).getTime() / 1000, 1)
      const _self = this;
      return new Promise((resolve, reject) => {
        getSalesSheetStatistic(_self.requestData1)
          .then(response => {
            console.log(response)
            // 总共的条数
            _self.total = response.data.list.total
            _self.tableData = response.data.list.list
            _self.loading = false;
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    // 刷新
    uploadData(){
      // 初始化默认参数
      this.requestData1 = {
        pageNum: 1,
        pageSize: 15,
        createdFrom: monthFirstDay(),
        createdTo: timeNow(1),
        orderNo: "",
        handler: "",
        handlerUserId: "",
        customerName: "",
        customerId: "",
        storeName: "",
        storeId: "",
        goodsName: "",
        goodsColorNo: "",
        remark: "" ,
      }
      this.salesSheetCount()
    },
    // 过滤类型
    typeFormatter: function(row, column) {
      return row.optType === 1
        ? "销售出库单"
        : "销售退货单"
    },
    // 设置默认时间
    getTime(){
      var nowTime = new Date()
      this.requestData1.createdTo  = timeToDateFn(new Date(nowTime).getTime() / 1000, 1)
    },

    // 检索字段
    querySearchs(queryString, cb) {
      var restaurants;
      switch (this.which) {
        case 1:
          restaurants = this.goods;
          break;
        case 2:
          restaurants = this.deport;
          break;
        case 3:
          restaurants = this.brokerage;
          break;
        case 4:
          restaurants = this.color;
          break;
          case 5:
          restaurants = this.customer;
          break;
        default:
          break;
      }
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    // 经手人
    getBrokerage() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchBrokerage({pageSize: 2147483647})
          .then(response => {
            this.brokerage = response.data.data.list.list;
            for (var i = 0; i < this.brokerage.length; i++) {
              this.brokerage[i].value = this.brokerage[i].userName;
            }
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    // 仓库
    getDeport() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchDeport({pageSize: 2147483647})
          .then(response => {
            this.deport = response.data.data.storeInfoList.list;
            for (var i = 0; i < this.deport.length; i++) {
              this.deport[i].value = this.deport[i].storeName;
            }
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    // 客户
    getSupplier() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchSupplier({pageSize: 2147483647})
          .then(response => {
            this.customer = response.data.data.list.list;
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
    // 获取品名
    getGoods() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchGoodsList({pageSize: 2147483647})
          .then(response => {
            // console.log(response)
            _self.goods = response.data.data.list.list;
            // 渲染品名
            for (var i = 0; i < this.goods.length; i++) {
              _self.goods[i].value = this.goods[i].goodsName;
            }
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    // 获取颜色
    getColor(goodsNo) {
      const _self = this;
      this.color = []
      this.requestData1.goodsColorNo = ''
      this.requestData1.colorId = ''
      return new Promise((resolve, reject) => {
        fetchGoodsColor(goodsNo)
          .then(response => {
            _self.color = response.data.data.list;
            // 渲染颜色
            for (var i = 0; i < _self.color.length; i++) {
              _self.color[i].value = _self.color[i].colorName;
            }
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    createFilter(queryString) {
      return restaurant => {
        switch (this.which) {
          case 1:
            return restaurant.goodsName.indexOf(queryString) > -1;
            break;
          case 2:
            return restaurant.storeName.indexOf(queryString) > -1;
            break;
          case 3:
            return restaurant.userName.indexOf(queryString) > -1;
            break;
          case 4:
            return restaurant.colorName.indexOf(queryString) > -1;
            break;
          case 5:
            return restaurant.customerName.indexOf(queryString) > -1;
            break;
          default:
            break;
        }
      };
    },
    // 选择品名和颜色/仓库/经手人
    handleSelect(item) {
      let searchInfos;
      switch (this.which) {
        case 1:
          this.requestData1.goodsId = item.goodsId;
          this.requestData1.goodsName = item.value;
          // 获取颜色
          this.getColor(item.goodsNo)
          break;
        case 2:
          this.requestData1.storeId = item.storeId;
          this.requestData1.storeName = item.value;
          break;
        case 3:
          this.requestData1.handlerUserId = item.userId;
          this.requestData1.handler = item.value;
          break;
        case 4:
          this.requestData1.goodsColorId = item.colorId;
          this.requestData1.goodsColorNo = item.colorName;
          break;
        case 5:
          this.requestData1.customerId = item.customerId;
          this.requestData1.customerName = item.value;
          break;
        default:
          break;
      }
    },
    // 弹窗获取信息
    // 客户 -- 把弹框获取到的信息赋值给requestData1中参数
    getSupplierInfo(data) {
      this.requestData1.customerName = data.name;
      this.requestData1.customerId = data.id;
    },
    // 仓库
    getDeportInfo(data) {
      this.requestData1.storeName = data.name;
      this.requestData1.storeId = data.id;
    },
    // 经手人
    getHandlerInfo(data) {
      this.requestData1.handler = data.name;
      this.requestData1.handlerUserId = data.id;
    },
  },
  components: {
    fixedPage1,
    fixedPage2,
    fixedPage3
  }
};
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
  font-size: 12px;
  margin-bottom: 10px;
  color: #575757;
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
.sales-sheet-statistic .table-contain {
  height: calc(100% - 297px);
  margin-bottom: 40px;
}
.el-table th {
  text-align: center;
}
.padding .el-table--mini td {
  padding: 1px !important;
}
.sales-sheet-statistic .padding .el-table td > .cell {
  height: 27px;
  line-height: 27px;
  padding: 0px;
  text-indent: 10px;
}
.sales-sheet-statistic .padding .el-table th > .cell,
.sales-sheet-statistic .padding .el-table td > .cell {
  width: 100%;
  position: relative;
  overflow:hidden;
  white-space:nowrap;
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
.pagination {
  margin-top: 30px;
}
.tableHeight {
  height: 439px;
}
.sales-sheet-statistic .blue1 {
  color: #2369b5;
  user-select: none;
  width: 100%;
  position: relative;
  overflow:hidden;
  white-space:nowrap;
  text-overflow: ellipsis;
}
.btn-search {
  margin-top: 10px;
}

.sales-sheet-statistic .el-loading-mask{
  z-index: 3;
}
/* 修改固定列右边框 */
.sales-sheet-statistic .el-table--border th:nth-child(4){
  border-right: 2px solid #cad1d8;
}
.sales-sheet-statistic .el-table--border td:nth-child(4){
  border-right: 2px solid #cad1d8;
}

.sales-sheet-statistic .handle{
  margin-left: 10px;
}
.sales-sheet-statistic .align-left{
  margin-left: 21px;
}

</style>

