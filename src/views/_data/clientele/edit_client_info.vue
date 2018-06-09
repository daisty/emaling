<style scoped lang="scss">
.accountBtn {
  display: flex;
  padding-top: 20px;
  box-sizing: border-box;
  justify-content: flex-end;
}
</style>

<template>
  <el-dialog
    title="编辑客户信息"
    :before-close="close"
    :visible="true"
    width="600px">
    <el-form :model="form" :rules="rules" ref="form" :label-position="labelPosition" label-width="80px">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="客户名称" prop="customerName" required>
            <el-input size="small" v-model="form.customerName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户编号" prop="myCode" required>
            <el-input size="small" v-model="form.myCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="联系电话" prop="customerTell" required>
            <el-input size="small" v-model="form.customerTell"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司名称" prop="firmName">
            <el-input size="small" v-model="form.firmName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="公司电话" prop="firmTell">
            <el-input size="small" v-model="form.firmTell"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司地址" prop="address">
            <el-input size="small" v-model="form.address"></el-input>
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
import { fetchEditClientInfo } from "@/api/data";
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
        customerName: "",
        myCode: "",
        customerTell: "",
        firmName: "",
        firmTell: "",
        address: "",
        customerId: ""
      },
      labelPosition: "center",
      rules: {
        customerName: [
          { required: true, message: "请输入客户名称", trigger: "blur" }
        ],
        myCode: [
          { required: true, message: "请输入客户编号", trigger: "blur" }
        ],
        customerTell: [
          { required: true, message: "请输入联系电话", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    //保存
    save() {
      this.$refs["form"].validate(valid => {
        let excuteStatus = true;
        if (valid) {
          this.edit();
        } else {
          console.log("error submit!!");
          excuteStatus = false;
        }
        return excuteStatus;
      });
    },
    //编辑
    edit() {
      this.loading = true;
      let params = this.form;
      return new Promise((resolve, reject) => {
        fetchEditClientInfo(params)
          .then(res => {
            if (res.data.code === 0) {
              this.$message.success("编辑成功");
              this.loading = false;
              this.refreshFun();
              resolve(true);
            }else{
              this.$message({
                type: "error",
                message: res.data.msg
              })
            }
          })
          .catch(err => {
            console.log(err);
            this.$message({
              type: "error",
              message: err.msg
            });
            this.loading = false;
            reject(false);
          });
      });
    }
  },
  mounted() {
    const cl = this.$route.query;

    //编辑
    this.form = cl.row;  //list传过来的row
    this.form.customerName = cl.row.customerName;
    this.form.myCode = cl.row.myCode;
    this.form.customerTell = cl.row.customerTell;
    this.form.firmName = cl.row.firmName;
    this.form.firmTell = cl.row.firmTell;
    this.form.address = cl.row.address;
    this.form.customerId = cl.row.customerId;
  },
  watch: {}
};
</script>

