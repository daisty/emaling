<!--<template>
	<div class="inner-text" style="width:100%;height:28px; line-height=28px; position:relative;" v-if="innerBoxFade==false" @click="ShowInputFade">
		{{dummyValue}}
		<el-autocomplete
			v-model="dummyValue"
			v-if="innerInputFade"
			@blur="innerInputFadeCB"
			:size="Sizevalue"
			@focus="which=1"
			@select="selectValue"
			:trigger-on-focus="triggerfocus"
			:fetch-suggestions="queryTable"
			style="position:absolute;left:0;top:0;"
			ref="innerInput">
		</el-autocomplete>
	</div>	
</template>

<script>
	export default{
		name: "autoComplate",
		props:{
//			当前行的index
			NowIndex:{
				type:Number,
				default(){
					return 0
				}
			},
			//外层盒子显示参数
			innerBoxFade:{
				type:Boolean,
				default:true
			},
			//里面input显示参数
			innerInputFade:{
				type:Boolean,
				default:true
			},
			//里面input名称
			innerInputFadeName:{
				type:String,
				default(){
					return ''
				}
			},
			//输入数据
//			value:{
//				type:String,
//				default(){
//					return ''
//				}
//			},
//			尺寸参数
			Sizevalue:{
				type:String,
				default(){
					return 'mini'
				}
			},
//			是否得到焦点马上显示建议参数
			triggerfocus:{
				type:Boolean,
				default:false
			},
//			下拉框列表
			searchList:{
				type:Array,
		  		default(){
		  			return []
		  		}
			}
		},
		data(){
			return{
				dummyValue:'',
				queryData:{
					goodsNo:'',
					goodsId:'',
					goodsName:''
				},
				MysearchList:[]
			}
		},
//		computed:{
//	      dialogFormVisible:{
//	        get:function(){
//	          return this.MysearchList = Object.assign({},this.searchList)
//	        },
//	      }
//		},
		methods:{
			//表格查询方法
			queryTable(queryString, cb){
				let restaurants = this.searchList;
				console.log(restaurants);
				console.log(this.searchList)
		      	switch (this.which) {
      		 	case 1:
		          restaurants =this.searchList;
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
		            return restaurant.value.indexOf(queryString) > -1;
		            break;
		          default:
		            break;
		        }
		      }
			},
			tablehandleSelect(item){
				switch (this.which) {
				case 1:
		          this.queryData.goodsName = item.goodsName;
		          this.queryData.goodsNo = item.goodsNo;
		          this.queryData.goodsId = item.goodsId;
		          break;
		         default:
		          break;
		      }
			},
			选择完成后处理数据
			selectValue(){
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
				this.ShowInput = false;
				this.$emit('selectInputValue',this.queryData,this.NowIndex);
			},
			ShowInputFade(){
				console.log(6666);

				this.$emit('ShowComplateInputFade',this.NowIndex,this.innerInputFadeName,'innerInput')
			},
			innerInputFadeCB(){
				this.$emit('HideComplateInputFade',this.NowIndex,this.innerInputFadeName)
			}
		}
	}
</script>

<style>
</style>-->