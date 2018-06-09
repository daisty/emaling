<template>
  <div>
    <el-dialog
        title="商品选择"
        :before-close="close"
        :visible="true"
        width="772px">
      <el-form :model="form" ref="form" :label-position="labelPosition" label-width="90px">
        <el-row :gutter="10">
          <el-col :span="10">
              <el-form-item label="编号/品名" prop="goodsName">
                  <el-input size="small" v-model="form.goodsName" placeholder="编号/品名"></el-input>
              </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
              <el-form-item label="品名" prop="goodsName">
                  <el-input size="small" v-model="form.goodsName"></el-input>
              </el-form-item>
          </el-col> -->
          <!-- <el-col :span="6">
              <el-form-item  label="批号" prop="batchNo">
                  <el-input size="small" v-model="form.batchNo"></el-input>
              </el-form-item>
          </el-col> -->
          <el-col :span="6" style="margin-top: 6px">
            <el-button type="danger" size="mini" @click="getStoreCommodity()">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- <inventory-table @someInfo="getInfo" :tableData="tableData.list" :summary-method="getSummaries"></inventory-table> -->
      <div class="deport-table-contain">
        <div class="tree-hidden" ref="treeMin" title="展开树形菜单" @click="arrowRight">
          <div class="tree-right">
            <i class="el-icon-d-arrow-right"></i>
          </div>
          <div class="tree-fold-title">商品分类</div>
        </div>
        <div class="custom-tree-container" ref="treeLarge">
          <div class="flex">
            <div class="tree-title">
              <p class="shopping">商品分类</p>
              <i class="el-icon-d-arrow-left" title="收起树形菜单" @click="arrowLeft"></i>
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
        <goods-table @someInfo="getInfo" :tableData="tableData.list"></goods-table>
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
import goodsTable from "./components/goodsTable";
import thisUrl from "./components/thisUrl";
import Bus from "@/utils/bus";
import { fetchGoodsCategory, fetchGoodsList } from "@/api/setting";
export default {
  props: {
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
        categoryId: "",
      },
      labelPosition: "left",
      treeData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      oper: "",
      tableData: {},
      jumperPage: "",
      pageNum: 1,
      pageSize: 15,
      index: "",
      val: "",
      multipleSelection: [],
      goodsName: "",
    };
  },
  created() {
    this.getGoodsCategory();
    this.getStoreCommodity();
  },
  components: {
    goodsTable,
    thisUrl
  },
  methods: {
    eve() {
      Bus.$emit("NewDepotShow", true, 1);
    },
    handleNodeClick(data){
      let labelId = data.id;
      this.form.categoryId = labelId;
      if(labelId){
        this.getStoreCommodityList({ pageNum: this.pageNum, pageSize: this.pageSize, categoryId: this.form.categoryId});
      }else{
        this.getStoreCommodityList();
      }
      
    },
    // getStore() {
    //   const _self = this;
    //   return new Promise((resolve, reject) => {
    //     fetchStockStore()
    //       .then(response => {
    //         this.depot = response.data.data.storeInfoList;
    //         for (var i = 0; i < this.depot.length; i++) {
    //           this.depot[i].value = this.depot[i].storeName;
    //         }
    //         resolve(true);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //         reject(false);
    //       });
    //   });
    // },
    //点击收起树形菜单
    arrowLeft() {
      if(this.$refs.treeLarge) {
        this.$refs.treeLarge.style.display = 'none'
        this.$refs.treeMin.style.display = 'block'
      }
    },
    //点击展开树形菜单
    arrowRight(){
      if(this.$refs.treeMin) {
        this.$refs.treeMin.style.display = 'none'
        this.$refs.treeLarge.style.display = 'block'
      }
    },
    getInfo(index) {
      this.index = index;
    },
        //获取商品分类列表
    getGoodsCategory() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchGoodsCategory()
          .then(response => {
            _self.treeData = response.data.treeNode.children;
            console.log(response);
            _self.oper = response.oper
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },

    getStoreCommodity() {
      return new Promise((resolve, reject) => {
        fetchGoodsList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          goodsNo: this.form.goodsNo,
          goodsName: this.form.goodsName
        })
          .then(response => {
            if (response.code === 0) {
              this.tableData = response.data.list;
              this.pages = response.data.list.pages;
              this.pageNum = response.data.list.pageNum;
              this.pageSize = response.data.list.pageSize;
              this.total = response.data.list.total;
              this.jumperPage = response.data.list.pageNum;
            } else {
              this.$message({
                type: "error",
                message: response.msg
              });
            }
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    //树形菜单查询列表
    getStoreCommodityList() {
      return new Promise((resolve, reject) => {
        fetchGoodsList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          categoryId: this.form.categoryId
        })
          .then(response => {
            if (response.code === 0) {
              this.tableData = response.data.list;
              this.pages = response.data.list.pages;
              this.pageNum = response.data.list.pageNum;
              this.pageSize = response.data.list.pageSize;
              this.total = response.data.list.total;
              this.jumperPage = response.data.list.pageNum;
            } else {
              this.$message({
                type: "error",
                message: response.msg
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
      this.getStoreCommodity({ pageNum: this.pageNum, pageSize: this.pageSize });
    },
    sureChose() {

      if (this.index === '') {
        this.$message({
          type: "error",
          message: "请选择商品名称"
        });
        return false;
      }else{
        this.$emit("storeGoodsInfo", {
          name: this.tableData.list[this.index].goodsName,
          id: this.tableData.list[this.index].goodsId
        });
        this.refreshFun();
      }
    },

  }
};
</script>

<style scoped lang="scss">
.deport-table-contain {
  height: calc(100% - 200px);
  display: flex;
  .tree-hidden{
    width: 30px;
    text-align: center;
    background-color: #f2f2f2;
    // height: 100%;
    cursor: pointer;
    color: #0a7df5;
    margin-right: 10px;
    display: none;
    .tree-right{
      padding: 14px 0;
    }
    .tree-fold-title {
      font-size: 12px;
      padding: 5px;
      line-height: 1.6em;
    }
  }
  .custom-tree-container {
    flex: 0 0 130px;
    border: 1px solid #cad1d8;
    margin-right: 10px;
    height: 320px;
    &::-webkit-scrollbar {
      display: none;
    }
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