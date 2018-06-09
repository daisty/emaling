<template>
  <div class="app-container staff-manage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="职员信息" name="first"><staff-managements-tab v-if="activeName == 'first'"></staff-managements-tab></el-tab-pane>
      <el-tab-pane label="部门信息" name="second"><departmental-info v-if="activeName == 'second'"></departmental-info></el-tab-pane>
      <el-tab-pane label="岗位信息" name="third"><post-authority v-if="activeName == 'third'"></post-authority></el-tab-pane>
      <el-tab-pane label="全部操作员" name="fourth"><all-operator v-if="activeName == 'fourth'"></all-operator></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import StaffManagementsTab from "@/views/_setting/systemManage/staffManage/staffManagementsTab"
  import departmentalInfo from '@/views/_setting/systemManage/staffManage/departmentalinfo'
  import postAuthority from '@/views/_setting/systemManage/staffManage/postAuthority'
  import allOperator from '@/views/_setting/systemManage/staffManage/allOperator'//全部操作员

  export default{
    name: 'staffManagePage',
    data() {
      return{
        activeName: 'first'
      }
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    components: { StaffManagementsTab, departmentalInfo, postAuthority, allOperator },
  }
</script>

<style>
.staff-manage .table-contain{
    width: 100%;
    height: 100%;
    /*height: calc(100% - 200px);*/
  }

.staff-manage .table-contain .input-table{
    margin-bottom: 10px;
  }

  .staff-manage .el-tab-pane{
    height: 100%;
  }
 .staff-manage  .el-table th {
    text-align: center;
  }
 .staff-manage  .el-tabs__content{
    align-items: flex-start;
  }
 .staff-manage  .el-tabs el-tabs--top{
    height: 100%;
  }
 .staff-manage  .padding .el-table--mini td {
    padding: 1px !important;
  }
 .staff-manage  .padding .el-table td > .cell {
    height: 27px;
    line-height: 27px;
    padding: 0px;
    text-indent: 10px;
  }
 .staff-manage  .padding .el-table th > .cell,
 .staff-manage  .padding .el-table td > .cell {
    width: 100%;
    position: relative;
    overflow: visible;
  }
 .staff-manage  .padding el-table td > .cell .el-input {
    position: relative;
    top: -11px;
  }
 .staff-manage  .padding .el-table td > .cell span input {
    height: 26px;
    line-height: 26px;
  }
  .staff-manage .el-table td > .cell span {
    display: block;
    width: 100%;
    height: 100%;
  }
 .staff-manage  .pagination{
    margin-top: 50px;
  }
 .staff-manage  .tableHeight{
    height:439px;
  }
  .staff-manage .blue1 {
    color: #2369b5;
    user-select: none;
  }
 .staff-manage  .btn-search{
    margin-top: 10px;
  }
 .staff-manage  .el-col-padding{
    padding: 0px !important
  }
  .staff-manage .el-loading-mask{
    z-index: 3;
  }
  .staff-manage .el-tabs__item.is-active{
    color: #409EFF;
    background-color: #fff;
  }
  .staff-manage .el-tabs__header{
    background-color: #639bdf;
    padding-top: 5px;
    border-radius: 3px;
    margin-bottom: 5px;
  }
  .staff-manage .el-tabs__nav{
    margin: 0 auto;
  }
  .staff-manage .el-tab-pane{
    width: 100%;
  }
  .staff-manage .el-tabs__item {
    height: 35px;
    padding: 0 20px;
  }
  
  .staff-manage .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20PX;
  }
  .staff-manage .el-tabs--top .el-tabs__item.is-top:last-child {
    padding-right: 20PX;
  }
  .staff-manage .el-tabs.el-tabs--top{
    height: 100%
  }
  .staff-manage .el-tabs__content {
    height: 100%;
    -webkit-box-align: initial;
    -ms-flex-align: initial;
    align-items: initial;
  }
</style>
<style  lang="scss">
  .staff-manage{
    .my-icon{
      color: #fff;
      vertical-align: -2px;
    }
    .search-plain{
      width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;
      height: 50px;
      display: inline-flex;
      .search-title{
        font-size: small;
      }
      .el-input{
        width: 210px;
      }
      .el-input__inner{
        width: 200px;
        height: 30px;
        padding-right: 20px;
      }
      .el-button{
        font-size: small;
        margin-right: 20px;
      }
      .el-checkbox{
        margin-top: 8px;
      }
    }
    .table-contain {
      height: calc(100% - 250px);
      display: flex;
      .tree-plain{
        flex: 0 0 200px;
        margin-right: 20px;
      }
      .table-plain{
        width: 100%;
        height: 100%;
        margin-top: 0px;
      }
    }
  }
</style>
