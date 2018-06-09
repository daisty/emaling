<template>
  <el-dialog
    title="岗位新增/编辑"
    :before-close="close"
    :visible="true"
    width="600px">
    <el-form :model="form" :rules="rules" ref="postauthorityform"  class="demo-ruleForm" :label-position="labelPosition" label-width="80px" size="mini">     
      <el-row>  
      <el-col :span="11">
        <el-form-item label="岗位名称" prop="postName">
            <el-input v-model="form.postName"></el-input>
        </el-form-item>
      </el-col>      
      <el-col :span="11">
        <el-form-item label="岗位编号">
            <el-input v-model="form.postNo"></el-input>
        </el-form-item>
      </el-col>      
     </el-row>
     <el-row>
      <el-col :span="11">
        <el-form-item label="拼音码">
            <el-input type="password" v-model="form.pingyin"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="岗位详情">
            <el-input v-model="form.postDetail"></el-input>
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
        postName:'',
        postNo:'',
        postDetail:'',
        pingyin:''
      },
      which:1,
      labelPosition: "center",
      staffMemberList:[],//职员列表
      rules: {
        postName: [
          { required: true, message: "请输入岗位名称", trigger: "blur" }
        ]
      }
    };
  },

  methods: {    
    save() {//保存
      this.$refs["postauthorityform"].validate(valid => {
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
      this.$refs["postauthorityform"].resetFields();
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
