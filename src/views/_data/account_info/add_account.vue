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
      title="新增账户资料"
      :before-close="close"
      :visible="true"
      width="600px">
    <el-form :model="form" :rules="rules" ref="form" :label-position="labelPosition" label-width="80px">
      <el-row :gutter="10">
        <el-col :span="12">
            <el-form-item label="银行全称" prop="bankName" required>
              <el-input size="small" v-model="form.bankName"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  label="助记码" prop="myCode">
              <el-input size="small" v-model="form.myCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
            <el-form-item label="开户名" prop="bankAccountName">
              <el-input size="small" v-model="form.bankAccountName"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="开户行" prop="bankSubName">
                <el-input size="small" v-model="form.bankSubName"></el-input>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="银行账号" prop="bankAccount">
                <el-input size="small" v-model="form.bankAccount"></el-input>
            </el-form-item>
        </el-col>
      </el-row>
      <el-form-item size="medium" class="accountBtn">
        <el-button size="small" @click="close">取消</el-button>
        <el-button size="small" type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { materialValueOptions } from "@/utils/constants";
import { fetchAddSettlementAccount } from "@/api/data";
export default {
  props: {
    fixedOption: {
      Object
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
        bankAccountId: "",
        bankName: "",
        myCode: "",
        bankAccountName: "",
        bankSubName: "",
        bankAccount: ""
      },
      accountShow: false,
      materialValueOptions,
      labelPosition: "center",
      rules: {
        bankName: [
          { required: true, message: "请输入银行全称", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    formEmty() {
      this.form.bankAccount = "";
      this.form.bankAccountName = "";
      this.form.bankName = "";
      this.form.bankSubName = "";
      this.form.bankAccountType = "";
    },
    //保存
    save() {
      this.$refs["form"].validate(valid => {
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
    //添加
    add() {
      this.loading = true;
      let params = this.form;
      return new Promise((resolve, reject) => {
        fetchAddSettlementAccount(params)
          .then(res => {
            if (res.data.code === 0) {
              console.log(123);
              this.$message.success("新增成功");
              this.loading = false;
              this.refreshFun();
              this.formEmty();
              resolve(true);
            }else {
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
  watch: {
    accountShow() {
      //监听状态的变化
      if (this.accountShow) {
        console.log("123");
      }
    }
  }
};
</script>

