<style lang="scss">
.color-info {
  height: 100%;
  position: relative;
  font-size: 16px;
  overflow: hidden;
}

.page-contain {
  margin-top: 20px;
  // font-size: 0;
  line-height: 28px;
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
.table-module {
  height: 21rem;
  overflow: hidden;
  .scoped-text{
    padding-left: 10px;
  }
  .select-period{
    .el-table td{
      padding: 0;
    }
  }
  .table-text{
    td{
      padding: 0;
    }
  } 
  .el-table .cell{
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .el-input__inner{
      height: 27px;
      border: 0 none;
      background: transparent;
      &:focus {
        background: #fff;
        border: 1px #409eff solid;
        outline: -webkit-focus-ring-color auto 5px;
      }
    }
  }
}
</style>

<template>
  <div>
    <el-dialog
        title="库存期初-新增与编辑"
        :before-close="close"
        :visible="true"
        width="720px">
        <div class="color-info">
          <div class="table-module">
            <el-table style="width:100%; height:100%"
            height="100%"
            :data="form.stockInitModelList"
            border fit highlight-current-row class="table-text">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="storeName" label="仓库" width="100">
              <template slot-scope="scope" class="select-period">
                <el-autocomplete size="small" ref="input" v-model="scope.row.storeName" @focus="addIndex(scope.$index)"
                      :fetch-suggestions="querySearchs" :trigger-on-focus="true"
                      @select="handleSelect" :disabled="disabled">
                      <!-- <template slot-scope="{ item }">
                        <div class="name">{{ item.storeName }}</div>
                      </template> -->
                </el-autocomplete>
              </template>
            </el-table-column>
            <el-table-column prop="goodsName" label="品名">
              <template slot-scope="scope">
                <span class="scoped-text" v-text="scope.row.goodsName"></span>
              </template>
            </el-table-column>
            <el-table-column prop="goodsColorNo" label="颜色">
              <template slot-scope="scope">
                <span class="scoped-text" v-text="scope.row.goodsColorNo"></span>
              </template>
            </el-table-column>
            <el-table-column prop="stockUnit" label="单位">
              <template slot-scope="scope">
                <span class="scoped-text" v-text="scope.row.stockUnit"></span>
              </template>
            </el-table-column>
            <el-table-column prop="stockCount" label="库存条数">
              <template slot-scope="scope">
                <el-input v-model="scope.row.stockCount" :disabled="disabled"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="stockQuantity" label="库存数量">
              <template slot-scope="scope">
                <el-input v-model="scope.row.stockQuantity" :disabled="disabled"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="costPrice" label="成本价">
              <template slot-scope="scope">
                <el-input v-model="scope.row.costPrice" :disabled="disabled"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page-contain">
          <!-- <span @click="pageChange(1)" class="prev" :class="{forbid:pageNum===1}">上页</span>
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
          </span> -->
          <el-button style="float:right;border-color:#ccc;" size="mini" @click="close">取消</el-button>
          <el-button style="float:right;margin-right:10px;" type="primary" size="mini" @click="save()">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchStockStore, fetchGetCommodityDetail, fetchCommodityInventory } from "@/api/data";
export default {
  props: {
    refreshFun: {
      type: Function
    },
    close: {
      type: Function
    }
  },
  components: {},
  data() {
    return {
      jumperPage: "",
      pageNum: 1,
      pageSize: 10,
      total: 0,
      pages: 0,
      index: "",
      x: 1,
      y: 1,
      value: "",
      disabled: false,
      form: {
        stockInitModelList: [],
      },
    };
  },

  created() {
    this.getStore();
    this.initData();
    this.getDetail();
  },
  // computed: {
  //   ...mapGetters(["tenantId"])
  // },
  methods: {

    initData() {
      for (let i = 0; i < 5; i++) {
        this.form.stockInitModelList.push({
            storeId: "",
            storeNo: "",
            storeName: "",
            goodsId: "",
            goodsNo: "",
            goodsName: "",
            goodsColorId: "",
            goodsColorNo: "",
            stockUnit: "",
            stockCount: "",
            stockQuantity: "",
            costPrice: ""
          })
      }
    },
    addIndex(index){
      this.y = index;
    },
    // 选择
    handleSelect(item) {
      if(this.x === 1) {
        this.$nextTick(() => {
          this.form.stockInitModelList[this.y].storeName = item.value;
          this.form.stockInitModelList[this.y].storeId = item.id;
          this.form.stockInitModelList[this.y].storeNo = item.no;
        })
      }
    },
    // sureSelect (row) {
    //   //      console.log("this is: "+row.goodsNo+" "+row.goodsName)
    //   if (this.x === 1) {
    //     this.form.stockInitModelList[this.y].storeId = item.id;
    //     this.form.stockInitModelList[this.y].storeName = item.value;
    //     this.form.stockInitModelList[this.y].storeNo = item.no;
    //   }
    // },
    querySearchs(queryString, cb) {
      var restaurants;
      switch (this.x) {
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
    createFilter(queryString) {
      return (item) => {
        switch (this.x) {
          case 1:
            item.value = item.storeName
            return (item.storeName.indexOf(queryString) > -1);
            break;
          default:
            break;
        }
      };
    },
    getStore() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchStockStore()
          .then(response => {
            this.depot = response.data.data.storeInfoList;
            for (var i = 0; i < this.depot.length; i++) {
              this.depot[i].value = this.depot[i].storeName;
              this.depot[i].id = this.depot[i].storeId;
              this.depot[i].no = this.depot[i].storeNo;
            }
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    getDetail(goodsId) {
      return new Promise((resolve, reject) => {
        fetchGetCommodityDetail(sessionStorage.getItem("goodsId"))
          .then(response => {
            if (response.data.code === 0) {
              let goods = response.data.data.goods;          
              for(let i = 0; i< goods.colorList.length; i++) {
                this.form.stockInitModelList.splice(i, 5, goods.colorList[i]);
                this.form.stockInitModelList[i].goodsName = goods.goodsName;
                this.form.stockInitModelList[i].goodsColorNo = goods.colorList[i].colorNo;
                this.form.stockInitModelList[i].stockUnit = goods.unit;
                this.form.stockInitModelList[i].goodsId = goods.colorList[i].goodsId;
                this.form.stockInitModelList[i].goodsNo = goods.goodsNo;
                this.form.stockInitModelList[i].goodsColorId = goods.colorList[i].colorId;
              }
              if(goods.colorList.length === 0) {
                this.disabled = true;
                this.$message({
                  type: "warning",
                  message: '请先去添加颜色'
                })
              }
              sessionStorage.removeItem("goodsId");
              resolve(true);
            }
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },

    //save
    save() {
      this.loading = true;
      let params = this.form;
      return new Promise((resolve, reject) => {
        fetchCommodityInventory(params)
          .then(res => {
            if (res.data.code === 0) {
              this.$message.success("库存期初新增成功");
              this.loading = false;
              this.refreshFun();
              resolve(true);
            }else{
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
 
          })
          .catch(err => {
            console.log(err);
            this.$message({
              type: "error",
              message: err.msg
            });
            this.loading = false;
            reject(false);
          });
      });
    },

    // pageChange(index) {
    //   if (index === 1) {
    //     if (this.pageNum <= 1) {
    //       this.pageNum = 1;
    //       return false;
    //     }
    //     this.pageNum--;
    //   } else if (index === 2) {
    //     if (this.pageNum >= this.pages) {
    //       this.pageNum = this.pages;
    //       return false;
    //     }
    //     this.pageNum++;
    //   } else if (index === 3) {
    //     if (
    //       this.jumperPage === "" ||
    //       this.jumperPage < 1 ||
    //       this.jumperPage > this.pages
    //     ) {
    //       this.jumperPage = this.pageNum;
    //       return false;
    //     }
    //     this.pageNum = this.jumperPage;
    //   } else {
    //     if (this.pageSize === "") {
    //       this.pageSize = this.unitData.pageSize;
    //       return false;
    //     }
    //   }
    //   this.getGoodsUnit({ pageNum: this.pageNum, pageSize: this.pageSize });
    // },
  },
  mounted() {
    // const op = this.$route.query;

    // let op = sessionStorage.getItem("row");
      //编辑
    // this.form.stockInitModelList = op.row; //list传来的row
    // console.log("2323",this.form.stockInitModelList);
    // this.form.goodsColorId = op.row.goodsColorId;
    // this.form.goodsNo = op.row.goodsNo;
    // this.form.stockInitModelList.goodsName = op.row.goodsName;
    // this.form.colorList = op.row.colorList;
  },
  watch: {}
};
</script>

