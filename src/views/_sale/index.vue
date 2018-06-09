<template>
  <div class="app-container">
    <h1>{{pageName}}</h1>
    <div class="page-title">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-row type="flex" justify="end">
            <el-button @click="saleBill()">销售开单</el-button>
            <el-button @click="historyRender()">历史</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    name: "sale",
    data() {
      return {
        pageName: "销售首页"
      };
    },
    methods: {
      saleBill() {
        this.$router.push("sale_bill_add");
      },
      historyRender() {
        this.$router.push("sale_bill_history");
      }
    }
  }

</script>