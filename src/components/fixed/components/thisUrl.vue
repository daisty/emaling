<template>
  <div class="url">
    <span>当前路径 :</span>
    <span>{{url}}</span>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        url: '全部'
      }
    }
  }
</script>
<style lang="scss" scoped>
  .url{
    border: 1px solid #ccc;
    height: 28px;
    line-height:28px;
    margin-top: 15px;
    font-size: 12px;
    span:nth-child(1){
      padding:0 2px 0 8px;
    }
    span:nth-child(2){
      color:#ffcc66;
    }
  }
</style>
