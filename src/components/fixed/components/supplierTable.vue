<template>
  <div class="deport-table-contain">
    <el-table style="width: 100%;height:calc100%"
      size="mini"
      height="100%"
      :data="tableData"
      @row-click="rowClick"
      border fit highlight-current-row>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="myCode" label="供应商编码" width="160"></el-table-column>
      <el-table-column prop="customerName" width="110" label="供应商名称" >
      </el-table-column>
      <el-table-column prop="contacts" width="80" label="联系人" >
      </el-table-column>
      <el-table-column prop="customerTell" width="100" label="联系电话" >
      </el-table-column>
      <el-table-column prop="remark" width="150" label="备注" >
      </el-table-column>
      <el-table-column  ></el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    props: {
      tableData:Array
    },
    data() {
      return {
        tableLoading: false
      }
    },
    methods: {
      rowClick(row, event, clo) {
        this.tableData.map((item,index) =>{
          if(item.customerName === row.customerName){
            this.$emit('someInfo', index)
          }
        })
      }
    }
  }
</script>
<style>
  .deport-table-contain .el-table__body-wrapper {
    cursor: pointer;
  }
  .deport-table-contain .el-table__body tr.current-row>td{
    /* background-color: #c4e2fc; */
    background-color: #efedd5;
  }
  .deport-table-contain .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #c4e2fc;
  }
  .deport-table-contain .el-table__body-wrapper{
    text-align: center;
  }
  .deport-table-contain .el-table .cell{
    line-height: 20px;
  }
  .deport-table-contain .el-table th{
    text-align: center;
  }
  .deport-table-contain .el-table--border,.deport-table-contain .el-table--group {
    border: 1px solid #ccc;
  }
  .deport-table-contain .el-table td, .deport-table-contain .el-table th.is-leaf {
    border-bottom: 1px solid #ccc;
  }
  .deport-table-contain .el-table--border td,.deport-table-contain .el-table--border th,.deport-table-contain .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
    border-right: 1px solid #ccc;
  }
  .deport-table-contain .el-table th{
    background-color:#e6efff;
    border-color: #ccc;
  }
</style>
<style scoped lang="scss">
  .deport-table-contain{
    margin-top:20px;
    height:calc(100% - 131px)
  }
</style>
