<style scoped lang="scss">
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
</style>
<style scoped lang="scss">
  .form-item {
    width: 15%;
  }
  .searchQ {
    display: flex;
    align-items: center;
    padding-top: 10px;
    // margin-bottom: 25px;
    .el-form-item{
      margin-bottom: 12px;
    }
  }
  .form-btn {
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-top: 20px;
  }
  .form-item {
    width: 100%;
    height: 5px;
  }
  .supplier-table {
    height: calc(100% - 160px);
    .scope-flex {
      display: flex;
      span {
        flex: 1;
      }
    }
  }
</style>
<template>
  <div class="app-container" v-loading="loading">
    <!-- 标题栏 -->
    <div class="page-title">
      <!--标题栏-->
      <el-row :gutter="10">
        <el-col :span="8">
          <el-button type="danger" size="mini" @click="changeSupplier">{{option.btnName}}</el-button>
        </el-col>
        <el-col :span="8" >
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">{{option.pageName}}</span>
          </el-row>
        </el-col>
        <!-- <el-col :span="8">
          <el-row type="flex" justify="end">
            <el-button type="primary">{{option.btnName1}}</el-button>
            <el-button>{{option.btnName2}}</el-button>
          </el-row>
        </el-col> -->
      </el-row>
      <div class="line"></div>
    </div>
    <div class="searchQ">
      <el-form :inline="true" :model="queryData" class="demo-form-inline">
        <el-form-item label="筛选条件">
          <el-input size="small" v-model="queryData.customerName" placeholder="请输入供应商名称/编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" size="small" @click="fetchData()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格栏 -->
    <div class="table-contain supplier-table">
      <el-table style="width:100%;"
        height="100%"
        :data="tableData"
        border fit highlight-current-row>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <div class="scope-flex">
              <span class="blue" @click="changeSupplier2(scope.$index,scope.row)" slot="reference">修改</span>
              <span class="blue" @click="changeSupplier4(scope.$index,scope.row)" slot="reference">详情</span>
              <span class="red" @click="handleSupplierStatus(scope.$index)" :class="{green:scope.row.status === 2}" v-text="bankAccountStatusMap.get(scope.row.status)"></span>
              <span class="blue" @click="handleDeleteSupplier(scope.$index)" slot="reference">删除</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="myCode" label="供应商编号" width="200">
          <template slot-scope="scope">
            <span v-text="scope.row.myCode"></span>
          </template>
        </el-table-column>
        <el-table-column prop="customerName" label="供应商名称" width="200">
          <template slot-scope="scope">
            <span v-text="scope.row.customerName"></span>
          </template>
        </el-table-column>
        <el-table-column prop="contacts" label="联系人">
          <template slot-scope="scope">
            <span v-text="scope.row.contacts"></span>
          </template>
        </el-table-column>
        <el-table-column prop="tellphone" label="联系电话" width="200">
          <template slot-scope="scope">
            <span v-text="scope.row.tellphone"></span>
          </template>
        </el-table-column>
        <el-table-column prop="fax" label="传真" width="150px">
          <template slot-scope="scope">
            <span v-text="scope.row.fax"></span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="联系地址" width="200">
          <template slot-scope="scope">
            <span v-text="scope.row.address"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <div style="margin-top: 10px;"></div>
    <div class="block">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="queryData.pageNum"
      :page-sizes="[15, 30, 45, 60, 75]"
      :page-size="queryData.pageSize"
      layout="total, sizes, prev, pager,next,jumper"
      :total="total">
      </el-pagination>
    </div>
    <add-supplier v-if="addInfo" :refreshFun="initFetchData" :close="changeSupplier"></add-supplier>
    <edit-supplier v-if="editInfo" :refreshFun="initFetchData2" :close="changeSupplier2"></edit-supplier>
    <detail-supplier v-if="detailInfo" :refreshFun="initFetchData4" :close="changeSupplier4"></detail-supplier>
  </div>
</template>

<script>
import { parseDate } from "@/utils";
import {
  bankAccountStatusOptions,
  bankAccountStatusMap
} from "@/utils/constants";
import {
  fetchSupplierList,
  fetchDelSupplier,
  fetchSupplierStatus
} from "@/api/data";
import addSupplier from "./add_supplier";
import editSupplier from "./edit_supplier";
import detailSupplier from "./detail_supplier";
export default {
  name: "supplier",
  data() {
    return {
      parseDate,
      bankAccountStatusOptions,
      bankAccountStatusMap,
      addInfo: false,
      editInfo: false,
      detailInfo: false,
      option: {
        btnName: "新增供应商",
        pageName: "供应商",
        btnName1: "刷新",
        btnName2: "打印"
      },

      queryData: {
        myCode: "",
        fax: "",
        tellphone: "",
        customerName: "",
        contacts: "",
        pageSize: 15,
        pageNum: 1
      },
      loading: false,
      tableData: [],
      total: 0
    };
  },
  components: {
    addSupplier,
    editSupplier,
    detailSupplier
  },

  created() {
    this.fetchData();
  },

  methods: {
    // 每页显示多少条
    handleSizeChange(val) {
      this.queryData.pageSize = val;
      this.fetchData();
    },
    //当前页码
    handleCurrentChange(val) {
      this.queryData.pageNum = val;
      this.fetchData();
    },
    //新增
    changeSupplier() {
      this.addInfo = !this.addInfo;
    },
    //新增刷新
    initFetchData() {
      this.changeSupplier();
      this.queryData.pageNum = 0;
      this.fetchData();
    },

    //编辑
    changeSupplier2(index, row) {
      this.editInfo = !this.editInfo;
      this.$router.push({
        query: Object.assign(row ? { row } : {})
      });
    },
    //编辑刷新
    initFetchData2() {
      this.changeSupplier2();
      this.queryData.pageNum = 0;
      this.fetchData();
    },
    //详情
    changeSupplier4(index, row) {
      this.detailInfo = !this.detailInfo;
      this.$router.push({
        query: Object.assign(row ? { row } : {})
      });
      this.fetchData();
    },
    //详情刷新
    initFetchData4() {
      this.changeSupplier4();
      this.queryData.pageNum = 0;
      this.fetchData();
    },
    // 获取账户资料列表
    fetchData() {
      const _self = this;

      return new Promise((resolve, reject) => {
        fetchSupplierList({
          pageNum: _self.queryData.pageNum,
          pageSize: _self.queryData.pageSize,
          customerName: _self.queryData.customerName
        })
          .then(response => {
            var res = response.data;
            if (res.code === 0) {
              _self.tableData = response.data.data.list.list;
              _self.total = response.data.data.list.total;
              _self.queryData.pageSize = response.data.data.list.pageSize;
              _self.queryData.pageNum = response.data.data.list.pageNum;
              _self.loading = false;
              resolve(true);
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
    //删除刷新
    initFetchData3() {
      this.queryData.pageNum = 0;
      this.fetchData();
    },
    //删除
    handleDeleteSupplier(index) {
      if(this.tableData[index].status === 1) {
        this.$confirm("确认要删除吗，删除将不可恢复!", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$message({
            type: "warning",
            message: "供应商在不停用的状态下，不允许删除"
          })
        }).catch(() => {
          this.$message({
            type: "info",
            message: "删除已取消"
          })
        })
      }
      else if (this.tableData[index].status === 2) {
        this.$confirm("确认要删除吗，删除将不可恢复!", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.delSupplier(this.tableData[index].customerId, index);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    //删除请求数据
    delSupplier(customerId, index) {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchDelSupplier(customerId)
          .then(response => {
            var res = response.data;
            if(res.code === 0) {
              _self.$message({
                type: "success",
                message: "删除成功"
              });
              this.initFetchData3();
              resolve(true);
            }else {
              this.$message({
                type: "error",
                message: res.msg
              })
            }
           
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },

    //停用/启用状态
    handleSupplierStatus(index) {
      if(this.tableData[index].status === 2) {
        this.getSupplierStatus(this.tableData[index].customerId, index);
        this.tableData[index].status = 1;
      }else if(this.tableData[index].status === 1) {
        this.$confirm("停用之后该记录将不可用于业务处理,确定要停用吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.getSupplierStatus(this.tableData[index].customerId, index);
          this.tableData[index].status = 2;
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消停用"
          });
        });
      }
    },

    getSupplierStatus(customerId, index) {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchSupplierStatus(this.tableData[index]).then( response => {
          var res = response.data;
          if(res.code === 0) {
            this.$message({
              type: "success",
              message: "状态更新成功"
            });
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
        }).catch(err => {
          console.log(err);
          reject(false);
        });
      });
    }
    
  },
  watch: {
    refresh(newVal) {
      if (newVal) this.fetchData();
    }
  }
};
</script>

<style scoped lang="scss">
.block{
  position:absolute; 
  bottom:0; 
  right:0;
  width:100%; 
  height:60px; 
  line-height: 60px;
  text-align:center; 
  z-index:10; 
  overflow:hidden;
}
input.input-search {
  width: 100%;
  height: 45px;
  line-height: 44px;
  padding-left: 80px;
  &::-webkit-input-placeholder {
    color: #ccc;
  }
}
.input-box {
  font-size: 14px;
  position: relative;
  height: 45px;
  line-height: 45px;
  border: 1px solid #ccc;
  width: 260px;
  color: #575757;
  display: inline-block;
  border-radius: 5px;
  color: #333;
  &:hover {
    border-color: #7ba8e6;
    -webkit-box-shadow: 0 0 4px 0 #7ba8e6;
    box-shadow: 0 0 4px 0 #7ba8e6;
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
    width: 260px;
    padding-right: 10px;
    background-color: transparent;
    border: none;
    outline: none;
    line-height: 20px;
    margin-top: -1px;
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
  cursor: pointer;
}
.green {
  color: #029b26;
  cursor: pointer;
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
  cursor: pointer;
}
.blue {
  color: #0096ff;
  cursor: pointer;
  user-select: none;
}
</style>
<style scoped lang="scss">
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
  border: 0 none;
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