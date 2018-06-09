<template>
	<div class="app-container" v-loading="loading">
		<div class="page-title">
			<!--标题栏-->
			<el-row>
				<el-col :span="8">
					<span class="code-title">NO.</span>
					<span class="code-no">{{option.stockAllotNo}}</span>
				</el-col>
				<el-col :span="8">
					<el-row type="flex" justify="center" align="middle">
						<span style="padding:0;" class="title">{{option.pageName}}</span>
					</el-row>
				</el-col>
				<el-col :span="8">
					<el-row type="flex" justify="end">
						<el-button type="primary" size="mini">{{option.btnName1}}</el-button>
						<el-button @click="goHistory()" size="mini">{{option.btnName2}}</el-button>
					</el-row>
				</el-col>
			</el-row>
			<div class="line"></div>
		</div>
		<div class="term-search">
			<el-row>
				<el-col :span="5">
					<span class="serch-title">调出仓库</span>
					<el-autocomplete disabled v-model="queryData.storeName" @focus="which=1" class="input-item" :fetch-suggestions="querySearchs" placeholder="选择仓库" @select="handleSelect" clearable>
						<el-button slot="append" icon="el-icon-search" @click="fixedOption.deportShow=true,StoreNameFade=true"></el-button>
					</el-autocomplete>
				</el-col>
				<el-col :span="5">
					<span class="serch-title">调入仓库</span>
					<el-autocomplete disabled v-model="queryData.targetStoreName" @focus="which=2" class="input-item" :fetch-suggestions="querySearchs" placeholder="选择仓库" @select="handleSelect" clearable>
						<el-button slot="append" icon="el-icon-search" @click="fixedOption.deportShow=true,StoreNameFade=false"></el-button>
					</el-autocomplete>
				</el-col>
				<el-col :span="5">
					<span class="serch-title">经手人</span>
					<el-autocomplete disabled v-model="queryData.handler" @focus="which=3" class="input-item" :fetch-suggestions="querySearchs" placeholder="输入经手人" @select="handleSelect" clearable>
						<el-button slot="append" icon="el-icon-search" @click="fixedOption.brokerageShow=true"></el-button>
					</el-autocomplete>
				</el-col>
				<el-col :span="5">
					<span class="serch-title">单据日期</span>
					<el-date-picker disabled v-model="queryData.sheetDate" type="date" class="input-item" value-format="yyyy-MM-dd" placeholder=" 单据日期(止)">
					</el-date-picker>
				</el-col>
				<el-col :span="2">
					<el-button disabled type="primary" size="mini">
						批量选择库存
					</el-button>
				</el-col>
			</el-row>
		</div>
		<div class="table-contain">
			<el-table height="100%" style="width: 100%;" :data="tableData" border fit highlight-current-row :summary-method="getSummaries" show-summary>
				<el-table-column type="index" label="序号" width="50"></el-table-column>
				<el-table-column label="操作" width="150" align="center">
					<template slot-scope="scope">
						<i class="el-icon-circle-plus-outline" @click="add(scope.$index)" style="cursor:pointer" @mouseover="insertAddActive($event)" @mouseout="deletedAddActive($event)"></i>
						<i class="el-icon-remove-outline" @click="remove(scope.$index)" style="cursor:pointer" @mouseover="insertRemoveActive($event)" @mouseout="deletedRemoveActive($event)"></i>
					</template>
				</el-table-column>
				<el-table-column prop="goodsNo" label="编号"></el-table-column>
				<el-table-column prop="goodsName" label="品名"></el-table-column>
				<el-table-column prop="goodsColorNo" label="颜色"></el-table-column>
				<el-table-column prop="batchNo" label="批号"></el-table-column>
				<el-table-column prop="optItemQuantity" label="调出条数"></el-table-column>
				<el-table-column prop="optQuantity" label="调出数量"></el-table-column>
				<el-table-column prop="goodsUnit" label="单位"></el-table-column>
				<!--<el-table-column label="库存条数"></el-table-column>
		        <el-table-column label="库存数量"></el-table-column>-->
				<el-table-column prop="sheetDate" label="调拨单价"></el-table-column>
				<el-table-column prop="sheetDate" label="调拨金额"></el-table-column>
			</el-table>
		</div>
		<div class="remark-contain">
			<el-input disabled clearable v-model="queryData.remark" placeholder="单据备注">
			</el-input>
		</div>
		<!--<div class="btn-contain">
			<el-button type="primary" size="mini">作废</el-button>
		</div>-->
		<fixed-page2 @deportInfo="targetStoreInfo" :fixedOption="fixedOption"></fixed-page2>
		<fixed-page2 @deportInfo="getDeportInfo" :fixedOption="fixedOption" v-if="StoreNameFade"></fixed-page2>
		<fixed-page3 @handlerInfl="getHandlerInfo" :fixedOption="fixedOption"></fixed-page3>
	</div>
</template>

<script>
import { fetchstockAllotContent } from "@/api/inventory";
import { fetchSheetCode, fetchGoodsList, fetchGoodsColor, fetchBrokerage, fetchSupplier, fetchDeport, fetchSaveInstroeInfo, fetchSaveInstroeInfoDraft } from '@/api/purchase'
import fixedPage2 from '@/components/fixed/fixedNormal'
import fixedPage3 from '@/components/fixed/fixedBrokerage'
	export default {
		name: "inventoryAllocationCancel",
		components:{
			fixedPage2,
			fixedPage3
		},
		data(){
			return{
				loading:false,
				name:'already',
				StoreNameFade:false,
				option: {
					stockAllotNo:'123456',
					pageName:'库存调拨单(已作废)',
					btnName1: "打印",
        				btnName2: "历史",
				},
				queryData:{
					storeName:'',//调出仓库
					storeId:'',//调出仓库id
					targetStoreName:'',//调入仓库
					targetStoreId:'',//调入仓库Id
					handler:'',//经手人
					handlerUserId:'',//经手人Id
					sheetDate:'',//单据日期
					remark:''//备注
				},
//				表格数据
				tableData:[],
				//弹层配置
				fixedOption: {
			        deportShow: false, //仓库
			        brokerageShow: false,//经手人
		      	},
			}
		},
		methods:{
			goHistory(){
				this.$router.push('inventory_allocation_history')
			},
//			获取表格数据
			getReceiptDraftList(){
				let urlId=this.$route.query.stockAllotId;
				const _self = this;
				return new Promise((resolve, reject) => {
					fetchstockAllotContent(urlId).then(response=>{
						if (response.code === 0) {
							console.log(response);
							let data = response.data.stockAllot;
							_self.queryData.handler = data.handler;
							_self.queryData.remark = data.remark;
							_self.queryData.sheetDate = data.sheetDate;
							_self.queryData.storeName = data.storeName;
							_self.queryData.targetStoreName = data.targetStoreName;
							_self.option.stockAllotNo = data.stockAllotNo;
							_self.tableData = data.stockAllotDetailList;
							resolve(true);
						}else{
							this.$message({
			                		type: "error",
			                		message: response.msg
			              	});
						}
					}).catch(err=>{
						this.$message({
				          type: 'error',
				          message:"获取数据失败"
				        })
            				reject(false);
					})
				})
			},
			createFilter(queryString){
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
		          default:
		            break;
		        }
		      }
			},
			querySearchs(queryString, cb){
			  let restaurants;
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
			handleSelect(item){
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
	      	getSummaries(param) {
		        const { columns, data } = param;
		        const sums = [];
		        columns.forEach((column, index) => {
			          if (index === 0) {
			            sums[index] = '合计';
			            return;
	          		  }
			          if(index == 1||index == 2||index == 3||index == 4||index == 5||index == 8||index == 9||index == 10){
			          	sums[index] = '';
			            return;
			          }
	          	const values = data.map(item => Number(item[column.property]));
	          	if (!values.every(value => isNaN(value))) {
	            		sums[index] = values.reduce((prev, curr) => {
	              		const value = Number(curr);
	              		if (!isNaN(value)) {
	                		return prev + curr;
		              	} else {
		                		return prev;
		              	}
	            		}, 0);
//	            		sums[index] += ' 元';
		          	} else {
		            		sums[index] = 'N/A';
		          	}
	        		});
	        return sums;
	      },
	      //添加按钮样式
		  insertAddActive($event) {
	      	$event.currentTarget.className = "el-icon-circle-plus";
	      },
	      deletedAddActive($event) {
	      	$event.currentTarget.className = "el-icon-circle-plus-outline";
	      },
	      insertRemoveActive($event) {
	      	$event.currentTarget.className = "el-icon-remove";
	      },
	      deletedRemoveActive($event) {
	      	$event.currentTarget.className = "el-icon-remove-outline";
	      },
	      add(index){
//	      	this.tableData.splice(index+1,0,{})
			return false
	      },
	      remove(index){
//	      	this.tableData.splice(index,1);
			return false
	      },
//	      弹层方法
		     getDeportInfo (data) {
		      this.queryData.storeName = data.name
		      this.queryData.storeId = data.id
		    },
		    targetStoreInfo (data) {
		      this.queryData.targetStoreName = data.name
		      this.queryData.targetStoreId = data.id
		    },
		    getHandlerInfo (data) {
		      this.queryData.handler = data.name;
		      this.queryData.handlerUserId = data.id;
		    },
		    //   获取信息
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
		    }
		},
		created(){     
 			this.getReceiptDraftList();
 			this.getBrokerage();
 			this.getDeport();
		},
	}
</script>

<style lang="scss" scoped>
.app-container{
  .page-title{
  	line-height: 45px;
  	.code-title{
  	font-size:18px;
  	padding-right: 3px;
  	font-weight: normal;
	}
	.code-no{
	   font-size:13px;
	   text-decoration: underline;
	   color:#666;
	}
	  .title {
	    font-size: 24px;
	    color: #575757;
	  }
	  .line {
	    width: 100%;
	    height: 0;
	    border-bottom: 3px solid #d4d8e1;
	  }
  }
  .term-search{
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
  .table-contain{
  	height: 370px;
  }
  .remark-contain{
  	margin-top:10px;
  }
  .btn-contain{
  	margin-top:5px;
  	text-align: center;
  }
}
</style>
<style type="text/css">
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