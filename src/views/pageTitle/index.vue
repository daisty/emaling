<style scoped lang="scss">
.page-title{
  line-height:45px;
  .bill-code{
    vertical-align:middle;
  }
  .title{
    font-size: 24px;
    color:#575757;
  }
  .code-label{
    font-size: 18px;
    padding-right:3px;
    font-weight:normal;
  }
  .code{
    text-decoration: underline;
    line-height: 20px;
    font-size:13px;
    color:#666
  }
  button{
    margin-top:5px;
  }
  .line{
    width: 100%;
    height: 5px;
    border-bottom: 3px solid #d4d8e1;
  }
}
</style>

<template>
  <div class="page-title">
    <!--标题栏-->
    <el-row :gutter="10">
      <el-col :span="8">
        <el-button type="danger" size="mini" v-if="!option.isCode" @click="newButton()">{{option.newButton}}</el-button>
        <div class="bill-code" v-if="option.isCode">
          <label class="code-label">NO.</label><span class="code">{{option.sheetNo}}</span>
        </div>
      </el-col>
      <el-col :span="8" >
        <el-row type="flex" justify="center" align="middle">
          <span style="padding:0;" class="title">{{option.pageName}}</span>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row type="flex" justify="end">
          <el-button type="primary">{{option.btnName1}}</el-button>
          <el-button>{{option.btnName2}}</el-button>
        </el-row>
      </el-col>
    </el-row>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: 'purchase',
  props: {
    option: {
      pageName: '',
      component: '',
      isCode: null,
      newButton: '',
      sheetNo: '',
      btnName1: '',
      btnName2: ''
    }
  },
  data() {
    return {
      isNeedBtn: true,
      isCode: false,
      pageName: '采购退货单-历史'
    }
  },
  methods: {
    newButton() {
      if (this.option.component === '采购入库单-历史') {
        this.$router.push('stock_in_bill_add')
      } else if (this.option.pageName === '采购退货单-历史') {
        this.$router.push('return_bill_add')
      }
    }
  }
}
</script>
