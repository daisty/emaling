<template>
  <div class= "app-container staff-management-container">
    <!-- <page-header :print="print" title="公司职员信息"  :newUrl="'/'" :newTitle="'公司职员'" :newIcon="'el-icon-circle-plus-outline'"></page-header> -->
    <div class="page-title">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-row type="flex" justify="left">
            <el-button type="danger" size="mini"  icon="el-icon-circle-plus-outline" @click="isAdd">新增公司职员</el-button>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">公司职员信息</span>
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
    <span class="search-plain">
      <div class="search-title">
         筛选条件
         <el-input v-model="requestData.staffInfo"  placeholder="请输入编号/姓名/电话"></el-input>
      </div>
      <el-button type="danger" size="mini" @click="searchList">查询</el-button>
      <el-checkbox v-model="checked">显示停用</el-checkbox>
    </span>
    <div class="table-contain">
      <div class="tree-contant tree-plain">
        <div class="tree-title">
          <p class="tree-title-name">所属部门</p>
          <i class="el-icon-close"></i>
          <i class="el-icon-plus" @click="addDepartModel"></i>
          <i class="el-icon-d-arrow-left"  ></i>
        </div>
        <el-tree ref="staffDepartTreeList" :data="treeData"  :props="defaultProps"  accordion  @node-click="handleNodeClick"></el-tree>
      </div>
      <!-- <tree-control  class="tree-plain" :treeControlConfig="treeConfig" ></tree-control> -->
      <div class="table-input">
        <!--table-->
        <div class="table-flex-right">
          <el-table height="100%" :data="tableData" v-loading="loading" element-loading-text="数据加载中..."
          border fit highlight-current-row :stripe="true" size="mini">
            <el-table-column   type="index" label="序号" width="50px"></el-table-column>
            <el-table-column   label="操作"  width="140px">
              <template slot-scope="scope">
                <div class="scope-flex">
                  <el-button class="flex-btn" type="text" size="mini" @click="editInfo(scope.row)">修改</el-button>
                  <el-button class="flex-btn" v-if="scope.row.enabled===1" :disabled="true" type="text" size="mini">删除</el-button>
                  <el-button class="flex-btn" v-else type="text" size="mini" @click="delList(scope.row)">删除</el-button>
                  <el-button class="flex-btn" v-if="scope.row.enabled===0" type="text" size="mini" @click="stopList(1,scope.row)">启用</el-button> 
                  <el-button class="flex-btn" v-else type="text" size="mini" @click="stopList(0,scope.row)">停用</el-button> 
                </div>
              </template>
            </el-table-column>
            <el-table-column  prop="jobNo" label="职员编号"></el-table-column>
            <el-table-column  prop="fullName" label="职员姓名"></el-table-column>       
            <el-table-column  prop="gender" label="性别">
              <template slot-scope="scope">
                <span v-if="scope.row.gender===1">女</span>
                <span v-else>男</span>
              </template>
            </el-table-column>   
            <el-table-column  prop="structureName" label="部门"></el-table-column>  
            <el-table-column  prop="duty" label="职务" > </el-table-column> 
            <el-table-column  prop="mobile" label="联系电话"> </el-table-column> 
            <el-table-column  prop="userName" label="操作员账号">     
            </el-table-column>       
          </el-table>
        </div>   
      </div>
      <!--分页栏-->
      <div class="page-size-block footer-pagination" style="text-align:center">
          <el-pagination @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="requestData.pageNum"
            :page-sizes="[15, 30, 45, 60, 75]"
            :page-size="requestData.pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
      </div>
    </div>
    <edit-depart v-if="showModel.editDepart" v-bind:rowData="propsData.rowData"  v-bind:type="propsData.editType" :refreshFun="initTreeData"   :close="changeModelDepart"></edit-depart>
    <staff-edit v-if="showModel.editStaff" v-bind:rowData="propsData.rowData" v-bind:type="propsData.editType"  :refreshFun="initTableData"  :close="changeModelStatus"></staff-edit>
  </div>
</template>
<script>
  import TreeControl from '@C/BDD_TreeControl'
  import PageHeader from '@C/BDD_PageHeader'
  import TableInput from '@C/BDD_InputTable'
  import editDepart from "./department_info_edit";
  import staffEdit from './staff_edit'
  import {getDepartmentTree,fetchGetEmployee,fetchStopEmployee,fetchDelEmployee} from '@/api/setting'
  export default{
    name: 'staffManagement',
    components: { PageHeader, TreeControl,TableInput,staffEdit,editDepart},
    data() {
        return{
          loading:false,//表格动画加载
          checked:false,
          input:'',
          tableData:[],//表格数据
          treeData:[],//树形结构
          defaultProps: {//树形结构 
            children: 'children',
            label: 'label'
          },
          requestData:{
            fullName:'',
            mobile:'',
            jobNo:'',
            staffInfo:'',
            structureId:'',
            pageNum:1,
            pageSize:15,
          },
          total:0,
          showModel:{
            editStaff:false,
            editDepart:false
          },
          propsData:{
            rowData:{},
            editType:''
          },
        }
    },
    created() {
      this.getDepartmentTree()
      this.queryReceiptList();
    },
    watch: {
    },
    methods:{
      delList(row){//删除列表     
        this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            fetchDelEmployee(row.employeeId).then(response => {         
              if(response.code===0){
                this.$message.success("删除成功");
                this.queryReceiptList()
              }else{
                  this.$message.error("删除失败");
              }            
            }).catch(err => {
                console.log(err)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
        }) 
      },
      stopList(status,row){//停用、启用 
        let data={
            employeeId:row.employeeId,
            enabled:status
        }
        this.$confirm('此操作将更改员工状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.stopListStatus(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消更改'
          })
        })        
      },
      stopListStatus(row){//更改状态
        fetchStopEmployee(row).then(response => {
            if(response.code===0){
              this.queryReceiptList()
            }else{
                this.$message.error("更改状态失败");
            }            
        }).catch(err => {
              console.log(err)
        })
      },
      isAdd(){//判断是否是职员新增
        this.$set(this.propsData,'editType','1')
        this.changeModelStatus()
      },
      editInfo(row){//职员编辑
        this.$set(this.propsData,'rowData',row)
        this.$set(this.propsData,'editType','2')
        this.changeModelStatus()
      },
      changeModelStatus() {//职员新增编辑弹框出现
          this.showModel.editStaff = !this.showModel.editStaff;
      },
      initTableData() {//职员新增编辑后刷新表格并关闭弹框
        this.changeModelStatus();
        this.requestData.pageNum = 1;
        this.queryReceiptList();//刷新表格
      },            
      handleSizeChange (val) {//每页条数改变时
        this.requestData.pageNum=1
        this.requestData.pageSize = val
        this.queryReceiptList()
      },
      handleCurrentChange(value){//页数变化
        this.requestData.pageNum=value
        this.requestData.pageSize=15
        this.queryReceiptList()
      },   
      print(){
        console.log("in the print!")
      },
      handleNodeClick(data){//树形节点点击事件
        this.$set(this.requestData,'structureId',data.id)
        this.queryReceiptList();
      },
      changeModelDepart(){//部门新增是否显示
        this.showModel.editDepart=!this.showModel.editDepart
      },
      addDepartModel(){//树形部门添加
        this.propsData.editType='3'
        this.propsData.rowData=this.$refs.staffDepartTreeList.getCurrentNode()
        this.changeModelDepart()
      },
      initTreeData() {//树状部门新增刷新表格并关闭弹框
        this.changeModelDepart();
        this.getDepartmentTree();//刷新树状
      }, 
      searchList(){//查询列表
        this.requestData.pageNum=1
        this.requestData.pageSize=15
        this.queryReceiptList()
      },
      queryReceiptList(){//列表数据请求
         this.$set(this.requestData,'fullName',this.requestData.staffInfo)
         this.$set(this.requestData,'mobile',this.requestData.staffInfo)
         this.$set(this.requestData,'jobNo',this.requestData.staffInfo)
         let data=this.requestData;   
         fetchGetEmployee(data).then(response => {
           if(response.code===0){
             this.tableData=response.data.list.list
             this.total=response.data.list.total
             this.requestData.pageNum=response.data.list.pageNum
             this.requestData.pageSize=response.data.list.pageSize
           }else{
           }            
          }).catch(err => {
          })
      },
      getDepartmentTree(data){//获取部门树形
        const _self = this
        return new Promise((resolve, reject) => {
          getDepartmentTree().then(response => {
            console.log(response)
            _self.treeData = response.data.treeNode.children
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      }
    },

  }
</script>
<style  lang="scss">
@import '../../../../assets/modulefilestyle/scss/receipt.scss';
.staff-management-container{
    padding: 0px;
    height: 100%;
    .page-header{
      padding-bottom: 5px;
      h5{
        top: 8px;
      }
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
    .table-flex-right{
        width: calc(100%);
        height: 100%;
        margin-top: 0px;
    }
    .table-contain {
      height: calc(100% - 237px);
      display: flex;
      .tree-plain{
        flex: 0 0 200px;
        margin-right: 20px;
      }
      .table-input{
        width: calc(100% - 220px);
        height: 100%;
        margin-top: 0px;
        .table-plain{
          width: 100%;
          height: calc(100% );
          margin-top: 0px;
        }
        div {
            display:inherit;
            display: inherit;
            -ms-flex-align: inherit;
            align-items: inherit;
        }
      }
    }
  }

/*分页*/
.footer-pagination{
  width: 100%;
  text-align: center;
  position: absolute;
  bottom:50px;
}
.tree-contant{
  border: 1px solid #cad1d8 ;
  overflow: hidden;
}
.tree-contant .tree-title{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #333;
    border-bottom: 1px solid #cad1d8;
}
.tree-contant .tree-title-name{
  -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: 20px;
    padding-left: 10px;
    font-size: 16px;
    border: 0 none;
    margin: 8px;
}
.tree-contant .tree-title i{
   padding: 5px;
   font-size: 16px;
   cursor: pointer;
}
   
</style>
