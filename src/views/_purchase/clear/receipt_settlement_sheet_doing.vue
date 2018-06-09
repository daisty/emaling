<template>
  <div class="app-container">
    <page-header :refresh="refresh" :print="print" :orderNumber="requestData.orderNumber" :historyUrl="requestData.historyUrl" :newUrl="requestData.newUrl"></page-header>
    <search-box :searchOption="searchOption" :comChange="searchOnChange"></search-box>
    <!-- :query="query" -->
    <input-table :trConfig="trConfig" :data="requestData.purchaseGoodsList"></input-table>
    <put-footer :submit="submit" :draft="draft"></put-footer>
  </div>
</template>

<script>
  import PageHeader from '@C/BDD_PageHeader'
  import SearchBox from '@C/BDD_SearchBox'
  import PutFooter from '@C/BDD_PutFooter'
  import InputTable from '@C/BDD_InputTable'
  import { timeToDateFn, timeNow } from '@/utils/BbdCommon'
  import {getSettleSheetCode, getGoodsList, getGoodsColor} from '@/api/purchase'
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'purchase',
    components: { PageHeader, SearchBox, PutFooter, InputTable },
    data () {
      return {
        requestData: {
          orderNumber: '',
          historyUrl:'/purchase/clearing_bill_history',
          newUrl: '',
          handler: '',
          handlerUserId: '',
          supplierName: '',
          supplierId: '',
          storeName: '',
          storeId: '',
          remark: '',
          sheetDate: timeNow(1),
          expectOutStoreDate: '',
          goodsUnit: '',
          totalItem: 0,
          totalQuantity: 0,
          purchaseOrderSettle: '',
          purchaseOrderBalanceDetailsList:[],
        },
        tableData: [],
        searchOption: [
          {
            type: 'supplier',//供应商
            onChange: (key, data) => {
              this.requestData = {
                ...this.requestData,
                supplierName: data.split(':')[0],
                supplierId: data.split(':')[1]
              }
            }
          },
          {
            type: 'store',//仓库
            onChange: (key, data) => {
              this.requestData = {
                ...this.requestData,
                storeName: data.split(':')[0],
                storeId: data.split(':')[1]
              }
            }
          },
          {
            type: 'handler',//经手人
            onChange: (key, data) => {
              this.requestData = {
                ...this.requestData,
                handler: data.split(':')[0],
                handlerUserId: data.split(':')[1]
              }
            }
          },
          {
            type: 'date',
            title: '单据日期',
            key: 'sheetDate'
          }
        ],
        trConfig: [
          {
            label: '编号',
            props: 'goodsNo',
            select_data:[],
            select_value_key: 'goodsNo',
            select_change: (data) => {
              console.log(data)
            },

          },
          {
            label: '品名',
            input: true,
            props: 'goodsName'
          },
          {
            label: '颜色',
            props: 'goodsColor',
            select_data: [{ asd: '6666' }],
            select_value_key: 'asd',
            select_change: (data) => {
              console.log(data)
            },
          },
          {
            label: '批号',
            props: 'batchNo'
          },
          {
            label: '条数',
            props: 'itemCount'
          },
          {
            label: '入库数量',
            props: 'orderQuantity'
          },
          {
            label: '单位',
            props: 'goodsUnit'
          },
          {
            label: '结算数量',
            props: 'settleQuantity'
          },
          {
            label: '结算单位',
            props: 'settlePrice'
          },
          {
            label: '结算金额',
            props: 'settleTotalMoney'
          },
          {
            label: '备注',
            props: 'remark'
          },

        ]
      }
    },
    //只能通过vm访问实例里面的对象，但是无法通过this访问对象
    beforeRouteEnter(to, from, next){
      next(vm =>{
        vm.goodsList = [1,2];
      })
    },
    created (){
      console.log("test in the receipt settlement~")
      this.getSheetNo()
    },
    mounted () {
    },
    computed: {
      ...mapGetters([
        'commodityArr'
      ]),
    },
    watch:{
      commodityArr () {
        console.log(this.goodsList)
        this.trConfig[0].select_data = this.commodityArr //编号
      }
    },
    methods: {
      async getSheetNo () {
        const _self = this
        return new Promise((resolve, reject) => {
          getSettleSheetCode().then(response => {
            _self.requestData.orderNumber = response.data.sheetNo
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      },
      async getPurSettlementSheet(orderSettleId){
        const _self = this
        return new Promise((resolve, reject) => {
          getPurchaseSettlementSheet(orderSettleId).then(response => {
            _self.requestData.purchaseOrderSettle = response.data.purchaseOrderSettle
            _self.requestData.purchaseOrderBalanceDetailsList = response.data.purchaseOrderBalanceDetailsList
            console.log( _self.requestData.purchaseOrderSettle)
            console.log(_self.requestData.purchaseOrderBalanceDetailsList)
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      },
      refresh () {
        console.log('刷新')
      },
      print () {
        console.log('打印')
      },
      searchOnChange (key, data) {
        console.log(this[key])
        console.log(key, data)
      },
      query () {

      },
      submit () {

      },
      draft () {

      }
    }
  }


</script>


<style type="text/scss" scoped lang="scss">
.input-table {
  height: calc(100% - 240px);
}
</style>
