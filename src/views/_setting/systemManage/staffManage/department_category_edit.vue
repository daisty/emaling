<template>
  <el-dialog
    title="分类新增/编辑"
    :before-close="close"
    :visible="true"
    width="600px">
    <el-form :model="form" :rules="rules" ref="categoryform"  class="demo-ruleForm" :label-position="labelPosition" label-width="80px" size="mini">     
     <el-row>
      <el-col :span="22">
        <el-form-item label="分类名称" prop="categoryName">
            <el-input  v-model="form.categoryName"></el-input>
        </el-form-item>
      </el-col>     
    </el-row>   
     <el-row>
      <el-col :span="22">
        <el-form-item label="所属分类">
            <el-input  v-model="form.category"></el-input>
        </el-form-item>
      </el-col>     
    </el-row>   
    <el-row>
      <el-col :span="22">
        <el-form-item label="层级编号" prop="categoryNo">
            <el-input  v-model="form.categoryNo"></el-input>
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
        categoryNo:'',
        categoryName:'',
        category:'',        
      },
      which:1,
      labelPosition: "center",
      staffMemberList:[],//职员列表
      rules: {
        categoryName:[
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ],
        categoryNo:[
          { required: true, message: "请输入层级编号", trigger: "blur" }
        ]
      }
    };
  },

  methods: {    
    save() {//保存
      this.$refs["categoryform"].validate(valid => {
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
      this.$refs["categoryform"].resetFields();
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
