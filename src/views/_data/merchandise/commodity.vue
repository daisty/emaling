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
    display: flex;
    .custom-tree-container {
      flex: 0 0 150px;
      border: 1px solid #cad1d8;
      margin-right: 10px;
      height: 100%;
      .flex{
        height: 100%;
        background-color: #fff;
      }
      .tree-title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #333;
        border-bottom: 1px solid #cad1d8;
        .shopping {
          flex: 1;
          padding-left: 10px;
          border: 0 none;
          margin: 10px 0;
          cursor: pointer;
        }
        i {
          padding: 5px;
          cursor: pointer;
        }
      }
    }
    .scope-flex {
      display: flex;
      justify-content: center;
      span {
        flex: 1;
        text-align: center;
        &:first-child {
          flex: 0.5;
        }
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
          <el-button type="danger" size="mini" @click="changeGoods">{{option.btnName}}</el-button>
          <el-button type="info" size="mini" @click="changeGoods4">{{option.btnName1}}</el-button>
        </el-col>
        <el-col :span="8" >
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">{{option.pageName}}</span>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="end">
            <el-button type="primary" size="mini">{{option.btnName2}}</el-button>
            <!-- <el-button size="mini">{{option.btnName3}}</el-button> -->
          </el-row>
        </el-col>
      </el-row>
      <div class="line"></div>
    </div>
    <!-- 表格栏 -->
    <div class="table-contain">
      <div class="custom-tree-container">
        <div class="flex">
          <div class="tree-title">
            <p class="shopping">商品分类</p>
            <i class="el-icon-close" @click="handleDelCategory"></i>
            <i class="el-icon-plus" @click="changeGoodsCategory"></i>
          </div>
          <el-tree
            class="filter-tree"
            node-key="id"
            :data="treeData"
            :props="defaultProps"
            default-expand-all
            ref="tree2"
            @node-click="handleNodeClick">
          </el-tree>
        </div>
      </div>
      <el-table style="width:100%;"
        height="100%"
        ref="multipleTable"
        :data="tableData"
        @selection-change="handleSelectionChange"
        border fit highlight-current-row class="goods-table">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <!-- <el-table-column
          type="selection"
          width="55">
        </el-table-column> -->
        <el-table-column label="操作" width="190">
          <template slot-scope="scope">
            <div class="scope-flex">
              <span class="blue" slot="reference" @click="changeGoods2(scope.$index,scope.row)">修改</span>
              <span class="red" @click="handleStatus(scope.$index)" :class="{green:scope.row.status === 2}" v-text="bankAccountStatusMap.get(scope.row.status)"></span>
              <span class="blue" v-if="scope.row.colorAmount===0" @click="inventoryNone(scope.$index)" slot="reference">库存期初</span>
              <span class="blue" v-else @click="handlePeriod(scope.$index,scope.row)" slot="reference">库存期初</span>
              <el-popover popper-class="moreStyle" trigger="hover" placement="bottom" width="54">
                <!-- <div class="copy" @click="handleCopy(scope.$index)">复制</div> -->
                <div class="blue" @click="handleDeleteCommodity(scope.$index)">删除</div>
                <span class="blue" slot="reference">更多</span>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="goodsNo" label="编号" width="200px">
          <template slot-scope="scope">
            <span v-text="scope.row.goodsNo"></span>
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="品名" width="200px">
          <template slot-scope="scope">
            <span v-text="scope.row.goodsName"></span>
          </template>
        </el-table-column>
        <el-table-column prop="categoryName" label="分类" width="180px">
          <template slot-scope="scope">
            <span v-text="scope.row.categoryName"></span>
          </template>
        </el-table-column>
        <el-table-column prop="colorAmount" label="颜色数量">
          <template slot-scope="scope">
            <span v-text="scope.row.colorAmount"></span>
          </template>
        </el-table-column>
        <el-table-column prop="unit" label="单位">
          <template slot-scope="scope">
            <span v-text="scope.row.unit"></span>
          </template>
        </el-table-column>
        <el-table-column prop="gramWeight" label="克重">
          <template slot-scope="scope">
            <span v-text="scope.row.gramWeight"></span>
          </template>
        </el-table-column>
        <el-table-column prop="ingredient" label="成分">
          <template slot-scope="scope">
            <span v-text="scope.row.ingredient"></span>
          </template>
        </el-table-column>
        <el-table-column prop="width" label="幅宽">
          <template slot-scope="scope">
            <span v-text="scope.row.width"></span>
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
    <add-commodity v-if="addGoods" :refreshFun="initFetchData" :close="changeGoods"></add-commodity>        <!-- 商品添加 -->
    <edit-commodity v-if="editGoods" :refreshFun="initFetchData2" :close="changeGoods2"></edit-commodity>   <!-- 商品编辑 -->
    <add-category v-if="addSort" :refreshFun="initGoodsCategory" :close="changeGoods3"></add-category>     <!-- 添加分类 -->
    <unit-setting v-if="unit" :refreshFun="initGoodsUnit" :close="changeGoods4"></unit-setting>                     <!-- 单位设置 -->
    <inventory-period v-if="inventory" :refreshFun="initFetchDataPeriod" :close="handlePeriod"></inventory-period>  <!--库存期初 -->
  </div>
</template>

<script>
import { parseDate } from "@/utils";
import {
  bankAccountStatusOptions,
  bankAccountStatusMap
} from "@/utils/constants";
import {
  fetchGoodsCategory,
  fetchGoodsList,
  fetchDelCommodity,
  fetchCommodityStatus,
  fetchGetCommodityDetail,
  fetchDelCategory,
  fetchGoodsUnitName,
  fetchCopyCommodity
} from "@/api/data";
import addCommodity from "./add_commodity";
import editCommodity from "./edit_commodity";
import addCategory from "./add_category";
import unitSetting from "./unit_setting";
import inventoryPeriod from "./inventory_period";
export default {
  name: "commodity",
  data() {
    return {
      parseDate,
      bankAccountStatusOptions,
      bankAccountStatusMap,
      option: {
        btnName: "+新增商品",
        btnName1: "单位设置",
        pageName: "全部商品",
        btnName2: "打印",
        // btnName3: "批量搬移"
      },
      filterText: "",
      treeData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      queryData: {
        goodsNo: "",
        goodsName: "",
        categoryName: "",
        colorAmount: "",
        unit: "",
        gramWeight: "",
        pageSize: 15,
        pageNum: 1
      },
      loading: false,
      tableData: [],
      total: 0,
      addGoods: false,
      editGoods: false,
      addSort: false,
      unit: false,
      inventory: false,
      multipleSelection: [],
      currentLabel:'',
      currentId: ''
    };
  },
  components: {
    addCommodity,
    editCommodity,
    addCategory,
    unitSetting,
    inventoryPeriod
  },

  created() {
    this.fetchData();
    this.getGoodsCategory();
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },

  methods: {

    //批量选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
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
    changGoodNew(){
      this.changeGoods()
      for(let i = 0 ; i < 5; i++) {
        
      }
    },
    // 点击新增商品
    changeGoods() {
      // console.log(this.tableData);
      this.addGoods = !this.addGoods;
    },
    //新增商品
    initFetchData() {
      this.changeGoods();
      this.queryData.pageNum = 0;
      this.fetchData();
    },
    // 点击编辑商品
    changeGoods2(index, row) {
      this.editGoods = !this.editGoods;
      if (row !== undefined) {
        sessionStorage.setItem("goodsId", row.goodsId);
      }
    },
    //编辑商品
    initFetchData2() {
      this.changeGoods2();
      this.queryData.pageNum = 0;
      this.fetchData();
    },
    //没有颜色数量，库存期初不弹出来
    inventoryNone(index) {
      this.$message({
        type: 'warning',
        message: '请先去添加颜色'
      })
    },
    //库存期初
    handlePeriod (index, row) {
      this.inventory = !this.inventory;
      if (row !== undefined) {
        sessionStorage.setItem("goodsId", row.goodsId);
      }
      // this.$router.push({
      //   query: Object.assign( row ? { row } : {})
      // });
    },

    //刷新库存期初
    initFetchDataPeriod() {
      this.handlePeriod();
      this.queryData.pageNum = 0;
      this.fetchData();
    },
    //添加商品分类
    initGoodsCategory() {
      this.changeGoods3();
      this.getGoodsCategory();
    },

    //单位设置刷新
    initGoodsUnit() {
      this.changeGoods4();
      this.queryData.pageNum = 0;
      this.fetchData();
    },
    //单位设置关闭
    changeGoods4() {
      this.unit = !this.unit;
    },
    changeGoodsCategory(){
      let currentLabel = this.currentLabel
      let currentId = this.currentId
      if(currentLabel === '') {
        sessionStorage.setItem("currentId", 1)
        sessionStorage.setItem("label", '全部商品')
      }else {
        sessionStorage.setItem("currentId", currentId);
        sessionStorage.setItem("label", currentLabel.label);
      }
      this.addSort = !this.addSort;
    },
    changeGoods3() {
      this.currentLabel = '' 
      this.currentId = ''
      sessionStorage.removeItem("currentId")
      sessionStorage.removeItem("label")      
      this.addSort = !this.addSort
    },

    //删除商品分类树形
    handleDelCategory() {
      let currentLabel = this.currentLabel
      let currentId = this.currentId

      if (currentId === '' || currentLabel === '') {
        this.$message({
          type: "warning",
          message: "请选择要删除的分类"
        })
      }else if(currentLabel.label === '全部商品') {
        this.$message({
          type: "warning",
          message: "不能删除系统预设分类"
        })
        this.currentLabel = '' 
        this.currentId = ''
      } else if (currentId || currentLabel.label) {
        this.$confirm("确定要删除吗？，删除将不可恢复？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.delCategory(currentId)
            this.currentLabel = '' 
            this.currentId = ''
          })
          .catch(() => {
            this.currentLabel = '' 
            this.currentId = ''
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    // 删除接口请求
    delCategory(categoryId) {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchDelCategory(categoryId)
          .then(response => {
            if (response.data.code === 0) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getGoodsCategory();
              resolve(true);
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
    //添加商品分类
    handleNodeClick(data) {
      this.currentLabel = this.$refs.tree2.getCurrentNode()
      this.currentId = this.$refs.tree2.getCurrentKey()
      if(data.label === "全部商品"){
        this.fetchDataAll()
      }else {
        this.fetchData()
      }
    },
    //获取商品分类列表
    getGoodsCategory() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchGoodsCategory()
          .then(response => {
            _self.treeData = response.data.data.treeNode.children;
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    // 获取商品列表
    fetchData() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchGoodsList({
          pageNum: this.queryData.pageNum,
          pageSize: this.queryData.pageSize,
          categoryId: this.queryData.categoryId
        })
          .then(response => {
            var res = response.data;
            if(response.data.code === 0) {
              _self.tableData = response.data.data.list.list;
              _self.loading = false;
              _self.total = response.data.data.list.total;
              _self.queryData.pageSize = response.data.data.list.pageSize;
              _self.queryData.pageNum = response.data.data.list.pageNum;
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
    // 获取商品列表全部商品
    fetchDataAll() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchGoodsList({
          pageNum: this.queryData.pageNum,
          pageSize: this.queryData.pageSize
        })
          .then(response => {
            var res = response.data;
            if(response.data.code === 0) {
              _self.tableData = response.data.data.list.list;
              _self.loading = false;
              _self.total = response.data.data.list.total;
              _self.queryData.pageSize = response.data.data.list.pageSize;
              _self.queryData.pageNum = response.data.data.list.pageNum;
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

    // 复制
    handleCopy(index) {
      return this.getCopyCommodity(this.tableData[index].goodsId, index);
    },
    // 复制请求
    getCopyCommodity(goodsId, index) {
      return new Promise((resolve, reject) => {
        fetchCopyCommodity(goodsId).then(response => {
          var res = response.data;
          if(res.code === 0) {
            this.$message({
              type: "success",
              message: "复制成功"
            });
            this.initFetchData3();
            resolve(true);
          }
        }).catch(err => {
          console.log(err);
          reject(false);
        })
      })
    },
    //删除重刷
    initFetchData3() {
      this.queryData.pageNum = 0;
      this.fetchData();
    },

    //删除
    handleDeleteCommodity(index) {
      if(this.tableData[index].status === 1) {
        this.$confirm("确认要删除吗，删除将不可恢复!", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$message({
            type: "warning",
            message: "商品条目在不停用的状态下，不允许删除"
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
            this.delCommodity(this.tableData[index].goodsId, index);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    // 删除接口请求
    delCommodity(goodsId, index) {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchDelCommodity(goodsId)
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

    // 状态更新
    handleStatus(index) {
      if (this.tableData[index].status === 2) {
        this.getStatus(this.tableData[index].goodsId, index);
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
            this.getStatus(this.tableData[index].goodsId, index);
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

    getStatus(goodsId, index) {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchCommodityStatus(this.tableData[index])
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
  .goods-table{
    &.el-table td{
        &:nth-of-type(2){
          text-align: center;
        }
      }
  }
  .el-popover {
    &.moreStyle {
      min-width: 54px;
      div.copy {
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