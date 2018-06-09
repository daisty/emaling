<template>
  <div class="app-container">
    <h1>{{pageName}}</h1>
    <div class="page-title">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-row type="flex">
            <el-button @click="meterialAccount()">结算账户</el-button>
            <el-button @click="meterialWarehouse()">仓库信息</el-button>
            <el-button @click="meterialAddCommodity()">新增商品</el-button>
            <el-button @click="meterialClient()">客户</el-button>
            <el-button @click="meterialSupplier()">供应商</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "meterial",
  data() {
    return {
      pageName: "资料功能列表"
    };
  },
  methods: {
    //结算账户
    meterialAccount() {
      this.$router.push("settlement_account");
    },
    // 仓库信息
    meterialWarehouse() {
      this.$router.push("warehouse_info");
    },
    // 新增商品
    meterialAddCommodity() {
      this.$router.push("commodity");
    },
    // 客户
    meterialClient() {
      this.$router.push("client_info");
    },
    // 供应商
    meterialSupplier() {
      this.$router.push("supplier");
    }
  }
};
</script>
