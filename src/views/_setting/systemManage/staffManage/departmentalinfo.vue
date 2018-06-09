<template>
  <div class="app-container depard-info-container">
     <div class="page-title">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-row type="flex" justify="left">
            <el-button type="danger" size="mini"  icon="el-icon-circle-plus-outline" @click="addDepart">新增部门</el-button>
            <el-button type="danger"  size="mini" icon="el-icon-circle-plus-outline" @click="changeModelStatus2">新增分类</el-button>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">部门信息</span>
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
			    <el-input v-model="queryData.inputValue" placeholder="请输入部门名称/编号"></el-input>          
			  </el-col>        
        <el-col :span="8" class="showManyCheck">
			    <el-button size="mini" type="danger" @click="queryReceiptList">查询</el-button>
			    <!-- <el-checkbox v-model="showStop">显示停用</el-checkbox> -->
          <el-checkbox v-model="showStructure">显示层次结构</el-checkbox>
			  </el-col>
			</el-row>
    </div>
     <div class="table-contain">
      <el-table height="100%" :data="tableData" v-loading="loading" element-loading-text="数据加载中..."
       border fit highlight-current-row :stripe="true" size="mini">
        <el-table-column   type="index" label="序号" width="50px"></el-table-column>
        <el-table-column   label="操作"  width="100px">
          <template slot-scope="scope">
            <div class="scope-flex">
            	<el-button class="flex-btn" type="text" size="mini" @click="editDeparts(scope.row)">修改</el-button>
              <el-button class="flex-btn" type="text" size="mini" @click="delList(scope.row)">删除</el-button>
              <!-- <el-button class="flex-btn" type="text" size="mini">停用</el-button>  -->
            </div>
          </template>
        </el-table-column>
        <el-table-column   prop="name" label="部门名称" width="150px">         
        </el-table-column>
        <el-table-column   prop="structureNo" label="部门编号" width="150px"></el-table-column> 
        <el-table-column   prop="parentName" label="上级部门" width="150px"></el-table-column>       
        <el-table-column  prop="" label="">          
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
    <edit-depart v-if="showModel.editDepart"   v-bind:rowData="propsData.rowData" v-bind:type="propsData.editType" :refreshFun="initTableData"   :close="changeModelStatus"></edit-depart>
    <edit-category v-if="showModel.editCategory"  :close="changeModelStatus2"></edit-category>
  </div>
</template>

<script>
import editDepart from "./department_info_edit";
import editCategory from "./department_category_edit";
import {fetchStructureList,fetchDelStructure} from '@/api/setting'
export default{
    name: 'departmentlinfo',
    components: {editDepart,editCategory},
    data() {
      return{
        loading:false,//动画
        tableData:[],//表格数据
        showStop:false,//显示停用
        showStructure:false,//显示层次结构
        queryData:{
          inputValue:'',
          name:'',
          structureNo:'',
          pageNum:1,
          pageSize:15
        },
        showModel:{
          editDepart:false,
          editCategory:false
        },
        propsData:{
          editType:'',
          rowData:{}
        },
        total:0,    //列表总数
      }
    },
    created(){
      this.queryReceiptList();
    },
    methods:{
      queryReceiptList(){//列表数据请求
         this.$set(this.queryData,'structureNo',this.queryData.inputValue)
         this.$set(this.queryData,'name',this.queryData.inputValue)
         let data=this.queryData;   
         fetchStructureList(data).then(response => {
           if(response.code===0){   
             console.log(response)
             this.tableData=response.data.list.list
             this.total=response.data.list.total
             this.queryData.pageNum=response.data.list.pageNum
             this.queryData.pageSize=response.data.list.pageSize
           }else{

           }            
          }).catch(err => {
          })
      },
      addDepart(){//操作员新增弹框
        this.propsData.editType='1'
        this.changeModelStatus()
      },
      editDeparts(row){//操作员编辑弹框
        this.propsData.editType='2'
        this.propsData.rowData=row    
        console.log(this.propsData.rowData)   
        this.changeModelStatus()
      },
      changeModelStatus() {//操作员新增编辑弹框出现
          this.showModel.editDepart = !this.showModel.editDepart;
      },
      initTableData() {//操作员新增编辑后刷新表格并关闭弹框
        this.changeModelStatus();
        this.queryData.pageNum = 1;
        this.queryReceiptList();//刷新表格
      },
      changeModelStatus2() {//分类新增编辑弹框出现
          this.showModel.editCategory = !this.showModel.editCategory;
      },
      delList(row){//部门删除     
        this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {        
              this.delPostList(row.structureId)//执行删除操作
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
        }) 
      },
      delPostList(id){//删除请求
        fetchDelStructure(id)
        .then(response => {         
            if(response.code===0){
                this.$message.success("删除成功");
                this.queryReceiptList()
            }else{
                this.$message.error(response.msg);
            }            
        })
        .catch(err => {
             console.log(err)
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSizeChange(){},
      handleCurrentChange(){},
      
    },   
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/modulefilestyle/scss/receipt.scss';
</style>  
<style>
.depard-info-container{
  height: 100%
}
.depard-info-container .table-contain {
  height: calc(100% - 240px);
}
.depard-info-container .search-box-form{
  margin:10px 0;
}
.depard-info-container .search-box-form .height-m{
      margin-top: 7px;
}
.depard-info-container .search-box-form .el-form--inline .el-form-item__label{
    font-weight: 400 !important;
    font-size:12px !important;
    text-align:right;
}
.depard-info-container .search-box-form .el-autocomplete.form-item,.receipt-container .search-box-form .el-date-editor {
    height: 100%;
    margin-top: 0;
}
.depard-info-container .search-box-form .el-input__icon{
  line-height: 28px;
} 
.depard-info-container .search-box-form label{
  display: inline-block;
  width: 70px;
  text-align: right;
  font-size: 12px;
  font-weight: normal;
  color: #606266;
  vertical-align:middle;
}
.depard-info-container .search-box-form .el-col{
  margin-bottom: 5px;
}
.depard-info-container .search-box-form .el-col .el-input.el-input--large,
.depard-info-container .search-box-form .el-col .el-autocomplete.form-item,
.depard-info-container .search-box-form .el-col .el-select.el-select--large{
 display: inline-block;
 width: calc(100% - 80px);
}
.depard-info-container .search-box-form .el-col .el-select .el-input{
  width:100%;
}
.depard-info-container .search-box-form .el-input-group__append{
  padding: 0 10px;
}
.depard-info-container .search-box-form .el-col .el-input .el-input__inner{
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
.app-container.depard-info-container{
  padding: 0
}
</style>
  
