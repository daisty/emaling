<style scoped lang="scss">
.accountBtn {
  display: flex;
  padding-top: 20px;
  box-sizing: border-box;
  justify-content: flex-end;
}
.form-text {
  font-size: 16px;
  margin: 0;
}
</style>

<template>
  <div>
    <el-dialog
        title="客户信息详情"
        :before-close="close"
        :visible="true"
        width="600px">
      <el-form :model="form" ref="form" :label-position="labelPosition" label-width="80px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="客户名称:" prop="customerName">
              <!-- <el-input v-model="form.customerName"></el-input> -->
              <p class="form-text">{{form.customerName}}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="客户编号:" prop="myCode">
              <!-- <el-input v-model="form.myCode"></el-input> -->
              <p class="form-text">{{form.myCode}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item  label="联系电话:" prop="customerTell">
              <!-- <el-input v-model="form.customerTell"></el-input> -->
              <p class="form-text">{{form.customerTell}}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司名称:" prop="firmName">
              <!-- <el-input v-model="form.firmName"></el-input> -->
              <p class="form-text">{{form.firmName}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item  label="公司电话:" prop="firmTell">
              <!-- <el-input v-model="form.firmTell"></el-input> -->
              <p class="form-text">{{form.firmTell}}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司地址:" prop="address">
              <!-- <el-input v-model="form.address"></el-input> -->
              <p class="form-text">{{form.address}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item size="small" class="accountBtn">
            <el-button size="small" @click="close">返回</el-button>
            <el-button size="small" type="primary" @click="changeClientDetail">编辑</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <edit-client v-if="editInfo" :refreshFun="initFetchData2" :close="changeClientDetail"></edit-client>
  </div>
</template>

<script>
import { fetchClientInfoDetail } from "@/api/data";
import editClient from "./edit_client_info";
export default {
  props: {
    refreshFun: {
      type: Function
    },
    close: {
      type: Function
    }
  },
  components: {
    editClient
  },
  data() {
    return {
      editInfo: false,
      form: {
        customerName: "",
        myCode: "",
        customerTell: "",
        firmName: "",
        firmTell: "",
        address: "",
        customerId: ""
      },
      labelPosition: "center"
      // rules: {
      //   customerName: [
      //     { required: true, message: "请输入客户名称", trigger: "blur" }
      //   ],
      //   myCode: [
      //     { required: true, message: "请输入客户编号", trigger: "blur" }
      //   ],
      //   customerTell: [
      //     { required: true, message: "请输入联系电话", trigger: "blur" }
      //   ],
      //   firmName: [
      //     { required: true, message: "请输入公司名称", trigger: "blur" }
      //   ],
      //   firmTell: [
      //     { required: true, message: "请输入公司电话", trigger: "blur" }
      //   ]
      // }
    };
  },

  methods: {
    changeClientDetail() {
      this.editInfo = !this.editInfo;
    },
    initFetchData2() {
      this.changeClientDetail();
      // this.detail();
    },
    //保存
    // save() {
    //   this.$refs["form"].validate(valid => {
    //     let excuteStatus = true;
    //     if (valid) {
    //       this.edit();
    //     } else {
    //       console.log("error submit!!");
    //       excuteStatus = false;
    //     }
    //     return excuteStatus;
    //   });
    // },
    //详情
    detail() {
      let customerId = this.form.customerId;
      this.loading = true;
      return new Promise((resolve, reject) => {
        fetchClientInfoDetail(customerId)
          .then(res => {
            if (res.data.code === 0) {
              this.editInfo = true;
              this.loading = false;
              resolve(true);
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
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
    this.form = cl.row; //list传过来的row
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

