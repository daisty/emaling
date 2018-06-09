<style scoped>
  .term-search{
    margin-bottom: 10px;
  }
  .title{
    font-size: 24px;
  }
  .form-item{
    width:18%;
    margin-top: 10px;
    margin-left: 10px;
  }
  .form-btn{
    margin-top: 10px;
    margin-left: 10px;
  }
</style>
<style type="text/css">
   .term-search .el-input-group__prepend{
    padding: 0 10px!important;
  }
  .term-search .el-input-group__prepend .el-button--medium{
    padding:10px!important;
  }
</style>
<template>
  <div class="term-search">
    <!--查询栏-->
    <el-row :gutter="10">
      <el-input class="form-item" size="small" v-model="tableQuery.supplier" placeholder="供应商">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-input class="form-item" size="small" v-model="tableQuery.inventory" placeholder="仓库">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-input class="form-item" size="small" v-model="tableQuery.handler" placeholder="经手人">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-date-picker class="form-item" size="small" v-model="tableQuery.dateStart" type="date" placeholder="单据日期"></el-date-picker>
      <el-date-picker class="form-item" size="small" v-model="tableQuery.dateEnd" type="date" placeholder="预计到货日期"></el-date-picker>
    </el-row>
  </div>
</template>

<script>
import { billStatusOptions, accountStatusOptions, billStatusMap, accountStatusMap } from '@/utils/constants'
export default {
  name: 'purchase',
  data() {
    return {
      billStatusOptions,
      accountStatusOptions,
      billStatusMap,
      accountStatusMap,
      tableQuery: {
        dateStart: null,
        dateEnd: null,
        inventory: null,
        supplier: null,
        handler: null
      }
    }
  }
}
</script>
