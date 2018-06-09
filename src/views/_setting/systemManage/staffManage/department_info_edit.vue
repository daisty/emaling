<template>
<div>
  <el-dialog
    title="部门信息"
    :before-close="showModelTree"
    :visible.sync="showTree"
    width="600px" class="depart-tree-info">
    <el-tree ref="departTreeList" :data="treeData"  :props="defaultProps"    @node-click="handleNodeClick"></el-tree>
    <div class="depart-tree-footer">
        <el-button size="small" type="primary" @click="saveTreeData">保存</el-button>
        <el-button size="small" @click="showModelTree">关闭</el-button>
    </div>
  </el-dialog>
  <el-dialog
    title="部门新增/编辑"
    :before-close="close"
    :visible="true"
    width="600px">
    <el-form :model="form" :rules="rules" ref="departform"  class="demo-ruleForm" :label-position="labelPosition" label-width="80px" size="mini">     
      <el-row>  
      <el-col :span="11">
        <el-form-item label="部门编号" prop="structureNo">
            <el-input v-model="form.structureNo"></el-input>
        </el-form-item>
      </el-col>     
      <el-col :span="11">
        <el-form-item label="部门名称" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col> 
     </el-row>   
     <el-row>
      <el-col :span="11">
        <el-form-item label="上级部门">
            <el-input  v-model="form.parent">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="showModelTree"></i>
            </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="索引号">
            <el-input v-model.number="form.displayIndex"></el-input>
        </el-form-item>
      </el-col>
    </el-row>  
      <el-form-item size="small" class="accountBtn">
        <el-button size="small" type="primary" @click="save">保存</el-button>
        <el-button size="small" @click="close">关闭</el-button>
      </el-form-item>
    </el-form>
    
  </el-dialog>
</div> 
</template>

<script>
import {fetchAddStructure,fetchUpdateStructure,getDepartmentTree} from '@/api/setting'
export default {
  props: {
    type:{
      type:String
    },
    rowData:{
      type:Object
    },
    refreshFun: {
      type: Function
    },
    close: {
      type: Function
    }
  },
  data() {
    return {
      treeData:[],//树形结构
      defaultProps: {//树形结构 
        children: 'children',
        label: 'label'
      },
      showTree:false,
      form: {
        structureNo:'',
        name:'',
        parent:'',
        parentId:'',
        displayIndex:'',
      },
      which:1,
      labelPosition: "center",
      staffMemberList:[],//职员列表
      rules: {
        structureNo: [
          { required: true, message: "请输入部门编号", trigger: "blur" }
        ],
        name:[
          { required: true, message: "请输入部门名称", trigger: "blur" }
        ]
      }
    };
  },
  created(){
    this.isEdit();
    this.getDepartTree()
  },
  methods: {     
    isEdit(){//判断是否是编辑页
     if(this.type==='2'){
       this.getEditData()
     }else if(this.type==='3'){
       this.treeAddData()
     }
    },
    treeAddData(){//树形新增部门
      this.form.parent=this.rowData.label
      this.form.parentId=this.rowData.id
    },
    save() {//保存判断
      this.$refs["departform"].validate(valid => {
        let excuteStatus = true;
        if (valid) {
          this.type==='2'?this.edit():this.add()
        } else {         
          console.log("error submit!!");
          excuteStatus = false;          
        }
        return excuteStatus;
      });
    },    
    add() {//新增
      this.loading = true;
      let params = this.form; 
      fetchAddStructure(params)
        .then(res => {
            if (res.code === 0) {
              this.$message.success("新增成功");
              this.loading = false;
              this.$refs["departform"].resetFields();//清除表格内容
              this.refreshFun();//执行刷新表格              
            }else{  
              this.$message({
                type: "error",
                message: res.msg
              })
            }
        })
        .catch(err => {
            this.$message({
              type: "error",
              message: err.msg
            });
            this.loading = false;
        });          
    },   
    getEditData(){//获取编辑数据
      this.form.name=this.rowData.name;
      this.form.structureNo=this.rowData.structureNo;
      this.form.parent=this.rowData.parentName
      this.form.parentId=this.rowData.parentId
      this.form.displayIndex=this.rowData.displayIndex      
    },
    edit(){//编辑更新操作
        this.$set(this.form,'structureId',this.rowData.structureId)
        let params = this.form; 
        console.log(params)
        fetchUpdateStructure(params)
          .then(res => {
              if (res.code === 0) {
                this.$message.success("修改成功");
                this.loading = false;
                this.refreshFun();//执行刷新表格
                this.$refs["departform"].resetFields();//清除表格内容
              }else{  
                this.$message({
                  type: "error",
                  message: res.msg
                })
              }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.msg
          });
          this.loading = false;
        });
    },
    showModelTree(){//显示部门树形
       this.showTree=!this.showTree
    },
    getDepartTree(){//获取部门树组织
        const _self = this
        getDepartmentTree().then(response => {
          _self.treeData = response.data.treeNode.children
        }).catch(err => {
          console.log(err)
        })
    },
    handleNodeClick(data){//树形节点点击事件
      console.log(data)
    },   
    saveTreeData(){//保存树弹框选择信息
      let treeNode=this.$refs.departTreeList.getCurrentNode()
      this.form.parent=treeNode.label;
      this.form.parentId=treeNode.id;
      this.showModelTree()
    }
  },
  watch: {}
};
</script>
<style scoped lang="scss">
  .accountBtn {
    display: flex;
    padding-top: 20px;
    box-sizing: border-box;
    justify-content: flex-end;
  }
.depart-tree-footer{
  text-align: right;
  margin-top: 10px
}
</style>
