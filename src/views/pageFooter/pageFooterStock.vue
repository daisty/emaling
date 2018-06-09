<template>
  <div class="page-footer">
    <el-button v-if="pageFooterOption.isNeed_1">{{pageFooterOption.btnText1}}</el-button>
    <el-button type="danger" v-if="pageFooterOption.isNeed_2">{{pageFooterOption.btnText2}}</el-button>
  </div>
</template>

<script>
  export default {
    props: {
      pageFooterOption: {
        type: Object
      }
    },
    data() {
      return {
      }
    }
  }

</script>

<style scoped>
  .page-footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #f4f4f4;
    height: 95px;
    line-height: 95px;
    text-align: center;
  }
  .page-footer .el-button--danger{
   /*  background-color: #eb453c;
    border-color: #eb453c; */
  }
</style>
