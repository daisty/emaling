<template>
  <div class="app-container customer-balance-sheet">
    <div class="page-title">
      <!--标题栏-->
      <el-row :gutter="10">
        <el-col :span="23">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">客户结欠表</span>
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
        <el-col :span="6">
          <span>客户</span>
          <el-autocomplete class="form-item" size="small" v-model="requestData1.customerName" @focus="which=1" :fetch-suggestions="querySearchs" placeholder="请选择"
            :trigger-on-focus="true"
            @select="handleSelect">
            <el-button slot="append" icon="el-icon-search" @click="fixedOption.supplierShow=true"></el-button>
          </el-autocomplete>
        </el-col>
        <el-col :span="2">
          <el-button size="small" type="danger" class="btn-search"  @click="customerSheet">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table-contain padding">
      <el-table  class="test-style" v-loading="loading" style="width: 100%;height:calc100%" height="100%" :data="tableData" :summary-method="getSummaries" size="mini" border fit highlight-current-row show-summary>
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="customerName" label="客户名称" width="150"></el-table-column>
        <el-table-column prop="address" label="地址" width="220"></el-table-column>
        <el-table-column prop="customerTell" label="电话" width="150"></el-table-column>
        <el-table-column prop="settledMoney" label="已结算" width="150"></el-table-column>
        <el-table-column prop="unSettleMoney" label="应收结欠" width="150"></el-table-column>
        <el-table-column prop="" label=""></el-table-column>
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
import fixedPage1 from "@/components/fixed/fixedSupplier";
import { timeToDateFn, timeNow } from "@/utils/BbdCommon";
import { mapGetters } from "vuex";
import { getCustomerBalanceSheet, fetchSupplier, fetchSaveInstroeInfo } from "@/api/reports";
export default {
  name: "customerBalanceSheet",
  data() {
    return {
      loading:true,
      total: 0,
      requestData1: {
        pageNum: 1, // 当前页数
        pageSize: 15, // 页码大小
        customerName: "", // 客户名称
        customerId: "" // 客户id
      },
      tableData: [], // 接收参数
      customer: [], // 客户
      ulshow: false,
      fixedOption: {
        supplierShow: false,
      },
      which: 1,
      supplier: [],
      value: "",
      autofocus: false,
      x: 1,
      y: 0
    };
  },
  created() {
    this.customerSheet(); // 渲染库存结存表
    this.getSupplier() // 客户
  },
  mounted() {},
  computed: {
    ...mapGetters(["tenantId"])
  },
  methods: {
    // 分页
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.requestData1.pageSize = val
        this.customerSheet()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.requestData1.pageNum = val
        this.customerSheet()
      },

    // 客户结欠表
    customerSheet() {
      this.loading = true
      // 查询之前判断输入框是否为空，当输入框为空的时候，对于的id 也应该是空的
      if(this.requestData1.customerName === ""){
        this.requestData1.customerId = ''
      }
      const _self = this;
      return new Promise((resolve, reject) => {
        getCustomerBalanceSheet(_self.requestData1)
          .then(response => {
            _self.total = response.data.list.total
            _self.tableData = response.data.list.list
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
    // 刷新页面
    uploadData(){
      // 默认参数
      this.requestData1 = {
        storeId: "",
        goodsId: "",
        goodsColorId: "",
        batchNo: ""
      }
      this.customerSheet()
    },
    createFilter(queryString) {
      return restaurant => {
        switch (this.which) {
          case 1:
            return restaurant.customerName.indexOf(queryString) > -1;
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
          this.requestData1.customerId = item.customerId;
          this.requestData1.customerName = item.value;
          break;
        default:
          break;
      }
    },
    // 获取弹窗列表信息
    getSupplierInfo(data) {
      this.requestData1. customerName = data.name;
      this.requestData1.customerId = data.id;
    },
    getSummaries (param) {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
            return
          }
          if (index === 1 || index === 2 || index === 3 ) {
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
  },
  components: {
    fixedPage1
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
.test-style{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
</style>
<style lang="scss">

</style>
<style>
.customer-balance-sheet .table-contain {
  height: calc(100% - 283px);
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
.customer-balance-sheet .padding .el-table th > .cell,
.customer-balance-sheet .padding .el-table td > .cell {
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
.customer-balance-sheet .pagination{
  margin-top: 50px;
}
.customer-balance-sheet .btn-search{
  margin-top: 10px;
}
.searchText{
  display: inline-block;
  height: 20px;
  text-align: center;
  /* margin-top: 5px; */
}
.customer-balance-sheet .el-col-padding{
  padding: 0px !important
}
.customer-balance-sheet .el-loading-mask{
  z-index: 3;
}
</style>
