<template>
  <div>
    <el-dialog
        title="库存查询"
        :before-close="close"
        :visible="true"
        width="772px">
      <el-form :model="form" :rules="rules" ref="form" :label-position="labelPosition" label-width="60px">
        <el-row :gutter="10">
          <el-col :span="6">
              <el-form-item  label="仓库" prop="storeName" required>
                <el-autocomplete size="small" v-model="form.storeName" @focus="which=1"
                       :fetch-suggestions="querySearchs" :trigger-on-focus="true"
                       @select="handleSelect">            
                </el-autocomplete>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="编号" prop="goodsNo" required>
                  <el-input size="small" v-model="form.goodsNo"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="颜色" prop="goodsColor">
                  <el-input size="small" v-model="form.goodsColor"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item  label="批号" prop="batchNo">
                  <el-input size="small" v-model="form.batchNo"></el-input>
              </el-form-item>
          </el-col>
          <el-col style="display:flex; justify-content: flex-end;">
            <el-button type="danger" size="small" @click="getStock()">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- <inventory-table @someInfo="getInfo" :tableData="tableData.list" :summary-method="getSummaries"></inventory-table> -->
      <div class="deport-table-contain">
        <el-table style="width: 100%; height:320px; overflow-y: scroll"
          size="mini"
          ref="multipleTable"
          :data="tableData.list"
          tooltip-effect="dark"
          :summary-method="getSummaries"
          @row-click="handleSelectionChange"
          @selection-change="handleSelectionChange"
          border fit highlight-current-row show-summary>
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column prop="goodsNo" label="编号"></el-table-column>
          <el-table-column prop="goodsName" label="品名" >
          </el-table-column>
          <el-table-column prop="goodsColorNo" label="颜色" >
          </el-table-column>
          <el-table-column prop="batchNo" label="批号" >
          </el-table-column>
          <el-table-column prop="stockCount" label="条数" >
          </el-table-column>
          <el-table-column prop="stockQuantity" label="数量" >
          </el-table-column>
          <el-table-column prop="stockUnit" label="单位" >
          </el-table-column>
        </el-table>
      </div>
      <this-url></this-url>
      <div class="page-contain">
        <span @click="pageChange(1)" class="prev" :class="{forbid:tableData.pageNum===1}">上页</span>
        <span class="current">第(<i>{{tableData.pageNum}}/{{tableData.pages}}</i>)页</span>
        <span @click="pageChange(2)" class="next" :class="{forbid:tableData.pageNum===tableData.pages}">下页</span>
        <span class="jumper">
          跳转到<input type="text" @blur="pageChange(3)" v-model="jumperPage">页
        </span> 
        <span class="total">
          共<i>{{tableData.total}}</i>条记录
        </span>
        <span class="page-size">
          每页显示<input type="text" @blur="pageChange(4)" v-model="pageSize">行
        </span>
        <el-button style="float:right;border-color:#ccc;" size="mini" @click="close">取消(Esc)</el-button>
        <el-button style="float:right;margin-right:10px;" type="primary" size="mini" @click="sureChose()">确定(Enter)</el-button>
      </div>
    </el-dialog>
  </div> 
</template>

<script>
// import inventoryTable from "./components/inventoryTable";
import thisUrl from "./components/thisUrl";
import Bus from "@/utils/bus";
import { fetchSaleStockSearch, fetchStockStore } from "@/api/sale";
export default {
  props: {
    fixedOption: {
      Object
    },
    refreshFun: {
      type: Function
    },
    close: {
      type: Function
    }
  },
  data() {
    return {
      url: "全部",
      form: {
        goodsNo: "",
        goodsName: "",
        goodsColorNo: "",
        batchNo: "",
        storeId: "",
        storeName: "",
        stockCount: ""
      },
      rules: {
        storeName: [
          { required: true, message: "请输入仓库名称", trigger: "blur" }
        ],
        goodsNo: [
          { required: true, message: "请输入编号", trigger: "blur" }
        ],
      },
      labelPosition: "center",
      backgroundColor: {},
      zIndex: {},
      tableData: {},
      jumperPage: "",
      pageNum: 1,
      pageSize: 15,
      index: "",
      val: "",
      multipleSelection: [],
      storeName: "",
    };
  },
  created() {
    this.getStore();
  },
  components: {
    // inventoryTable,
    thisUrl
  },
  methods: {
    eve() {
      Bus.$emit("NewDepotShow", true, 1);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    querySearchs(queryString, cb) {
      var restaurants;
      switch (this.which) {
        case 1:
          restaurants = this.depot;
          break;
        default:
          break;
      }
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    getStore() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchStockStore()
          .then(response => {
            this.depot = response.data.data.storeInfoList;
            for (var i = 0; i < this.depot.length; i++) {
              this.depot[i].value = this.depot[i].storeName;
            }
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    getInfo(index) {
      this.index = index;
    },
    getStock() {
      return new Promise((resolve, reject) => {
        fetchSaleStockSearch({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          goodsNo: this.form.goodsNo,
          storeId: this.form.storeId,
          goodsColorNo: this.form.goodsColorNo,
          batchNo: this.form.batchNo
        })
          .then(response => {
            var res = response.data;
            if (res.code === 0) {
              this.tableData = res.data.list;
              this.pages = res.data.list.pages;
              this.pageNum = res.data.list.pageNum;
              this.pageSize = res.data.list.pageSize;
              this.total = res.data.list.total;
              this.jumperPage = res.data.list.pageNum;
            } else {
              this.$message({
                type: "error",
                message: res.msg
              });
            }
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    pageChange(index) {
      if (index === 1) {
        if (this.pageNum <= 1) {
          this.pageNum = 1;
          return false;
        }
        this.pageNum--;
      } else if (index === 2) {
        if (this.pageNum >= this.pages) {
          this.pageNum = this.pages;
          return false;
        }
        this.pageNum++;
      } else if (index === 3) {
        if (
          this.jumperPage === "" ||
          this.jumperPage < 1 ||
          this.jumperPage > this.pages
        ) {
          this.jumperPage = this.pageNum;
          return false;
        }
        this.pageNum = this.jumperPage;
      } else {
        if (this.pageSize === "") {
          this.pageSize = this.tableData.pageSize;
          return false;
        }
      }
      this.getStock({ pageNum: this.pageNum, pageSize: this.pageSize });
    },
    createFilter(queryString) {
      return restaurant => {
        switch (this.which) {
          case 1:
            return restaurant.storeName.indexOf(queryString) > -1;
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
          this.form.storeId = item.storeId;
          this.form.storeName = item.value;
          break;
        default:
          break;
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
          index === 5 ||
          index === 6
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
      this.form.stockCount = sums[5];
      this.form.stockQuantity = sums[6];
      // this.requestData.saleQuantity = sums[8];
      // this.requestData.settleMoney = sums[10];
      // sums[11] = this.tableData[this.y].saleUnit
      //   ? this.tableData[this.y].saleUnit
      //   : "";
      return sums;
    },
    sureChose() {
      // this.multipleSelection = val;
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: "error",
          message: "请选择库存"
        });
        return false;
      }else{
        this.$emit("saleInfo", this.multipleSelection);
        this.refreshFun();
      }
      // this.getStock();
      // this.$emit("supplierInfo", this.multipleSelection);
      
    },

  }
};
</script>

<style scoped lang="scss">
.deport-table-contain {
  margin-top: 20px;
  height: calc(100% - 131px);
}
.fade-in-enter-active {
  transition: all 0.3s;
}
.fade-in-leave-active {
  transition: all 0.3s;
}
.fade-in-enter {
  transform: translate3d(0, -100px, 0);
  opacity: 0;
}
.fade-in-leave-to {
  transform: translate3d(0, -100px, 0);
  opacity: 0;
}
.fix-box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  // background: rgba(0,0,0,.3);
  z-index: 10000;
  .content {
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-width: 1px;
    border-style: solid;
    border-color: #868686;
    background-color: #fff;
    .fix-top {
      background-color: #868686;
      height: 32px;
      color: #fff;
      position: relative;
      span.text {
        line-height: 32px;
        padding-left: 10px;
        font-size: 14px;
      }
      b.close {
        width: 20px;
        height: 19px;
        font-weight: 700;
        background-color: #fff;
        text-align: center;
        line-height: 19px;
        color: #868686;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        &:hover {
          background: #f56c6c;
          color: #fff;
        }
      }
    }
    .fix-content {
      width: 100%;
      height: calc(100% - 32px);
      padding: 15px;
      .input {
        width: 220px;
        display: inline-block;
      }
    }
  }
}
.page-contain {
  margin-top: 15px;
  font-size: 0;
  line-height: 28px;
  span {
    display: inline-block;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    color: #333;
    margin-right: 10px;
    vertical-align: middle;
    i {
      color: #97bafe;
      padding: 0 4px;
    }
    input {
      border: 1px solid #ccc;
      width: 30px;
      height: 20px;
      text-align: center;
      margin: 0 5px;
    }
  }
  span.prev,
  span.next {
    width: 60px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  span.jumper {
    margin-left: 10px;
  }
}
</style>
<style>
.deport-table-contain >.el-table td > .cell span{
  width: 14px;
  height: 14px;
}
/* .fix-content .search {
  font-size: 0;
}
.fix-content .search .el-input input {
  border-color: #868686;
}
.fix-content .search .el-input input:hover {
  border-color: #7b8ae6;
  box-shadow: 0 0 4px 0 #7b8ae6;
}
.fix-content .search .el-input input:focus {
  border-color: #7b8ae6;
  box-shadow: 0 0 4px 0 #7b8ae6;
}
.fix-content .search .el-button {
  color: #333;
  border-color: #868686;
  background-color: #ffcc66;
  margin-left: 25px;
}
.fix-content .search .el-button:hover {
  background-color: rgba(255, 204, 102, 0.8);
} */
</style>>