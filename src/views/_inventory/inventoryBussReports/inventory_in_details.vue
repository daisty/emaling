<template>
  <div class="app-container">
    <div class="page-title mb-10">
      <!--标题栏-->
      <el-row :gutter="10">
        <el-col :span="8" :offset="8">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">{{ pageName }}</span>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="end">
            <el-button type="primary" size="small">刷新</el-button>
            <el-button size="small">打印</el-button>
          </el-row>          
        </el-col>
      </el-row>
    </div>
    <div class="line"></div>
    <!--搜索条件-->
    <div class="term-search">
    		<el-row>
    			<el-col :span="6">
    				<label class="serch-title">单据日期（起）</label>
    				<el-date-picker 
    					v-model="queryData.createdTo" 
    					type="date" 
    					class="input-item" 
    					value-format="yyyy-MM-dd" 
    					placeholder=" 单据日期(止)">
				</el-date-picker>
    			</el-col>
    			<el-col :span="6">
    				<label class="serch-title">单据日期（止）</label>
    				<el-date-picker 
    					v-model="queryData.createdFrom" 
    					type="date" 
    					class="input-item" 
    					value-format="yyyy-MM-dd" 
    					placeholder=" 单据日期(止)">
				</el-date-picker>
    			</el-col>
    			<el-col :span="6">
    				<label class="serch-title">单据编号</label>
    				<el-input
    					v-model="queryData.orderNo"
    					placeholder="请输入编号"
    					class="input-item" 
    					suffix-icon="el-icon-search">
    					
    				</el-input>
    			</el-col>
    			<el-col :span="6">
    				<label class="serch-title">品名/编号</label>
    				<el-input
    					v-model="queryData.goodsName"
    					placeholder="请输入编号"
    					class="input-item" 
    					suffix-icon="el-icon-search">
    					
    				</el-input>
    			</el-col>
    		</el-row>
    		<el-row>
    			<el-col :span="6">
    				<label class="serch-title">仓库</label>
    				<el-autocomplete
    					v-model="queryData.storeName"
    					placeholder="选择仓库"
    					@focus="which=1"
    					class="input-item" 
    					:fetch-suggestions="querySearchs"
    					@select="handleSelect">
    					<el-button slot="append" icon="el-icon-search" @click="fixedOption.deportShow=true"></el-button>
    				</el-autocomplete>
    			</el-col>
    			<el-col :span="6">
    				<label class="serch-title">经手人</label>
    				<el-autocomplete
    					v-model="queryData.handler"
    					placeholder="选择经手人"
    					@focus="which=2"
    					class="input-item" 
    					:fetch-suggestions="querySearchs"
    					@select="handleSelect">
    					<el-button slot="append" icon="el-icon-search" @click="fixedOption.brokerageShow=true"></el-button>
    				</el-autocomplete>
    			</el-col>
    			<el-col :span="6">
    				<label class="serch-title">单据备注</label>
    				<el-input
    					v-model="queryData.remark"
    					placeholder="请输入备注"
    					class="input-item" 
    					suffix-icon="el-icon-search">
    				</el-input>
    			</el-col>
    			<el-col :span="6">
    				<el-button
    					style="background: #ee6f43; color: #fff;"
    					size="mini"
    					@click="Search()">
    					查询
    				</el-button>
    				<el-checkbox v-model="checked">显示作废</el-checkbox>
    			</el-col>
    		</el-row>
    </div>
    <!--表格-->
    <div class="table-contain">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        height="370"
        stripe border size="mini">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <span style="color:#F56C6C" class="cursor">删除</span>
            <span style="color:#E6A23C" class="cursor">详情</span>
          </template>
        </el-table-column>
        <el-table-column label="单据日期" prop="sheetDate" width="150"></el-table-column>
        <el-table-column label="单据编号" prop="stockCountNo" width="180"></el-table-column>
        <el-table-column label="单据状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status === -10" style="color:#F56C6C">取消</span>
            <span v-else-if="scope.row.status === 10" style="color:#909399">新建</span>
            <span v-else-if="scope.row.status === 20" style="color:#409EFF">正常</span>
            <span v-else-if="scope.row.status === 30" style="color:#67C23A">已完成</span>
          </template>
        </el-table-column>
        <el-table-column label="盘点仓库" prop="storeNo" width="100"></el-table-column>
        <el-table-column label="盘点条数" prop="branches" width="100"></el-table-column>
        <el-table-column label="盘亏数量" prop="lossItemQuantity" width="100"></el-table-column>
        <el-table-column label="盘盈数量" prop="incomeItemQuantity" width="100"></el-table-column>
        <el-table-column label="单位" prop="unit" width="100"></el-table-column>
        <el-table-column label="报损金额" prop="lossAmount" width="150"></el-table-column>
        <el-table-column label="报溢金额" prop="incomeAmount" width="150"></el-table-column>
        <el-table-column label="经手人" prop="handler" width="100"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <!--<div class="page-nav">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="requestData.pageNum"
        :page-sizes="pageData.pagesSize"
        :page-size="requestData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.total">
      </el-pagination>      
    </div>-->

    <!-- Dialog1 -->
    <fixed-page1 @deportInfo="getDeportInfo" :fixedOption="fixedOption"></fixed-page1>
	<fixed-page2 @handlerInfl="getHandlerInfo" :fixedOption="fixedOption"></fixed-page2>
    <!-- Dialog2 -->
    <inventoryDialogTwo :close="dialogCloseTwo" v-if="dialog_two"></inventoryDialogTwo>

  </div>
</template>
<script>
import { stockOptSheet } from "@/api/inventory";
import fixedPage1 from '@/components/fixed/fixedNormal'
import fixedPage2 from '@/components/fixed/fixedBrokerage'
import {fetchBrokerage,fetchDeport} from '@/api/purchase'
export default {
  name: "inventoryInDetails",
  components: {
    fixedPage1,
    fixedPage2
  },
  data() {
    return {
      loading: false,
      checked: false,
      fixedOption: {
        supplierShow: false,
        deportShow: false,
        brokerageShow: false
      },
      options: [
        {
          value: -10,
          label: "取消"
        },
        {
          value: 10,
          label: "草稿"
        },
        {
          value: 30,
          label: "已盘点"
        }
      ],
      //请求数据
      queryData: {
      	createdFrom:'',//	单据日期(起)
      	createdTo:'',//	单据日期(止)
      	handler:'',//经手人名字
        handlerUserId:'',//经手人ID
        storeId: "", //仓库ID
        storeName:'',//仓库名字
        storeNo:'',//仓库编号
        orderNo: "", //订单编号
        goodsName:'',//品名id
        optType: "", //操作单类型
        remark: "", //备注
        createdFrom: "", //单据日期(起)
        createdTo: "", //单据日期(止)
        optType:100,//操作单类型
        pageNum: 1, //页码(第几页)
        pageSize: 10 //页码大小
      },
      //表单绑定数据
      formData: {
        handler: "", //经手人
        storeName: "" //仓库
      },
      //分页
      pageData: {
        total: 0,
        pagesSize: [10, 20, 30, 40, 50]
      },
      pageName: "出库明细",
      which: 1,
      tableData: [],
      brokerage: [],
      deport: []
    };
  },
  methods: {
	
    getStoreName(storeName, storeId) {
      console.log(storeName);
      console.log(storeId);
      //this.formData.storeName = val;
      this.dialogClose();
    },
    createFilter(queryString) {
      return restaurant => {
        switch (this.which) {
          case 1:
            return restaurant.customerName.indexOf(queryString) > -1;
            break;
          case 2:
            return restaurant.storeName.indexOf(queryString) > -1;
            break;
          case 3:
            return restaurant.userName.indexOf(queryString) > -1;
            break;
          default:
            break;
        }
      };
    },
    //搜索查询
    querySearchs(queryString, cb) {
      let restaurants;
      switch (this.which) {
        case 1:
          restaurants = this.deport;
          break;
        case 2:
          restaurants = this.brokerage;
          break;
        default:
          break;
      }
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    handleSelect(item) {
      console.log(item);
      switch (this.which) {
        case 1:
          this.queryData.storeId = item.storeId;
          this.queryData.storeNo = item.storeNo;
          this.queryData.storeName = item.value;
          break;
        case 2:
          this.queryData.handlerUserId = item.userId;
          this.queryData.handler = item.value;
          break;
        default:
          break;
      }
    },
    //获取经手人数据
    getBrokerage() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchBrokerage()
          .then(response => {
            this.brokerage = response.data.data.list.list;
            for (var i = 0; i < this.brokerage.length; i++) {
              this.brokerage[i].value = this.brokerage[i].userName;
            }
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    getDeport() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchDeport()
          .then(response => {
            this.deport = response.data.data.storeInfoList.list;
            for (var i = 0; i < this.deport.length; i++) {
              this.deport[i].value = this.deport[i].storeName;
            }
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    //新增库存盘点单
    addInventory($event) {
      return this.$router.push("inventory_add");
    },
    //数据查询
//  search() {
//    this.getTableData(this.requestData);
//  },
    //获取表格数据
    getTableData(params = {}) {
      let _that = this;
      stockOptSheet(params)
        .then(response => {
          _that.tableData = response.data.data.list.list;
          _that.pageName = response.data.oper;
          _that.loading = false;
          _that.pageData.total = response.data.data.list.total;
          _that.requestData.pageSize = response.data.data.list.pageSize;
          _that.requestData.pageNum = response.data.data.list.pageNum;
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSizeChange(size) {
      this.requestData.pageSize = size;
      this.getTableData(this.requestData);
    },
    handleCurrentChange(current) {
      this.requestData.pageNum = current;
      this.getTableData(this.requestData);
    },
//  仓库弹层以及经手人弹层取回数据
 	getHandlerInfo (data) {
      this.queryData.handler = data.name;
      this.queryData.handlerUserId = data.id;
    },
	getDeportInfo (data) {
	  this.queryData.storeName = data.name
	  this.queryData.storeId = data.id
	  this.queryData.storeNo = data.storeNo
	},
	//查询加载表格
	Search(){
		
	}
  },
  created() {
    this.getBrokerage();
    this.getDeport();
    this.getTableData(this.requestData);
  },
  mounted() {},
  computed: {}
};
</script>
<style lang="scss" scoped>
  .app-container {
    border-radius: 8px !important;
  }
  .table-contain {
    height: calc(100% - 240px);
  }
  .cursor {
    cursor: pointer;
  }
  .mt-10 {
    margin-top: 10px;
  }
  .mb-10 {
    margin-bottom: 10px;
  }
  .line {
    width: 100%;
    height: 0;
    border-bottom: 3px solid #d4d8e1;
  }
  .term-search{
	margin:15px 0;
	.serch-title{
		font-size:12px;
		display: inline-block;
		width: 90px;
		text-align: right;
		font-weight: normal;
	}
	.input-item{
		display: inline-block;
		width: calc(100% - 100px);
	}
  }
  .form-item {
    width: 100%;
  }
  .title {
    font-size: 24px;
  }
  .page-nav {
    text-align: center;
  }
</style>

<style>
.term-search .el-input__inner{
	  height: 28px;
	  line-height: 28px;
}
.term-search .el-row{
	margin-bottom: 5px;
}
.term-search .el-input__icon{
  line-height: 28px;
} 
.term-search .el-input.el-input--large{
	font-size:12px;
}
</style>