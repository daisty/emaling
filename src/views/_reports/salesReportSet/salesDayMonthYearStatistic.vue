<template>
  <div class="app-container sales-dmy">
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="销售日报表" name="first"><sales-day-statistic v-if="activeName == 'first'"></sales-day-statistic></el-tab-pane>
      <el-tab-pane label="销售月报表" name="second"><sales-month-statistic v-if="activeName == 'second'"></sales-month-statistic></el-tab-pane>
      <el-tab-pane label="销售年报表" name="third"><sales-year-statistic v-if="activeName == 'third'"></sales-year-statistic></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SalesDayStatistic from '@/views/_reports/salesReportSet/salesDayStatistic'
import SalesMonthStatistic from '@/views/_reports/salesReportSet/salesMonthStatistic'
import SalesYearStatistic from '@/views/_reports/salesReportSet/salesYearStatistic'
export default {
  name: 'salesDayMonthYearStatistic',
    components: { SalesDayStatistic, SalesMonthStatistic, SalesYearStatistic },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>
<style type="text/scss" scoped lang="scss">
.remark {
  margin-top: 10px;
  box-shadow: 10px -8px 10px -10px #aaa, 5px 8px 10px -10px #aaa;
  .el-input__inner {
    border-color: #f2f2f2;
  }
}
</style>

<style lang="scss">
.sales-dmy{
  padding: 0px !important;
  .table-contain {
    height: calc(100% - 313px);
    margin-bottom: 40px;
  }
    .el-tabs__item.is-active{
    color: #409EFF;
    background-color: #fff;
  }
  .el-tabs__header{
    background-color: #639bdf;
    padding-top: 5px;
    margin: 0 0 -8px;
  }
  .el-tabs__nav{
    margin: 0 auto;
  }
  .el-tab-pane{
    width: 100%;
  }
  .el-tabs__item {
    height: 32px;
    font-size: 14px;
    opacity: 1;
    padding: 0 10px;
  }
  .el-tabs__item.is-active{
  border-radius: 4px 4px 0 0;
  }
  .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
      padding-left: 10PX;
  }
  .el-tabs--top .el-tabs__item.is-top:last-child {
      padding-right: 10PX;
  }
}
</style>
