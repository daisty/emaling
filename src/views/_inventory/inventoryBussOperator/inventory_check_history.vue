<style scoped lang="scss">
.page-title {
  line-height: 45px;
  .bill-code {
    vertical-align: middle;
  }
  .title {
    font-size: 24px;
    color: #575757;
  }
  .code-label {
    font-size: 18px;
    padding-right: 3px;
    font-weight: normal;
  }
  .code {
    text-decoration: underline;
    line-height: 20px;
    font-size: 13px;
    color: #666;
  }
  button {
    margin-top: 5px;
  }
  .line {
    width: 100%;
    height: 5px;
    border-bottom: 3px solid #d4d8e1;
  }
}
.term-searcher{
	margin:15px 0;
	.serch-title{
		font-size:12px;
		display: inline-block;
		width: 90px;
		text-align: right;
	}
	.input-item{
		display: inline-block;
   		width: calc(100% - 100px);
	}
}
</style>

<template>
  <div class="app-container" v-loading="loading">
    <!-- <h1>{{pageName}}</h1> -->
        <!-- 标题栏 -->
    <div class="page-title">
      <!--标题栏-->
      <el-row>
        <el-col :span="8">
          <el-button type="danger" size="mini" @click="newBill()">{{option.btnName}}</el-button>
        </el-col>
        <el-col :span="8" >
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">{{option.pageName}}</span>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="end">
            <el-button type="primary" size="mini">{{option.btnName1}}</el-button>
            <el-button size="mini">{{option.btnName2}}</el-button>
          </el-row>
        </el-col>
      </el-row>
      <div class="line"></div>
    </div>
    <!-- 条件搜索 -->
    <!--<search-box :searchOption="searchOption" :comChange="searchOnChange" :query="fetchData"></search-box>-->
    <div class="term-searcher">
    		<el-row>
    			<el-col :span="5">
    				<span class="serch-title">单据日期（起）</span>
    				    <el-date-picker
				      v-model="queryData.createdFrom"
				      type="date"
				      class="input-item"
				      value-format="yyyy-MM-dd"
				      placeholder=" 单据日期(起)">
				    </el-date-picker>
    			</el-col>
    			<el-col :span="5">
    				<span class="serch-title">单据日期（止）</span>
    				    <el-date-picker
				      v-model="queryData.createdTo"
				      type="date"
				      class="input-item"
				      value-format="yyyy-MM-dd"
				      placeholder=" 单据日期(止)">
				    </el-date-picker>
    			</el-col>
    			<el-col :span="4">
    				<span class="serch-title">单据编号</span>
    				<el-input
    					v-model="queryData.stockAllotNo"
    					class="input-item"
    					placeholder="输入单据编号">
    				</el-input>
    			</el-col>
    			<el-col :span="5">
    				<span class="serch-title">调出仓库</span>
    				<el-autocomplete 
		    			v-model="queryData.storeName" 
		    			@focus="which=1" 
		    			class="input-item"
		    			:fetch-suggestions="querySearchs" 
		    			placeholder="选择仓库" 
		    			@select="handleSelect"
		    			clearable>
					<el-button slot="append" icon="el-icon-search" @click="fixedOption.deportShow=true,targetstorefade=false"></el-button>
		    		</el-autocomplete>
    			</el-col>
    			<el-col :span="5">
    				<span class="serch-title">调入仓库</span>
    				<el-autocomplete 
		    			v-model="queryData.targetStoreName" 
		    			@focus="which=2" 
		    			class="input-item"
		    			:fetch-suggestions="querySearchs" 
		    			placeholder="选择仓库" 
		    			@select="handleSelect"
		    			clearable>
					<el-button slot="append" icon="el-icon-search" @click="fixedOption.deportShow=true;targetstorefade=true"></el-button>
		    		</el-autocomplete>
    			</el-col>
    		</el-row>
    		<el-row>
    			<!--<el-col :span="5">
    				<span>单据编号</span>
    				<el-input
    					v-model="queryData.goodsName"
    					class="input-item"
    					placeholder="品名/编号">
    				</el-input>
    			</el-col>-->
    			<el-col :span="5">
    				<span class="serch-title">经手人</span>
    				<el-autocomplete 
		    			v-model="queryData.handler" 
		    			@focus="which=3" 
		    			class="input-item"
		    			:fetch-suggestions="querySearchs" 
		    			placeholder="填写经手人" 
		    			@select="handleSelect"
		    			clearable>
					<el-button slot="append" icon="el-icon-search" @click="fixedOption.brokerageShow=true"></el-button>
		    		</el-autocomplete>
    			</el-col>
    			<el-col :span="5">
    				<span class="serch-title">单据状态</span>
    				<el-select 
    					v-model="queryData.status" 
    					class="input-item"
    					placeholder="请选择"
    					clearable>
    					<el-option 
    						v-for="item in option.options" 
    						:key="item.value" 
    						:label="item.label" 
    						:value="item.value">
    					</el-option>
    				</el-select>
    			</el-col>
    			<el-col :span="6">
    				<span class="serch-title">单据备注</span>
    				<el-input 
    					v-model="queryData.remark" 
    					class="input-item"
    					placeholder="填写备注"
    					clearable>
    				</el-input>
    			</el-col>
    			<el-col :span="4">
    				<el-button
    					style="background:#ee6f43; color:#fff"
    					@click="search()"
    					size="mini">
    					查询
    				</el-button>
    			</el-col>
    		</el-row>
    	</div>
    <!-- <el-checkbox class="form-item" v-model="showCancel">显示作废</el-checkbox> -->
    <!-- 表格 -->
    <div class="table-contain">
      <el-table style="width: 100%;height:100%" height="100%" :data="tableData" border fit highlight-current-row>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <div class="scope-flex">
              <el-button class="flex-btn" type="text" size="mini">详情</el-button>
              <el-button class="flex-btn gay-forbid" type="text" size="mini">删除</el-button>
              <!-- <el-popover class="flex-btn" trigger="hover" placement="bottom">
                <el-button type="text" size="mini" @click="copy(scope.$index)">复制</el-button>
                <el-button type="text" size="mini" @clikc="returnBill(scope.$index)">退货</el-button>
                <el-button type="text" size="mini" slot="reference" >更多</el-button>
              </el-popover> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sheetDate" label="单据日期" width="95">
          <template slot-scope="scope">
            <span v-text="scope.row.sheetDate"></span>
          </template>
        </el-table-column>
        <el-table-column prop="stockCountNo" label="单据编号" width="190">
          <template slot-scope="scope">
            <span class="blue1" @click="goHistory(scope.row)" style="cursor:pointer;" v-text="scope.row.stockCountNo"></span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="单据状态">
          <template slot-scope="scope">
            <span :class="{green:scope.row.status===30,red:scope.row.status===10,gay:scope.row.status===20}" v-text="stockStatusMap.get(scope.row.status)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="storeName" label="盘点仓库"></el-table-column>
        <el-table-column label="盘点条数">
    		  <template slot-scope="scope">
          	<span v-text="scope.row.lossItemQuantity+scope.row.incomeItemQuantity>0?scope.row.lossItemQuantity+scope.row.incomeItemQuantity:'0'">0</span>
          </template>
        </el-table-column>
        <el-table-column prop="lossItemQuantity" label="盘亏数量">
        		<template slot-scope="scope">
       	 		<span v-text="scope.row.lossItemQuantity>0?scope.row.lossItemQuantity:'0'">0</span>
       	 	</template>
        </el-table-column>
        <el-table-column prop="incomeItemQuantity" label="盘盈数量">
        		<template slot-scope="scope">
       	 		<span v-text="scope.row.incomeItemQuantity>0?scope.row.incomeItemQuantity:'0'">0</span>
       	 	</template>
        </el-table-column>
<!--        <el-table-column prop="unit" label="单位"></el-table-column>-->
        <el-table-column prop="lossAmount" label="报损金额">
        		<template slot-scope="scope">
       	 		<span v-text="scope.row.lossAmount>0?scope.row.lossAmount:'0'">0</span>
       	 	</template>
        </el-table-column>
      	<el-table-column prop="incomeAmount" label="报溢金额">
      		<template slot-scope="scope">
       	 		<span v-text="scope.row.incomeAmount>0?scope.row.incomeAmount:'0'">0</span>
       	 	</template>
      	</el-table-column>
        <el-table-column prop="handler" label="经手人"></el-table-column>
      </el-table>
    </div>

    <div style="margin-top: 10px;"></div>
    <!--分页栏-->
    <div class="block" style="text-align:center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryData.pageNum" :page-sizes="[15, 30, 45, 60, 75]" :page-size="queryData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <fixed-page2 @deportInfo="getDeportInfo" :fixedOption="fixedOption"></fixed-page2>
    <fixed-page2 @deportInfo="targetStoreInfo" :fixedOption="fixedOption" v-if="targetstorefade"></fixed-page2>
    <fixed-page3 @handlerInfl="getHandlerInfo" :fixedOption="fixedOption"></fixed-page3>
  </div>
</template>

<script>
import { parseDate } from "@/utils";
import {
  stockStatusOptions,
  accountStatusOptions,
  stockStatusMap,
  accountStatusMap
} from "@/utils/constants";
import fixedPage2 from '@/components/fixed/fixedNormal'
import fixedPage3 from '@/components/fixed/fixedBrokerage'
//import SearchBox from "@C/BDD_SearchBox";
import { stockCountList } from "@/api/inventory";
import { fetchSheetCode, fetchGoodsList, fetchGoodsColor, fetchBrokerage, fetchSupplier, fetchDeport, fetchSaveInstroeInfo, fetchSaveInstroeInfoDraft } from '@/api/purchase'
export default {
  name: "inventoryCheck",
  components: {
//  SearchBox
	fixedPage2,
	fixedPage3
  },
  data() {
    return {
//    stockStatusOptions,
//    accountStatusOptions,
      stockStatusMap,
//    accountStatusMap,
	  targetstorefade:false,
      option: {
        btnName: "新增库存盘点单",
        pageName: "库存盘点单-历史",
        btnName1: "刷新",
        btnName2: "打印",
        //选择器选项
        options:[
        		{
        			value:20,
        			label:'草稿'
        		},
        		{
        			value:30,
        			label:'已完成'
        		}
        ]
      },	
      //返回函数
      queryData: {
//      sheetDate:[],
		createdFrom:'',
		createdTo:'',
        stockAllotNo: '',
        status: '',
        storeName: '',
        storeId:'',
        targetStoreName: '',
        targetStoreId:'',
        totalItem: '',
        totalQuantity: '',
        unit: '',
        handler: '',
        handlerUserId:'',
        remark: '',
        pageSize: 15,
        pageNum: 1
      },
      loading: false,
      tableData: [],
      total: 0,
      fixedOption: {
        deportShow: false,
        brokerageShow: false
      },
//    searchOption: [
//      {
//        type: "date",
//        title: "单据日期",
//        key: "createdFrom:createdTo"
//      },
//      {
//        type: "input",
//        title: "单据编号",
//        key: "stockAllotNo"
//      },
//      {
//        type: "storeName", //调出仓库
//        onChange: (key, data) => {
//          this.queryData = {
//            ...this.queryData,
//            supplierName: data.split(":")[0],
//            supplierId: data.split(":")[1]
//          };
//        }
//      },
//      {
//        type: "targetStoreName", //调入仓库
//        onChange: (key, data) => {
//          this.queryData = {
//            ...this.queryData,
//            storeName: data.split(":")[0],
//            storeId: data.split(":")[1]
//          };
//        }
//      },
//      {
//        type: "handler", //经手人
//        onChange: (key, data) => {
//          this.queryData = {
//            ...this.queryData,
//            handler: data.split(":")[0],
//            handlerUserId: data.split(":")[1]
//          };
//        }
//      },
//      {
//        type: "select",
//        title: "单据状态",
//        key: "orderStatus",
//        defaultValue: "",
//        options: stockStatusOptions
//      },
//      {
//        type: "input",
//        defaultValue: "",
//        title: "单据备注",
//        key: "remark"
//      }
//    ]
    };
  },
  created() {
    this.fetchData();
    this.getDeport();
    this.getBrokerage()
  },
  methods: {
  	newBill(){
    		this.$router.push('inventory_check')
    },
    handleSizeChange(val) {
      this.queryData.pageSize = val;
      this.fetchData(this.queryData);
    },
    handleCurrentChange(val) {
      this.queryData.pageNum = val;
      this.fetchData(this.queryData);
    },
    searchOnChange(key, data) {
      this.queryData[key] = data;
    },
    goHistory({ status, stockCountId }) {
    	  console.log(status,stockCountId)
      let obj = {
        "10": "inventory_checkDraft", //待审核
        "30": "inventory_checkAlready" //已完成
      };
      this.$router.push({
        name: obj[status],
        query: { stockCountId }
      });
    },
    fetchData(params = {}) {
      const _self = this;
      return new Promise((resolve, reject) => {
        stockCountList(params)
          .then(response => {
            if (response.code === 0) {
            	 console.log(response);
              _self.tableData = response.data.list.list;
              _self.loading = false;
              _self.total = response.data.list.total;
              _self.queryData.pageNum = response.data.list.pageNum;
              _self.queryData.pageSize = response.data.list.pageSize;
              resolve(true);
            } else {
              this.$message({
                type: "error",
                message: response.msg
              });
            }
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
	createFilter(queryString) {
      return restaurant => {
        switch (this.which) {
          case 1:
            return restaurant.storeName.indexOf(queryString) > -1;
            break;
          case 2:
            return restaurant.storeName.indexOf(queryString) > -1;
            break;
          case 3:
            return restaurant.userName.indexOf(queryString) > -1;
            break;
            break;
          default:
            break;
        }
      };
    },
    querySearchs(queryString, cb) {
      var restaurants;
      switch (this.which) {
        case 1:
          restaurants = this.storeName;
          break;
        case 2:
          restaurants = this.storeName;
          break;
        case 3:
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
      let searchInfos;
      switch (this.which) {
        case 1:
          this.queryData.storeId = item.storeId;
          this.queryData.storeName = item.value;
          break;
        case 2:
          this.queryData.targetStoreId = item.storeId;
          this.queryData.targetstoreName = item.value;
          break;
        case 3:
          this.queryData.handlerUserId = item.userId;
          this.queryData.handler = item.value;
          break;
        default:
          break;
      }
    },
    getDeport(){
      	const _self = this
      	return new Promise((resolve, reject) => {
        fetchDeport().then(response => {
          this.storeName = response.data.data.storeInfoList.list
          for (var i = 0; i < this.storeName.length; i++) {
            this.storeName[i].value = this.storeName[i].storeName
          }
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    getBrokerage(){
      	const _self = this
      	return new Promise((resolve, reject) => {
        fetchBrokerage().then(response => {
          this.brokerage = response.data.data.list.list;
          for (var i = 0; i < this.brokerage.length; i++) {
            this.brokerage[i].value = this.brokerage[i].userName;
          }
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
//  getSupplierInfo(data) {storeName
//    this.queryData.supplierName = data.name;
//  },
//  getDeportInfo(data) {
//    this.queryData.storeName = data.name;
//  },
//  getHandlerInfo(data) {
//    this.queryData.handler = data.name;
//  }
	targetStoreInfo (data) {
      this.queryData.targetStoreName = data.name
      this.queryData.targetStoreId = data.id
      console.log('go');
    },
     getDeportInfo (data) {
      this.queryData.storeName = data.name
      this.queryData.storeId = data.id
    },
    getHandlerInfo (data) {
      this.queryData.handler = data.name;
      this.queryData.handlerUserId = data.id;
    },
    search(){
    		if(this.queryData.handler==''){
    			this.queryData.handlerUserId ='';
    		}
    		if(this.queryData.storeName==''){
    			this.queryData.storeId ='';
    		}
    		if(this.queryData.targetStoreName==''){
    			this.queryData.targetStoreId ='';
		}
		this.fetchData(this.queryData);
//  		this.fetchData({
//  			createdFrom:fromdate,
//  			createdTo:todate,
//  			pageNum:_self.queryData.pageNum,
//  			pageSize:_self.queryData.pageSize
//  		});
    },
//  getTableData(params = {}){
//		let _that = this;
//	    stockAllotList(params)
//	    .then(response => {
//	      _that.tableData = response.data.list.list;
////		      _that.pageData.total = response.data.list.total;
//	      _that.queryData.pageSize = response.data.list.pageSize;
//	      _that.queryData.pageNum = response.data.list.pageNum;
////		      _that.treedata[0].children = response.data.list;
////		      console.log('777',_that.treedata[0]);
//	      _that.loading = false;
//	    })
//	    .catch(err => {
//	      console.log(err);
//	    });
//	},
  }
};
</script>
<style>
.search-box {
  min-width: 1000px;
}
.table-contain {
  height: calc(100% - 330px);
  min-height: 300px;
}
.table-contain .scope-flex {
  display: flex;
}
.table-contain .scope-flex .flex-btn {
  flex: 1;
}
.table-contain .el-table thead tr {
  color: #909399;
  font-weight: 500;
  background-color: rgb(226, 233, 239);
}

.block {
  position: absolute;
  bottom: 0px;
  right: 16px;
  width: 100%;
  height: 80px;
  line-height: 80px;
  text-align: center;
  z-index: 2;
  overflow: hidden;
  background-color: #fff;
}
.red {
  color: #eb453c;
}
.green {
  color: #029b26;
}
.gay {
  color: #9999;
}
.gay-forbid {
  color: #9999;
  cursor: not-allowed;
  user-select: none;
}
.blue1 {
  color: #2369b5;
  user-select: none;
}
.blue {
  color: #0096ff;
  cursor: pointer;
  user-select: none;
}
.term-searcher .el-input__inner{
	  height: 28px;
	  line-height: 28px;
}
.term-searcher .el-row{
	margin-bottom: 5px;
}
.term-searcher .el-input__icon{
  line-height: 28px;
} 
.term-searcher .el-input.el-input--large{
	font-size:12px;
}
</style>