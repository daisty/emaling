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
      title="供应商信息详情"
      :before-close="close"
      :visible="true"
      width="600px">
      <el-form :model="form" ref="form" :label-position="labelPosition" label-width="100px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="供应商名称:" prop="customerName">
              <p class="form-text">{{form.customerName}}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="供应商编号:" prop="myCode">
              <p class="form-text">{{form.myCode}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item  label="联系人:" prop="contacts">
              <p class="form-text">{{form.contacts}}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话:" prop="tellphone">
              <p class="form-text">{{form.tellphone}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item  label="传真:" prop="fax">
              <p class="form-text">{{form.fax}}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系地址:" prop="address">
              <p class="form-text">{{form.address}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item size="medium" class="accountBtn">
          <el-button @click="close">返回</el-button>
          <el-button type="primary" @click="changeSupplierDetail">编辑</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <edit-supplier v-if="editInfo" :refreshFun="initFetchData2" :close="changeSupplierDetail"></edit-supplier>
  </div>
</template>

<script>
import { fetchSupplierDetail } from "@/api/data";
import editSupplier from "./edit_supplier";
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
    editSupplier
  },
  data() {
    return {
      editInfo: false,
      form: {
        customerName: "",
        myCode: "",
        contacts: "",
        tellphone: "",
        fax: "",
        address: "",
        customerId: ""
      },
      labelPosition: "center"
    };
  },

  methods: {
    changeSupplierDetail() {
      this.editInfo = !this.editInfo;
    },
    initFetchData2() {
      this.changeSupplierDetail();
    },

    //详情
    detail() {
      let customerId = this.form.customerId;
      this.loading = true;
      return new Promise((resolve, reject) => {
        fetchSupplierDetail(customerId)
          .then(res => {
            if (res.data.code === 0) {
              this.editInfo = true;
              this.loading = false;
              resolve(true);
              this.refreshFun();
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
    this.form.contacts = cl.row.contacts;
    this.form.fax = cl.row.fax;
    this.form.tellphone = cl.row.tellphone;
    this.form.address = cl.row.address;
    this.form.customerId = cl.row.customerId;
  },
  watch: {}
};
</script>

