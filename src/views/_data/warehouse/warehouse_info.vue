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
  margin-top: 10px;
  margin-left: 10px;
}
.form-btn {
  margin-top: 10px;
  margin-left: 10px;
}
.form-item {
  width: 100%;
  height: 5px;
  border-bottom: 3px solid #d4d8e1;
}
.table-contain {
  height: calc(100% - 100px);
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
          <el-button type="danger" size="mini" @click="changewarehouse1">{{option.btnName}}</el-button>
        </el-col>
        <el-col :span="8" >
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">{{option.pageName}}</span>
          </el-row>
        </el-col>
      </el-row>
      <div class="line"></div>
    </div>
    <!-- 表格栏 -->
    <div class="table-contain">
      <el-table style="width:100%;"
        height="100%"
        :data="tableData"
        border fit highlight-current-row>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <div class="scope-flex">
              <span class="blue" @click="changewarehouse2(scope.$index, scope.row)" slot="reference">修改</span>
              <span class="blue" @click="handleDeleteWarehouse(scope.$index)" slot="reference">删除</span>
              <span class="red" @click="handleWarehouseStatus(scope.$index)" :class="{green:scope.row.status === 2}" v-text="bankAccountStatusMap.get(scope.row.status)"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="storeNo" label="仓库编号" width="200">
          <template slot-scope="scope">
            <span v-text="scope.row.storeNo"></span>
          </template>
        </el-table-column>
        <el-table-column prop="storeName" label="仓库名称" width="200">
          <template slot-scope="scope">
            <span v-text="scope.row.storeName"></span>
          </template>
        </el-table-column>
        <el-table-column prop="myCode" label="助记码" width="100">
          <template slot-scope="scope">
            <span v-text="scope.row.myCode"></span>
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
        <el-table-column prop="address" label="地址" width="300">
          <template slot-scope="scope">
            <span v-text="scope.row.address"></span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="240">
          <template slot-scope="scope">
            <span v-text="scope.row.remark"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 10px;"></div>
    <div class="block" style="text-align:center;">
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
    <!-- 添加 -->
    <add-warehouse v-if="addStorehouse" :refreshFun="initFetchData" :close="changewarehouse1"></add-warehouse>
    <!-- 编辑 -->
    <edit-warehouse v-if="editStorehouse" :refreshFun="initFetchData2" :close="changewarehouse2"></edit-warehouse>
  </div>
</template>

<script>
import { parseDate } from "@/utils";
import {
  bankAccountStatusOptions,
  bankAccountStatusMap
} from "@/utils/constants";
import {
  fetchWarehouseInfo,
  fetchDelWarehouse,
  fetchWarehouseInfoStatus
} from "@/api/data";
import addWarehouse from "./add_warehouse";
import editWarehouse from "./edit_warehouse";
export default {
  name: "warehouse_info",
  data() {
    return {
      parseDate,
      bankAccountStatusOptions,
      bankAccountStatusMap,
      option: {
        btnName: "+新建仓库",
        pageName: "仓库信息"
      },
      queryData: {
        storeNo: "",
        storeName: "",
        contacts: "",
        tellphone: "",
        address: "",
        pageSize: 15,
        pageNum: 1
      },
      loading: false,
      tableData: [],
      total: 0,
      addStorehouse: false,
      editStorehouse: false
    };
  },
  components: {
    addWarehouse,
    editWarehouse
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
    changewarehouse1() {
      this.addStorehouse = !this.addStorehouse;
    },
    //编辑
    changewarehouse2(index, row) {
      this.editStorehouse = !this.editStorehouse;
      this.$router.push({
        query: Object.assign(row ? { row } : {})
      });
    },
    // 添加数据刷新
    initFetchData() {
      this.changewarehouse1();
      this.queryData.pageNum = 0;
      this.fetchData();
    },
    // 编辑数据刷新
    initFetchData2() {
      this.changewarehouse2();
      this.queryData.pageNum = 0;
      this.fetchData();
    },
    // 删除数据刷新
    initFetchData3() {
      this.queryData.pageNum = 0;
      this.fetchData();
    },
    // 获取账户资料列表
    fetchData() {
      const _self = this;

      return new Promise((resolve, reject) => {
        fetchWarehouseInfo({
          pageNum: _self.queryData.pageNum,
          pageSize: _self.queryData.pageSize
        })
          .then(response => {
            _self.tableData = response.data.data.storeInfoList.list;
            _self.loading = false;
            _self.total = response.data.data.storeInfoList.total;
            _self.queryData.pageSize =
              response.data.data.storeInfoList.pageSize;
            _self.queryData.pageNum = response.data.data.storeInfoList.pageNum;
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },

    //删除
    handleDeleteWarehouse(index) {
      if(this.tableData[index].status === 1) {
        this.$confirm("确认要删除吗，删除将不可恢复!", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$message({
            type: "warning",
            message: "仓库信息在不停用的状态下，不允许删除"
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
            this.delWarehouse(this.tableData[index].storeId, index);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    // 删除请求成功
    delWarehouse(storeId, index) {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchDelWarehouse(storeId)
          .then(response => {
            var res = response.data;
            if (res.code === 0) {
              this.$message({
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
    // 状态启用/停用状态
    handleWarehouseStatus(index) {
      if (this.tableData[index].status === 2) {
        this.getWarehouseStatus(this.tableData[index].storeId, index);
        this.tableData[index].status = 1;
      } else if (this.tableData[index].status === 1) {
        this.$confirm(
          "停用之后该记录将不可用于业务处理，确定要停用吗？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.getWarehouseStatus(this.tableData[index].storeId, index);
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
    getWarehouseStatus(storeId, index) {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchWarehouseInfoStatus(this.tableData[index])
          .then(response => {
            var res = response.data;
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "状态更新成功"
              });
              resolve(true);
            } else {
              this.$message({
                type: "error",
                message: res.msg
              });
            }
            this.initFetchData3();
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
