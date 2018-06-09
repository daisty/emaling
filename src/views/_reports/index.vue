<template>
  <div>
    <div class="sys-menu-title">{{pageName}}</div>
    <div class="page-title">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-row type="flex">
            <el-button @click="meterialSalesSheetStatistic()">销售单据统计</el-button>
            <el-button @click="meterialSalesDmyStatistic()">销售日月年报表</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MeterialReports",
    data(){
      return{
        pageName:"销售报表"
      }
    },
    methods: {
    // 销售单据统计
    meterialSalesSheetStatistic() {
      this.$router.push("sales_sheet_statistic");
    },
    // 销售日月年报表
    meterialSalesDmyStatistic() {
      this.$router.push("sales_daymonthyear_statistic");
    },
  }
  }
</script>

<style>
.sys-menu-title{
    color: #4f90d4;
    font-size: 16px;
    margin-top: 1em;
}
</style>
