<template>
  <div class="app-container content-calc" v-loading="loading">
    <page-header :refresh="fetchData" title="采购入库单-历史" :newUrl="'/'" :newTitle="'采购入库单'"></page-header>
    <!--标题栏-->

    <search-box :searchOption="searchOption" :comChange="searchOnChange" :query="fetchData"></search-box>
    <!-- <el-checkbox class="form-item" v-model="showCancel">显示作废</el-checkbox> -->

    <div class="table-contain">
      <el-table style="width: 100%;height:100%" height="100%" :data="tableData" border fit highlight-current-row>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="scope-flex">
              <el-button class="flex-btn" type="text" size="mini" v-if="scope.row.accountStatus===20&&scope.row.orderStatus===30" @click="goAccount(scope.$index, scope.row.orderId)">记账</el-button>
              <el-button class="flex-btn" type="text" size="mini" v-if="scope.row.orderStatus===-20" @click="handleDelete(scope.$index)">删除</el-button>
              <el-popover class="flex-btn" trigger="hover" placement="bottom">
                <el-button type="text" size="mini" @click="copy(scope.$index)">复制</el-button>
                <el-button type="text" size="mini" @clikc="returnBill(scope.$index)">退货</el-button>
                <el-button type="text" size="mini" slot="reference" >更多</el-button>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sheetDate" label="单据日期" width="95">
          <template slot-scope="scope">
            <span v-text="scope.row.sheetDate"></span>
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="单据编号" width="190">
          <template slot-scope="scope">
            <span class="blue1" @click="goHistory(scope.row)" style="cursor:pointer;" v-text="scope.row.orderNo"></span>
          </template>
        </el-table-column>
        <el-table-column prop="orderStatus" label="单据状态">
          <template slot-scope="scope">
            <span :class="{green:scope.row.orderStatus===30,red:scope.row.orderStatus===-10,gay:scope.row.orderStatus===-20}" v-text="billStatusMap.get(scope.row.orderStatus)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="accountStatus" label="记账状态">
          <template slot-scope="scope">
            <span v-text="accountStatusMap.get(scope.row.accountStatus)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="totalItem" label="总条数"></el-table-column>
        <el-table-column prop="colorCount" label="总颜色数量"></el-table-column>
        <el-table-column prop="totalQuantity" label="总入库数量"></el-table-column>
        <el-table-column prop="goodsUnit" label="单位"></el-table-column>
        <el-table-column prop="storeName" label="入库仓库"></el-table-column>
        <el-table-column prop="supplierName" label="供应商"></el-table-column>
        <el-table-column prop="handler" label="经手人"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
    </div>

    <div style="margin-top: 10px;"></div>
    <!--分页栏-->
    <div class="block" style="text-align:center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryData.pageNum" :page-sizes="[15, 30, 45, 60, 75]" :page-size="queryData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <fixed-page1 @supplierInfo="getSupplierInfo" :fixedOption="fixedOption"></fixed-page1>
    <fixed-page2 @deportInfo="getDeportInfo" :fixedOption="fixedOption"></fixed-page2>
    <fixed-page3 @handlerInfl="getHandlerInfo" :fixedOption="fixedOption"></fixed-page3>
  </div>
</template>

<script>
import pageTitle from '@/components/pageTitle'
import fixedPage1 from '@/components/fixed/fixedSupplier'
import fixedPage2 from '@/components/fixed/fixedNormal'
import fixedPage3 from '@/components/fixed/fixedBrokerage'
import newDeport from '@/components/fixed/newDeport'
import { parseDate } from '@/utils'
import { billStatusOptions, accountStatusOptions, billStatusMap, accountStatusMap } from '@/utils/constants'
import {
  fetchPurchaseOrder,
  fetchBrokerage,
  fetchSupplier,
  fetchDeport,
  fetchDelPurchaseOrder,
  getPurchaseOrder
} from '@/api/purchase'
import { timeToDateFn, setSessionStorage } from '@/utils/BbdCommon'

import PageHeader from '@C/BDD_PageHeader'
import SearchBox from '@C/BDD_SearchBox'


export default {
  name: 'purchase',
  data () {
    return {
      parseDate,
      billStatusOptions,
      accountStatusOptions,
      billStatusMap,
      accountStatusMap,
      supplierBorder: false,
      dateStartBorder: false,
      dateStartEnd: false,
      orderNoborder: false,
      deportBorder: false,
      handlerBorder: false,
      remarkBorder: false,
      orderBorder: false,
      accountBorder: false,
      which: 1,
      brokerage: [],
      deport: [],
      supplier: [],
      fixedOption: {
        supplierShow: false,
        deportShow: false,
        brokerageShow: false
      },
      showCancel: false,
      option: {
        btnName: '新增采购入库单',
        pageName: '采购入库单-历史',
        isCode: false,
        isNeedBtn: true,
        btnName1: '刷新',
        btnName2: '打印'
      },
      queryData: {
        handler: '',
        supplierName: '',
        storeName: '',
        orderStatus: '',
        orderNo: '',
        remark: '',
        createdFrom: '',
        createdTo: '',
        accountStatus: '',
        pageSize: 15,
        pageNum: 1
      },
      loading: false,
      tableData: [],
      total: 0,

      searchOption: [
        {
          type: 'date',
          title: '单据日期',
          key: 'createdFrom:createdTo'
        }, {
          type: 'input',
          title: '单据编号',
          key: 'orderNo'
        },
        {
          type: 'supplier',//供应商
          onChange: (key, data) => {
            this.queryData = {
              ...this.queryData,
              supplierName: data.split(':')[0],
              supplierId: data.split(':')[1]
            }
          }
        }, {
          type: 'store',//仓库
          onChange: (key, data) => {
            this.queryData = {
              ...this.queryData,
              storeName: data.split(':')[0],
              storeId: data.split(':')[1]
            }
          }
        }, {
          type: 'handler',//经手人
          onChange: (key, data) => {
            this.queryData = {
              ...this.queryData,
              handler: data.split(':')[0],
              handlerUserId: data.split(':')[1]
            }
          }
        }, {
          type: 'select',
          title: '单据状态',
          key: 'orderStatus',
          defaultValue: '',
          options: billStatusOptions
        },
        {
          type: 'select',
          title: '记账状态',
          defaultValue: '',
          key: 'accountStatus',
          options: accountStatusOptions
        },
        {
          type: 'input',
          defaultValue: '',
          title: '单据备注',
          key: 'remark'
        }
      ],
    }
  },
  components: {
    pageTitle,
    fixedPage1,
    fixedPage2,
    fixedPage3,
    newDeport,
    ////////
    PageHeader,
    SearchBox
  },
  created () {
    this.fetchData()

  },
  methods: {
    searchOnChange (key, data) {
      this.queryData[key] = data
    },
    query () { },
    inputFocuse (index) {
      this.which = index
      if (this.which === 1) {
        this.supplierBorder = true
      } else if (this.which === 2) {
        this.deportBorder = true
      } else {
        this.handlerBorder = true
      }
    },
    sureClick (event) {

    },
    print () { },
    goHistory ({ orderStatus, orderId }) {
      let obj = {
        '-20': 'stock_in_bill_draft',//草稿
        '-10': 'stock_in_bill_cancel',//作废
        '30': 'stock_in_bill_storage'//入库
      }
      this.$router.push({
        name: obj[orderStatus],
        query: { orderId }
      })
    },
    handleSizeChange (val) {
      this.queryData.pageSize = val
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.queryData.pageNum = val
      this.fetchData()
    },

    fetchData () {
      const _self = this

      getPurchaseOrder(this.queryData).then(response => {

        this.tableData = response.data.list.list
        this.loading = false
        this.total = response.data.list.total
        this.queryData.pageSize = response.data.list.pageSize
        this.queryData.pageNum = response.data.list.pageNum
      })
    },


    querySearchs (queryString, cb) {
      var restaurants
      switch (this.which) {
        case 1:
          restaurants = this.supplier
          break
        case 2:
          restaurants = this.deport
          break
        case 3:
          restaurants = this.brokerage
          break
        default:
          break
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    handleSelect (item) {
      let searchInfos
      switch (this.which) {
        case 1:
          this.requestData.supplierId = item.customerId
          this.requestData.supplierName = item.value
          break
        case 2:
          this.requestData.storeId = item.storeId
          this.requestData.storeName = item.value
          break
        case 3:
          this.requestData.handlerUserId = item.userId
          this.requestData.handler = item.value
          break
        default:
          break
      }
    },
    getSupplierInfo (data) {
      this.queryData.supplierName = data.name
    },
    getDeportInfo (data) {
      this.queryData.storeName = data.name
    },
    getHandlerInfo (data) {
      this.queryData.handler = data.name
    },
     // 点击跳转到入库结算单是需要到orderId过去
    goAccount (index, orderId) {
      if (this.tableData[index].accountStatus === 20) {
        this.$router.push({
        name: 'clearing_bill_doing',
        query: { orderId }
      })
      }
    },
    // 复制
    copy (index) {

    },
    // 退货
    returnBill (index) {

    },

    // 删除
    handleDelete (index) {
      if (this.tableData[index].orderStatus === -20) {
        this.$confirm('此操作将删除该条订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delPurchaseOrder(this.tableData[index].orderId, index)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },

    delPurchaseOrder (orderId, index) {
      const _self = this

      return new Promise((resolve, reject) => {
        fetchDelPurchaseOrder(orderId).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    //      async delPurchaseOrder(orderId,index) {
    //        const res = await fetchDelPurchaseOrder(orderId)
    //        console.log(res)
    //        if (res === 0) {
    //          this.$message({
    //            type: 'success',
    //            message: '删除成功'
    //          })
    //          this.fetchData()
    //        }else{
    //          this.$message({
    //            type: 'error',
    //            message: res.msg
    //          })
    //        }
    //      },
    // 更多
    handleDetail (row) {
      console.log('handle detail')
    }
  }
}
</script>
<style>
.search-box{
  min-width:1000px;
}
.table-contain {
  height: calc(100% - 330px);
  min-height: 300px;
}
.table-contain .scope-flex{
  display: flex;
}
.table-contain .scope-flex .flex-btn{
  flex:1;
}
.table-contain .el-table thead tr {
  color: #909399;
  font-weight: 500;
  background-color: rgb(226, 233, 239);
}

.block{
  position:absolute;
  bottom:0px;
  right:16px;
  width:100%;
  height:80px;
  line-height: 80px;
  text-align:center;
  z-index:2;
  overflow:hidden;
  background-color: #fff;
}
.red {
  color: #eb453c;
}
.green {
  color: #029b26;
}
.gay {
  color: #9999;
}
.blue1 {
  color: #2369b5;
  user-select: none;
}
</style>
