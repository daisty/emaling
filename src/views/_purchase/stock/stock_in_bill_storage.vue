<template>
  <div class="app-container">
    <page-title :option="option"></page-title>
    <term-search v-if="requestData.orderNo" :disabled="true" :defaultValue="requestData"></term-search>
    <table-stock :data="requestData.purchaseGoodsList"></table-stock>
    <div class="remark">
      <el-input :disabled="true" v-model="requestData.remark" placeholder="单据备注"></el-input>
    </div>
    <page-footer :pageFooterOption="pageFooterOption"></page-footer>
  </div>
</template>

<script>
import pageTitle from '@/components/pageTitle'
import tableStock from '@/components/tables/tableStock'
import termSearch from '@/components/termSearch'
import pageFooter from '@/components/pageFooter/pageFooterStock'
import {
  getPurchaseOrderDetails,
  discardPurchasePurchaseOrder
} from '@api/purchase'
export default {
  name: 'purchase',
  data () {
    return {
      orderId: this.$route.query.orderId,
      option: {
        pageName: '采购入库单(详情-已入库)',
        isCode: true,
        isNeedBtn: false,
        btnName1: '打印',
        btnName2: '历史'
      },
      pageFooterOption: {
        isNeed_1: true,
        isNeed_2: true,
        btnText1: '退货',
        btnText2: '作废',
        click1 () {

        },
        click2: () => {
          discardPurchasePurchaseOrder({
            orderId: this.orderId,
            orderType: 1
          }).then((data) => {
            if (data.code == 0) {
              this.$router.push('stock_in_bill_history')
            }
          });

        }
      },
      remark: '',
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
    }
  },
  created () {
    this.getPurchaseOrderDetails()
  },
  methods: {
    getPurchaseOrderDetails () {
      getPurchaseOrderDetails(this.orderId).then(({ data }) => {
        const Data = data.purchaseOrder
        this.requestData = {
          ...this.requestData,
          ...data.purchaseOrder,
        }
        this.option = {
          ...this.option,
          sheetNo: this.requestData.orderNo
        }
      })
    },
  },
  components: {
    pageTitle,
    termSearch,
    tableStock,
    pageFooter
  }
}
</script>
<style type="text/scss" scoped lang="scss">
.remark {
  margin-top: 10px;
  box-shadow: 10px -8px 20px -10px #aaa, 5px 12px 20px -10px #aaa;
  .el-input__inner {
    border-color: #f2f2f2;
  }
}
</style>
