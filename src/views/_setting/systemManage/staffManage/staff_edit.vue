<template>
  <el-dialog
    title="职员新增/编辑"
    :before-close="close"
    :visible="true"
    width="600px" class="staff-edit-dialog">
    <el-form :model="form" :rules="rules" ref="staffform"  class="demo-ruleForm" :label-position="labelPosition" label-width="85px" size="mini">     
      <el-row> 
      <el-col :span="11">
        <el-form-item label="职员名称" prop="fullName">
            <el-input v-model="form.fullName"></el-input>
        </el-form-item>
      </el-col> 
      <el-col :span="11">
        <el-form-item label="性别" prop="gender">
             <el-select v-model="form.gender" clearable placeholder="请选择">
              <el-option  label="女" key="1"  value="1"></el-option>
              <el-option  label="男" key="0" value="0"></el-option>
            </el-select>
        </el-form-item>
      </el-col>                 
     </el-row>
     <el-row>
      <el-col :span="11">
        <el-form-item label="职员电话" prop="mobile">
            <el-input v-model="form.mobile"></el-input>
        </el-form-item>
      </el-col> 
      <el-col :span="11">
        <el-form-item label="职员编号" prop="jobNo">
            <el-input  v-model="form.jobNo"></el-input>
        </el-form-item>
      </el-col>      
    </el-row>   
    <el-row>
      <el-col :span="11">
        <el-form-item label="职员职位">
            <el-input v-model="form.duty"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">  
        <el-form-item label="所属部门" prop="structure">
            <el-autocomplete class="form-item" size="small" v-model="form.structure" @focus="which=1"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                       @select="handleSelect">            
              <!-- <el-button  slot="append" icon="el-icon-search"></el-button> -->
            </el-autocomplete>
        </el-form-item>
      </el-col>
    </el-row>   
    <el-row>  
      <el-col :span="11">  
        <el-form-item label="所属单位">            
            <el-autocomplete class="form-item" size="small" v-model="form.store"  @focus="which=2"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                       @select="handleSelect">            
              <!-- <el-button  slot="append" icon="el-icon-search"></el-button> -->
            </el-autocomplete>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="操作员">
             <el-select v-model="form.operator" @change="operatorChange" filterable placeholder="请选择操作员">
              <el-option  
                v-for="item in operatorList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId">
              </el-option>
            </el-select>
        </el-form-item>
      </el-col>
    </el-row>      
      <el-form-item size="small" class="accountBtn">
        <el-button size="small" type="primary" @click="save">保存</el-button>
        <el-button size="small" @click="close">关闭</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
 import {fetchAddEmployee,fetchStructureList,fetchStoreList,fetchUpdateEmployee,fetchGetUserList} from '@/api/setting'
export default {
  props: {
    type: {
      type: String
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
      form: {
        fullName:'',
        mobile:'',
        jobNo:'',
        duty:'',
        structureId :'',
        structure:'',
        storeId:'',
        store:'',
        operator:'',
        gender:''
      },
      operatorList:[],
      postList:[],
      storeList:[],
      which:1,
      labelPosition: "center",
      staffMemberList:[],//职员列表
      rules: {
        fullName: [
          { required: true, message: "请输入职员名称", trigger: "blur" }
        ],
        gender:[
          { required: true, message: "请选择性别", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入职员电话", trigger: "blur" }
        ],
        jobNo:[
          { required: true, message: "请输入职员编号", trigger: "blur" }
        ],
        structure:[
          { required: true, message: "请选择所属部门", trigger: "blur" }
        ]
      }
    };
  },
  created(){
    this.getPostList();
    this.getStoreList();
    this.getUserList();
    this.isEdit();
  },
  methods: {   
    isEdit(){//判断是否是编辑页
     if(this.type==='2'){
       this.getEditData()
     }
    },
    getEditData(){//获取编辑信息   
        this.form.fullName=this.rowData.fullName,
        this.form.mobile=this.rowData.mobile,
        this.form.jobNo=this.rowData.jobNo,
        this.form.duty=this.rowData.duty,
        this.form.structureId=this.rowData.structureId,
        this.form.structure=this.rowData.structureName,
        // this.form.storeId=this.rowData.storeId,
        // this.form.store=this.rowData.store,
        // this.form.operator=this.rowData.operator,
        this.form.gender=parseInt(this.rowData.gender) 
        console.log(this.rowData.operator,)
    },
    save() {//保存判断
      this.$refs["staffform"].validate(valid => {
        let excuteStatus = true;
        if (valid) {
          this.type==='1'?this.add():this.edit()
        } else {         
          console.log("error submit!!");
          excuteStatus = false;          
        }
        return excuteStatus;
      });
    },    
    add() {//添加
      this.loading = true;
      let params = this.form;  
      fetchAddEmployee(params)
        .then(res => {
            if (res.code === 0) {
              this.$message.success("新增成功");
              this.loading = false;
              this.refreshFun();//执行刷新表格
              this.$refs["staffform"].resetFields();//清除表格内容
            }else{              
              this.$message({
                type: "error",
                message: res.msg.result
              })
            }
        })
        .catch(err => {
           console.log(res)  
            this.$message({
              type: "error",
              message: err.msg
            });
            this.loading = false;
        });
    },  
    edit(){//编辑更新
      this.$set(this.form,'employeeId',this.rowData.employeeId)
      let params = this.form; 
      console.log(params)
      fetchUpdateEmployee(params)
        .then(res => {
            if (res.code === 0) {
              this.$message.success("修改成功");
              this.loading = false;
              this.refreshFun();//执行刷新表格
              this.$refs["staffform"].resetFields();//清除表格内容
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
    getPostList(){//获取部门列表
      fetchStructureList().then(res => {     
            if (res.code === 0) {
              this.postList = res.data.list.list              
              for (var i = 0; i < this.postList.length; i++) {
                  this.postList[i].value =this.postList[i].name              
              }
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
        });
    },
    getStoreList(){//获取仓库列表
      fetchStoreList()
        .then(res => {                      
            if (res.code === 0) {              
              this.storeList = res.data.storeInfoList
              for (var i = 0; i < this.storeList.length; i++) {
                  this.storeList[i].value =this.storeList[i].storeName           
              }
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
        });
    },
    getUserList(){ //获取操作员列表   
      fetchGetUserList()
        .then(res => {                      
            if (res.code === 0) {              
              this.operatorList = res.data.list
              console.log(res)
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
        });
    },
    operatorChange(value){//操作员下拉
      console.log(value)
    },
     querySearchs (queryString, cb) {//检索字段
      var restaurants
      switch (this.which) {
        case 1:
          restaurants = this.postList
          break 
        case 2:          
          restaurants = this.storeList
          break       
        default:
          break
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    createFilter (queryString) {//过滤字段
      return (restaurant) => {
        switch (this.which) {
          case 1:
            return (restaurant.name.indexOf(queryString) > -1)
            break 
          case 2:
            return (restaurant.storeName.indexOf(queryString) > -1)
            break 
          default:
            break
        }
      }
    },
    handleSelect (item) {//下拉选择
      switch (this.which) {
        case 1:        
          this.form.structureId = item.structureId
          this.form.structure = item.value
          break 
        case 2:        
          this.form.storeId = item.storeId
          this.form.store = item.value
          break   
        default:
          break
      }
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
.staff-edit-dialog .el-autocomplete{
    width: 100%
  }
</style>
