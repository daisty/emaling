<template>
  <div class="app-container">
    <div class="page-title">
      <!--标题栏-->
      <el-row :gutter="10">
        <el-col :span="23">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">库存结存表</span>
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
        <el-col :span="6" class="el-col-padding">
          <span class="searchText">仓 库</span>
          <el-autocomplete class="form-item" size="small" v-model="requestData1.storeName" @focus="which=2"
                      :fetch-suggestions="querySearchs" :trigger-on-focus="true"
                      @select="handleSelect" placeholder="请选择">
            <el-button slot="append" icon="el-icon-search" @click="fixedOption.deportShow=true"></el-button>
          </el-autocomplete>
        </el-col>
      <el-col :span="7" class="el-col-padding">
          <span>品名/编号</span>
          <el-autocomplete class="form-item" size="small" v-model="requestData1.goodsName" @focus="which=1"
                      :fetch-suggestions="querySearchs" :trigger-on-focus="true"
                      @select="handleSelect" placeholder="请选择">
          </el-autocomplete>
        </el-col>
        <el-col :span="5" class="el-col-padding">
          <span>颜色</span>
          <el-autocomplete class="form-item" size="small" v-model="requestData1.goodsColor" @focus="which=3"
                      :fetch-suggestions="querySearchs" :trigger-on-focus="true"
                      @select="handleSelect" placeholder="请选择">
          </el-autocomplete>
        </el-col>
        <el-col :span="5" class="el-col-padding">
          <span>批次</span>
          <el-input class="form-item" size="small" v-model="requestData1.batchNo" placeholder="请输入">
          </el-input>
        </el-col>
        <el-col :span="1">
          <el-button size="small" type="danger" class="btn-search"  @click="stockGoods">查询</el-button>
        </el-col>
      </el-row>

    </div>
    <div class="table-contain padding">
      <el-table v-loading="loading" style="width: 100%;height:calc100%" height="100%" :data="tableData"
                size="mini" border fit highlight-current-row>
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="storeName" label="仓库" width="160">
        </el-table-column>
        <el-table-column prop="goodsNo" label="编号" width="160">
        </el-table-column>
        <el-table-column prop="goodsName" label="品名" width="160">
        </el-table-column>
        <el-table-column prop="colorCount" label="颜色">
        </el-table-column>
        <el-table-column prop="batchNoCount" label="批次">
        </el-table-column>
        <el-table-column prop="itemCount" label="条数">
        </el-table-column>
        <el-table-column prop="quantity" label="数量">
        </el-table-column>
        <el-table-column prop="unit" label="单位" width="120">
        </el-table-column>
      </el-table>
      <el-col class="pagination">
        <el-row :span="24" type="flex" justify="center" align="middle" >
          <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[15, 30, 45, 60, 75]"
        :page-size="pageSize"
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
import fixedPage1 from "@/components/fixed/fixedSupplier";
import fixedPage2 from "@/components/fixed/fixedNormal";
import fixedPage3 from "@/components/fixed/fixedBrokerage";
import { timeToDateFn, timeNow } from "@/utils/BbdCommon";
import { mapGetters } from "vuex";
import { fetchStoreBalanceSheet, fetchGoodsList, fetchDeport } from "@/api/reports";
export default {
  name: "storeBalanceSheet",
  data() {
    return {
      loading:true,
      pageNum: 1, // 当前页数
      pageSize: 15, // 页码大小
      total: 0,
      requestData1: {
        storeId: "", // 仓库ID
        storeName: "",
        goodsId: "", // 商品ID
        goodsName: "",
        goodsColorId: "", // 颜色ID
        goodsColor: "", // 颜色
        batchNo: "" // 批号
      },
      tableData: [], // 接收参数
      goods: [], // 搜索列表的品名
      color: [], // 搜索列表的颜色
      goodsNo: "", //
      store: "", // 仓库
      ulshow: false,
      fixedOption: {
        supplierShow: false,
        deportShow: false,
        brokerageShow: false
      },
      which: 1,
      brokerage: [],
      deport: [],
      supplier: [],
      value: "",
      autofocus: false,
      x: 1,
      y: 0
    };
  },
  created() {
    this.stockGoods(); // 渲染库存结存表
    this.getGoods(); // 搜索框中品名渲染
    this.getDeport();
  },
  mounted() {},
  computed: {
    ...mapGetters(["tenantId"])
  },
  methods: {
    // 分页
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.stockGoods()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNum = val
        this.stockGoods()
      },

    // 库存结存表
    stockGoods() {
      this.loading = true
      // 查询之前判断输入框是否为空，当输入框为空的时候，对于的id 也应该是空的
      if(this.requestData1.storeName === ""){
        this.requestData1.storeId = ''
      }
      if(this.requestData1.goodsColor === ""){
        this.requestData1.goodsColorId = ''
      }
      if(this.requestData1.goodsName === ""){
        this.requestData1.goodsId = ''
      }
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchStoreBalanceSheet(_self.requestData1)
          .then(response => {
            _self.total = response.data.data.total
            _self.tableData = response.data.data.list
            this.loading = false
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
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
          restaurants = this.color;
          break;
        default:
          break;
      }
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    // 获取仓库
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
    // 获取品名
    getGoods() {
      const _self = this;
      return new Promise((resolve, reject) => {

        fetchGoodsList({pageSize: 2147483647})
          .then(response => {
            this.goods = response.data.data.list.list;
            // 渲染品名
            for (var i = 0; i < this.goods.length; i++) {
              this.goods[i].value = this.goods[i].goodsName;
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
      this.requestData1.goodsColor = ''
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
    // 刷新页面
    uploadData(){
      // 默认参数
      this.requestData1 = {
        storeId: "",
        goodsId: "",
        goodsColorId: "",
        batchNo: ""
      }
      this.stockGoods()
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
            return restaurant.colorName.indexOf(queryString) > -1;
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
          this.requestData1.colorId = item.colorId;
          this.requestData1.colorName = item.colorName;
          break;
        default:
          break;
      }
    },
    // 获取弹窗列表信息
    getSupplierInfo(data) {
      this.requestData1.supplierName = data.name;
      this.requestData1.supplierId = data.id;
    },
    getDeportInfo(data) {
      this.requestData1.storeName = data.name;
      this.requestData1.storeId = data.id;
    },
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
  color:#575757;
  margin-bottom: 10px;
  vertical-align: center;
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
.btn-select {
  background-color: #fe9451;
  color: #fff;

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
.table-contain {
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
.pagination{
  margin-top: 50px;
}
.btn-search{
  margin-top: 10px;
}
.searchText{
  display: inline-block;
  height: 20px;
  text-align: center;
  /* margin-top: 5px; */
}
.el-col-padding{
  padding: 0px !important
}
.el-loading-mask{
  z-index: 3;
}
/* 按照来肯样式修改表头和边框样式 */
 .el-table th {
   text-align: center;
   background-color: #e2e9ef;
   color:#1a1a1a;
   border-right: 1px solid #cad1d8;
 }
 .el-table--border td{
   border-right: 1px solid #cad1d8;
 }
 .el-table td, .el-table th.is-leaf{
   border-bottom: 1px solid #cad1d8;
 }
</style>
