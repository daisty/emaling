<template>
  <el-dialog title="经手人列表" :visible="dialogVisible" :before-close="close">
   <el-table 
      v-loading="loading"
      :data="tableData" 
      style="width: 100%" 
      stripe border 
      highlight-current-row 
      center
      size="mini" @current-change="handleCurrentChange">
      <el-table-column label="序号" width="100" type="index"></el-table-column>
      <el-table-column label="职员名称" width="150" prop="userName"></el-table-column>
      <el-table-column label="联系电话" prop="mobile"></el-table-column>
   </el-table>   
    <div slot="footer" class="dialog-footer">
      <el-button type="info" @click="close" size="small">取消</el-button>
      <el-button type="primary" @click="save" size="small">确定</el-button>
    </div>   
  </el-dialog>  
</template>
<script>
import { fetchBrokerage } from "@/api/purchase";

export default {
  name: "inventoryDialog",
  props: {
    close: {
      type: Function
    }
  },
  data() {
    return {
      loading: true,
      dialogVisible: true,
      userName: "",
      userId: "",
      tableData: [],
      requestData: {
        storeId: "",
        type: 1,
        storeNo: "",
        storeName: "",
        pageNum: 1, //页码(第几页)
        pageSize: 10 //页码大小
      },
      pageData: {
        total: 0
      }
    };
  },
  methods: {
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.userName = currentRow.userName;
      this.userId = currentRow.userId;
      console.log(currentRow);
    },
    save() {
      //this.$emit('storeName', this.storeName, this.storeId);
    },
    getBrokerage(params = {}) {
      let that = this;
      return new Promise((resolve, reject) => {
        fetchBrokerage(params)
          .then(response => {
            console.log(response);
            that.tableData = response.data.data.list.list;
            that.pageData.total = response.data.data.list.total;
            that.loading = false;
          })
          .catch(error => {
            console.log(error);
            reject(false);
          });
      });
    }
  },
  created() {
    this.getBrokerage(this.requestData);
  }
};
</script>
<style lang="scss" scoped>
</style>
