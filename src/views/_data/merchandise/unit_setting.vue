<style scoped lang="scss">
.accountBtn {
  display: flex;
  padding-top: 20px;
  box-sizing: border-box;
  justify-content: flex-end;
}
.color-info {
  height: 100%;
  position: relative;
  font-size: 16px;
  overflow: hidden;
  .add-btn {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
.search-position {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 15px;
  margin-right: 10px;
}
.el-icon-arrow-up:before {
  content: "";
}
.color-input {
  width: 100%;
  height: inherit;
  padding: 0;
  .input-num {
    width: 100%;
    height: 32px;
    border: 0 none;
    background-color: transparent;
    &:focus {
      background-color: #fff;
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
.scope-flex {
  display: flex;
  span {
  flex: 1;
  }
}
.blue {
  color: #0096ff;
  cursor: pointer;
  user-select: none;
}
.table-contain {
  height: 20rem;
  overflow: hidden;
}
</style>

<template>
  <div>
    <el-dialog
        title="单位设置"
        :before-close="close"
        :visible="true"
        width="700px">
        <div class="color-info">
          <div class="add-btn">
            <el-button type="primary" size="small" class="addUnit" @click="changeUnit">新增</el-button>
          </div>
          <div class="table-contain">
            <el-table style="width:100%; height:100%"
            height="100%"
            :data="unitData"
            border fit highlight-current-row>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope" class="flex-doing">
                <div class="scope-flex">
                  <span class="blue" @click="changeUnit2(scope.$index, scope.row)" slot="reference">修改</span>
                  <span class="blue" @click="handleDeleteUnit(scope.$index)" slot="reference">删除</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="unitName" label="单位名称">
            </el-table-column>
            <el-table-column prop="pinYin" label="拼音码">
            </el-table-column>
            <el-table-column prop="remark" label="单位备注">
            </el-table-column>
          </el-table>
        </div>
        <div class="page-contain">
          <span @click="pageChange(1)" class="prev" :class="{forbid:pageNum===1}">上页</span>
          <span class="current">第(<i>{{pageNum}}/{{pages}}</i>)页</span>
          <span @click="pageChange(2)" class="next" :class="{forbid:pageNum===pages}">下页</span>
          <span class="jumper">
            跳转到<input type="text" @blur="pageChange(3)" v-model="jumperPage">页
          </span>
          <span class="total">
            共<i>{{total}}</i>条记录
          </span>
          <span class="page-size">
            每页显示<input type="text" @blur="pageChange(4)" v-model="pageSize">行
          </span>
        </div>
      </div>
    </el-dialog>
    <add-unit v-if="addUnit" :refreshFun="initGoodsUnit" :handleClose="changeUnit"></add-unit>
    <edit-unit v-if="editUnit" :refreshFun="initGoodsUnit2" :handleClose="changeUnit2"></edit-unit>
  </div>
</template>

<script>
import { fetchGoodsUnitName, fetchDelUnit } from "@/api/data";
import addUnit from "./add_unit";
import editUnit from "./edit_unit";
export default {
  props: {
    refreshFun: {
      type: Function
    },
    close: {
      type: Function
    }
  },
  components: { addUnit, editUnit },
  data() {
    return {
      addUnit: false,
      editUnit: false,
      unitData: [],
      jumperPage: "",
      pageNum: 1,
      pageSize: 10,
      total: 0,
      pages: 0,
      index: ""
    };
  },

  created() {
    this.getGoodsUnit();
  },
  // computed: {
  //   ...mapGetters(["tenantId"])
  // },
  methods: {
    initGoodsUnit() {
      this.changeUnit();
      this.pageNum = 0;
      this.getGoodsUnit();
    },
    changeUnit() {
      this.addUnit = !this.addUnit;
    },
    initGoodsUnit2() {
      this.changeUnit2();
      this.pageNum = 0;
      this.getGoodsUnit();
    },
    changeUnit2(index, row) {
      this.editUnit = !this.editUnit;
      this.$router.push({
        query: Object.assign(row ? { row } : {})
      });
      // if (row !== undefined) {
      //   sessionStorage.setItem("goodsId", row.goodsId);
      // }
    },
    //获取单位列表
    getGoodsUnit() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchGoodsUnitName({
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
          .then(response => {
            var res = response.data;
            if (res.code === 0) {
              _self.unitData = res.data.list.list;
              _self.pages = res.data.list.pages;
              _self.pageNum = res.data.list.pageNum;
              _self.pageSize = res.data.list.pageSize;
              _self.total = res.data.list.total;
              _self.jumperPage = res.data.list.pageNum;
            } else {
              this.$message({
                type: "error",
                message: res.msg
              });
            }

            resolve(true);
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
          this.pageSize = this.unitData.pageSize;
          return false;
        }
      }
      this.getGoodsUnit({ pageNum: this.pageNum, pageSize: this.pageSize });
    },

    //删除重刷
    initFetchUnit() {
      this.pageNum = 0;
      this.getGoodsUnit();
    },

    //删除
    handleDeleteUnit(index) {
      this.$confirm("此操作将删除该单位设置，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delUnit(this.unitData[index].unitId, index);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除接口请求
    delUnit(unitId, index) {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchDelUnit(unitId)
          .then(response => {
            var res = response.data;
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.initFetchUnit();
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
    }
  },
  watch: {}
};
</script>

