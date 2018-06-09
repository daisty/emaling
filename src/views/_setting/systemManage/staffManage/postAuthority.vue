<template>
  <div class="app-container post-authority-container">
     <div class="page-title">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-row type="flex" justify="left">
            <el-button type="danger" size="mini"  icon="el-icon-circle-plus-outline" @click="changeModelStatus">新增岗位</el-button>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">岗位权限</span>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="end">
            <el-button type="primary" size="mini">打印</el-button>
          </el-row>
        </el-col>
      </el-row>
      <div class="line"></div>
    </div>
    <div class="search-box-form">      
      <el-row>
        <el-col :span="6">
          <label>筛选条件</label>
			    <el-input placeholder="请输入岗位名称"></el-input>          
			  </el-col>        
        <el-col :span="3" class="showManyCheck">
			    <el-button size="mini" type="danger">查询</el-button>			    
			  </el-col>
			</el-row>
    </div>
     <div class="table-contain">
      <el-table height="100%" :data="tableData" v-loading="loading" element-loading-text="数据加载中..."
       border fit highlight-current-row :stripe="true" size="mini">
        <el-table-column  fixed type="index" label="序号" width="50px"></el-table-column>
        <el-table-column  fixed label="操作"  width="140px">
          <template slot-scope="scope">
            <div class="scope-flex">
            	<el-button class="flex-btn" type="text" size="mini">修改</el-button>
              <el-button class="flex-btn" type="text" size="mini">删除</el-button>
              <el-button class="flex-btn" type="text" size="mini">设置权限</el-button> 
            </div>
          </template>
        </el-table-column>
        <el-table-column  fixed prop="sheetDate" label="岗位名称" width="120px">         
        </el-table-column>
        <el-table-column  fixed prop="sheetNo" label="备注" width="190px"></el-table-column>       
        <el-table-column  prop="customerName" label="">            
        </el-table-column>       
      </el-table>
    </div>
    <!--分页栏-->
    <div class="footer-pagination block">
      <el-pagination @size-change="handleSizeChange" 
      @current-change="handleCurrentChange"
       :current-page="queryData.pageNum" 
       :page-sizes="[15, 30, 45, 60, 75]" 
       :page-size="queryData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <edit-post-authority v-if="showModel.editPostAuthority"  :close="changeModelStatus"></edit-post-authority>
  </div>
</template>

<script>
import editPostAuthority from "./post_authority_edit";
export default{
    name: 'postauthority',
    components:{editPostAuthority},
    data() {
      return{
        loading:false,//动画
        tableData:[],//表格数据
        queryData:{
          pageNum:1,
          pageSize:15
        },
        showModel:{
          editPostAuthority:false
        },
        total:0,    //列表总数
      }
    },
    methods:{
      changeModelStatus() {//新增编辑弹框出现
          this.showModel.editPostAuthority = !this.showModel.editPostAuthority;
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSizeChange(){},
      handleCurrentChange(){}

    },   
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/modulefilestyle/scss/receipt.scss';
</style>  
<style>
.post-authority-container{
  height: 100%
}
.post-authority-container .table-contain {
  height: calc(100% - 240px);
}
.post-authority-container .search-box-form{
  margin:10px 0;
}
.post-authority-container .search-box-form .height-m{
      margin-top: 7px;
}
.post-authority-container .search-box-form .el-form--inline .el-form-item__label{
    font-weight: 400 !important;
    font-size:12px !important;
    text-align:right;
}
.post-authority-container .search-box-form .el-autocomplete.form-item,.receipt-container .search-box-form .el-date-editor {
    height: 100%;
    margin-top: 0;
}
.post-authority-container .search-box-form .el-input__icon{
  line-height: 28px;
} 
.post-authority-container .search-box-form label{
  display: inline-block;
  width: 70px;
  text-align: right;
  font-size: 12px;
  font-weight: normal;
  color: #606266;
  vertical-align:middle;
}
.post-authority-container .search-box-form .el-col{
  margin-bottom: 5px;
}
.post-authority-container .search-box-form .el-col .el-input.el-input--large,
.post-authority-container .search-box-form .el-col .el-autocomplete.form-item,
.post-authority-container.search-box-form .el-col .el-select.el-select--large{
 display: inline-block;
 width: calc(100% - 80px);
}
.post-authority-container .search-box-form .el-col .el-select .el-input{
  width:100%;
}
.post-authority-container .search-box-form .el-input-group__append{
  padding: 0 10px;
}
.post-authority-container .search-box-form .el-col .el-input .el-input__inner{
  height: 28px;
  line-height: 28px;
  font-size:12px;
}

/*分页*/
.footer-pagination{
  width: 100%;
  text-align: center;
  position: absolute;
  bottom:50px;
}
/* depart only */
.app-container.post-authority-container{
  padding: 0
}
</style>
  
