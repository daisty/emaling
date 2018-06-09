<template>
  <!-- 采购入库单 -->
  <div class="app-container">
    <page-header :print="print" title="采购入库单-草稿" :orderNumber="requestData.orderNo" :historyUrl="'/'"></page-header>
    <search-box v-if="requestData.supplierName" :defaultSearchData="requestData" :searchOption="searchOption" :comChange="searchOnChange" ref="search" :disabled="false"></search-box>
    <!-- :query="query" -->
    <input-table :trConfig="trConfig" :data="requestData.purchaseGoodsList" :summaryMethod="summaryMethod" ></input-table>
    <el-input placeholder="单据备注" v-model="requestData.remark"></el-input>
    <put-footer :submit="submit.bind('submit')" :draft="submit.bind('draft')"></put-footer>
  </div>
</template>
<script>
import PageHeader from '@C/BDD_PageHeader'
import SearchBox from '@C/BDD_SearchBox'
import PutFooter from '@C/BDD_PutFooter'
import InputTable from '@C/BDD_InputTable'
import {
  getSheetCode,
  saveInstroeInfo,
  saveInstroeInfoDraft,
  getGoodsColor,
  getPurchaseOrderDetails
} from '@api/purchase'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'purchase',
  components: { PageHeader, SearchBox, PutFooter, InputTable },
  data () {
    return {
      orderId: this.$route.query.orderId,
      /*----------搜索框配置----------*/
      searchOption: [
        {
          type: 'supplier',//供应商
          key: 'supplierName',
          onChange: (key, data) => {
            this.requestData = {
              ...this.requestData,
              supplierName: data.split(':')[0],
              supplierId: data.split(':')[1]
            }
          }
        }, {
          type: 'store',//仓库
          key: 'storeName',
          onChange: (key, data) => {
            this.requestData = {
              ...this.requestData,
              storeName: data.split(':')[0],
              storeId: data.split(':')[1]
            }
          }
        }, {
          type: 'handler',//经手人
          key: 'handler',
          onChange: (key, data) => {
            this.requestData = {
              ...this.requestData,
              handler: data.split(':')[0],
              handlerUserId: data.split(':')[1]
            }
          }
        },
        //  {
        //   type: 'date',
        //   title: '单据日期',
        //   key: 'sheetDate'
        // }, {
        //   type: 'date',
        //   title: '预计到货日期',
        //   key: 'expectOutStoreDate'
        // }
      ],
      defaultSearchData: '',
      /*----------表格列配置----------*/
      trConfig: [
        {
          label: '编号',
          props: 'goodsNo',
          select_data: [],
          select_value_key: 'goodsNo',
          select_change: (index, { goodsName, unit, goodsId, goodsNo }) => {
            this.requestData.purchaseGoodsList[index].goodsNo = goodsNo
            this.requestData.purchaseGoodsList[index].goodsName = goodsName
            this.requestData.purchaseGoodsList[index].goodsUnit = unit ? unit : ''
            this.requestData.purchaseGoodsList[index].itemCount = 1
            this.requestData.purchaseGoodsList[index].orderQuantity = 1
            this.requestData.purchaseGoodsList[index].goodsId = goodsId
            if (!this.colorObj[goodsNo]) {
              this.getGoodsColor(goodsNo);
            }
          },
          width: '150',
        }, {
          label: '品名',
          input: true,
          props: 'goodsName',
          width: '150',
        }, {
          label: '颜色',
          props: 'goodsColor',
          select_data: {},//Obj
          select_data_line_key: 'goodsNo',
          select_value_key: 'colorName',
          select_change: (index, { colorName, colorId }) => {
            this.requestData.purchaseGoodsList[index].goodsColor = colorName
            this.requestData.purchaseGoodsList[index].goodsColorId = colorId
          },
          width: '150',
        }, {
          label: '批号',
          props: 'batchNo',
          input: true,
          width: '60'
        }, {
          label: '条数',
          props: 'itemCount',
          width: '60'
        }, {
          label: '入库数量',
          input: true,
          props: 'orderQuantity',
          width: '80'
        }, {
          label: '单位',
          props: 'goodsUnit',
          width: '60'
        }, {
          label: '备注',
          input: true,
          props: 'remark'
        },
      ],
      /*----------提交请求集合----------*/
      requestData: {
        orderNo: '',
        supplierName: '',
        supplierId: '',
        handler: '',
        handlerUserId: '',
        storeName: '',
        storeId: '',
        sheetDate: '',
        expectOutStoreDate: '',
        purchaseGoodsList: [],//表格数据
        remark: ''
      },

      colorObj: {
      }
    }
  },
  created () {
    this.getSheetCode();//获取订单号码
    this.changeSelectData()
    this.getPurchaseOrderDetails()
  },
  computed: {
    ...mapGetters([
      'commodityArr'
    ])
  },
  watch: {
    commodityArr () {
      this.changeSelectData()
    }
  },
  methods: {
    getPurchaseOrderDetails () {
      getPurchaseOrderDetails(this.orderId).then(({ data }) => {
        const Data = data.purchaseOrder
        this.requestData = {
          ...this.requestData,
          ...data.purchaseOrder,
        }
      })
    },
    getGoodsColor (goodsNo) {
      getGoodsColor(goodsNo).then(({ data }) => {
        this.colorObj[goodsNo] = data.list
        this.trConfig[2].select_data = this.colorObj //编号
      })
    },
    changeSelectData () {
      this.trConfig[0].select_data = this.commodityArr //编号
    },
    refresh () {
      console.log('刷新')
    },
    print () {
      console.log('打印')
    },
    searchOnChange (key, data) {
      this.requestData = {
        ...this.requestData,
        [key]: data,
      }
    },
    query () {
    },
    submit (key) {
      const FunKey = {
        draft: saveInstroeInfo,
        submit: saveInstroeInfoDraft
      }
      this.$refs.search.submitForm(() => {

        FunKey[key](this.requestData).then(response => {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.$router.push('stock_in_bill_history')
          resolve(true)
        }).catch(err => {
          this.$message({
            type: 'error',
            message: res.msg
          })
          reject(false)
        })
      });
    },
    /*********************业务方法*******************************/
    // 获取新建订单号
    getSheetCode () {
      const res = getSheetCode()
      res.then(({ data }) => {
        this.requestData.orderNo = data.sheetNo
      })
    },
    summaryMethod ({ columns, data }) {
      // 合计方法
      let sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if ([1, 2, 3, 4, 5, 8, 9].indexOf(index) > -1) {
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
      this.requestData.totalItem = sums[6]
      this.requestData.totalQuantity = sums[7]
      this.requestData.goodsUnit = 'M'
      return sums
    }
  }
}
</script>
