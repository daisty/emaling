<template>
  <div class="app-container">
    <div class="page-title">
      <!--标题栏-->
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="bill-code">
            <label class="code-label">NO.</label><span class="code" v-text="requestData.orderNo">CGRKD-20180417-0002</span>
          </div>
        </el-col>
        <el-col :span="8" >
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">销售开单-详情</span>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="end">
            <el-button  @click="historyRender">历史</el-button>
          </el-row>
        </el-col>
      </el-row>
      <div class="line"></div>
    </div>
    <div class="term-search">
      <!--查询栏-->
      <el-autocomplete class="form-item" size="small" v-model="requestData.customerName" @focus="which=1" placeholder="客户">
      </el-autocomplete>
      <el-autocomplete class="form-item" size="small" v-model="requestData.storeName" @focus="which=2" placeholder="出货仓库">
      </el-autocomplete>
      <el-autocomplete class="form-item" size="small" v-model="requestData.handler" @focus="which=3" placeholder="经手人">
      </el-autocomplete>
      <el-autocomplete class="form-item" size="small" :change="change(1)" v-model="requestData.sheetDate" type="date" placeholder="单据日期"></el-autocomplete>
    </div>
    <div class="table-contain padding" >
      <el-table style="width: 100%;height:calc100%"
        height="100%"
        :data="tableData"
        :summary-method="getSummaries"
        size="mini"
        border fit highlight-current-row show-summary>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="goodsNo"  label="编号" width="100">
          <template slot-scope="scope">
           <span  @click.stop="click($event,1,scope.$index)" v-text="scope.row.goodsNo"></span>
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="品名" width="140">
          <template slot-scope="scope">
            <span @click.stop="click($event,2,scope.$index)" v-text="scope.row.goodsName"></span>
          </template>
        </el-table-column>
        <el-table-column prop="goodsColorNo" label="颜色" >
         <template slot-scope="scope">
            <span  @click.stop="click($event,3,scope.$index)" v-text="scope.row.goodsColorNo"></span>
          </template>
        </el-table-column>
        <el-table-column prop="batchNo" label="批号" >
          <template slot-scope="scope">
             <span @click.stop="click($event,4,scope.$index)" v-text="scope.row.batchNo"></span>
          </template>
        </el-table-column>
        <el-table-column prop="bookingItemCount" label="条数" >
          <template slot-scope="scope">
            <span @click.stop="click($event,5,scope.$index)" v-text="scope.row.bookingItemCount"></span>
          </template>
        </el-table-column>
        <el-table-column prop="bookingQuantity" label="销售数量" >
          <template slot-scope="scope">
            <span @click.stop="click($event,6,scope.$index)" v-text="scope.row.bookingQuantity"></span>
          </template>
        </el-table-column>
        <el-table-column prop="saleQuantity" label="结算数量">
          <template slot-scope="scope">
           <span @click.stop="click($event,7,scope.$index)" v-text="scope.row.saleQuantity" ></span>
          </template>
        </el-table-column>
        <el-table-column prop="salePrice" label="结算单价">
          <template slot-scope="scope">
           <span  v-text="scope.row.salePrice"></span>
          </template>
        </el-table-column>
        <el-table-column prop="totalSaleMoney" label="结算金额" >
          <template slot-scope="scope">
           <span  v-text="scope.row.totalSaleMoney"></span>
          </template>
        </el-table-column>
        <el-table-column prop="saleUnit" label="单位" >
          <template slot-scope="scope">
            <span v-text="scope.row.saleUnit"></span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" >
          <template slot-scope="scope">
           <span @click.stop="click($event,8,scope.$index)" v-text="scope.row.remark"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="remark">
      <el-input v-model="requestData.remark" placeholder="单据备注"></el-input>
    </div>
    <!-- <div class="page-footer">
      <el-button @click="saveInfoDraft()">保存草稿</el-button>
      <el-button type="danger" @click="saveInfo()">开单</el-button>
    </div>
    <div class="input-select" ref="inputSelect">
      <span class="span">
        <input type="text" ref="input" @click.stop="" v-model="value" @keyup="keyUp()">
        <div class="contain" ref="contain">
          <div class="san"></div>
          <ul class="dropDown">
            <li v-for="item in querySelectArr" @click="sureSelect(item)" :key="item.value" v-text="item.value"></li>
          </ul>
        </div>
         <span class="close"><i @click="openFixed(1)" class="el-icon-circle-close-outline"></i></span>
        <span class="search" :class="{zIndex:show}"><i class="el-icon-zoom-in"></i></span> 
      </span>
    </div>
    <fixed-page1 @supplierInfo="getSupplierInfo" :fixedOption="fixedOption"></fixed-page1>
    <fixed-page2 @deportInfo="getDeportInfo" :fixedOption="fixedOption"></fixed-page2>
    <fixed-page3 @handlerInfl="getHandlerInfo" :fixedOption="fixedOption"></fixed-page3>
    <fixed-page4 @stockInfo="getStockInfo" :fixedOption="fixedOption"></fixed-page4>  -->
  </div>
</template>

<script>
import fixedPage1 from "@/components/fixed/fixedSupplier";
import fixedPage2 from "@/components/fixed/fixedNormal";
import fixedPage3 from "@/components/fixed/fixedBrokerage";
import fixedPage4 from "@/components/fixed/fixedStock";
import { timeToDateFn, timeNow } from "@/utils/BbdCommon";
import { mapGetters } from "vuex";
import {
  fetchSheetCode,
  fetchGoodsList,
  fetchGoodsColor,
  fetchBrokerage,
  fetchSupplier,
  fetchDeport,
  fetchSaveSaleInfo,
  fetchSaveSaleInfoDraft,
  fetchStockList,
  fetchSaleOrderDetail
} from "@/api/sale";
export default {
  name: "sale",
  data() {
    return {
      fixedOption: {
        supplierShow: false,
        deportShow: false,
        brokerageShow: false,
        stockShow: false
      },
      edit: true,
      requestData: {
        orderNo: "",
        handler: "",
        handlerUserId: "",
        customerName: "",
        customerId: "",
        storeName: "",
        storeId: "",
        remark: "",
        sheetDate: timeNow(1),
        expectOutStoreDate: "",
        saleUnit: "",
        settleMoney: "",
        saleGoodsList: []
      },
      tableData: [],
      which: 1,
      brokerage: [],
      deport: [],
      supplier: [],
      querySelectArr: [],
      value: "",
      autofocus: false,
      x: 1,
      y: 0
    };
  },
  created() {
    this.getSaleOrderDetail();
  },
  mounted() {},
  computed: {
    ...mapGetters(["tenantId"])
  },
  methods: {
    //    async getSheetNo() {
    //
    //      const response.data = await fetchSheetCode()
    //      if (response.data.code === 0) {
    //        this.requestData.orderNo = response.data.data.sheetNo
    //      } else {
    //        this.$message({
    //          type: 'error',
    //          message: response.data.msg
    //        })
    //      }
    //    },
    //跳转到采购入库单历史界面
    historyRender: function() {
      //this.$router.push({ path: '/purchase/stock_in_bill_history' })  //对象
      this.$router.push("sale_bill_history"); //字符串
      //      this.$router.push({name: 'purchase',param: {stock_in_bill_history}}) //命名路由
    },
    fetchStock: function() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchStockList()
          .then(response => {
            console.log(response);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    tranfer(data) {
      this.requestData.saleGoodsList = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].goodsNo !== "") {
          this.requestData.saleGoodsList.push(data[i]);
        }
      }
    },
    querySearchs(queryString, cb) {
      var restaurants;
      switch (this.which) {
        case 1:
          restaurants = this.customer;
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
    getSupplier() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchSupplier()
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
    getGoods() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchGoodsList()
          .then(response => {
            this.goodsList = response.data.data.list.list;

            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    getColor(goodsNo) {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchGoodsColor(goodsNo)
          .then(response => {
            this.colorList = response.data.data.list;

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
    handleSelect(item) {
      let searchInfos;
      switch (this.which) {
        case 1:
          this.requestData.customerId = item.customerId;
          this.requestData.customerName = item.value;
          break;
        case 2:
          this.requestData.storeId = item.storeId;
          this.requestData.storeName = item.value;
          break;
        case 3:
          this.requestData.handlerUserId = item.userId;
          this.requestData.handler = item.value;
          break;
        default:
          break;
      }
    },
    change(index) {
      if (index === 1) {
        this.requestData.sheetDate = timeToDateFn(
          new Date(this.requestData.sheetDate).getTime() / 1000,
          1
        );
      } else if (this.requestData.expectOutStoreDate !== "" && index === 2) {
        this.requestData.expectOutStoreDate = timeToDateFn(
          new Date(this.requestData.expectOutStoreDate).getTime() / 1000,
          1
        );
      }
    },
    getTableData() {
      for (var i = 0; i < 10; i++) {
        this.tableData.push({
          goodsNo: "",
          goodsName: "",
          goodsColor: "",
          batchNo: "",
          bookingItemCount: "",
          bookingQuantity: "",
          saleQuantity: "",
          totalSaleMoney: "",
          salePrice: "",
          saleUnit: "",
          remark: "",
          goodsId: "",
          goodsColorId: ""
        });
      }
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (
          index === 1 ||
          index === 2 ||
          index === 3 ||
          index === 4 ||
          index === 8 ||
          index === 11
        ) {
          sums[index] = "";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index];
        }
      });
      this.requestData.bookingItemCount = sums[5];
      this.requestData.bookingQuantity = sums[7];
      this.requestData.settleMoney = sums[9];
      return sums;
    },
    querySelect(queryString) {
      var goodsArr;
      if (this.x === 3) {
        goodsArr = this.colorList;
      } else {
        goodsArr = this.goodsList;
      }
      var results = queryString
        ? goodsArr.filter(this.createFilter2(queryString))
        : goodsArr;
      this.querySelectArr = results;
      return results;
    },
    createFilter2(queryString) {
      return item => {
        switch (this.x) {
          case 1:
            item.value = item.goodsNo;
            return item.goodsNo.indexOf(queryString) > -1;
            break;
          case 2:
            item.value = item.goodsName;
            return item.goodsName.indexOf(queryString) > -1;
            break;
          case 3:
            item.value = item.colorName;
            return item.colorName.indexOf(queryString) > -1;
            break;
          default:
            break;
        }
      };
    },
    sureSelect(row) {
      //      console.log("this is: "+row.goodsNo+" "+row.goodsName)
      if (this.x === 3) {
        this.tableData[this.y].goodsColor = row.colorName;
        this.tableData[this.y].goodsColorId = row.colorId;
      } else {
        this.tableData[this.y].goodsNo = row.goodsNo;
        this.tableData[this.y].goodsName = row.goodsName;
        this.tableData[this.y].saleUnit = row.unit ? row.unit : "";
        this.tableData[this.y].salePrice = row.bulkPrice;
        this.tableData[this.y].bookingItemCount = 1;
        this.tableData[this.y].bookingQuantity = 1;
        this.tableData[this.y].saleQuantity = 1;
        this.tableData[this.y].totalSaleMoney =
          this.tableData[this.y].saleQuantity *
          this.tableData[this.y].salePrice;
        this.tableData[this.y].goodsId = row.goodsId;
        this.getColor(row.goodsNo);
      }
    },
    add() {
      this.tableData.push({
        goodsNo: "",
        goodsName: "",
        goodsColor: "",
        batchNo: "",
        bookingItemCount: "",
        bookingQuantity: "",
        saleQuantity: "",
        totalSaleMoney: "",
        salePrice: "",
        saleUnit: "",
        remark: "",
        goodsId: "",
        goodsColorId: ""
      });
    },
    click(event, x, y) {
      console.log(
        "the event info is: " +
          event.clientX +
          " " +
          event.offsetX +
          " " +
          event.clientY +
          " " +
          event.offsetY
      );
      this.x = x;
      this.y = y;
      if (
        x > 2 &&
        (this.tableData[this.y].goodsNo === "" ||
          this.tableData[this.y].goodsName === "")
      ) {
        this.$refs.inputSelect.style.display = "none";
        return false;
      }

      if (
        this.$refs.inputSelect.style.display === "" ||
        this.$refs.inputSelect.style.display === "none"
      ) {
        this.$refs.inputSelect.style.display = "block";
      }

      switch (this.x) {
        case 1:
          this.value = this.tableData[this.y].goodsNo;
          break;
        case 2:
          this.value = this.tableData[this.y].goodsName;
          break;
        case 3:
          this.value = this.tableData[this.y].goodsColor;
          break;
        case 4:
          this.value = this.tableData[this.y].batchNo;
          break;
        case 5:
          this.value = this.tableData[this.y].bookingItemCount;
          break;
        case 6:
          this.value = this.tableData[this.y].bookingQuantity;
          break;
        case 7:
          this.value = this.tableData[this.y].saleQuantity;
          break;
        case 8:
          this.value = this.tableData[this.y].remark;
          break;
        // case 9:
        //   this.value = this.tableData[this.y].salePrice;
        // break;
        // case 10:
        //   this.value = this.tableData[this.y].totalSaleMoney;
        // break;
        default:
          break;
      }
      this.$refs.inputSelect.style.top =
        event.clientY - event.offsetY + 1 + "px";
      this.$refs.inputSelect.style.left = event.clientX - event.offsetX + "px";
      this.$refs.inputSelect.style.width = event.target.offsetWidth + "px";
      this.$refs.inputSelect.style.height = event.target.offsetHeight + "px";
      this.$refs.contain.style.display = "none";
      this.$refs.input.focus();
    },
    keyUp() {
      if (this.querySelect(this.value).length !== 0 && this.x < 4) {
        this.$refs.contain.style.display = "block";
      }
      this.sure();
    },
    sure() {
      switch (this.x) {
        case 1:
          this.tableData[this.y].goodsNo = this.value;
          break;
        case 2:
          this.tableData[this.y].goodsName = this.value;
          break;
        case 3:
          this.tableData[this.y].goodsColor = this.value;
          break;
        case 4:
          this.tableData[this.y].batchNo = this.value;
          break;
        case 5:
          this.tableData[this.y].bookingItemCount = this.value;
          break;
        case 6:
          this.tableData[this.y].bookingQuantity = this.value;
          break;
        case 7:
          this.tableData[this.y].saleQuantity = this.value;
          break;
        case 8:
          this.tableData[this.y].remark = this.value;
          break;
        // case 9:
        //   this.tableData[this.y].salePrice = this.value;
        //   break;
        // case 10:
        //   this.tableData[this.y].totalSaleMoney =
        //     this.tableData[this.y].saleQuantity *
        //     this.tableData[this.y].salePrice;
        default:
          break;
      }
    },
    reset() {
      var _self = this;
      document.onclick = function(e) {
        if (_self.$refs.inputSelect) {
          _self.$refs.inputSelect.style.display = "none";
        }
      };
    },
    saveInfo() {
      this.tranfer(this.tableData);
      this.requestData.saleUnit = this.requestData.saleGoodsList[0]
        ? this.requestData.saleGoodsList[0].saleUnit
        : "";
      if (this.requestData.customerId === "") {
        this.$message({
          type: "error",
          message: "客户不能为空"
        });
        return false;
      } else if (this.requestData.storeName === "") {
        this.$message({
          type: "error",
          message: "出货仓库不能为空"
        });
        return false;
      } else if (this.requestData.handler === "") {
        this.$message({
          type: "error",
          message: "经手人不能为空"
        });
        return false;
      } else if (this.requestData.sheetDate === "") {
        this.$message({
          type: "error",
          message: "单据日期不能为空"
        });
        return false;
      } else if (this.requestData.saleGoodsList.length === 0) {
        this.$message({
          type: "error",
          message: "请填写入库商品"
        });
        return false;
      } else {
        return new Promise((resolve, reject) => {
          fetchSaveSaleInfo(this.requestData)
            .then(response => {
              if (response.data.code === 0) {
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
                this.$router.push("sale_bill_history");
              } else {
                this.$message({
                  type: "error",
                  message: response.data.msg
                });
              }
            })
            .catch(err => {
              console.log(err);
              reject(false);
            });
        });
      }
    },
    getSaleOrderDetail() {
      return new Promise((resolve, reject) => {
        fetchSaleOrderDetail(sessionStorage.getItem("saleOrderId"))
          .then(response => {
            if (response.data.code === 0) {
              this.requestData = response.data.data.saleOrder
              this.tableData = this.requestData.saleGoodsList
            } else {
              this.$message({
                type: "error",
                message: response.data.msg
              });
            }
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    saveInfoDraft() {
      this.tranfer(this.tableData);
      this.requestData.saleUnit = this.requestData.saleGoodsList[0]
        ? this.requestData.saleGoodsList[0].saleUnit
        : "";
      if (this.requestData.customerId === "") {
        this.$message({
          type: "error",
          message: "客户不能为空"
        });
        return false;
      } else if (this.requestData.storeName === "") {
        this.$message({
          type: "error",
          message: "出货仓库不能为空"
        });
        return false;
      } else if (this.requestData.handler === "") {
        this.$message({
          type: "error",
          message: "经手人不能为空"
        });
        return false;
      } else {
        return new Promise((resolve, reject) => {
          fetchSaveInstroeInfoDraft(this.requestData)
            .then(response => {
              if (response.data.code === 0) {
                this.$message({
                  type: "success",
                  message: "保存草稿成功"
                });
                this.$router.push("sale_bill_history");
              } else {
                this.$message({
                  type: "error",
                  message: response.data.msg
                });
              }
            })
            .catch(err => {
              console.log(err);
              reject(false);
            });
        });
      }
    },
    remove(index) {
      this.tableData.splice(index, 1);
    },
    getSupplierInfo(data) {
      this.requestData.customerName = data.name;
      this.requestData.customerId = data.id;
    },
    getDeportInfo(data) {
      this.requestData.storeName = data.name;
      this.requestData.storeId = data.id;
    },
    getHandlerInfo(data) {
      this.requestData.handler = data.name;
      this.requestData.handlerUserId = data.id;
    },
    getStockInfo(data) {
      this.tableData.goodsNo = data.goodsNo;
      this.tableData.stockId = data.stockId;
    },
    insertAddActive($event) {
      $event.currentTarget.className = "el-icon-circle-plus";
    },
    deletedAddActive($event) {
      $event.currentTarget.className = "el-icon-circle-plus-outline";
    },
    insertRemoveActive($event) {
      $event.currentTarget.className = "el-icon-remove";
    },
    deletedRemoveActive($event) {
      $event.currentTarget.className = "el-icon-remove-outline";
    },
    calculateMoney() {
      this.tableData[this.y].totalSaleMoney =
        this.tableData[this.y].saleQuantity * this.tableData[this.y].salePrice;
    },
    changeMoney() {
      console.log(11111111111);
    }
  },
  components: {
    fixedPage1,
    fixedPage2,
    fixedPage3,
    fixedPage4
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
  margin-bottom: 10px;
  .el-row {
    margin: 0px !important;
  }
}
.title {
  font-size: 24px;
}
.form-item {
  width: 19%;
  margin-top: 10px;
}
.form-btn {
  margin-top: 10px;
  margin-left: 10px;
}
.page-title {
  line-height: 45px;
  .bill-code {
    vertical-align: middle;
  }
  .title {
    font-size: 24px;
    color: #575757;
  }
  .code-label {
    font-size: 18px;
    padding-right: 3px;
    font-weight: normal;
  }
  .code {
    text-decoration: underline;
    line-height: 20px;
    font-size: 13px;
    color: #666;
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
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #f4f4f4;
  height: 95px;
  line-height: 95px;
  text-align: center;
}
</style>
<style lang="scss">
.input-select {
  position: fixed;
  top: 0;
  left: 0;
  display: none;
}
.span {
  position: relative;
  width: 100%;
  input {
    font-size: 12px;
    width: 100%;
    line-height: 20px;
    text-indent: 10px;
    &.border {
      border: none !important;
      background-color: transparent !important;
    }
  }
  span.search {
    height: 26px;
    width: 20px;
    line-height: 26px;
    text-align: center;
    &.zIndex {
      z-index: 1;
    }
    z-index: -1;
  }
}
.contain {
  position: relative;
  top: 1px;
  left: 0px;
  background: #fff;
  width: 100%;
  z-index: 1000;
  display: none;
  &.show {
    display: block;
  }
}
span.close {
  position: absolute;
  width: 12px;
  height: 12px;
  line-height: 12px;
  text-align: center;
  top: 7px;
  right: 25px;
  cursor: pointer;
}
span.close:hover {
  color: #eb453c;
}
span.search {
  position: absolute;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  top: 0px;
  right: 0px;
  cursor: pointer;
}
.dropDown {
  list-style: none;
  border: 1px solid #ccc;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin: 0;
  padding-left: 0px;
  max-height: 140px;
  overflow: auto;
  &:hover::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 8px;
  }
  li {
    height: 28px;
    line-height: 28px;
    padding-left: 20px;
    cursor: pointer;
    text-align: left !important;
    font-size: 12px;
    &:hover {
      background-color: #f5f7fa;
    }
  }
}
</style>
<style>
.table-contain {
  height: calc(100% - 240px);
}
.padding .el-table thead tr th {
  /*  color: #333;
    font-weight: 500;
    background-color: #E2E9Ef;
    border-right-color:#ccc */
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
</style>
