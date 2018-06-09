<template>
	<div class="app-container" v-loading="loading">
		<div class="page-title">
			<!--标题栏-->
			<el-row>
				<el-col :span="8">
					<span class="code-title">NO.</span>
					<span class="code-no">{{queryData.stockCountNo}}</span>
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
					<el-autocomplete v-model="queryData.storeName" @focus="which=1" class="input-item" :fetch-suggestions="querySearchs" placeholder="选择仓库" @select="handleSelect" clearable>
						<el-button slot="append" icon="el-icon-search" @click="fixedOption.deportShow=true"></el-button>
					</el-autocomplete>
				</el-col>
				<!--<el-col :span="5">
					<span>调入仓库</span>
					<el-autocomplete v-model="queryData.targetStoreName" @focus="which=2" class="input-item" :fetch-suggestions="querySearchs" placeholder="选择仓库" @select="handleSelect" clearable>
						<el-button slot="append" icon="el-icon-search" @click="fixedOption.deportShow=true,StoreNameFade=false"></el-button>
					</el-autocomplete>
				</el-col>-->
				<el-col :span="5">
					<span class="serch-title">经手人</span>
					<el-autocomplete v-model="queryData.handler" @focus="which=3" class="input-item" :fetch-suggestions="querySearchs" placeholder="输入经手人" @select="handleSelect">
						<el-button slot="append" icon="el-icon-search" @click="fixedOption.brokerageShow=true"></el-button>
					</el-autocomplete>
				</el-col>
				<el-col :span="4">
					<span class="serch-title">盘点类型</span>
					<el-select v-model="queryData.countType" class="input-item" placeholder="请选择">
					    <el-option
					      v-for="item in option.options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-col>
				<el-col :span="5">
					<span class="serch-title">单据日期</span>
					<el-date-picker v-model="queryData.sheetDate" type="date" class="input-item" value-format="yyyy-MM-dd" placeholder=" 单据日期(止)">
					</el-date-picker>
				</el-col>
				<el-col :span="2">
					<el-button type="primary" size="mini" @click="changeStock">
						批量选择库存
					</el-button>
				</el-col>
			</el-row>
		</div>
		<div class="table-contain">
			<el-table height="100%" style="width: 100%;" :data="tableData" border fit highlight-current-row :summary-method="getSummaries" show-summary>
				<el-table-column type="index" label="序号" width="50"></el-table-column>
				<el-table-column label="操作" width="80" align="center">
					<template slot-scope="scope">
						<i class="el-icon-circle-plus-outline" @click="add(scope.$index)" style="cursor:pointer" @mouseover="insertAddActive($event)" @mouseout="deletedAddActive($event)"></i>
						<i class="el-icon-remove-outline" @click="remove(scope.$index)" style="cursor:pointer" @mouseover="insertRemoveActive($event)" @mouseout="deletedRemoveActive($event)"></i>
					</template>
				</el-table-column>
				<el-table-column prop="goodsNo" label="编号">
					<template slot-scope="scope">
						<span v-if="tableData[scope.$index].Nochange">{{scope.row.goodsNo}}</span>
						<div class="inner-text" style="width:100%;height:28px; line-height=28px; position:relative;" v-if="tableData[scope.$index].Nochange==false" @click.stop="checkstore(),showinput(scope.$index,'goodsNoShow','NoinnerInput')">
							{{scope.row.goodsNo}}
							<el-autocomplete
								v-model="value"
								v-if="tableData[scope.$index].goodsNoShow"
								@blur="hideinput(scope.$index,'goodsNoShow')"
								size="mini"
								@focus="which=1"
								@select="gogo(scope.$index,scope.row,'goodsNoShow')"
								:trigger-on-focus="false"
								:fetch-suggestions="queryTable"
								style="position:absolute;left:0;top:0;"
								ref="NoinnerInput">
							</el-autocomplete>
						</div>
						<!--<auto-complate :searchList="goodsNoList" :innerBoxFade="tableData[scope.$index].Nochange" innerInputFadeName="goodsNoShow" @ShowComplateInputFade="showinput" :innerInputFade="tableData[scope.$index].goodsNoShow" :Sizevalue="AutoComplatemini" :NowIndex="scope.$index" @HideComplateInputFade="hideinput"></auto-complate>-->
					</template>
				</el-table-column>
				<el-table-column prop="goodsName" label="品名">
					<template slot-scope="scope">
						<span v-if="tableData[scope.$index].Nochange">{{scope.row.goodsName}}</span>
						<div class="inner-text" style="width:100%;height:28px; line-height=28px; position:relative;" v-if="tableData[scope.$index].Nochange==false" @click.stop="checkstore(),showinput(scope.$index,'goodsNameShow','NameinnerInput')">
							{{scope.row.goodsName}}
							<el-autocomplete
								v-model="value"
								v-if="tableData[scope.$index].goodsNameShow"
								@blur="hideinput(scope.$index,'goodsNameShow')"
								size="mini"
								@focus="which=2"
								@select="gogo(scope.$index,scope.row,'goodsNameShow')"
								:trigger-on-focus="false"
								:fetch-suggestions="queryTable"
								style="position:absolute;left:0;top:0;"
								ref="NameinnerInput">
							</el-autocomplete>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="goodsColorNo" width="120" label="颜色">
					<template slot-scope="scope">
						<span v-if="tableData[scope.$index].colorSelectBoxFade==false">{{scope.row.goodsColorNo}}</span>
						<div class="inner-text" style="width:100%;height:28px; line-height=28px; position:relative;" @click.stop="showinput(scope.$index,'colorSelectFade','ColorinnerInput')" v-if="tableData[scope.$index].colorSelectBoxFade">
							{{scope.row.goodsColorNo}}
							<el-select 
								v-model="scope.row.goodsColorNo" 
								placeholder="选择颜色" 
								filterable remote size="mini" 
								:remote-method="ColorremoteMethod"
								:loding="selectloading"  
								v-if="tableData[scope.$index].colorSelectFade" 
								ref="ColorinnerInput"
								style="position:absolute;left:0;top:0;"
								@blur="hideinput(scope.$index,'colorSelectFade')"
								@change="getGoodsbatchNo(scope.row.goodsColorNo,scope.row.goodsNo,scope.$index)">
								<el-option
							      v-for="item in coloroption"
							      :key="item.valuekey"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
						</div>
					</template>	
				</el-table-column>
				<el-table-column prop="batchNo" label="批号">
					<template slot-scope="scope">
						<span v-if="tableData[scope.$index].batchNoSelectFade==false">{{scope.row.batchNo}}</span>
						<div class="inner-text" style="width:100%;height:28px; line-height=28px; position:relative;" v-if="tableData[scope.$index].batchNoSelectFade" @click="showinput(scope.$index,'batchNoinputFade','batchNoinput')">
							{{scope.row.batchNo}}
							<el-input placeholder="请输入批号" v-model="scope.row.batchNo" size='mini' style="position:absolute;left:0;top:0;" v-if="tableData[scope.$index].batchNoinputFade" @blur="custombatchNo(scope.row.batchNo,scope.$index),hideinput(scope.$index,'batchNoinputFade')" ref="batchNoinput">
								<i slot="suffix" class="el-input__icon el-icon-search" @click.shop="fixedOption.inventoryShow=true,postQueryData(scope.row.goodsNo,scope.row.goodsName,scope.row.goodsColorNo),setNowIndex(scope.$index)"></i>
							</el-input>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="stockCount" label="库存条数"></el-table-column>
				<el-table-column prop="stockQuantity" label="库存数量"></el-table-column>
				<el-table-column prop="stockUnit" width="60" label="单位">
					<template slot-scope="scope">
						<span v-if="tableData[scope.$index].stockUnitinputBoxFade==false">{{scope.row.stockUnit}}</span>
						<div class="inner-text" style="width:100%;height:28px; line-height=28px; position:relative;" v-if="tableData[scope.$index].stockUnitinputBoxFade" @click.shop="showinput(scope.$index,'stockUnitinputFade','stockUnitinput')">
							{{scope.row.stockUnit}}
							<el-input style="position:absolute;left:0;top:0;" v-if="tableData[scope.$index].stockUnitinputFade" v-model="scope.row.stockUnit" ref='stockUnitinput' @blur="hideinput(scope.$index,'stockUnitinputFade')" size="mini"></el-input>
						</div>
					</template>
				</el-table-column>
				<!--<el-table-column label="库存条数"></el-table-column>
		        <el-table-column label="库存数量"></el-table-column>-->
				<el-table-column prop="afterItemQuantity" label="盘点后条数">
					<template slot-scope="scope">
						<div class="inner-text" style="width:100%;height:28px; line-height=28px; position:relative;" v-if="tableData[scope.$index].lastInputFade" @click.shop="showinput(scope.$index,'afterItemQuantityinputFade','afterItemQuantityinput')">
							{{scope.row.afterItemQuantity}}
							<el-input style="position:absolute;left:0;top:0;" v-if="tableData[scope.$index].afterItemQuantityinputFade" v-model="scope.row.afterItemQuantity" ref='afterItemQuantityinput' @blur="hideinput(scope.$index,'afterItemQuantityinputFade')" size="mini"></el-input>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="afterQuantity" label="盘点后数量">
					<template slot-scope="scope">
						<div class="inner-text" style="width:100%;height:28px; line-height=28px; position:relative;" v-if="tableData[scope.$index].lastInputFade" @click.shop="showinput(scope.$index,'afterQuantityinputFade','afterQuantityinput')">
							{{scope.row.afterQuantity}}
							<el-input style="position:absolute;left:0;top:0;" v-if="tableData[scope.$index].afterQuantityinputFade" v-model="scope.row.afterQuantity" ref='afterQuantityinput' @blur="hideinput(scope.$index,'afterQuantityinputFade')" size="mini"></el-input>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="盘点状态">
					<template slot-scope="scope">
						<span v-if="scope.row.afterItemQuantity && scope.row.afterQuantity" style="color: #029B26;">已盘点</span>
						<span v-if="!scope.row.afterItemQuantity || !scope.row.afterQuantity">未盘点</span>
					</template>	
				</el-table-column>
				<el-table-column prop="remark" label="备注">
					<template slot-scope="scope">
						<div class="inner-text" style="width:100%;height:28px; line-height=28px; position:relative;" v-if="tableData[scope.$index].lastInputFade" @click.shop="showinput(scope.$index,'remarkinputFade','remarkinput')">
							{{scope.row.remark}}
							<el-input style="position:absolute;left:0;top:0;" v-if="tableData[scope.$index].remarkinputFade" v-model="scope.row.remark" ref='remarkinput' @blur="hideinput(scope.$index,'remarkinputFade')" size="mini"></el-input>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="remark-contain">
			<el-input clearable v-model="queryData.remark" placeholder="单据备注">
			</el-input>
		</div>
		<div class="btn-contain">
			<el-button size="mini" @click="saveDart()" :loading="btnLoading">保存草稿</el-button>
			<el-button size="mini" type="primary" @click="save()" :loading="btnLoading">盘点</el-button>
		</div>
		<fixed-page2 @deportInfo="getDeportInfo" :fixedOption="fixedOption"></fixed-page2>
		<!--<fixed-page2 @deportInfo="getDeportInfo" :fixedOption="fixedOption" v-if="StoreNameFade"></fixed-page2>-->
		<fixed-page3 @handlerInfl="getHandlerInfo" :fixedOption="fixedOption"></fixed-page3>
		<fixed-page4 @tableInfo="getTableInfo" :fixedOption="fixedOption" :treeData="propbatchNolist" :queryData="queryDatalist" :getIndex="nowIndex"></fixed-page4>
		<fixed-inventory @saleInfo="getSaleInfo" v-if="searchGoods" :refreshFun="initFetchData" :close="changeStock"></fixed-inventory>
	</div>
</template>

<script>
import { AddstockCount,getStockCheckNo,fenchqueryStock,fetchStockList,AddstockCountDraft,fetchgoodsColor,fetchgoodsList,fetchgoodsColorList} from "@/api/inventory";
import { fetchSheetCode, fetchGoodsColor, fetchBrokerage, fetchSupplier, fetchDeport, fetchSaveInstroeInfo, fetchSaveInstroeInfoDraft } from '@/api/purchase'
import fixedPage2 from '@/components/fixed/fixedNormal'
import fixedPage3 from '@/components/fixed/fixedBrokerage'
import fixedPage4 from '@/components/fixed/inventory_Dialog'
//import AutoComplate from '@/components/BDD_TableInput/TableautoComplate'
//import inventoryDiglog from '@/views/_inventory/inventoryBussOperator/inventory_Dialog'
//库存批量选择
import fixedInventory from "@/components/fixed/fixedInventory";
	export default {
		name: "inventoryCheckAdd",
		components:{
			fixedPage2,
			fixedPage3,
			fixedPage4,
			fixedInventory
//			AutoComplate
		},
		data(){
			return{
//				避免多次点击按钮
				btnLoading:false,
//				批量选择库存弹窗显示
				searchGoods:false,
//				弹窗显示
				value:'',
				name:'already',
//				选择器loding
				loading:false,
				selectloading:false,
				option: {
					pageName:'库存盘点单',
					btnName1: "打印",
        				btnName2: "历史",
        				options:[
	        				{
	        					value:1,
	        					label:'来货误差'
	        				},
	        				{
	        					value:2,
	        					label:'开剪损耗'
	        				},
	        				{
	        					value:3,
	        					label:'做色卡'
	        				},
	        				{
	        					value:4,
	        					label:'颜色调整',
	        				},
	        				{
	        					value:5,
	        					label:'其他'
	        				},
	        			]
				},
				queryData:{
					stockCountNo:'',//盘点单据编号
					storeName:'',//调出仓库
					storeId:'',//调出仓库id
					targetStoreName:'',//调入仓库
					targetStoreId:'',//调入仓库Id
					handler:'',//经手人
					handlerUserId:'',//经手人Id
					sheetDate:'',//单据日期
					remark:'',//备注
					countType:'',//盘点状态
					stockCountDetailList:[],//库存盘点单明细
				},
//				表格数据
				tableData:[{
					goodsNameShow:false,//品名输入
					goodsNoShow:false,//商品编号输入
					colorSelectBoxFade:false,//商品颜色外盒
					colorSelectFade:false,//商品颜色输入
					batchNoSelectFade:false,//批号输入
					Nochange:false,//只能删除,不能修改
					lastInputFade:false,//盘点后条数，盘点后数量input显示
					afterItemQuantityinputFade:false,//盘点后条数输入
					afterQuantityinputFade:false,//盘点后数量输入
					remarkinputFade:false,//备注输入
					batchNoinputFade:true,//批号输入
					stockUnitinputFade:false,//单位输入
					stockUnitinputBoxFade:false//单位输入外盒
				}],
				//完整数据
				CountData:[],
//				未过滤颜色选择配置
				Colorlist:[],
//				颜色选择器配置
				coloroption:[],
//				批号选择器配置列表
				batchNolist:[],
//				传递给子组件的批号列表
				propbatchNolist:[{
		  			label: '全部商品',
		  			children:[]	 
				}],
//				弹窗所需的编号,品名和颜色
				queryDatalist:{},
//				唤出弹窗当前index
				nowIndex:0,
				//弹层配置
				fixedOption: {
			        deportShow: false, //仓库
			        brokerageShow: false,//经手人
			        inventoryShow:false //库存选择
		      	},
		      	goodsNameList:[],
//		      	goodsIdList:[],
		      	goodsNoList:[]
			}
		},
		methods:{
			checkstore(){
				if(this.queryData.storeName==''){
					this.$alert('清先填写仓库名称', '注意', {
			          confirmButtonText: '确定'
			        });
			        return false
				}
	            if(this.goodsNameList.length == 0){
	            		this.$message({
			        		type: 'error',
			        		message: '这个仓库里面没有商品哦'
		        		})
	            		this.value = '';
	            }		
			},
//			填写编号自动匹配名字,填写名字自动匹配编号
			gogo(i,row,hide){
				this.goodsNameList.forEach((items,index)=>{
					if(items.goodsName == this.value){
						row.goodsName = this.value
						row.goodsNo = items.goodsNo;
						this.getGoodsOtherData(items.goodsNo,i);
					}else if(items.goodsNo == this.value){
						row.goodsNo = this.value
						row.goodsName = items.goodsName;
						this.getGoodsOtherData(this.value,i);
					}
				})
				this.hideinput(i,hide);
			},
//			品名与编号自动填写颜色
			getGoodsOtherData(val,i){
				const _self = this;
				const data =val
				return new Promise((resolve, reject)=>{
					fetchgoodsColorList(data).then(response=>{
						let datalist = response.data.list;
						console.log(666888888,datalist)
						_self.Colorlist = datalist.map(item=>{
							return {value:item.colorNo,label:item.colorName,valuekey:item.colorId}
						})
//						console.log(_self.Colorlist);
						_self.tableData[i].colorSelectBoxFade = true;
//						_self.batchNolist = data;
						resolve(true);
					}).catch(err=>{
						reject(false);
					})
				})
			},
			//得到颜色选择后获取批号列表
			getGoodsbatchNo(Colorval,Noval,i){
				this.propbatchNolist[0].children = [];
				let data = {
					storeId : this.queryData.storeId,
					goodsNo : Noval,
					goodsColorNo : Colorval
				}
				return new Promise((resolve, reject)=>{
					fenchqueryStock(data).then(response=>{
						let datalist = response.data.list.list;
						this.batchNolist = datalist;
						this.batchNolist.forEach((item,index)=>{
							if(item.goodsColorNo == Colorval){
								this.propbatchNolist[0].children.push({'label':item.batchNo})
							}
						})
						this.tableData[i].batchNoSelectFade=true//批号输入					
						resolve(true);
					}).catch(err=>{
						reject(false);
					})
				})
			},
//			整理编号,品名,颜色送至弹窗
			postQueryData(Noval,Nameval,colorval){
				this.queryDatalist = {};
				this.queryDatalist = {
					'goodsNo':Noval,
					'goodsName':Nameval,
					'goodsColorNo':colorval
				}
			},
			//颜色选择器获取
			ColorremoteMethod(query){
				if (query !== '') {
//			        this.loading = true;
			        setTimeout(() => {
//			          this.loading = false;
			          this.coloroption = this.Colorlist.filter(item => {
			            return item.label.indexOf(query) > -1;
			          });
			        }, 200);
			      } else {
			        this.coloroption = [];
			      }				
			},
			//弹窗获取数据条位置
			setNowIndex(i){
				this.nowIndex = i;
			},
//			点击表格input自动获取焦点
			showinput(index,val,refele){
				console.log("7777");
				this.tableData[index][val]=true;
				this.$nextTick(function () {
					this.$refs[refele].focus();
				})
			},
			hideinput(index,val){
				this.$nextTick(function () {
					setTimeout(()=>{
						this.tableData[index][val]= false;
					},100)
				})
				this.value = '';
			},
			goHistory(){
				this.$router.push('inventory_check_history')
			},
//			获取单据编号接口
			getStockCheckNo(){
				const _self = this;
				return new Promise((resolve, reject) => {
					getStockCheckNo().then(response=>{
						if (response.code === 0) {
							_self.queryData.stockCountNo = response.data.stockCountNo;
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
			//表格查询方法
			queryTable(queryString, cb){
				let restaurants;
		      	switch (this.which) {
      		 	case 1:
		          restaurants = this.goodsNoList;
		          break;
		        case 2:
		          restaurants = this.goodsNameList;
		          break;
		        }
	      	 var results = queryString
		        ? restaurants.filter(this.tablecreateFilter(queryString))
		        : restaurants;
		      cb(results);
			},
			tablecreateFilter(queryString){
				return restaurant => {
		        switch (this.which) {
	        		  case 1:
		            return restaurant.goodsNo.indexOf(queryString) > -1;
		            break;
		          case 2:
		            return restaurant.goodsName.indexOf(queryString) > -1;
		            break;
		          default:
		            break;
		        }
		      }
			},
			tablehandleSelect(item){
				switch (this.which) {
				case 1:
		          this.queryData.goodsName = item.value;
//		          this.queryData.goodsName = item.value;
		          break;
		         default:
		          break;
		      }
			},
			handleSelect(item){
				switch (this.which) {
		      	case 1:
		          this.queryData.storeId = item.storeId;
		          this.queryData.storeName = item.value;
//		          this.getStock(item.storeId);
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
			          if(index == 1||index == 2||index == 3||index == 4||index == 5||index == 8||index == 11||index == 12){
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
	      	this.tableData.splice(index+1,0,{
	      		goodsNameShow:false,
	      		goodsNoShow:false,
	      		colorSelectBoxFade:false,
	      		colorSelectFade:false,
	      		batchNoSelectFade:false,
	      		Nochange:false,
	      		lastInputFade:false,
				afterItemQuantityinputFade:false,//盘点后条数输入
				afterQuantityinputFade:false,//盘点后数量输入
				remarkinputFade:false,//备注输入
				batchNoinputFade:true,//批号输入
				stockUnitinputFade:false,//单位输入
				stockUnitinputBoxFade:false,//单位外盒
	      	})
	      },
	      remove(index){
	      	if(this.tableData.length<2){
	      		this.$set(this.tableData,0,{});
	      		return
	        }
			this.tableData.splice(index,1);
	      },
//	      弹层方法
		     getDeportInfo (data) {
		      this.queryData.storeName = data.name
		      this.queryData.storeId = data.id
//		      this.getStock(data.id);
		    },
//		    targetStoreInfo (data) {
//		      this.queryData.targetStoreName = data.name
//		      this.queryData.targetStoreId = data.id
//		    },
		    getHandlerInfo (data) {
		      this.queryData.handler = data.name;
		      this.queryData.handlerUserId = data.id;
		    },
		    getTableInfo (cbdata,i) {
		    		cbdata.forEach((item,index)=>{
//		    			item.goodsNameShow=false;//品名输入
//					item.goodsNoShow=false;//商品编号输入
//					item.colorSelectBoxFade=false;//商品颜色外盒
//					item.colorSelectFade=false;//商品颜色输入
//					item.batchNoSelectFade=false;//批号输入
//					item.Nochange=true;
//					item.lastInputFade=true;
//					item.afterItemQuantityinputFade=true;//盘点后条数输入
//					item.afterQuantityinputFade=true;//盘点后数量输入
					this.$set(item,'goodsNameShow',false);
					this.$set(item,'goodsNoShow',false);
					this.$set(item,'colorSelectBoxFade',false);
					this.$set(item,'colorSelectFade',false);
					this.$set(item,'batchNoSelectFade',false);
					this.$set(item,'Nochange',true);
					this.$set(item,'lastInputFade',true);
					this.$set(item,'afterItemQuantityinputFade',false);
					this.$set(item,'afterQuantityinputFade',false);
					this.$set(item,'remarkinputFade',false);
					this.$set(item,'batchNoinputFade',true);
					this.$set(item,'stockUnitinputFade',false);
					this.$set(item,'stockUnitinputBoxFade',false);
					this.tableData.splice(index+i,1,item);
		    		});
		     	this.fixedOption.inventoryShow=false;
		     	this.propbatchNolist[0].children = [];//清空数据
		     	this.queryDatalist={};//清空数据
		    },
//			鉴别是否自定义批号
			custombatchNo(val,i){
				console.log(1231312312,val,i);
				console.log(this.propbatchNolist[0].children);
				var ok = this.propbatchNolist[0].children.every((item)=>{
					console.log(item.label)
					return item.label != val;
				})
				console.log(ok);
				if(ok){
					this.$set(this.tableData[i],'stockCount',0);
					this.$set(this.tableData[i],'stockQuantity',0);
					this.$set(this.tableData[i],'lastInputFade',true);
					this.$set(this.tableData[i],'stockUnitinputBoxFade',true);
				}
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
		    },
		    //  数据处理，把数据放入requestData中
		    tranfer (data) {
		       this.queryData.stockCountDetailList = []
		       data.forEach((item,index)=>{
		       		let obj = {
		       			'stockId':item.stockId,
		       			'goodsId':item.goodsId,
		       			'goodsName':item.goodsName,
		       			'goodsNo':item.goodsNo,
		       			'goodsColorId':item.goodsColorId,
		       			'goodsColorNo':item.goodsColorNo,
		       			'batchNo':item.batchNo,
		       			'stockId':item.stockId,
		       			'beforeQuantity':item.stockQuantity,
		       			'beforeItemQuantity':item.stockCount,
		       			'beforeGoodsUnit':item.stockUnit,
		       			'afterGoodsUnit':item.stockUnit,
		       			'afterItemQuantity':item.afterItemQuantity,
		       			'afterQuantity':item.afterQuantity,
		       			'remark':item.remark,
		       		}
		       		this.queryData.stockCountDetailList.push(obj);
		       })
		    },
//		    批量选择库存
		    getSaleInfo(data) {
		    	  if(data.length==0){
		    	  	return
		    	  }
		    	  this.queryData.storeName = data[0].storeName;
		    	  this.queryData.storeId = data[0].storeId;
		    	  this.queryData.storeNo = data[0].storeNo;
		    	  data.forEach((item,index)=>{
					this.$set(item,'goodsNameShow',false);
					this.$set(item,'goodsNoShow',false);
					this.$set(item,'colorSelectBoxFade',false);
					this.$set(item,'colorSelectFade',false);
					this.$set(item,'batchNoSelectFade',false);
					this.$set(item,'Nochange',true);
					this.$set(item,'lastInputFade',true);
					this.$set(item,'afterItemQuantityinputFade',false);
					this.$set(item,'afterQuantityinputFade',false);
					this.$set(item,'remarkinputFade',false);
					this.$set(item,'batchNoinputFade',true);
					this.$set(item,'stockUnitinputFade',false);
					this.$set(item,'stockUnitinputBoxFade',false);
					this.tableData.splice(index, 0, data[index]);
		    	  })
		    },	
	        changeStock() {
		      this.searchGoods = !this.searchGoods;
		    },
	        initFetchData() {
		      this.changeStock();
		    },
//		    查询商品品名和编号
			SearchgoodsList(){
			  const _self = this;
		      return new Promise((resolve, reject) => {
		        fetchgoodsList({
		        		pageSize:'10000'
		        })
		          .then(response => {
		          	var data = JSON.stringify(response.data.list.list);
		          	_self.CountData = JSON.parse(data);
		          	_self.goodsNameList = JSON.parse(data);
		          	_self.goodsIdList = JSON.parse(data);
		          	_self.goodsNoList = JSON.parse(data);
		          	console.log(666888,_self.CountData);
		            for (var i = 0; i < _self.goodsNameList.length; i++) {
		            		_self.goodsNameList[i].value = _self.goodsNameList[i].goodsName;
		            		_self.goodsIdList[i].value = _self.goodsIdList[i].goodsId;
		            		_self.goodsNoList[i].value = _self.goodsNoList[i].goodsNo;
		          	}
		            resolve(true);
		          })
		          .catch(err => {
		            console.log(err);
		            reject(false);
		          });
		      });
			},

		    //保存盘点单
		    save(){
		    		const _self = this;
		    		this.tranfer(this.tableData)
		    		//判断表格内是否有仍未填写的资料
		    		var tablaOK = this.queryData.stockCountDetailList.every((item)=>{
		    			var findNull;
					for(var x in item){
						var findNull = (typeof(item[x])!='undefined')?true:false;
					}
					return findNull;
	      		})
		    		if(!tablaOK){
		    			this.btnLoading=true;
		    			this.$message({
			        		type: 'error',
			        		message: '您的表格数据仍未填写完毕',
			        		showClose:true,
			        		onClose(){
			        			_self.btnLoading = false;
			        		}
		        		})	
		        		return false;
		    		}
			    if (this.queryData.storeName === '') {
		        		this.$message({
			        		type: 'error',
			        		message: '调出仓库不能为空'
		        		})		    		
		        		return false
		      	}else if(this.queryData.handler ===''){
		      		this.$message({
			        		type: 'error',
			        		message: '经手人不能为空'
		        		})	
		        		return false
		      	}else if(this.countType ===''){
		      		this.$message({
			        		type: 'error',
			        		message: '盘点状态不能为空'
		        		})	
		        		return false
		      	}else if(this.queryData.sheetDate===''){
		      		this.$message({
			        		type: 'error',
			        		message: '单据日期不能为空'
		        		})	
		        		return false
		      	}else if(this.queryData.stockCountDetailList.length === 0){
		      		this.$message({
			        		type: 'error',
			        		message: '盘点商品内容不能为空'
		        		})	
		        		return false
		      	}else{
		      		return new Promise((resolve, reject) => {
		      			AddstockCount(this.queryData).then(response=>{
		      				this.$message({
				              type: 'success',
				              message: '保存成功'
				            })
		      				this.$router.push('inventory_check_history');
		      				resolve(true);
		      			}).catch(err=>{
		      				this.$message({
					        		type: 'error',
					        		message: err.msg
				        		})	
				        		reject(false)
		      			})
		      		})
		      }
			},
		    saveDart(){
		    		const _self = this;
		    		this.tranfer(this.tableData)
		    		//判断表格内是否有仍未填写的资料
		    		var tablaOK = this.queryData.stockCountDetailList.every((item)=>{
		    			var findNull;
					for(var x in item){
						var findNull = (typeof(item[x])!='undefined')?true:false;
					}
					return findNull;
	      		})
		    		if(!tablaOK){
		    			this.btnLoading=true;
		    			this.$message({
			        		type: 'error',
			        		message: '您的表格数据仍未填写完毕',
			        		showClose:true,
			        		onClose(){
			        			_self.btnLoading = false;
			        		}
		        		})	
		        		return false;
		    		}
			    if (this.queryData.storeName === '') {
		        		this.$message({
			        		type: 'error',
			        		message: '调出仓库不能为空'
		        		})		    		
		        		return false
		      	}else if(this.queryData.handler ===''){
		      		this.$message({
			        		type: 'error',
			        		message: '经手人不能为空'
		        		})	
		        		return false
		      	}else if(this.countType ===''){
		      		this.$message({
			        		type: 'error',
			        		message: '盘点状态不能为空'
		        		})	
		        		return false
		      	}else if(this.queryData.sheetDate===''){
		      		this.$message({
			        		type: 'error',
			        		message: '单据日期不能为空'
		        		})	
		        		return false
		      	}else if(this.queryData.stockCountDetailList.length === 0){
		      		this.$message({
			        		type: 'error',
			        		message: '盘点商品内容不能为空'
		        		})	
		        		return false
		      	}else{
		      		return new Promise((resolve, reject) => {
		      			AddstockCountDraft(this.queryData).then(response=>{
		      				this.$message({
				              type: 'success',
				              message: '保存成功'
				            })
		      				this.$router.push('inventory_check_history');
		      				resolve(true);
		      			}).catch(err=>{
		      				this.$message({
					        		type: 'error',
					        		message: err.msg
				        		})	
				        		reject(false)
		      			})
		      		})
		      }
			}
		},
//		计算属性
		computed:{
//			TableLoadingcomputed(){
//				if(this.queryData.storeId == ''){
//					return true
//				}else{
//					return false
//				}
//			}
		},
		created(){     
			this.getStockCheckNo();
 			this.getBrokerage();
 			this.getDeport();
 			this.SearchgoodsList();
// 			this.SearchgoodsColorList();
// 			this.getTableInputData();
		}
//		点击马上获取焦点
//	directives: {
//		focus: {
//		// 当绑定元素插入到 DOM 中。
//			inserted: function (el) {
//		    // 聚焦元素
//				el.focus()
//				console.log(el);
//			}
//		}
//	}
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
		font-size: 12px;
		display: inline-block;
		width: 70px;
		text-align: right;
	}
	.input-item{
		display: inline-block;
		width: calc(100% - 80px);
	}
  }
  .table-contain{
  	height: 340px;
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