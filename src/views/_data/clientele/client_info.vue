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
.client-table {
  width: 100%;
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
          <el-button type="danger" size="mini" @click="changeClient">{{option.btnName}}</el-button>
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
          <el-input size="small" v-model="queryData.customerName" placeholder="请输入客户名称/编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" size="small" @click="fetchData()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div class="searchQ">
      <div class="input-box" style="top:10px">
        <span class="name">筛选条件</span><input v-model="queryData.customerName" placeholder="请输入客户名称/编号" class="input-search"/>
      </div>
       <el-button class="form-btn" type="danger" @click="fetchData()">查询</el-button>
    </div> -->
    <!-- 表格栏 -->
    <div class="table-contain client-table">
      <el-table style="width:100%;"
        height="100%"
        :data="tableData"
        border fit highlight-current-row>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <div class="scope-flex">
              <span class="blue" @click="changeClient2(scope.$index,scope.row)" slot="reference">修改</span>
              <span class="blue" @click="changeClient4(scope.$index,scope.row)" slot="reference">详情</span>
              <span class="red" @click="handleClientStatus(scope.$index)" :class="{green:scope.row.status === 2}" v-text="bankAccountStatusMap.get(scope.row.status)"></span>
              <span class="blue" @click="handleDeleteClient(scope.$index)" slot="reference">删除</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="myCode" label="客户编号" width="200">
          <template slot-scope="scope">
            <span v-text="scope.row.myCode"></span>
          </template>
        </el-table-column>
        <el-table-column prop="customerName" label="客户名称" width="180">
          <template slot-scope="scope">
            <span v-text="scope.row.customerName"></span>
          </template>
        </el-table-column>
        <el-table-column prop="customerTell" label="联系电话" width="200">
          <template slot-scope="scope">
            <span v-text="scope.row.customerTell"></span>
          </template>
        </el-table-column>
        <el-table-column prop="firmName" label="公司名称" width="220">
          <template slot-scope="scope">
            <span v-text="scope.row.firmName"></span>
          </template>
        </el-table-column>
        <el-table-column prop="firmTell" label="公司电话">
          <template slot-scope="scope">
            <span v-text="scope.row.firmTell"></span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="公司地址" width="260">
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
    <add-client v-if="addInfo" :refreshFun="initFetchData" :close="changeClient"></add-client>
    <edit-client v-if="editInfo" :refreshFun="initFetchData2" :close="changeClient2"></edit-client>
    <detail-client v-if="detailInfo" :refreshFun="initFetchData4" :close="changeClient4"></detail-client>
  </div>
</template>

<script>
import { parseDate } from "@/utils";
import {
  bankAccountStatusOptions,
  bankAccountStatusMap
} from "@/utils/constants";
import {
  fetchClientInfo,
  fetchDelClientInfo,
  fetchClientInfoStatus
} from "@/api/data";
import addClient from "./add_client_info";
import editClient from "./edit_client_info";
import detailClient from "./detail_client_info";
export default {
  name: "client_info",
  data() {
    return {
      parseDate,
      bankAccountStatusOptions,
      bankAccountStatusMap,
      addInfo: false,
      editInfo: false,
      detailInfo: false,
      option: {
        btnName: "新增客户",
        pageName: "客户信息",
        btnName1: "刷新",
        btnName2: "打印"
      },

      queryData: {
        myCode: "",
        customerName: "",
        customerTell: "",
        firmName: "",
        firmTell: "",
        pageSize: 15,
        pageNum: 1
      },
      loading: false,
      tableData: [],
      total: 0
    };
  },
  components: {
    addClient,
    editClient,
    detailClient
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
    //添加弹框
    changeClient() {
      this.addInfo = !this.addInfo;
    },
    //添加重新刷新请求列表数据
    initFetchData() {
      this.changeClient();
      this.queryData.pageNum = 0;
      this.fetchData();
    },
    changeClient2(index, row) {
      this.editInfo = !this.editInfo;
      this.$router.push({
        query: Object.assign(row ? { row } : {})
      });
    },
    //编辑刷新
    initFetchData2() {
      this.changeClient2();
      this.queryData.pageNum = 0;
      this.fetchData();
    },

    //详情
    changeClient4(index, row) {
      this.detailInfo = !this.detailInfo;
      this.fetchData();
      this.$router.push({
        query: Object.assign(row ? { row } : {})
      });
    },
    //详情刷新
    initFetchData4() {
      this.changeClient4();
      this.queryData.pageNum = 0;
      this.fetchData();
    },
    //删除刷新
    initFetchData3() {
      this.queryData.pageNum = 0;
      this.fetchData();
    },
    // 获取账户资料列表
    fetchData() {
      const _self = this;

      return new Promise((resolve, reject) => {
        fetchClientInfo({
          pageNum: _self.queryData.pageNum,
          pageSize: _self.queryData.pageSize,
          customerName: _self.queryData.customerName
        })
          .then(response => {
            var res = response.data;
            if(res.code === 0) {
              _self.tableData = response.data.data.list.list;
              _self.total = response.data.data.list.total;
              _self.queryData.pageSize = response.data.data.list.pageSize;
              _self.queryData.pageNum = response.data.data.list.pageNum;
              _self.loading = false;
            }else{
              this.$message({
                type: "error",
                message: res.msg
              })
            }
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },

    //删除
    handleDeleteClient(index) {
      if(this.tableData[index].status === 1) {
        this.$confirm("确认要删除吗，删除将不可恢复!", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$message({
            type: "warning",
            message: "客户信息在不停用的状态下，不允许删除"
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
            this.delClientInfo(this.tableData[index].customerId, index);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },

    delClientInfo(customerId, index) {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchDelClientInfo(customerId)
          .then(response => {
            var res = response.data;
            if (res.code === 0) {
              _self.$message({
                type: "success",
                message: "删除成功"
              });
              this.initFetchData3();
              resolve(true);
            } else {
              _self.message({
                type: "error",
                message: "res.msg"
              });
            }
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },

    //启用/停用状态
    handleClientStatus(index) {
      if (this.tableData[index].status === 2) {
        this.getClientStatus(this.tableData[index].customerId, index);
        this.tableData[index].status = 1;
      } else if (this.tableData[index].status === 1) {
        this.$confirm(
          "停用之后该记录将不可用于业务处理,确定要停用吗？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.getClientStatus(this.tableData[index].customerId, index);
            this.tableData[index].status = 2;
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消停用"
            });
          });
      }
    },

    // 状态更新
    getClientStatus(customerId, index) {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchClientInfoStatus(this.tableData[index])
          .then(response => {
            var res = response.data;
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "状态更新成功"
              });
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
    &::-webkit-input-placeholder{
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
    color:#333;
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