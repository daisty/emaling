<style scoped lang="scss">
  #dialog-title{
    // background-color: #556a84;
    .el-dialog__header{
      background-color: #556a84 !important;
      z-index: 10;
    }
  }
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
      width="50%" id="dialog-title">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <el-row :gutter="10">
          <el-col :span="12" class="inputLr">
              <el-form-item label="银行账户" prop="bankAccount" required>
                  <el-input v-model="form.bankAccount"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12" class="inputLr">
              <el-form-item  label="开户名称" prop="bankAccountName" required>
                  <el-input v-model="form.bankAccountName"></el-input>
              </el-form-item>
          </el-col>

      </el-row>
      <el-row :gutter="10">
          <el-col :span="12" class="inputLr">
              <el-form-item  label="所属银行" prop="bankName">
                  <el-input v-model="form.bankName"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12" class="inputLr">
              <el-form-item label="开户银行" prop="bankSubName">
                  <el-input v-model="form.bankSubName"></el-input>
              </el-form-item>
          ·</el-col>
      </el-row>
      <el-row :gutter="10">
          <el-col :span="12" class="inputLr">
              <el-form-item label="账户属性" prop="bankAccountType" required>
                  <el-select v-model="form.bankAccountType">
                      <el-option
                          v-for="item in materialValueOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                  </el-select>
              </el-form-item>
          </el-col>
      </el-row>
      <el-form-item size="large" class="accountBtn">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { materialValueOptions } from "@/utils/constants";
import { fetchAddSettlementAccount, fetchSettlementAccount } from "@/api/data";
export default {
  props: {
    fixedOption: {
      Object
    },
    refreshFun: {
      type: Function
    },
    close:{
      type:Function
    },
    title: {
      Object
    },
  },
  data() {
    return {
      form: {
        bankAccount: "",
        bankAccountName: "",
        bankName: "",
        bankSubName: "",
        bankAccountType: ""
      },
      materialValueOptions,
      bankAccountType: "1",
      backgroundColor: {},
      zIndex: {},
      index: "",
      rules: {
        bankAccount: [
          { required: true, message: "请输入银行账户", trigger: "blur" }
        ],
        bankAccountName: [
          { required: true, message: "请输入开户名称", trigger: "blur" }
        ],
        bankAccountType: [
          { required: true, message: "请选择账户属性", trigger: "blur" }
        ]
      }
    };
  },
  //   created() {
  //       this.$watch("accountShow", function(newVal, oldValue) {
  //           console.log(newVal);
  //           if(this.accountShow == false) {
  //               console.log(123);
  //           }
  //       })
  //   },
  methods: {
    formEmty() {
      this.form.bankAccount = "";
      this.form.bankAccountName = "";
      this.form.bankName = "";
      this.form.bankSubName = "";
      this.form.bankAccountType = "";
    },
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
    add() {
      this.loading = true;
      let params = this.form;
      return new Promise((resolve, reject) => {
        fetchAddSettlementAccount(params)
          .then(res => {
            this.$message.success("新增成功");

            this.loading = false;
            this.refreshFun();
            this.formEmty();
            resolve(true);
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
    //   refresh(accountShow){
    //       console.log(accountShow);
    //   }
    accountShow() {
      if (this.accountShow) {
        console.log("123");
      }
    }
  }
};
</script>

<style scoped lang="scss">

.fade-in-enter-active {
  transition: all 0.3s;
}

.fade-in-leave-active {
  transition: all 0.3s;
}

.fade-in-enter {
  transform: translate3d(0, -100px, 0);
  opacity: 0;
}

.fade-in-leave-to {
  transform: translate3d(0, -100px, 0);
  opacity: 0;
}
div.el-dialog__header{
  background: blue;
}
.fix-box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  .content {
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-width: 1px;
    border-style: solid;
    border-color: #868686;
    background-color: #fff;
    .fix-top {
      background-color: #556a84;
      height: 32px;
      color: #fff;
      position: relative;
      span.text {
        line-height: 32px;
        padding-left: 10px;
        font-size: 14px;
      }
      b.close {
        width: 20px;
        height: 19px;
        font-weight: 700;
        background-color: #fff;
        text-align: center;
        line-height: 19px;
        color: #868686;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        &:hover {
          background: #f56c6c;
          color: #fff;
        }
      }
    }
    .fix-content {
      width: 100%;
      height: calc(100% - 32px);
      padding: 15px;
      .inputLr {
        width: 50%;
      }
      // .input {
      //   width: 220px;
      //   display: inline-block;
      // }
      .inputBottom {
        margin-bottom: 15px;
      }

    }
  }
}
</style>
