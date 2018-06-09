<style scoped lang="scss">
.form-item {
  width: 15%;
  margin-top: 10px;
  // margin-left: 10px;
}
.form-btn {
  margin-top: 10px;
  margin-left: 10px;
}
.line {
  width: 100%;
  height: 5px;
  border-bottom: 3px solid #d4d8e1;
}
.table-contain {
  height: calc(100% - 300px);
}
</style>
<style>
.form-item .el-input-group__append {
  width: 30px;
  text-align: center;
  padding: 0px 0;
}
.form-item .el-input-group__append button {
  padding: 10px 5px;
}
.scope-flex {
  display: flex;
}
.scope-flex span {
    flex: 1;
  }
</style>

<template>
  <div class="app-container" v-loading="loading">
    <!--标题栏-->
    <page-title :option="option"></page-title>
    <!--查询栏-->
    <div class="search-box-form">
    	<el-form :inline="true" label-width="80px" size="mini" class="demo-form-inline">
			  <el-form-item label="单据日期(起)">
           <el-date-picker v-model="queryData.createdFrom"  type="date"></el-date-picker>
			  </el-form-item>
			  <el-form-item label="单据日期(止)">
           <el-date-picker v-model="queryData.createdTo"  type="date"></el-date-picker>
			  </el-form-item>
			  <el-form-item label="单据编号">
			    <el-input v-model="queryData.orderNo"></el-input>
			  </el-form-item>
        <el-form-item label="客户">
          <el-autocomplete class="form-item" size="small" v-model="queryData.customerName" @focus="which=1"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                       @select="handleSelect">            
            <el-button  slot="append" icon="el-icon-search" @click="fixedOption.supplierShow=true"></el-button>
          </el-autocomplete>
			  </el-form-item>
			  <el-form-item label="出货仓库">
          <el-autocomplete class="form-item" size="small" v-model="queryData.storeName" @focus="which=2"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                          @select="handleSelect">          
              <el-button slot="append" icon="el-icon-search" @click="fixedOption.deportShow=true"></el-button>
          </el-autocomplete>
			  </el-form-item>
			  <el-form-item label="经手人">
          <el-autocomplete class="form-item" size="small" v-model="queryData.handler" @focus="which=3"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                       @select="handleSelect">            
              <el-button  slot="append" icon="el-icon-search" @click="fixedOption.brokerageShow=true"></el-button>
          </el-autocomplete>			    
			  </el-form-item>
			  <el-form-item label="单据状态">
          <el-select v-model="queryData.orderStatus">
            <el-option v-for="op in saleStatusOptions" :key="op.value" :label="op.label" :value="op.value"></el-option>
          </el-select>
        </el-form-item>
			  <el-form-item label="单据备注">
			    <el-input v-model="queryData.remark"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="danger" @click="fetchData()">查询</el-button>
			    <!-- <el-checkbox v-model="allChecked">显示红冲</el-checkbox> -->
			  </el-form-item>
			</el-form>
    </div>

    <div style="margin-top: 20px;"></div>
    <!--表格栏-->
    <!--{totalCount:3,totalColor:2,totalStockIn:223.69,unit:'米',inventory:'中大仓库',suppiler:'A',handler:'Kalvin'},-->
    <div class="table-contain">
      <el-table style="width: 100%;height:100%"
        height="100%"
        :data="tableData"
        :row-class-name="tableRowClassName"
        border fit highlight-current-row
        >
        <el-table-column
          :formatter="formatter"
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <!-- <el-table-column prop="module" :formatter="formatter" label="序号" width="50"></el-table-column> -->
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <div class="scope-flex">
              <span class="gay-forbid" @click="handleDelete(scope.$index)" :class="{blue:scope.row.orderStatus===-20}">删除</span>
              <span class="gay-forbid" @click="copy(scope.$index)" :class="{blue:scope.row.orderStatus===30 ||scope.row.orderStatus===-10}">复制</span>
              <span class="gay-forbid" @click="returnBill(scope.$index)" :class="{blue:scope.row.orderStatus===30}">退货</span>
              <!-- <el-popover popper-class="moreStyle" trigger="hover" placement="bottom" width="54">
                <div @click="copy(scope.$index)">复制</div>
                <div @clikc="returnBill(scope.$index)">退货</div>
                <span class="blue" slot="reference">更多</span>
              </el-popover> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sheetDate" label="单据日期" width="95">
          <template slot-scope="scope">
            <span v-text="scope.row.sheetDate"></span>
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="单据编号" width="190">
            <template slot-scope="scope">
              <span class="blue1" @click="getSaleOrderDetail(scope.row.orderId,scope.$index)" style="cursor:pointer;" v-text="scope.row.orderNo"></span>
          </template>
        </el-table-column>
        <el-table-column prop="orderStatus" label="单据状态" >
          <template slot-scope="scope">
            <span :class="{green:scope.row.orderStatus===30,red:scope.row.orderStatus===-10,gay:scope.row.orderStatus===-20}" v-text="saleStatusMap.get(scope.row.orderStatus)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="totalItem" label="总条数" ></el-table-column>
        <el-table-column prop="totalQuantity" label="总数量" ></el-table-column>
        <el-table-column prop="settleMoney" label="结算金额" ></el-table-column>
        <el-table-column prop="storeName" label="出货仓库" ></el-table-column>
        <el-table-column prop="customerName" label="客户" ></el-table-column>
        <el-table-column prop="handler" label="经手人" ></el-table-column>
        <el-table-column prop="remark" label="备注" ></el-table-column>
      </el-table>
    </div>

    <div style="margin-top: 10px;"></div>
    <!--分页栏-->
    <div class="block" style="text-align:center">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="queryData.pageNum"
      :page-sizes="[15, 30, 45, 60, 75]"
      :page-size="queryData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
    <fixed-page1 @supplierInfo="getSupplierInfo" :fixedOption="fixedOption"></fixed-page1>
    <fixed-page2 @deportInfo="getDeportInfo" :fixedOption="fixedOption"></fixed-page2>
    <fixed-page3 @handlerInfl="getHandlerInfo" :fixedOption="fixedOption"></fixed-page3>
  </div>
</template>

<script>
import pageTitle from "@/components/pageTitle";
import fixedPage1 from "@/components/fixed/fixedSupplier";
import fixedPage2 from "@/components/fixed/fixedNormal";
import fixedPage3 from "@/components/fixed/fixedBrokerage";
import newDeport from "@/components/fixed/newDeport";
import { parseDate } from "@/utils";
import {
  saleStatusOptions,
  accountStatusOptions,
  saleStatusMap,
  accountStatusMap
} from "@/utils/constants";
import {
  fetchSaleOrder,
  fetchBrokerage,
  fetchSupplier,
  fetchDeport,
  fetchDelSaleOrder,
  fetchSaleOrderDetail
} from "@/api/sale";
import { timeToDateFn, setSessionStorage } from "@/utils/BbdCommon";
export default {
  name: "sale",
  data() {
    return {
      parseDate,
      saleStatusOptions,
      accountStatusOptions,
      saleStatusMap,
      accountStatusMap,
      supplierBorder: false,
      dateStartBorder: false,
      dateStartEnd: false,
      orderNoborder: false,
      deportBorder: false,
      handlerBorder: false,
      remarkBorder: false,
      orderBorder: false,
      accountBorder: false,
      which: 1,
      brokerage: [],
      deport: [],
      supplier: [],
      fixedOption: {
        supplierShow: false,
        deportShow: false,
        brokerageShow: false
      },
      showCancel: false,
      option: {
        btnName: "新增销售单",
        pageName: "销售退货单-历史",
        isCode: false,
        isNeedBtn: true,
        btnName1: "刷新",
        btnName2: "打印"
      },
      queryData: {
        orderId: "",
        handler: "",
        handlerUserId: "",
        customerName: "",
        customerId: "",
        storeName: "",
        storeId: "",
        orderStatus: "",
        orderNo: "",
        remark: "",
        createdFrom: "",
        createdTo: "",
        accountStatus: "",
        pageSize: 15,
        pageNum: 1
      },
      loading: false,
      tableData: [],
      total: 0
    };
  },
  components: {
    pageTitle,
    fixedPage1,
    fixedPage2,
    fixedPage3,
    newDeport
  },
  created() {
    this.fetchData();
    this.getBrokerage();
    this.getSupplier();
    this.getDeport();
  },
  methods: {
    inputFocuse(index) {
      this.which = index;
      if (this.which === 1) {
        this.supplierBorder = true;
      } else if (this.which === 2) {
        this.deportBorder = true;
      } else {
        this.handlerBorder = true;
      }
    },
    sureClick(event) {},
    goHistory(index) {
      setSessionStorage("orderId", this.tableData[index].orderId);
      this.$router.push("stock_in_bill_cancel");
    },
    tableRowClassName(row, index) {
      //把每一行的索引放进row
      row.index = index;

    },
    formatter(row, column ,cellValue, index) {
      //放回索引值
      return this.queryData.pageSize * (this.queryData.pageNum - 1)  + 1 + row.index;
    },
    handleSizeChange(val) {
      this.queryData.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.queryData.pageNum = val;
      this.fetchData();
    },

    fetchData() {
      const _self = this;
      if (this.queryData.createdFrom !== "") {
        this.queryData.createdFrom = timeToDateFn(
          new Date(this.queryData.createdFrom).getTime() / 1000,
          1
        );
      }
      if (this.queryData.createdTo !== "") {
        this.queryData.createdTo = timeToDateFn(
          new Date(this.queryData.createdTo).getTime() / 1000,
          1
        );
      }
      return new Promise((resolve, reject) => {
        fetchSaleOrder(this.queryData)
          .then(response => {
            this.tableData = response.data.data.list.list;
            for (var i = 0; i < this.tableData.length; i++) {
              this.tableData[i].more = false;
              // if (this.tableData[i].sheetDate) {
              //   this.tableData[i].sheetDate = timeToDateFn(
              //     this.tableData[i].sheetDate / 1000,
              //     1
              //   );
              // }
            }
            this.loading = false;
            this.total = response.data.data.list.total;
            this.queryData.pageSize = response.data.data.list.pageSize;
            this.queryData.pageNum = response.data.data.list.pageNum;

            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
        //获取经手人数据
    getBrokerage() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchBrokerage()
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
    // 获取客户供应商列表数据
    getSupplier() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchSupplier()
          .then(response => {
            this.supplier = response.data.data.list.list;
            for (var i = 0; i < this.supplier.length; i++) {
              this.supplier[i].value = this.supplier[i].customerName;
            }
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    // 获取仓库列表数据
    getDeport() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchDeport()
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
    // async getBrokerage() {
    //   const res = await fetchBrokerage();
    //   if (res.code === 0) {
    //     this.brokerage = res.data.list.list;
    //     for (var i = 0; i < this.brokerage.length; i++) {
    //       this.brokerage[i].value = this.brokerage[i].userName;
    //     }
    //   } else {
    //     this.$message({
    //       type: "error",
    //       message: res.msg
    //     });
    //   }
    // },
    // async getSupplier() {
    //   const res = await fetchSupplier();
    //   if (res.code === 0) {
    //     this.supplier = res.data.list.list;
    //     for (var i = 0; i < this.supplier.length; i++) {
    //       this.supplier[i].value = this.supplier[i].customerName;
    //     }
    //   } else {
    //     this.$message({
    //       type: "error",
    //       message: res.msg
    //     });
    //   }
    // },
    // async getDeport() {
    //   const res = await fetchDeport();
    //   if (res.code === 0) {
    //     this.deport = res.data.storeInfoList.list;
    //     for (var i = 0; i < this.deport.length; i++) {
    //       this.deport[i].value = this.deport[i].storeName;
    //     }
    //   } else {
    //     this.$message({
    //       type: "error",
    //       message: res.msg
    //     });
    //   }
    // },
    //过滤
    createFilter(queryString) {
      return restaurant => {
        switch (this.which) {
          case 1:
            return restaurant.customerName.indexOf(queryString) > -1;
            break;
          case 2:
            return restaurant.storeName.indexOf(queryString) > -1;
            break;
          case 3:
            return restaurant.userName.indexOf(queryString) > -1;
            break;
          default:
            break;
        }
      };
    },

    querySearchs(queryString, cb) {
      var restaurants;
      switch (this.which) {
        case 1:
          restaurants = this.supplier;
          break;
        case 2:
          restaurants = this.deport;
          break;
        case 3:
          restaurants = this.brokerage;
          break;
        default:
          break;
      }
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    handleSelect(item) {
      let searchInfos;
      switch (this.which) {
        case 1:
          this.queryData.customerId = item.customerId;
          this.queryData.customerName = item.value;
          break;
        case 2:
          this.queryData.storeId = item.storeId;
          this.queryData.storeName = item.value;
          break;
        case 3:
          this.queryData.handlerUserId = item.userId;
          this.queryData.handler = item.value;
          break;
        default:
          break;
      }
    },
    // 获取客户/供应商数据
    getSupplierInfo(data) {
      this.queryData.customerName = data.name;
      this.queryData.customerId = data.id;
    },
    // 获取到仓库数据
    getDeportInfo(data) {
      this.queryData.storeName = data.name;
      this.queryData.storeId = data.id;
    },
    //获取经手人数据 
    getHandlerInfo(data) {
      this.queryData.handler = data.name;
      this.queryData.handlerUserId = data.id;
    },
    // getSupplierInfo(data) {
    //   this.queryData.customerName = data.name;
    // },
    // getDeportInfo(data) {
    //   this.queryData.storeName = data.name;
    // },
    // getHandlerInfo(data) {
    //   this.queryData.handler = data.name;
    // },
    goAccount(index) {
      if (this.tableData[index].accountStatus === 20) {
        this.$router.push("clearing_bill_doing");
      }
    },
    // 复制
    copy(index) {},
    // 退货
    returnBill(index) {},

    // 删除
    handleDelete(index) {
      if (this.tableData[index].orderStatus === -20) {
        this.$confirm("此操作将删除该条订单, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.delPurchaseOrder(this.tableData[index].orderId, index);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    async delPurchaseOrder(orderId, index) {
      const res = await fetchDelSaleOrder(orderId);
      if (res === 0) {
        this.$message({
          type: "success",
          message: "删除成功"
        });
        this.fetchData();
      } else {
        this.$message({
          type: "error",
          message: res.msg
        });
      }
    },
    // 更多
    handleDetail(row) {
      console.log("handle detail");
    },
    getSaleOrderDetail(data, index) {
      setSessionStorage("saleOrderId", this.tableData[index].orderId);
      console.log(data);
      console.log(this.tableData[index].orderId);
      this.$router.push("sale_bill_done");
    }
  }
};
</script>
<style scoped lang="scss">
  .block{
    position:absolute; 
    bottom:0px; 
    right:16px; 
    width:100%; 
    height:80px; 
    line-height: 80px;
    text-align:center; 
    z-index:2; 
    overflow:hidden; 
    background-color: #fff;
  }
  .input-box {
    font-size: 12px;
    position: relative;
    height: 26px;
    line-height: 26px;
    border: 1px solid #ccc;
    width: 220px;
    color: #575757;
    -webkit-box-shadow: 0 0 4px 0 #e2e2e2;
    box-shadow: 0 0 4px 0 #e2e2e2;
    border: 1px solid #e2e2e2;
    display: inline-block;
    &:hover {
      border-color: #7ba8e6;
      -webkit-box-shadow: 0 0 4px 0 #7ba8e6;
      box-shadow: 0 0 4px 0 #7ba8e6;
      color: #7ba8e6;
    }
    &.border {
      border-color: #7ba8e6;
      -webkit-box-shadow: 0 0 4px 0 #7ba8e6;
      box-shadow: 0 0 4px 0 #7ba8e6;
      color: #7ba8e6;
    }
    span.name {
      position: absolute;
      left: 0;
      padding-left: 5px;
      padding-right: 5px;
      font {
        color: #eb453c;
      }
    }
    input {
      position: absolute;
      left: 0;
      width: 220px;
      padding-right: 26px;
      background-color: transparent;
      border: none;
      outline: none;
      line-height: 20px;
      margin-top: 2px;
    }
    div.form-item {
      width: 100%;
      margin: 0;
      padding: 0;
    }
    span.icon {
      position: absolute;
      right: 0;
      top: 0;
      padding-left: 3px;
      padding-right: 3px;
      cursor: pointer;
      font-size: 14px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
      &.icon-rili:hover {
        background-color: transparent;
        cursor: default;
      }
    }
  }
  .red {
    color: #eb453c;
  }
  .green {
    color: #029b26;
  }
  .gay {
    color: #9999;
  }
  .gay-forbid {
    color: #9999;
    cursor: not-allowed;
    user-select: none;
  }
  .blue1 {
    color: #2369b5;
    user-select: none;
  }
  .blue {
    color: #0096ff;
    cursor: pointer;
    user-select: none;
  }
</style>
<style lang="scss">
  .el-popover {
    &.moreStyle {
      min-width: 54px;
      div {
        color: #0096ff;
        cursor: pointer;
      }
      div:nth-child(1) {
        margin-bottom: 5px;
      }
    }
  }
  .input-box .el-input--medium .el-input__inner,
  .input-box .el-input--small .el-input__inner {
    height: 20px;
    line-height: 20px;
    outline: none;
    border: none;
    padding: 0;
    background-color: transparent;
  }
  .input-box .el-input--small .el-input__inner {
    text-indent: 49px;
  }
  .input-box .el-input__prefix {
    display: none;
  }
  .input-box .el-select .el-input__inner {
    text-indent: 65px;
  }
</style>
<style> 
  .search-box-form{
    margin:10px 0;
  }
  .search-box-form .el-form-item.el-form-item--large{
    margin-bottom:0;
  }
  .search-box-form .el-autocomplete.form-item,.search-box-form .el-date-editor {
      height: 100%;
      width:163px;
      margin-top: 0;
  }
  .search-box-form .el-autocomplete.form-item .el-input--small .el-input__inner{
    height:28px;
    line-height:28px;
  }
  .search-box-form .el-form--inline .el-form-item{
    height: 36px;
    line-height: 23px;
  }
  .search-box-form .el-form--inline .el-form-item__label{
      font-weight: 400 !important;
      font-size:12px !important;
      text-align:right;
  }
</style>