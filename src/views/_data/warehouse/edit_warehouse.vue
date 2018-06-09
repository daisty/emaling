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
      title="修改仓库信息"
      :before-close="close"
      :visible="true"
      width="600px">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
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
import { fetchEditWarehouseInfo } from "@/api/data";
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
  },
  data() {
    return {
      form: {
        storeNo: "",
        storeName: "",
        contacts: "",
        tellphone: "",
        address: "",
        remark: "",
        storeId: "",
        myCode: ""
      },
      index: "",
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
    // 保存数据按钮
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
    //编辑数据
    edit() {
      this.loading = true;
      let params = this.form;
      return new Promise((resolve, reject) => {
        fetchEditWarehouseInfo(params)
          .then(res => {
            this.$message.success("编辑成功");
            this.loading = false;
            this.refreshFun();
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
  mounted() {
    const op = this.$route.query;
      //编辑
      this.form = op.row; //list传来的row
      this.form.storeId = op.row.storeId;
      this.form.storeNo = op.row.storeNo;
      this.form.storeName = op.row.storeName;
      this.form.contacts = op.row.contacts; 
      this.form.tellphone = op.row.tellphone;
      this.form.address = op.row.address;
      this.form.remark = op.row.remark;
      this.form.myCode = op.row.myCode;
  },
  watch: {
    accountShow() {
      if (this.accountShow) {
        console.log("123");
      }
    }
  }
};
</script>
