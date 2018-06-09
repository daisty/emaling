<template>
  <div class="page-footer">
    <el-button v-if="pageFooterOption.isNeed_1" @click="pageFooterOption.click1">{{pageFooterOption.btnText1}}</el-button>
    <el-button type="danger" @click="pageFooterOption.click2" v-if="pageFooterOption.isNeed_2">{{pageFooterOption.btnText2}}</el-button>
  </div>
</template>

<script>
import { fetchSaveInstroeInfo } from '@/api/purchase'
export default {
  props: {
    pageFooterOption: {
      type: Object
    },
    requestData: {

    }
  },
  data () {
    return {
    }
  },
  methods: {
    click () {

    },
    async saveInfo () {
      const requestData = {
        handler: '虾米',
        handlerUserId: '31652675301019650',
        supplierName: '唐珀琥1',
        supplierId: '1',
        storeName: '123',
        storeId: '1',
        remark: '45646',
        goodsUnit: 'm',
        purchaseGoodsList: [{
          goodsId: '1',
          goodsColorId: '11',
          goodsNo: 'SP9527',
          goodsName: '大卫2',
          goodsColor: '1#',
          bacthNo: '4-28',
          itemCount: '10',
          orderQuantity: '500',
          goodsUnit: 'm',
          goodsPrice: '12',
          remark: ''
        }]
      }
      const res = await fetchSaveInstroeInfo(requestData)
      console.log(res)
    }
  }
}

</script>

<style scoped>
.page-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #f4f4f4;
  height: 95px;
  line-height: 95px;
  text-align: center;
}
.page-footer .el-button--danger {
  /*  background-color: #eb453c;
    border-color: #eb453c; */
}
</style>
