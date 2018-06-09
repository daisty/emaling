<template>
  <transition name="fade-in">  
    <div class="fix-box" :style="zIndex" v-show="fixedOption.inventoryShow">
      <div class="content" :style="wh" v-show="fixedOption.inventoryShow">
        <div class="fix-top" :style="backgroundColor">
          <span class="text">选择库存商品</span>
          <b class="close" @click="fixedOption.inventoryShow=false">×</b>
        </div>
        <div class="fix-content">
        		<div class="content-left">
				<el-tree :data="treeData" :default-expand-all="true" @node-click="nodeClick">
				</el-tree>
			</div>
			<div class="content-right">
				<el-table
					:data="tableData"
					border
					style="width: 100%"
					height="100%"
					tooltip-effect="dark"
					@selection-change="handleSelectionChange"
					v-loading="tableloding">
					<el-table-column 
						label="编号"
						prop="goodsNo"
						type="selection">
					</el-table-column>
					<el-table-column 
						label="品名"
						prop="goodsName">
						
					</el-table-column>
					<el-table-column 
						label="颜色"
						prop="goodsColorNo">
						
					</el-table-column>
					<el-table-column 
						label="库存条数"
						prop="stockCount">
						
					</el-table-column>
					<el-table-column 
						label="库存数量"
						prop="stockQuantity">
					</el-table-column>
					<el-table-column 
						label="库存数量"
						prop="stockUnit">
					</el-table-column>
				</el-table>
			</div>
          <div class="search">
            <el-button style="float:right;border-color:#ccc;" size="mini" @click="cancle()">取消(Esc)</el-button>
            <el-button style="float:right;margin-right:10px;" type="primary" size="mini" @click="choose()">确定(Enter)</el-button>
          </div> 
        </div>
      </div>
    </div>
  </transition> 
</template>

<script>
//import receiptTable from "./components/receiptTable";
//import thisUrl from "./components/thisUrl";
//import Bus from "@/utils/bus";
import {fenchqueryStock} from "@/api/inventory";
//import {fetchReceivableAccount} from '@/api/receipt'
export default {
  props: {
    fixedOption: {
      Object
    },
//  左侧树形控件,
    treeData:{
    		type:Array,
  		default(){
  			return [{
	  			label: '全部商品',
	  			children:[]	 
			}]
  		}
    },
    queryData:{
    		type:Object,
    		default(){
    			return{}
    		}
    },
    getIndex:{
    		type:Number,
    		default:0
    }
  },
  data() {
    return {
      bankName: "",
      url: "全部",
      wh: {
        width: "775px",
        height: "560px"
      },
      tableData:[],
      callBackData:[],
      backgroundColor: {},
      selectloding:true,
      zIndex: {},
      jumperPage: "",
      pageNum: 1,
      pageSize: 15,
      index: "",
      tableloding:false
    };
  },
  components: {
//  receiptTable,
//  thisUrl
  },
  created() {
//  this.getHandler();
//	console.log(this.treeData);
  },
  methods: {
  	cancle(){
  		this.fixedOption.inventoryShow=false
  	},
  	nodeClick(d){
  		this.tableloding=true;
		const _self = this;
		this.queryData.batchNo = d.label;
		return new Promise((resolve, reject)=>{
			fenchqueryStock(_self.queryData).then(response=>{
				let data = response.data.list.list;
				console.log(data);
				this.tableData = [];
				data.forEach((item,index)=>{
					this.tableData.push({
						'batchNo':item.batchNo,
						'goodsColorNo':item.goodsColorNo,
						'goodsName':item.goodsName,
						'goodsNo':item.goodsNo,
						'stockCount':item.stockCount,//盘点前条数
						'stockQuantity':item.stockQuantity,//盘点前数量
						'stockUnit':item.stockUnit,//盘点 前/后 单位
						'goodsId':item.goodsId,
						"goodsColorId":item.goodsColorId,
						"stockId":item.stockId
					})
				})
				this.tableloding=false;
				resolve(true);
			}).catch(err=>{
				reject(false);
			})
		})
  },
  //选择数据
  handleSelectionChange(row){
  	this.callBackData = [];
  	this.callBackData = row;
  },
  choose(){
  	console.log(this.callBackData.length);
  	 if (this.callBackData.length === 0) {
        this.$message({
          type: "error",
          message: "至少选择一项"
        });
        return false;
      }
  	this.$emit("tableInfo",this.callBackData,this.getIndex);
  	this.tableData = [];
  }
//  eve() {
//    Bus.$emit("NewDepotShow", true, 1);
//  },
//  getInfo(index) {
//    this.index = index;
//  },
//  getHandler() {
//    return new Promise((resolve, reject) => {
//      fetchReceivableAccount({
//        pageNum: this.pageNum,
//        pageSize: this.pageSize,
//        bankName:this.bankName
//      })
//        .then(response => {
//          var res = response;
//          if (res.code === 0) {
//            this.tableData = res.data.list;
//            this.pages = res.data.list.pages;
//            this.pageNum = res.data.list.pageNum;
//            this.pageSize = res.data.list.pageSize;
//            this.total = res.data.list.total;
//            this.jumperPage = res.data.list.pageNum;
//          } else {
//            this.$message({
//              type: "error",
//              message: res.msg
//            });
//          }
//        })
//        .catch(err => {
//          console.log(err);
//          reject(false);
//        });
//    });
//  },
//  pageChange(index) {
//    if (index === 1) {
//      if (this.pageNum <= 1) {
//        this.pageNum = 1;
//        return false;
//      }
//      this.pageNum--;
//    } else if (index === 2) {
//      if (this.pageNum >= this.pages) {
//        this.pageNum = this.pages;
//        return false;
//      }
//      this.pageNum++;
//    } else if (index === 3) {
//      if (
//        this.jumperPage === "" ||
//        this.jumperPage < 1 ||
//        this.jumperPage > this.pages
//      ) {
//        this.jumperPage = this.pageNum;
//        return false;
//      }
//      this.pageNum = this.jumperPage;
//    } else {
//      if (this.pageSize === "") {
//        this.pageSize = this.tableData.pageSize;
//        return false;
//      }
//    }
//    this.getHandler({ pageNum: this.pageNum, pageSize: this.pageSize });
//  },
//  sureChose() {
//    if (this.index === "") {
//      this.$message({
//        type: "error",
//        message: "请选择会计科目"
//      });
//      return false;
//    }
//    this.$emit("receiptInfo", {
//      name: this.tableData.list[this.index].bankName,
//      id: this.tableData.list[this.index].receiptId
//    });
//    this.fixedOption.receiptShow = false;
//  },
//  cancle() {
//    this.index = "";
//    this.fixedOption.receiptShow = false;
//  }
  }
};
</script>

<style scoped lang="scss">
.content-left{
	height: 90%;
	width: 240px;
	float: left;
/*	border-right: 1px solid #CCCCCC;*/
	}
	.content-right{
		height: 90%;
		margin-left:240px;
	}
.fade-in-enter-active {
  transition: all 0.3s;
}
.fade-in-leave-active {
  transition: all 0.3s;
}
.fade-in-enter {
  transform: translate3d(0, -100px, 0);
  opacity: 0;
}
.fade-in-leave-to {
  transform: translate3d(0, -100px, 0);
  opacity: 0;
}
.fix-box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  // background: rgba(0,0,0,.3);
  z-index: 10000;
  .content {
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-width: 1px;
    border-style: solid;
    border-color: #868686;
    background-color: #fff;
    .fix-top {
      background-color: #868686;
      height: 32px;
      color: #fff;
      position: relative;
      span.text {
        line-height: 32px;
        padding-left: 10px;
        font-size: 14px;
      }
      b.close {
        width: 20px;
        height: 19px;
        font-weight: 700;
        background-color: #fff;
        text-align: center;
        line-height: 19px;
        color: #868686;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        &:hover {
          background: #f56c6c;
          color: #fff;
        }
      }
    }
    .fix-content {
      width: 100%;
      height: calc(100% - 32px);
      padding: 15px;
      .input {
        width: 220px;
        display: inline-block;
      }
    }
  }
}
.page-contain {
  margin-top: 15px;
  font-size: 0;
  line-height: 28px;
  span {
    display: inline-block;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    color: #333;
    margin-right: 10px;
    vertical-align: middle;
    i {
      color: #97bafe;
      padding: 0 4px;
    }
    input {
      border: 1px solid #ccc;
      width: 30px;
      height: 20px;
      text-align: center;
      margin: 0 5px;
    }
  }
  span.prev,
  span.next {
    width: 60px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  span.jumper {
    margin-left: 10px;
  }
}
</style>
<style>
.fix-content {
	overflow: hidden;
}
.fix-content .search {
  font-size: 0;
}
.fix-content .search .el-input input {
  border-color: #868686;
}
.fix-content .search .el-input input:hover {
  border-color: #7b8ae6;
  box-shadow: 0 0 4px 0 #7b8ae6;
}
.fix-content .search .el-input input:focus {
  border-color: #7b8ae6;
  box-shadow: 0 0 4px 0 #7b8ae6;
}
.fix-content .search .el-button {
  color: #333;
  border-color: #868686;
  background-color: #ffcc66;
  margin-left: 25px;
}
.fix-content .search .el-button:hover {
  background-color: rgba(255, 204, 102, 0.8);
}

</style>>