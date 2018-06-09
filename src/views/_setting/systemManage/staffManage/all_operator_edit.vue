<template>
  <el-dialog
    title="操作员新增/编辑"
    :before-close="close"
    :visible="true"
    width="600px">
    <el-form :model="form" :rules="rules" ref="operatorform"  class="demo-ruleForm" :label-position="labelPosition" label-width="80px" size="mini">
     <el-row>
       <el-col :span="24">
          <legend>职员信息</legend>
      </el-col> 
      <el-col :span="11">
        <el-form-item label="职员" prop="staffMember">
            <el-autocomplete class="form-item" size="small" v-model="form.staffMember" @focus="which===1"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                       @select="handleSelect">            
              <el-button  slot="append" icon="el-icon-search"></el-button>
            </el-autocomplete>
        </el-form-item> 
      </el-col>
      <el-col :span="11">
        <el-form-item label="部门">
            <el-input v-model="form.department"></el-input>
        </el-form-item> 
      </el-col>
     </el-row>
      <el-row>
      <el-col :span="24">
          <legend>操作员信息</legend>
      </el-col>      
      <el-col :span="11">
        <el-form-item label="用户名" prop="userName">
            <el-input v-model="form.userName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="所属仓库">
            <el-autocomplete class="form-item" size="small" v-model="form.warehouse" @focus="which===2"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                       @select="handleSelect">            
              <el-button  slot="append" icon="el-icon-search"></el-button>
            </el-autocomplete>
        </el-form-item>
      </el-col>
     </el-row>
      <el-row>
      <el-col :span="11">
        <el-form-item label="登录密码">
            <el-input type="password" v-model="form.Password"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="确认密码">
            <el-input type="password" v-model="form.confirmPassword"></el-input>
        </el-form-item>
      </el-col>
     </el-row>
      <el-row>
      <el-col :span="11">
        <el-form-item label="岗位" prop="post">
            <el-autocomplete class="form-item" size="small" v-model="form.post" @focus="which===3"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                       @select="handleSelect">            
              <el-button  slot="append" icon="el-icon-search"></el-button>
            </el-autocomplete>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="岗位详情">
            <el-input v-model="form.postDetail"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
     <el-row>
      <el-col :span="22">
        <el-form-item label="备注">
            <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
      </el-col>
     </el-row>
      <el-form-item size="small" class="accountBtn">
        <el-button size="small" @click="close">取消</el-button>
        <el-button size="small" type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { fetchAddClientInfo } from "@/api/data";
export default {
  props: {
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
        staffMember:'',
        staffMemberId:'',
        department:'',
        userName:'',
        warehouse:'',
        Password:'',
        confirmPassword:'',
        post:'',
        postDetail:'',
        remark:''
      },
      which:1,
      labelPosition: "center",
      staffMemberList:[],//职员列表
      rules: {
        staffMember: [
          { required: true, message: "请选择职员", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        post: [
          { required: true, message: "请选择岗位", trigger: "blur" }
        ]
      }
    };
  },

  methods: {    
    save() {//保存
      this.$refs["operatorform"].validate(valid => {
        let excuteStatus = true;
        if (valid) {
          this.add();
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
      this.$refs["operatorform"].resetFields();
    //   return new Promise((resolve, reject) => {
    //     fetchAddClientInfo(params)
    //       .then(res => {
    //         if (res.data.code === 0) {
    //           this.$message.success("新增成功");
    //           this.loading = false;
    //           this.refreshFun();
    //           resolve(true);
    //         }else{
    //           this.$message({
    //             type: "error",
    //             message: res.data.msg
    //           })
    //         }
    //       })
    //       .catch(err => {
    //         console.log(err);
    //         this.$message({
    //           type: "error",
    //           message: err.msg
    //         });
    //         this.loading = false;
    //         reject(false);
    //       });
    //   });
    },
     querySearchs (queryString, cb) {//检索字段
      var restaurants
      switch (this.which) {
        case 1:
          restaurants = this.staffMemberList
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
            return (restaurant.customerName.indexOf(queryString) > -1)
            break 
          default:
            break
        }
      }
    },
    handleSelect (item) {//下拉选择
      let searchInfos
      switch (this.which) {
        case 1:
          this.requestData.staffMemberId = item.customerId
          this.requestData.staffMember = item.value
          break   
        default:
          break
      }
    },
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
</style>
