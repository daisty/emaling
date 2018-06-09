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
// 查询

.search-box-form {
  margin: 10px 0 15px;
}
.search-box-form .el-form-item.el-form-item--large {
  margin-bottom: 0;
}
.search-box-form .el-autocomplete.form-item,
.search-box-form .el-date-editor {
  height: 100%;
  width: 163px;
  margin-top: 0;
}
.search-box-form .el-autocomplete.form-item .el-input--small .el-input__inner {
  height: 28px;
  line-height: 28px;
}
.search-box-form .el-form--inline .el-form-item {
  height: 36px;
  line-height: 23px;
}
.search-box-form .el-form--inline .el-form-item__label {
  font-weight: 400 !important;
  font-size: 12px !important;
  text-align: right;
}
</style>
<template>
  <div class="app-container" v-loading="loading">
    <!-- 标题栏 -->
    <div class="page-title">
      <el-row :gutter="10">
        <el-col :span="19">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">{{option.pageName}}</span>
          </el-row>
        </el-col>
        <el-col :span="5">
          <el-row type="flex" justify="end">
            <el-button type="primary" size="mini">{{option.btnName2}}</el-button>
          </el-row>
        </el-col>
      </el-row>
      <div class="line"></div>
    </div>
    <!--查询栏-->
    <div class="search-box-form">
      <el-form :inline="true" label-width="60px" size="mini" class="demo-form-inline">
        <el-form-item label="仓库" required>
          <el-autocomplete class="form-item" size="small" v-model="requestData.storeName" @focus="which=2"
            :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
              @select="handleSelect">
            <el-button slot="append" icon="el-icon-search" @click="fixedOption.deportShow=true"></el-button>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="商品">
          <el-autocomplete class="form-item" size="small" v-model="requestData.goodsName" @focus="which=1"
            :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
            @select="handleSelect">
            <el-button  slot="append" icon="el-icon-search" @click="changeStoreGoods"></el-button>
          </el-autocomplete>
        </el-form-item>
        <el-form-item>
			    <el-button type="danger" @click="getFetchData">查询</el-button>
			    <!-- <el-checkbox v-model="allChecked">仅显示有货</el-checkbox> -->
			  </el-form-item>			  
      </el-form>
    </div>
    <div class="table-contain store-contain">
      <div class="tree-hidden" ref="treeMin" title="展开树形菜单" @click="arrowRight">
          <div class="tree-right">
            <i class="el-icon-d-arrow-right"></i>
          </div>
          <div class="tree-fold-title">商品分类</div>
      </div>
      <div class="custom-tree-container" ref="treeLarge">
        <div class="tree-title">
          <p class="shopping" @click="getFetchDataTreeAll">{{treeConfig.title}}</p>
          <i class="el-icon-d-arrow-left" title="收起树形菜单" @click="arrowLeft"></i>
        </div>
        <el-tree
          class="filter-tree"
          node-key="id"
          :data="treeConfig.treeData"
          :props="treeConfig.defaultProps"
          default-expand-all
          ref="tree2"
          @node-click="handleNodeClick">
        </el-tree>
      </div>
      <!-- <tree-control class="tree-plain" :treeControlConfig="treeConfig"></tree-control> -->

      <div class="table-input">
        <!--table-->
        <el-table style="width: 100%;"
          :data="stockInitModelList"
          :summary-method="summaryMethod"
          border fit highlight-current-row show-summary class="table-plain">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column label="操作" width="100">
          </el-table-column>
          <el-table-column prop="goodsNo" label="编号" width="200">
          </el-table-column>
          <el-table-column prop="goodsName" label="品名" width="200">
          </el-table-column>
          <el-table-column prop="categoryName" label="分类" width="180">
          </el-table-column>
          <el-table-column prop="goodsColorNo" label="颜色">
          </el-table-column>
          <el-table-column prop="stockUnit" label="单位">
          </el-table-column>
          <el-table-column prop="stockQuantity" label="期初数量" width="150">
          </el-table-column>
          <el-table-column prop="costPrice" label="期初成本单价" width="200">
          </el-table-column>
        </el-table>
        <div style="margin-top: 10px;"></div>
        <!--分页栏-->
        <div class="page-size-block">
          <el-pagination @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="requestData.pageNum"
            :page-sizes="[15, 30, 45, 60, 75]"
            :page-size="requestData.pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <fixed-page2 @deportInfo="getDeportInfo" :fixedOption="fixedOption"></fixed-page2>
    <fixed-commodity @storeGoodsInfo="getGoodsInfo" v-if="storeGoods" :refreshFun="initFetchData" :close="changeStoreGoods"></fixed-commodity>
  </div>
</template>

<script>
  import fixedPage2 from "@/components/fixed/fixedNormal"
  import TreeControl from '@C/BDD_TreeControl'
  import InputTable from '@C/BDD_InputTable'
  import fixedCommodity from '@/components/fixed/fixedCommodity'
  import { fetchGoodsCategory, fetchGoodsList, fetchStorePeriod } from '@/api/setting'
  import {
    fetchSheetCode,
    fetchGoodsColor,
    fetchBrokerage,
    fetchSupplier,
    fetchDeport,
    fetchSaveSaleInfo,
    fetchSaveSaleInfoDraft,
    fetchStockList,
    fetchSaleStockSearch
  } from "@/api/sale"
export default {
  name: "storeBeggining",
  data() {
    return {
      fixedOption: {
        supplierShow: false,
        deportShow: false,
      },
      storeGoods: false,
      option: {
        pageName: "库存期初",
        btnName2: "导入商品及期初"
      },
      trConfig: [
        {
          label: '编号',
          props: 'goodsNo',
          width: '200'
          }, {
          label: '品名',
          props: 'goodsName',
          width: '200'
          }, {
          label: '分类',
          props: 'categoryName',
          width: '200'
        }, {
          label: '颜色',
          props: 'goodsColorNo',
          width: '150'
        }, {
          label: '单位',
          props: 'stockUnit',
        }, {
          label: '期初数量',
          props: 'stockQuantity',
          input: true,
          width: '200'
        }, {
          label: '期初成本单价',
          props: 'costPrice',
          input: true,
          width: '150'
        }
      ],
      requestData: {
        goodsName: "",
        goodsId: "",
        goodsNo: "",
        storeNo: "",
        storeName: "",
        storeId: "",
        categoryId: "",
        pageNum:1,
        pageSize:15,
        stockInitModelList: []
      },
      stockInitModelList: [],
      total:0,
      loading: false,
      commodityInfo: [],
      treeConfig: {
        title:"商品分类",
        treeData:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
      }
    };
  },
  components: {
    fixedPage2,
    TreeControl,
    InputTable,
    fixedCommodity
  },
  watch: {
    commodityInfo(){
      this.treeConfig.treeData = this.commodityInfo
    },
    input(val){
      console.log("in the input: "+val)
    },
    checked(val){
      console.log("in the checked: "+val)
    }
  },
  created() {
    this.getDeport()
    this.getCommodityTree()
    this.getCommodityName()
  },
  methods: {
    initFetchData(){
      this.changeStoreGoods()
    },
    changeStoreGoods(){
      this.storeGoods = !this.storeGoods
    },
    handleNodeClick(data){
      let labelId = data.id
      this.requestData.categoryId = labelId
      if(labelId){
        this.getFetchDataTree()
      }
    },
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
    handleSizeChange (val) {//每页条数改变时
      this.requestData.pageSize = val
    },
    
    handleCurrentChange(val) {
      this.queryData.pageNum = val
    },
    // 获取树形菜单数据
    getCommodityTree(data){
      const _self = this
      return new Promise((resolve, reject) => {
        fetchGoodsCategory().then(response => {
          _self.commodityInfo = response.data.treeNode.children
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },

    //库存期初列表查询条件获取
    getFetchData(){
      if(this.requestData.storeName === ''){
        this.$message({
          type: 'error',
          message: '仓库不能为空'
        })
      }else {
        if(this.requestData.goodsName === '') {
          this.requestData.goodsId = ''
        }
        const _self = this
        _self.loading = true
        return new Promise((resolve, reject) => {
          fetchStorePeriod({
            pageNum: this.requestData.pageNum,
            pageSize: this.requestData.pageSize,
            goodsId: this.requestData.goodsId,
            storeId: this.requestData.storeId
          }).then(response => {
            if(response.code === 0) {
              _self.stockInitModelList = response.data.list.list
              _self.loading = false
              _self.total = response.data.list.total
              _self.requestData.pageNum = response.data.list.pageNum
              _self.requestData.pageSize = response.data.list.pageSize
              resolve(true)
            }else {
              _self.$message({
                type: 'error',
                message: response.msg
              })
            }
            
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      }
    },
    //库存期初列表查询条件获取
    getFetchDataTree(){
        const _self = this
        return new Promise((resolve, reject) => {
          fetchStorePeriod({
            pageNum: this.requestData.pageNum,
            pageSize: this.requestData.pageSize,
            categoryId: this.requestData.categoryId
          }).then(response => {
            if(response.code === 0) {
              _self.stockInitModelList = response.data.list.list
              _self.loading = false
              _self.total = response.data.list.total
              _self.requestData.pageNum = response.data.list.pageNum
              _self.requestData.pageSize = response.data.list.pageSize
              resolve(true)
            }else {
              _self.$message({
                type: 'error',
                message: response.msg
              })
            }
            
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
    },
    //树形菜单全部点击显示
    getFetchDataTreeAll() {
      this.getFetchData({
        pageNum: this.requestData.pageNum,
        pageSize: this.requestData.pageSize,
        storeId: this.requestData.storeId})

    },

    //合计
    summaryMethod ({ columns, data }) {
      // 合计方法
      let sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if ([1, 2, 3, 4, 5, 6].indexOf(index) > -1) {
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
      // this.requestData.totalItem = sums[6]
      // this.requestData.totalQuantity = sums[7]
      // this.requestData.goodsUnit = 'M'
      return sums
    },
    // 获取到仓库数据
    getDeportInfo(data) {
      this.requestData.storeName = data.name
      this.requestData.storeId = data.id
    },
    //获取商品数据
    getGoodsInfo(data) {
      this.requestData.goodsName = data.name
      this.requestData.goodsId = data.id
    },
    //获取商品名称数据
    getCommodityName() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchGoodsList()
          .then(response => {
            this.goodsStore = response.data.list.list
            for (var i = 0; i < this.goodsStore.length; i++) {
              this.goodsStore[i].value = this.goodsStore[i].goodsName;
            }
            resolve(true)
          })
          .catch(err => {
            console.log(err)
            reject(false)
          })
      })
    },

    // 获取仓库列表数据
    getDeport() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchDeport()
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
          })
      })
    },
    //过滤
    createFilter(queryString) {
      return restaurant => {
        switch (this.which) {
          case 1:
            return restaurant.goodsName.indexOf(queryString) > -1
            break;
          case 2:
            return restaurant.storeName.indexOf(queryString) > -1
            break;
          default:
            break;
        }
      };
    },
    // 选择
    handleSelect(item) {
      let searchInfos;
      switch (this.which) {
        case 1:
          this.requestData.goodsId = item.goodsId
          this.requestData.goodsName = item.value
          break;
        case 2:
          this.requestData.storeId = item.storeId
          this.requestData.storeName = item.value
          break;
        default:
          break;
      }
    },
    // 筛选
    querySearchs(queryString, cb) {
      var restaurants;
      switch (this.which) {
        case 1:
          restaurants = this.goodsStore
          break;
        case 2:
          restaurants = this.deport
          break;
        default:
          break;
      }
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      cb(results)
    }
  }
};
</script>
<style lang="scss">
  .store-contain{
    width: 100%;
    height: calc(100% - 110px);
    display: flex;
    margin-top: 10px;
    .tree-hidden{
      width: 30px;
      text-align: center;
      background-color: #f2f2f2;
      height: 100%;
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
      flex: 0 0 150px;
      border: 1px solid #cad1d8;
      overflow: hidden;
      margin-right: 10px;
      // display: none;
      .tree-title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #333;
        border-bottom: 1px solid #cad1d8;
        .shopping {
          flex: 1;
          height: 20px;
          padding-left: 10px;
          font-size: 16px;
          border: 0 none;
          margin: 8px;
          cursor: pointer;
        }
        i {
          padding: 10px;
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
    .table-input{
      width: calc(100% - 165px);
      height: 100%;
      margin-top: 0;
      overflow: hidden;
      .table-plain{
        height: calc(100% - 45px);
        margin-top: 0;
        &.el-table--scrollable-x .el-table__body-wrapper{
          height: calc(100% - 70px);
        }
        .el-table__empty-block{
          min-height: 450px;
        }
      }
      
    }
    .page-size-block{
      position:absolute; 
      bottom:0; 
      right:0;
      left: 80px;
      width:100%; 
      height:60px; 
      line-height: 60px;
      text-align:center; 
      z-index:10; 
      overflow:hidden;
    }
  }
</style>
