<style scoped lang="scss">
#dialog-title {
  // background-color: #556a84;
  .el-dialog__header {
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
      title="新增仓库信息"
      :before-close="close"
      :visible="true"
      width="600px" id="dialog-title">
    <el-form :model="form" :rules="rules" ref="form"  :label-position="labelPosition" label-width="80px">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="仓库名称" prop="storeName" required>
            <el-input size="small" v-model="form.storeName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="仓库编号" prop="storeNo" required>
            <el-input size="small" v-model="form.storeNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="助记码" prop="myCode">
            <el-input size="small" v-model="form.myCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="联系人" prop="contacts">
            <el-input size="small" v-model="form.contacts"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="tellphone">
            <el-input size="small" v-model="form.tellphone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="地址" prop="address">
            <el-input size="small" v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input size="small" v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item size="small" class="accountBtn">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { fetchAddWarehouseInfo } from "@/api/data";
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
        storeId: "",
        storeNo: "",
        storeName: "",
        contacts: "",
        tellphone: "",
        address: "",
        remark: "",
        myCode: ""
      },
      labelPosition: "center",
      rules: {
        storeNo: [
          { required: true, message: "请输入仓库编号", trigger: "blur" }
        ],
        storeName: [
          { required: true, message: "请输入开户名称", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    formEmty() {
      this.form.storeNo = "";
      this.form.storeName = "";
      this.form.contacts = "";
      this.form.tellphone = "";
      this.form.address = "";
      this.form.remark = "";
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
        fetchAddWarehouseInfo(params)
          .then(res => {
            if (res.data.code === 0) {
              this.$message.success("新增成功");
              this.loading = false;
              this.refreshFun();
              this.formEmty();
              resolve(true);
            }else {
              thie.$message({
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

