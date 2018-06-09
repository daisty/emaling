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
            <span style="padding:0;" class="title">销售单</span>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="end">
            <el-button size="small" type="primary" @click="changeStock">库存查询</el-button>
            <el-button size="small" type="primary">打印</el-button>
            <el-button size="small"  @click="historyRender">销售历史</el-button>
          </el-row>
        </el-col>
      </el-row>
      <div class="line"></div>
    </div>
        <!--查询栏-->
    <div class="search-box-form">
    	 <el-form :inline="true" label-width="80px" size="mini" class="demo-form-inline">
			  <el-form-item label="客户">
          <el-autocomplete class="form-item" size="small" v-model="requestData.customerName" @focus="which=1"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                       @select="handleSelect">
            <el-button  slot="append" icon="el-icon-search" @click="fixedOption.supplierShow=true"></el-button>
          </el-autocomplete>
			  </el-form-item>
			  <el-form-item label="出货仓库">
          <el-autocomplete class="form-item" size="small" v-model="requestData.storeName" @focus="which=2"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                          @select="handleSelect">
              <el-button slot="append" icon="el-icon-search" @click="fixedOption.deportShow=true"></el-button>
          </el-autocomplete>
			  </el-form-item>
			  <el-form-item label="经手人">
          <el-autocomplete class="form-item" size="small" v-model="requestData.handler" @focus="which=3"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                       @select="handleSelect">
              <el-button  slot="append" icon="el-icon-search" @click="fixedOption.brokerageShow=true"></el-button>
          </el-autocomplete>
			  </el-form-item>
        <el-form-item label="单据日期">
           <el-date-picker v-model="requestData.sheetDate" :change="change(1)" type="date"></el-date-picker>

			  </el-form-item>			  
			</el-form>
    </div>
      <!-- :query="query" -->
    <!-- <input-table :trConfig="trConfig" :data="requestData.saleGoodsList" :summaryMethod="summaryMethod"></input-table> -->
    <div class="table-contain padding" >
      <el-table style="width: 100%;height:100%"
        height="100%"
        :data="tableData"
        :summary-method="getSummaries"
        size="mini"
        border fit highlight-current-row show-summary>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="操作" style="text-indent: 0px" width="80">
          <template slot-scope="scope">
            <i class="el-icon-circle-plus-outline" @click="add()" style="cursor:pointer" @mouseover="insertAddActive($event)" @mouseout="deletedAddActive($event)"></i>
            <i class="el-icon-remove-outline" @click="remove(scope.$index)" style="cursor:pointer" @mouseover="insertRemoveActive($event)" @mouseout="deletedRemoveActive($event)"></i>
          </template>
        </el-table-column>
        <el-table-column prop="goodsNo"  label="编号" width="100">
          <template slot-scope="scope">
            <div class="table-input">
                <!-- <el-select
                  v-model="scope.row.value9"
                  filterable
                  remote
                  reserve-keyword
                  placeholder=""
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select> -->
              <el-autocomplete size="small" v-model="scope.row.goodsNo" @focus="which=1"
                :trigger-on-focus="true" :fetch-suggestions="querySelect" @select="goodsHandleSelect">
                <template slot-scope="{ item }">
                  <div class="name">{{ item.goodsNo }}</div>
                  <span class="addr">{{ item.goodsName }}</span>
                </template>
              </el-autocomplete>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="品名" width="140">
          <template slot-scope="scope">
            <div class="table-input">
              <el-autocomplete size="small" v-model="scope.row.goodsName" @focus="which=2"
                     :trigger-on-focus="false" :fetch-suggestions="querySelect" @select="goodsHandleSelect">
              </el-autocomplete>
            </div>
            <!-- <span @click.stop="click($event,2,scope.$index)" v-text="scope.row.goodsName"></span> -->
          </template>
        </el-table-column>
        <el-table-column prop="goodsColorNo" label="颜色" >
         <template slot-scope="scope">
           <div class="table-input">
            <el-autocomplete size="small" v-model="scope.row.goodsColorNo" @focus="which=3"
                    :trigger-on-focus="false" :fetch-suggestions="querySelect" @select="goodsHandleSelect">
            </el-autocomplete>
          </div>
            <!-- <span  @click.stop="click($event,3,scope.$index)" v-text="scope.row.goodsColorNo"></span> -->
          </template>
        </el-table-column>
        <el-table-column prop="batchNo" label="批号" >
          <template slot-scope="scope">
            <div class="table-input">
              <el-autocomplete size="small" v-model="scope.row.batchNo" @focus="which=4"
                     :trigger-on-focus="false" :fetch-suggestions="querySelect" @select="goodsHandleSelect">
              </el-autocomplete>
            </div>
             <!-- <span @click.stop="click($event,4,scope.$index)" v-text="scope.row.batchNo"></span> -->
          </template>
        </el-table-column>
        <el-table-column prop="bookingItemCount" label="出库条数" >
          <template slot-scope="scope">
            <el-input class="input-num" v-model="scope.row.bookingItemCount"></el-input>
            <!-- <span @click.stop="click($event,5,scope.$index)" v-text="scope.row.bookingItemCount"></span> -->
          </template>
        </el-table-column>
        <el-table-column prop="bookingQuantity" label="出库数量" >
          <template slot-scope="scope">
            <el-input class="input-num" v-model="scope.row.bookingQuantity"></el-input>
            <!-- <span @click.stop="click($event,6,scope.$index)" v-text="scope.row.bookingQuantity"></span> -->
          </template>
        </el-table-column>
        <el-table-column prop="bookingUnit" label="单位" >
          <template slot-scope="scope">
            <span v-text="scope.row.bookingUnit"></span>
          </template>
        </el-table-column>
        <el-table-column prop="saleQuantity" label="标签数量" >
          <template slot-scope="scope">
            <el-input class="input-num" v-model="scope.row.saleQuantity"></el-input>
            <!-- <span @click.stop="click($event,6,scope.$index)" v-text="scope.row.saleQuantity"></span> -->
          </template>
        </el-table-column>
        <el-table-column prop="saleUnit" label="标签单位" >
          <template slot-scope="scope">
            <span v-text="scope.row.saleUnit"></span>
          </template>
        </el-table-column>
        <el-table-column prop="salePrice" label="结算单价">
          <template slot-scope="scope">
            <el-input class="input-num" v-model="scope.row.salePrice"></el-input>
           <!-- <span v-text="scope.row.salePrice"></span> -->
          </template>
        </el-table-column>
        <el-table-column prop="saleUnit" label="结算单位">
          <template slot-scope="scope">
           <span v-text="scope.row.saleUnit" ></span>
          </template>
        </el-table-column>
        <el-table-column prop="totalSaleMoney" label="金额" :change="calculateMoney()">
          <template slot-scope="scope">
            <!-- <el-input class="input-num" v-model="scope.row.totalSaleMoney"></el-input> -->
           <span  v-text="scope.row.totalSaleMoney"></span>
          </template>
        </el-table-column>
        <el-table-column prop="stockCount" label="库存条数" >
          <template slot-scope="scope">
            <el-input class="input-num" v-model="scope.row.stockCount"></el-input>
            <!-- <span v-text="scope.row.stockCount"></span> -->
          </template>
        </el-table-column>
        <el-table-column prop="stockQuantity" label="库存数量">
          <template slot-scope="scope">
            <el-input class="input-num" v-model="scope.row.stockQuantity"></el-input>
           <!-- <span @click.stop="click($event,7,scope.$index)" v-text="scope.row.stockQuantity" ></span> -->
          </template>
        </el-table-column>
        <el-table-column prop="storeName" label="仓库" >
          <template slot-scope="scope">
            <el-input class="input-num" v-model="scope.row.storeName"></el-input>
           <!-- <span @click.stop="click($event,8,scope.$index)" v-text="scope.row.storeName"></span> -->
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" >
          <template slot-scope="scope">
            <el-input class="input-num" v-model="scope.row.remark"></el-input>
           <!-- <span @click.stop="click($event,8,scope.$index)" v-text="scope.row.remark"></span> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="remark">
      <span>单据备注</span>
      <el-input v-model="requestData.remark" placeholder="请输入备注"></el-input>
    </div>
    <div class="page-footer">
      <el-button @click="saveInfoDraft()">保存草稿</el-button>
      <el-button type="danger" @click="saveInfo()">记账</el-button>
    </div>
    <fixed-page1 @supplierInfo="getSupplierInfo" :fixedOption="fixedOption"></fixed-page1>
    <fixed-page2 @deportInfo="getDeportInfo" :fixedOption="fixedOption"></fixed-page2>
    <fixed-page3 @handlerInfl="getHandlerInfo" :fixedOption="fixedOption"></fixed-page3>
    <fixed-inventory @saleInfo="getSaleInfo" v-if="searchGoods" :refreshFun="initFetchData" :close="changeStock"></fixed-inventory>

  </div>
</template>

<script>
import fixedPage1 from "@/components/fixed/fixedSupplier";
import fixedPage2 from "@/components/fixed/fixedNormal";
import fixedPage3 from "@/components/fixed/fixedBrokerage";
import fixedPage4 from "@/components/fixed/fixedStock";
import fixedInventory from "@/components/fixed/fixedInventory";
import InputTable from "@C/BDD_InputTable";
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
  fetchSaleStockSearch
} from "@/api/sale";
export default {
  name: "sale",
  data() {
    return {
      options4: [],
      value9: [],
      list: [],
      loading: false,
      states: ["Alabama", "Alaska", "Arizona",
      "Arkansas", "California", "Colorado",
      "Connecticut", "Delaware", "Florida",
      "Georgia", "Hawaii", "Idaho", "Illinois",
      "Indiana", "Iowa", "Kansas", "Kentucky",
      "Louisiana", "Maine", "Maryland",
      "Massachusetts", "Michigan", "Minnesota",
      "Mississippi", "Missouri", "Montana",
      "Nebraska", "Nevada", "New Hampshire",
      "New Jersey", "New Mexico", "New York",
      "North Carolina", "North Dakota", "Ohio",
      "Oklahoma", "Oregon", "Pennsylvania",
      "Rhode Island", "South Carolina",
      "South Dakota", "Tennessee", "Texas",
      "Utah", "Vermont", "Virginia",
      "Washington", "West Virginia", "Wisconsin",
      "Wyoming"],
      fixedOption: {
        supplierShow: false,
        deportShow: false,
        brokerageShow: false,
        stockShow: false,
        intShow: false
      },
      searchGoods: false,
      edit: true,
      /*----------提交请求合并----------*/
      requestData: {
        goodsNo: "",
        storeNo: "",
        handler: "",
        handlerUserId: "",
        customerName: "",
        customerId: "",
        storeName: "",
        storeId: "",
        saleStoreName: "",
        saleStoreNo: "",
        saleStoreId: "",
        remark: "",
        sheetDate: timeNow(1),
        expectOutStoreDate: "",
        saleUnit: "",
        settleMoney: "",
        saleGoodsList: []
      },
      colorObj: {},
      tableData: [],
      which: 1,
      brokerage: [],
      deport: [],
      supplier: [],
      querySelectArr: [],
      value: "",
      autofocus: false,
      x: 1,
      y: 0,
      dropDown: false
    };
  },
  components: {
    InputTable,
    fixedPage1,
    fixedPage2,
    fixedPage3,
    fixedPage4,
    fixedInventory
  },
  created() {
    this.getTableData();
    this.getSheetNo();
    this.getBrokerage();
    this.getSupplier();
    this.getDeport();
    this.getStock();
  },

  computed: {
    ...mapGetters(["tenantId", "commodityArr"])
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  watch: {
    commodityArr() {
      // this.changeSelectData();
    }
  },
  methods: {
    remoteMethod(query) {
      console.log("query is", query);
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options4 = this.list.filter(item => {
            
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
        // console.log("states item is",item.value);
      } else {
        this.options4 = [];
      }
    },
    goodsHandleSelect(item) {
      // console.log("in the goodsHandleSelect,the item is: "+item)
      console.log("item:", item);
      if(this.which == 1){
        this.tableData[this.y].value = item.goodsNo
      }
      console.log("this.value:", item.goodsNo);
      this.sureSelect(item);
      this.querySelectArr.length = 0;

    },

    querySelect(queryString, cb) {

      var goodsArr;
      if (this.which == 1) {
        goodsArr = this.goodsList;
        // goodsArr = this.colorList;
      }
      // else if (this.x === 4) {
      //   goodsArr = this.batchNoList;
      // } else {
      //   goodsArr = this.goodsList;
      // }

      var results;
      if (this.which == 1) {
        results = this.goodsList;
      } else {
        results = queryString
          ? goodsArr.filter(this.createFilter2(queryString))
          : goodsArr;
      }
      console.log("76767", goodsArr);
      this.querySelectArr = results;
      cb(results);
    },
    createFilter2 (queryString) {
      console.log(queryString);
      return (item) => {
        switch (this.which) {
          case 1:
            item.value = item.goodsNo
            return (item.goodsNo.indexOf(queryString) > -1)
            break
          case 2:
            item.value = item.goodsName
            return (item.goodsName.indexOf(queryString) > -1)
            break
          case 3:
            item.value = item.colorName
            return (item.colorName.indexOf(queryString) > -1)
            break
          default:
            break
        }
      }
    },
    sureSelect (row) {
      //      console.log("this is: "+row.goodsNo+" "+row.goodsName)
      if (this.which === 3) {
        this.tableData[this.y].goodsColor = row.colorName
        this.tableData[this.y].goodsColorId = row.colorId
      } else {
        this.tableData[this.y].goodsNo = row.goodsNo
        this.tableData[this.y].goodsName = row.goodsName
        this.tableData[this.y].goodsUnit = row.unit ? row.unit : ''
        this.tableData[this.y].itemCount = 1
        this.tableData[this.y].orderQuantity = 1
        this.tableData[this.y].goodsId = row.goodsId
        this.getColor(row.goodsNo)
      }
    },


    changeStock() {
      this.searchGoods = !this.searchGoods;
    },
    initFetchData() {
      this.changeStock();
    },

    //获取颜色信息
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
    //获取批号
    getBatchNo() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchSaleStockSearch()
          .then(response => {
            this.batchNoList = response.data.data.list;
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    //新建单号
    getSheetNo() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchSheetCode()
          .then(response => {
            _self.requestData.orderNo = response.data.data.sheetNo;
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    //跳转到采购入库单历史界面
    historyRender: function() {
      //this.$router.push({ path: '/purchase/stock_in_bill_history' })  //对象
      this.$router.push("sale_bill_history"); //字符串
      // this.$router.push({name: 'purchase',param: {stock_in_bill_history}}) //命名路由
    },

    tranfer(data) {
      console.log("tranfer",data);
      this.requestData.saleGoodsList = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].goodsNo !== "") {
          this.requestData.saleGoodsList.push(data[i]);
        }
      }
    },
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
    // 选择
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
    // 筛选
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

    tableQuery(index) {
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
    // 获取客户列表数据
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
    // 获取库存列表数据
    getStock() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchStockList()
          .then(response => {
            this.goodsList = response.data.data.list.list;
            // for (var i = 0; i < this.goodsList.length; i++) {
            //   this.goodsList[i].value = this.goodsList[i].goodsNo;
            // }
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },

    // 改变时间数据
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
          goodsColorNo: "",
          batchNo: "",
          bookingItemCount: "",
          bookingQuantity: "",
          bookingUnit: "",
          saleQuantity: "",
          saleUnit: "",
          totalSaleMoney: "",
          salePrice: "",
          stockCount: "",
          stockQuantity: "",
          storeName: "",
          remark: "",
          goodsId: "",
          goodsColorId: ""
        });
      }
    },
    // 合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if ([1, 2, 3, 4, 5, 8, 10, 12, 16, 17].indexOf(index) > -1) {
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
      this.requestData.bookingItemCount = sums[6];
      this.requestData.bookingQuantity = sums[7];
      this.requestData.saleQuantity = sums[13];
      // this.requestData.settleMoney = sums[10];
      sums[8] = this.tableData[this.y].saleUnit
        ? this.tableData[this.y].saleUnit
        : "";
      return sums;
    },

    // 添加
    add() {
      this.tableData.push({
        goodsNo: "", //编号 1
        goodsName: "", //品名 2
        goodsColorNo: "", //颜色 3
        batchNo: "", //批号 4
        bookingItemCount: "", //出库条数 5
        bookingQuantity: "", //出库数量 6
        bookingUnit: "", //单位 7
        saleQuantity: "", //标签数量 8
        saleUnit: "", //标签单位 结算单位 9 11
        salePrice: "", //结算单价 10
        totalSaleMoney: "", //金额 12
        stockCount: "", //库存条数 13
        stockQuantity: "", //库存数量 14
        storeName: "", //仓库 15
        remark: "", //备注 16
        goodsId: "",
        goodsColorId: ""
      });
    },
    // 删除
    remove(index) {
      this.tableData.splice(index, 1);
    },
    //确定选择
    sureSelect2(row) {
          //  console.log("this is: "+row.goodsNo+" "+row.goodsName)
     
      if (this.which === 1) {
        // this.getStock(row.goodsNo);
        this.tableData.goodsNo = row.goodsNo;
        this.tableData.goodsId = row.goodsId
        console.log('yyyy', this.tableData.goodsNo);
      } else {
        this.getColor(row.goodsNo);
      }
      //  console.log("adad", this.getColor());
      // if (this.x === 3) {
      //   this.tableData[this.y].goodsColor = row.colorName;
      //   this.tableData[this.y].goodsColorId = row.colorId;
      // } else {
      //   this.tableData[this.y].goodsNo = row.goodsNo;
      //   this.tableData[this.y].goodsName = row.goodsName;
      //   this.tableData[this.y].batchNo = row.batchNo;
      //   this.tableData[this.y].saleUnit = row.goodsUnit ? row.goodsUnit : "";
      //   this.tableData[this.y].salePrice = row.bulkPrice;
      //   this.tableData[this.y].bookingItemCount = 1;
      //   this.tableData[this.y].bookingQuantity = 1;
      //   this.tableData[this.y].saleQuantity = 1;
      //   this.tableData[this.y].totalSaleMoney =
      //     this.tableData[this.y].saleQuantity *
      //     this.tableData[this.y].salePrice;
      //   this.tableData[this.y].stockCount = 1;
      //   this.tableData[this.y].stockQuantity = 1;
      //   this.tableData[this.y].storeName = row.storeName;
      //   this.tableData[this.y].goodsId = row.goodsId;
      //   this.getColor(row.goodsNo);
      //   this.getBatchNo();
      // }
    },

    //筛选编号
    querySelect1(queryString, cb) {
      console.log("12222",queryString);
      var salesArr;
      if (this.which === 1) {
        salesArr = this.goodsList;
      }
    },
    // reset() {
    //   var _self = this;
    //   document.onclick = function(e) {
    //     if (_self.$refs.inputSelect) {
    //       _self.$refs.inputSelect.style.display = "none";
    //     }
    //   };
    // },

    saleHandleSelect(item) {
      if(this.which == 1){
        this.value = item.goodsNo
      }else if(this.which == 2){
        this.value = item.goodsName
      }else if(this.which == 3){
        this.value = item.goodsColor
      }
      this.sureSelect(item)
      this.querySelectArr.length = 0
      console.log(this.querySelectArr)
    },
    // createFilter2(queryString) {
    //   return item => {
    //     switch (this.which) {
    //       case 1:
    //         item.value = item.goodsNo;
    //         return (item.goodsNo.indexOf(queryString) > -1);
    //         break;
    //       case 2:
    //         item.value = item.goodsName;
    //         return (item.goodsName.indexOf(queryString) > -1);
    //         break;
    //       case 3:
    //         item.value = item.colorName;
    //         return (item.colorName.indexOf(queryString) > -1);
    //         break;
    //       case 4:
    //         item.value = item.batchNo;
    //         return (item.batchNo.indexOf(queryString) > -1);
    //         break;
    //       default:
    //         break;
    //     }
    //   };
    // },
    //记账
    saveInfo() {
      this.tranfer(this.tableData);
      this.requestData.saleUnit = this.requestData.saleGoodsList[0]
        ? this.requestData.saleGoodsList[0].saleUnit
        : "";
      this.requestData.bookingItemCount = 1;
      this.requestData.bookingQuantity = 1;
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
          message: "请填写记账商品"
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
    // 保存草稿
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
          fetchSaveSaleInfoDraft(this.requestData)
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
    //库存查询信息
    getSaleInfo(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        this.tableData.splice(i, 0, data[i]);
        this.tableData[i].bookingUnit = data[i].stockUnit; //单位
        this.tableData[i].saleUnit = data[i].stockUnit; // 标签单位
      }
    },
    // 获取客户/供应商数据
    getSupplierInfo(data) {
      this.requestData.customerName = data.name;
      this.requestData.customerId = data.id;
    },
    // 获取到仓库数据
    getDeportInfo(data) {
      this.requestData.storeName = data.name;
      this.requestData.storeId = data.id;
    },
    //获取经手人数据
    getHandlerInfo(data) {
      this.requestData.handler = data.name;
      this.requestData.handlerUserId = data.id;
    },
    // getHandlerInfo2(data) {
    //   this.requestData.handler = data.name;
    //   this.requestData.handlerUserId = data.id;
    // },
    // getStockInfo(data) {
    //   this.tableData.goodsNo = data.goodsNo;
    //   this.tableData.stockId = data.stockId;
    // },
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
      // this.tableData[this.y].totalSaleMoney =
      //   this.tableData[this.y].saleQuantity * this.tableData[this.y].salePrice;
    }
    // changeMoney() {
    //   console.log(11111111111);
    // }
  }
};
</script>
<style type="text/scss" lang="scss">
.input-num{
  height: 27px;
  display: flex;
  .el-input__inner  {
    height: 100%;
    padding: 0 10px;
    border: 0 none;
    background: transparent;
    &:focus {
      background: #fff;
      border: 1px #409eff solid;
      outline: -webkit-focus-ring-color auto 5px;
    }
  }
}
.table-input {
  width: 100%;
  height: 27px;
  line-height: 40px;
  margin-top: 0;
  .el-select>.el-input{
    display: flex;
    
    .el-input--suffix .el-input__inner{
      height: 27px;
    }
    .el-input__inner{
      height: 27px;
      border: 0 none;
      background: transparent;
      padding: 0 10px;
        &:focus {
        background: #fff;
        border: 1px #409eff solid;
        outline: -webkit-focus-ring-color auto 5px;
      }
    }
  }
  div {
    display: flex;
    align-items: flex-end;
    width: 100%;
  }
  .el-input--small .el-input__inner {
    height: 28px;
    width: 100%;
    border: 0 none;
    background: transparent;
    &:focus {
      background: #fff;
      border: 1px #409eff solid;
      outline: -webkit-focus-ring-color auto 5px;
    }
  }
}

.search-box-form {
  margin: 10px 0;
}
.search-box-form .el-form-item.el-form-item--large {
  margin-bottom: 0;
}
.search-box-form .el-autocomplete.form-item,
.search-box-form .el-date-editor {
  height: 100%;
  width: 163px;
  margin-top: 0;
}
.search-box-form .el-autocomplete.form-item .el-input--small .el-input__inner {
  height: 28px;
  line-height: 28px;
}
.search-box-form .el-form--inline .el-form-item {
  height: 36px;
  line-height: 23px;
}
.search-box-form .el-form--inline .el-form-item__label {
  font-weight: 400 !important;
  font-size: 12px !important;
  text-align: right;
}
.remark {
  display: flex;
  align-items: center;
  margin-top: 10px;
  box-shadow: 10px -8px 10px -10px #aaa, 5px 8px 10px -10px #aaa;
  .el-input__inner {
    border-color: #f2f2f2;
  }
  span {
    color: #333;
    width: 70px;
    font-size: 14px;
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
  // margin-top: 10px;
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
    height: 28px;
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
.my-autocomplete {
  width: 100%;
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
<style>
.el-table td > .cell span {
  height: 0;
}
.table-contain {
  height: calc(100% - 280px);
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
