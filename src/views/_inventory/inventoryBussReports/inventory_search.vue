<template>
  <div class="app-container">
  	<div class="title-container">
  		<h2>{{pageName}}</h2>
  	</div>
  	<div class="term-search">
  		<el-row :gutter="5">
  			<el-col :span="6">
  				<span class="demonstration">仓库:</span>
		    		<el-autocomplete 
		    			v-model="requestData.storeName" 
		    			@focus="which=1" 
		    			class="form-item"
		    			:fetch-suggestions="querySearchs" 
		    			placeholder="选择仓库" 
		    			@select="handleSelect"
		    			clearable>
					<el-button slot="append" icon="el-icon-search" @click="fixedOption.deportShow=true"></el-button>
		    		</el-autocomplete>
  			</el-col>
  			<el-col :span="6">
  				<span class="demonstration">商品编号:</span>
		    		<el-autocomplete 
		    			v-model="requestData.goodsNo" 
		    			@focus="which=2" 
		    			class="form-item"
		    			:fetch-suggestions="querySearchs" 
		    			placeholder="填写商品编号" 
		    			@select="handleSelect"
		    			clearable>
		    		</el-autocomplete>
  			</el-col>
  			<el-col :span="6">
  				<span class="demonstration">批号:</span>
		    		<el-input
		    			v-model="requestData.batchNo" 
		    			class="form-item"
		    			placeholder="所有仓库" 
		    			clearable>
		    		</el-input>
  			</el-col>
  			<el-col :span="5">
  				<span class="demonstration">颜色:</span>
  					<el-input 
			    			v-model="requestData.goodsColorNo" 
			    			placeholder="填写颜色" 
			    			class="form-item"
			    			clearable>
						<!--<el-button slot="append" icon="el-icon-search" @click="fixedOption.deportShow=true"></el-button>-->
		    		</el-input>
  			</el-col>
  			<el-col :span="1">
  				<el-button style="background: #ee6f43; color:#fff; margin-top:10px" @click="searchdata" >查询</el-button>
  			</el-col>
  		</el-row>
  		<div class="table-contain">
  			<el-row :gutter="10">
  				<el-col :span="4">
  					<div class="table-contain-left">
  						<div class="goods-tag-title">
  							<el-row>
  								<el-col :span="18">
  									<span class="text">商品分类</span>
  								</el-col>
  								<el-col :span="6">	
  									<i class="el-icon-close"></i>
  									<i class="el-icon-plus" @click="GetgoodsNameList"></i>
  								</el-col>
  							</el-row>
  						</div>
  						<el-tree :data="treedata" node-key="id" default-expand-all :expand-on-click-node="false">
  							<span class="custom-tree-node" slot-scope="{ node,data}">
  								<i class="el-icon-goods"></i>
	  					        <span>{{ node.label }}</span>
  							</span>
  						</el-tree>
  					</div>
  				</el-col>
  				<el-col :span="20">
  					<el-table 
  						style="width: 100%;" 
  						height="410" 
  						:data="tableData" 
  						border 
  						fit 
  						highlight-current-row 
  						:summary-method="getSummaries"
    						show-summary>
  						<el-table-column type="index" label="序号" width="50"></el-table-column>
  						<!--<el-table-column label="操作" width="120">
  							<template slot-scope="scope">
  								<div class="scope-flex">
  									<!--<el-button class="flex-btn" type="text" size="mini">审核</el-button>
  									<el-button class="flex-btn" type="text" size="mini">详情</el-button>
  									<el-button class="flex-btn gay-forbid" type="text" size="mini">删除</el-button>-->
  									<!-- <el-popover class="flex-btn" trigger="hover" placement="bottom">
  					                <el-button type="text" size="mini" @click="copy(scope.$index)">复制</el-button>
  					                <el-button type="text" size="mini" @clikc="returnBill(scope.$index)">退货</el-button>
  					                <el-button type="text" size="mini" slot="reference" >更多</el-button>
  					              </el-popover>
  								</div>
  							</template>
  						</el-table-column>-->
  						<el-table-column prop="goodsNo" label="编号" width="95">
  							<!--<template slot-scope="scope">
  								<span v-text="scope.row.goodsNo"></span>
  							</template>-->
  						</el-table-column>
  						<el-table-column prop="goodsName" label="品名" width="190">
  						</el-table-column>
  						<el-table-column prop="goodsColorNo" label="颜色">
  						</el-table-column>
  						<el-table-column prop="batchNo" label="批号"></el-table-column>
  						<el-table-column prop="stockCount" label="条数"></el-table-column>
  						<el-table-column prop="stockQuantity" label="库存总数"></el-table-column>
  						<el-table-column prop="stockUnit" label="单位"></el-table-column>
  					</el-table>
  				</el-col>
  			</el-row>
  		</div>
  	</div>
  	<fixed-page2 @deportInfo="getDeportInfo" :fixedOption="fixedOption"></fixed-page2>
  </div>
</template>

<script>
import fixedPage2 from '@/components/fixed/fixedNormal'
import { stockqueryStock,fetchgoodsList,fetchstock} from '@api/inventory'
import { fetchSheetCode, fetchGoodsList, fetchGoodsColor, fetchBrokerage, fetchSupplier, fetchDeport, fetchSaveInstroeInfo, fetchSaveInstroeInfoDraft } from '@/api/purchase'
  export default{
    name: 'inventorySearch',
    components:{
    		fixedPage2,
    },
    created() {
    		this.GetgoodsNameList();
    		this.getDeport();
    		this.getGoodsList ();
  	},
    data(){
        return {
            pageName: '库存查询',
            fixedOption: {
//		        supplierShow: false,
		        deportShow: false
//		        brokerageShow: false,
//		        stockShow: false
		    },
		    requestData:{
		    		storeId:'',//	仓库ID
		    		storeName:'',//仓库名字
		    		goodsNo:'',//商品编号
		    		goodsName:'',//商品名字
		    		goodsColorNo:'',//商品颜色
		    		createdFrom:'',//单据日期(起)
		    		createdTo:'',//	单据日期(止)
		    		batchNo:'',//批号
		    		pageNum:1,
		    		pageSize:100
		    },
		    tableData: [],
		    treedata:[
			    {
			    		id:1,
			    		label:'全部商品',
			    		children: [
				    		
			    		]
			    }
		    ],
		    //    弹窗配置
	      fixedOption: {
	        deportShow: false,
	      },
        }
    },
    methods:{
    	   createFilter(queryString) {
		      return restaurant => {
		        switch (this.which) {
		          case 1:
		            return restaurant.storeName.indexOf(queryString) > -1;
		            break;
		          case 2:
		            return restaurant.goodsNo.indexOf(queryString) > -1;
		            break;
		          case 3:
		            return restaurant.batchNo.indexOf(queryString) > -1;
		            break;
	              case 4:
		            return restaurant.goodsColorNo.indexOf(queryString) > -1;
		            break;
		          default:
		            break;
		        }
		      };
   		 },
    		querySearchs(queryString, cb){
    			let restaurants;
		      switch (this.which) {
		        case 1:
		          restaurants = this.storeName;
		          break;
		        case 2:
		          restaurants = this.goodsNo;
		          break;
		        case 3:
		          restaurants = this.batchNo;
		          break;
	            case 4:
		          restaurants = this.goodsColorNo;
		          break;
		        default:
		          break;
		      }
	      var results = queryString
	        ? restaurants.filter(this.createFilter(queryString))
	        : restaurants;
	      cb(results);
    		},
	handleSelect (item) {
      let searchInfos
      switch (this.which) {
        case 1:
          this.requestData.storeId = item.storeId
          this.requestData.storeName = item.value
          break
        case 2:
          this.requestData.goodsNo = item.goodsNo
          this.requestData.goodsName = item.Name
          break
        case 3:
          this.requestData.batchNo = item.batchNo
          break
        case 4:
          this.requestData.goodsColorNo = item.goodsColorNo
          break
        default:
          break
      }
    },
    		searchdata(){
    			this.getTableData(this.requestData);
    		},
    		getTableData(params = {}){
    			let _that = this;
		    fetchstock(params)
		    .then(response => {
		    	console.log('ok',params);
		      _that.tableData = response.data.list.list;
//		      _that.pageData.total = response.data.list.total;
		      _that.requestData.pageSize = response.data.list.pageSize;
		      _that.requestData.pageNum = response.data.list.pageNum;
//		      _that.treedata[0].children = response.data.list;
//		      console.log('777',_that.treedata[0]);
		      _that.loading = false;
		    })
		    .catch(err => {
		      console.log(err);
		    });
    		},
    		GetgoodsNameList(params={}){
    			let _that = this;
		    fetchgoodsList(params)
		    .then(response => {
		      var treechildren = response.data.list.list;
		      console.log('ok')
		      for(var i = 0; i<treechildren.length;i++){
	      		_that.treedata[0].children.push({'id':i,"label":treechildren[i].goodsName})
		      }
		      _that.loading = false;
		    })
		    .catch(err => {
		      console.log(err);
		    });
    		},
    		getDeportInfo (data) {
	      this.requestData.storeName = data.name
	      this.requestData.storeId = data.id
	    },
//  		表尾计算数据
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          if (index === 1 || index === 2 || index === 3 || index === 4 || index === 5 || index === 8) {
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
            
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
	getDeport () {
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
    getGoodsList () {
      	const _self = this
      	return new Promise((resolve, reject) => {
        fetchGoodsList().then(response => {
       	 console.log(response);
          this.goodsNo = response.data.data.list.list
          for (var i = 0; i < this.goodsNo.length; i++) {
            this.goodsNo[i].value = this.goodsNo[i].goodsNo
          }
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    fetchGoodsList
   },
  }
</script>
<style lang="scss" scoped>
.title-container{
	font-size:16px;
	text-align: center;
	border-bottom: 1px solid #ccc;
	padding-bottom:15px;
	h2{
		margin: 0;
		font-weight: 400;
	}
}
.term-search{
	margin-top:15px;
	.demonstration{
		display: inline-block;
	}
	.form-item{
		width: 66%;
	    margin-top: 10px;
	}
}
.table-contain{
	margin-top:15px;
	height:400px;
	.table-contain-left{
		width: 100%;
		height: 100%;
		border: 1px solid #666;
	}
	.goods-tag-title{
		height:30px;
		line-height: 30px;
		border-bottom: 1px solid #666;
		padding-left:10px;
	}
}
</style>
