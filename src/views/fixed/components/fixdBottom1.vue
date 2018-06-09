<template>
  <div class="page-contain">
    <span class="prev">上页</span>
    <span class="current">第(<i>{{current}}/{{pageNumber}}</i>)页</span>
    <span class="next">下页</span>
    <span class="jumper">
      跳转到<input type="text" v-model="current">页
    </span>
    <span class="total">
      共<i>{{total}}</i>条记录
    </span>
    <span class="page-size">
      每页显示<input type="text" v-model="pageSize">行
    </span>
    <el-button style="float:right;border-color:#ccc;" size="mini">取消(Esc)</el-button>
    <el-button style="float:right;margin-right:10px;" type="primary" size="mini">确定(Enter)</el-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        current: 1,
        total: 2,
        pageNumber: 1,
        pageSize: 10
      }
    }
  }
</script>
<style lang="scss" scoped>
  .page-contain{
    margin-top:15px;
    font-size:0;
    line-height: 28px;
    span{
      display:inline-block;
      line-height:20px;
      text-align:center;
      font-size:12px;
      color:#333;
      margin-right:10px;
      vertical-align:middle;
      i{
        color: #97bafe;
        padding:0 4px;
      }
      input{
        border: 1px solid #ccc;
        width:30px;
        height:20px;
        text-align: center;
        margin: 0 5px;
      }
    }
    span.prev,span.next{
      width: 60px;
      border: 1px solid #ccc;
      cursor:pointer;
    }
    span.jumper{
      margin-left:10px;
    }
  }
</style>
