<template>
  <el-dialog title="仓库列表" :visible="dialogVisible" :before-close="close">
   <el-table 
      v-loading="loading"
      :data="tableData" 
      style="width: 100%" 
      stripe border 
      highlight-current-row 
      center
      size="mini" @current-change="handleCurrentChange">
      <el-table-column label="序号" width="100" type="index"></el-table-column>
      <el-table-column label="仓库编号" width="150" prop="storeNo"></el-table-column>
      <el-table-column label="仓库名称" width="150" prop="storeName"></el-table-column>
      <el-table-column label="联系人" width="150" prop="contacts"></el-table-column>
      <el-table-column label="联系电话" width="150" prop="tellphone"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
   </el-table>   
    <div slot="footer" class="dialog-footer">
      <el-button type="info" @click="close" size="small">取消</el-button>
      <el-button type="primary" @click="save" size="small">确定</el-button>
    </div>   
  </el-dialog>  
</template>
<script>
import { fetchDeport } from "@/api/purchase";

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
      storeName: "",
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
        total: 0,
      }
    };
  },
  methods: {
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.storeName = currentRow.storeName;
      this.storeId = currentRow.storeId;
    },
    save() {
      this.$emit('storeName', this.storeName, this.storeId);
    },
    getDeport(params = {}) {
      let that = this;
      return new Promise((resolve, reject) => {
        fetchDeport(params).then(response => {
            that.tableData = response.data.data.storeInfoList.list;
            that.pageData.total = response.data.data.storeInfoList.total;
            that.loading = false;
            console.log(response.data.data.storeInfoList.list);
          }).catch(error => {
            console.log(error);
            reject(false);
          });
      });
    }
  },
  created() {
    this.getDeport(this.requestData);
  }
};
</script>
<style lang="scss" scoped>
</style>
