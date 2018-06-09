<template>
  <div class="app-container">
    <page-title :option="option"></page-title>
    <term-search></term-search>
    <table-stock></table-stock>
    <div class="remark">
      <el-input v-model="remark" placeholder="单据备注"></el-input>
    </div>
    <page-footer :pageFooterOption="pageFooterOption"></page-footer>
  </div>
</template>

<script>
import pageTitle from '@/components/pageTitle'
import tableStock from '@/components/tables/tableStock'
import termSearch from '@/components/termSearch'
import pageFooter from '@/components/pageFooter/pageFooterStock'
export default{
  name: 'purchase',
  data() {
    return {
      option: {
        pageName: '采购入库单(详情-草稿)',
        isCode: true,
        isNeedBtn: false,
        btnName1: '打印',
        btnName2: '历史'
      },
      pageFooterOption: {
        isNeed_1: true,
        isNeed_2: true,
        btnText1: '保存草稿',
        btnText2: '入库'
      },
      remark: ''
    }
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
  .remark{
    margin-top: 10px;
    box-shadow: 10px -8px 20px -10px #aaa, 5px 12px 20px -10px #aaa;
    .el-input__inner{
      border-color:#f2f2f2;
    }
  }
</style>
