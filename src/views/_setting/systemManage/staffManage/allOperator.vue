<template>
  <div class="app-container all-operator-container">
     <div class="page-title">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-row type="flex" justify="left">
            <el-button type="danger" size="mini"  icon="el-icon-circle-plus-outline" @click="changeModelStatus">新增操作员</el-button>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">全部操作员</span>
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
			    <el-input placeholder="请输入职员名称"></el-input>          
			  </el-col>        
        <el-col :span="3" class="showManyCheck">
			    <el-button size="mini" type="danger">查询</el-button>			    
          <el-checkbox v-model="showStop">显示停用</el-checkbox>
			  </el-col>
			</el-row>
    </div>
     <div class="table-contain">
      <tree-control  class="tree-plain" :treeControlConfig="treeConfig" ></tree-control>
      <div class="table-flex-right">
      <el-table height="100%" :data="tableData" v-loading="loading" element-loading-text="数据加载中..."
       border fit highlight-current-row :stripe="true" size="mini">
        <el-table-column  fixed type="index" label="序号" width="50px"></el-table-column>
        <el-table-column  fixed label="操作"  width="140px">
          <template slot-scope="scope">
            <div class="scope-flex">
            	<el-button class="flex-btn" type="text" size="mini">修改</el-button>
              <el-button class="flex-btn" type="text" size="mini">删除</el-button>
              <el-button class="flex-btn" type="text" size="mini">更多</el-button> 
            </div>
          </template>
        </el-table-column>
        <el-table-column  fixed prop="sheetDate" label="用户名" width="120px">        
        </el-table-column>
        <el-table-column  fixed prop="sheetNo" label="职员" width="120px"></el-table-column>       
        <el-table-column  prop="" label="部门"  width="120px"> </el-table-column>   
        <el-table-column  prop="" label="岗位"  width="120px"> </el-table-column>   
        <el-table-column  prop="customerName" label="">     
        </el-table-column>       
      </el-table>
      </div>
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
    <edit-all-operator v-if="showModel.editAllOperator"  :close="changeModelStatus"></edit-all-operator>
  </div>
</template>

<script>
import TreeControl from '@C/BDD_TreeControl'
import {getDepartmentTree} from '@/api/setting'
import editAllOperator from "./all_operator_edit";
export default{
    name: 'postauthority',
    components: {TreeControl,editAllOperator},
    data() {
      return{
        showStop:false,
        loading:false,//动画
        tableData:[],//表格数据
        queryData:{
          pageNum:1,
          pageSize:15
        },
        total:0,    //列表总数
        departmentInfo:[],//所属部门列表
        treeConfig: {
            title:"所属部门",
            treeData:[],
            defaultProps: {
              children: 'children',
              label: 'label'
            },
            isNeedIcon: true,
            isRightIcon: true
        },
        showModel:{
          editAllOperator:false
        }
      }
    },
    watch: {
      departmentInfo(){
        this.treeConfig.treeData = this.departmentInfo
      }
    },
    created() {
      this.getDepartmentTree()
    },
    methods:{      
      changeModelStatus() {//新增编辑弹框出现
          this.showModel.editAllOperator = !this.showModel.editAllOperator;
      },
      getDepartmentTree(data){//获取所属部门
        const _self = this
        return new Promise((resolve, reject) => {
          getDepartmentTree().then(response => {
            console.log(response)
            _self.departmentInfo = response.data.treeNode.children
            console.log(this.departmentInfo)
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
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
.all-operator-container{
  height: 100%
}
.all-operator-container .table-contain {
  height: calc(100% - 240px);
}
.all-operator-container .search-box-form{
  margin:10px 0;
}
.all-operator-container .search-box-form .height-m{
      margin-top: 7px;
}
.all-operator-container .search-box-form .el-form--inline .el-form-item__label{
    font-weight: 400 !important;
    font-size:12px !important;
    text-align:right;
}
.all-operator-container .search-box-form .el-autocomplete.form-item,.receipt-container .search-box-form .el-date-editor {
    height: 100%;
    margin-top: 0;
}
.all-operator-container .search-box-form .el-input__icon{
  line-height: 28px;
} 
.all-operator-container .search-box-form label{
  display: inline-block;
  width: 70px;
  text-align: right;
  font-size: 12px;
  font-weight: normal;
  color: #606266;
  vertical-align:middle;
}
.all-operator-container .search-box-form .el-col{
  margin-bottom: 5px;
}
.all-operator-container .search-box-form .el-col .el-input.el-input--large,
.all-operator-container .search-box-form .el-col .el-autocomplete.form-item,
.all-operator-container.search-box-form .el-col .el-select.el-select--large{
 display: inline-block;
 width: calc(100% - 80px);
}
.all-operator-container .search-box-form .el-col .el-select .el-input{
  width:100%;
}
.all-operator-container .search-box-form .el-input-group__append{
  padding: 0 10px;
}
.all-operator-container .search-box-form .el-col .el-input .el-input__inner{
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
</style>
<style lang="scss" scoped>
/* operator only */
.all-operator-container {
   padding: 0;
   
  .table-contain {
      height: calc(100% - 240px);
      display: flex;
      .tree-plain{
        flex: 0 0 200px;
        margin-right: 20px;
      }
      .table-flex-right{
        width: calc(100% - 220px);
        height: 100%;
        margin-top: 0px;
      }
 }
}
</style>

  
