<template>
  <div class="app-container">
     <div class="page-title mb-10">
       <el-row :gutter="10">
        <el-col :span="8">
          <div class="bill-code">
            <label class="code-label">NO.</label>
            <span class="code">KCPDD-20180427-0002</span>
          </div>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">{{ pageName }}</span>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="end">
            <el-button type="primary" size="small">打印</el-button>
            <el-button size="small">历史</el-button>
          </el-row>          
        </el-col>           
       </el-row>    
     </div>   
     <div class="line"></div>
     <!--搜索条件-->
     <div class="term-search mt-10 mb-10">
        <el-row :gutter="10">
            <el-col :span="4">
            <el-date-picker 
                class="form-item" 
                size="small"
                type="date" 
                v-model="formData.createdFrom"
                placeholder="单据日期起"></el-date-picker>
            </el-col>               
            <el-col :span="4">
                <el-autocomplete 
                    class="form-item" 
                    size="small" 
                    v-model="formData.storeName" 
                    @focus="which = 1" 
                    :fetch-suggestions="querySearchs" 
                    placeholder="盘点仓库"
                    :trigger-on-focus="true"
                    @select="handleSelect">
                    <el-button size="small" slot="append" icon="el-icon-search" @click="fixedOption.supplierShow = true"></el-button>
                </el-autocomplete>          
            </el-col>               
            <el-col :span="4">
                <el-autocomplete 
                    class="form-item" 
                    size="small" 
                    v-model="formData.handler" 
                    @focus="which = 1" 
                    :fetch-suggestions="querySearchs" 
                    placeholder="经手人"
                    :trigger-on-focus="true"
                    @select="handleSelect">
                    <el-button size="small" slot="append" icon="el-icon-search" @click="fixedOption.supplierShow = true"></el-button>
                </el-autocomplete>          
            </el-col>  
            <el-col :span="4">
                <el-select v-model="formData.countType" placeholder="盘点类型" size="small" class="form-item">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>          
            </el-col>      
            <el-col :span="4">
                <el-button type="primary" size="small">批量选择库存</el-button>
            </el-col>                                         
        </el-row> 
     </div>
    <!--表格-->
    <div class="table-contain">
      <el-table
        :data="tableData"
        style="width: 100%"
        stripe border size="mini">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <i class="el-icon-circle-plus-outline font-20" @click="add"></i>
            <i class="el-icon-remove-outline font-20" @click="reduce(scope.$index)"></i>
          </template>
        </el-table-column>       
        <el-table-column label="编号" prop="goodsNo" width="150"></el-table-column>
        <el-table-column label="品名" prop="goodsName" width="150"></el-table-column>
        <el-table-column label="颜色" prop="goodsColorNo" width="150"></el-table-column>
        <el-table-column label="批号" prop="batchNo" width="150"></el-table-column>
        <el-table-column label="库存条数" prop="beforeItemQuantity" width="150"></el-table-column>  
        <el-table-column label="库存数量" prop="beforeQuantity" width="150"></el-table-column>
        <el-table-column label="单位" prop="beforeGoodsUnit" width="150"></el-table-column>
        <el-table-column label="盘点后条数" prop="afterItemQuantity" width="150"></el-table-column>
        <el-table-column label="盘点后数量" prop="afterQuantity" width="150"></el-table-column> 
        <el-table-column label="盘点状态" prop="afterGoodsUnit" width="150"></el-table-column> 
        <el-table-column label="备注" prop="remark"></el-table-column> 
      </el-table>  
    </div> 
  </div>  
</template>
<script>
export default {
  name: "inventoryAdd",
  data() {
    return {
      pageName: "库存盘点单",
      formData: {
        handler: "", //经手人
        storeName: 0, //仓库
        createdFrom: "", //单据日期(起)
        countType: 0
      },
      tableData: []
    };
  },
  methods: {
    getTableData() {
      for (let i = 0; i < 10; i++) {
        this.tableData.push({
          goodsNo: "",
          goodsName: "",
          goodsColorNo: "",
          batchNo: "",
          beforeItemQuantity: "",
          beforeQuantity: "",
          beforeGoodsUnit: "",
          afterItemQuantity: "",
          afterQuantity: "",
          afterGoodsUnit: "",
          remark: ""
        });
      }
    },
    add() {
      return this.tableData.push(this.tableData.slice(0, 1));
    },
    reduce(index) {
      //保留一个  
      if (this.tableData.length > 1) {
        return this.tableData.splice(index, 1);
      }
    }
  },
  created() {
    this.getTableData();
  }
};
</script>
<style lang="scss" scoped>
.font-20 {
  font-size: 20px;
  cursor: pointer;
}
.table-contain {
  height: calc(100% - 240px);
}
.mt-10 {
  margin-top: 10px;
}
.mb-10 {
  margin-bottom: 10px;
}
.title {
  font-size: 24px;
}
.form-item {
  width: 100%;
}
.line {
  width: 100%;
  height: 0;
  border-bottom: 3px solid #d4d8e1;
}
</style>
