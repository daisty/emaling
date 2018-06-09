<template>
 <div class="system_param">
  <el-tabs :tab-position="tabPosition"  type="border-card">
      <el-tab-pane label="打印设置">打印设置</el-tab-pane>
      <el-tab-pane label="单据设置">单据设置</el-tab-pane>
  </el-tabs>
 </div>
 
</template>

<script>
  export default{
    name: 'systemParamSetting',
    data() {
        return{
          tabPosition:'left',
        }
    }
  }
</script>
<style lang="scss" scoped>
.system_param{
  padding: 20px;
  height: 100%;
  .el-tabs{
    height: 100%;      
  }
   
}
</style>
<style>
.system_param .el-tabs__nav-scroll,.system_param .el-tabs__content{
  -webkit-box-align: initial;
  -ms-flex-align: initial;
  align-items: initial;
} 
.system_param  .el-tabs__item{
  height: 53px;
  line-height:53px;
} 
.system_param .el-tabs--border-card>.el-tabs__header{
   background-color:#fff;
}
.system_param  .el-tabs--left.el-tabs--border-card .el-tabs__item.is-left.is-active{
  background-color: #409EFF;
  color: #FFF;
  -webkit-box-shadow: 0 1px rgba(122,168,255,0.2);
  box-shadow: 0 1px rgba(122,168,255,0.2);
}
/*ware style*/
.system_param  .el-tabs--left.el-tabs--border-card .el-tabs__item{
    width: 155px;
    position: relative;    
    overflow: hidden;
    text-align: left;
    color: #333;
    opacity: 0.9;
    font-size: 14px;
    padding-left: 34px;
    border-top: 1px solid #dedede
}
.system_param  .el-tabs--left.el-tabs--border-card .el-tabs__item:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;    
    background-image: radial-gradient(circle, #fefefe 15%, transparent 10.01%);/*设置径向渐变*/    
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .9s, opacity .9s;
}
.system_param  .el-tabs--left.el-tabs--border-card .el-tabs__item:active:after {
    transform: scale(0, 0);
    opacity: .9;    
    transition: 0s;
}
</style>


