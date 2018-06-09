<template>
  <div class="app-container receipt-container " v-loading="loading">
    <div class="page-title">
      <!--标题栏-->
      <el-row :gutter="10">
        <el-col :span="8">
        	<el-button type="danger" size="mini" align="left" icon="el-icon-circle-plus-outline" @click="toAdd">新增应收调账</el-button>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">应付调账-历史</span>
          </el-row>
        </el-col>
         <el-col :span="8">
            <el-row type="flex" justify="end">
                <el-button type="primary" size="mini" @click="reLoadData">刷新</el-button>
            </el-row>        	
        </el-col>
      </el-row>
      <div class="line"></div>
    </div>
    <!--标题栏-->
    <div class="search-box-form">      
      <el-row>
    	  <el-col :span="5">
          <label>单据日期(起)</label>
          <el-date-picker v-model="queryData.starSheetDate" format="yyyy-MM-dd"    value-format="yyyy-MM-dd" type="date"></el-date-picker>
    	  </el-col>
        <el-col :span="5">
          <label>单据日期(止)</label>
           <el-date-picker v-model="queryData.endSheetDate"  format="yyyy-MM-dd"    value-format="yyyy-MM-dd" type="date"></el-date-picker>
        </el-col>
        <el-col :span="5">
          <label>单据编号</label>
			    <el-input v-model="queryData.sheetCode"></el-input>
			  </el-col>
        <el-col :span="5">
          <label class="height-m">往来单位</label>
          <el-autocomplete class="form-item" size="small" v-model="queryData.customerName" @focus="which=1"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                       @select="handleSelect">
              <el-button slot="append" icon="el-icon-search" @click="fixedOption.supplierShow=true"></el-button>
          </el-autocomplete>
			  </el-col>
        <el-col :span="5">
          <label  class="height-m">经手人</label>
          <el-autocomplete class="form-item" size="small" v-model="queryData.handMan" @focus="which=3"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                       @select="handleSelect">            
              <el-button  slot="append" icon="el-icon-search" @click="fixedOption.brokerageShow=true"></el-button>
          </el-autocomplete>			    
			  </el-col>	
        <el-col :span="5">
          <label>调整类型</label> 
          <el-select v-model="queryData.sheetType">
            <el-option label="全部" value=""> </el-option>
            <el-option label="应付增加" value="310"> </el-option>
            <el-option label="应付减少" value="320"> </el-option>
          </el-select>
		</el-col>		
        <el-col :span="5">
          <label>单据状态</label> 
          <el-select v-model="queryData.sheetState">
            <el-option label="全部" value=""> </el-option>
            <el-option label="已记账" value="10"> </el-option>
            <el-option label="草稿" value="40"> </el-option>
          </el-select>
		</el-col>
        <el-col :span="5">
          <label>单据备注</label>
			    <el-input v-model="queryData.remark"></el-input>
			  </el-col>
        <el-col :span="2">
			    <el-button size="mini" type="danger"  @click="getHistoryReceipt">查询</el-button>
			    <!-- <el-checkbox v-model="allChecked">显示红冲</el-checkbox> -->
			  </el-col>
			</el-row>
    </div>
    <div class="table-contain">
      <el-table  style="width: 100%;height:100%" height="100%" :data="tableData"
         v-loading="loading" element-loading-text="数据加载中..."
        border fit highlight-current-row :stripe="true" size="mini">
        <el-table-column header-align="center" fixed type="index" label="序号" width="50"></el-table-column>
        <el-table-column header-align="center" fixed label="操作" width="80px">
          <template slot-scope="scope">
            <div class="scope-flex">
            	<el-button v-if="scope.row.sheetStatus===40" class="flex-btn" type="text" size="mini"  @click="receiptAdjustmentDelete(scope.$index)">删除</el-button>
              <el-button v-else  :disabled="true" class="flex-btn" type="text" size="mini" >删除</el-button>
              <el-button class="flex-btn" type="text" size="mini" @click="copyDataAdd(scope.row)">复制</el-button> 
            </div>
          </template>
        </el-table-column>
        <el-table-column header-align="center"  fixed prop="businessDate" label="单据日期" width="95">
         
        </el-table-column>
        <el-table-column header-align="center" fixed prop="businessNo" label="单据编号" width="190">
           <template slot-scope="scope">
            <span class="blue1" @click="goHistory(scope.row)" style="cursor:pointer;" v-text="scope.row.businessNo"></span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" prop="sheetStatus" label="单据状态">
          <template slot-scope="scope">
            <span v-if="scope.row.sheetStatus!==40" :class="{red:scope.row.sheetStatus===20,blue1:scope.row.sheetStatus===30}">
              已记账             
            </span>
            <span v-else-if="scope.row.sheetStatus===40" >草稿</span> 
          </template>
        </el-table-column>
        <el-table-column header-align="center" prop="customerName" label="往来单位">          
        </el-table-column>
        <!-- <el-table-column header-align="center" prop="totalItem" label="优惠金额"></el-table-column> -->
        <el-table-column header-align="center" prop="receivableMoney" label="金额"></el-table-column> 
        <el-table-column header-align="center" prop="handler" label="经手人"></el-table-column>
        <el-table-column header-align="center" prop="remark" label="摘要"></el-table-column>
        <el-table-column header-align="center" prop="remark" label="单据备注" width="250"></el-table-column>
      </el-table>
    </div>

    <div style="margin-top: 10px;"></div>
    <!--分页栏-->
    <div class="block" style="text-align:center">
      <el-pagination @size-change="handleSizeChange" 
      @current-change="handleCurrentChange"
       :current-page="queryData.pageNum" 
       :page-sizes="[15, 30, 45, 60, 75]" 
       :page-size="queryData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <fixed-page1 @supplierInfo="getSupplierInfo" :fixedOption="fixedOption"></fixed-page1>
    <fixed-page3 @handlerInfl="getHandlerInfo" :fixedOption="fixedOption"></fixed-page3>
  </div>
</template>

<script>
import fixedPage1 from '@/components/fixed/fixedSupplier'
import fixedPage3 from '@/components/fixed/fixedBrokerage'
import {fetchBrokerage,  fetchSupplier} from '@/api/purchase'
import {fetchReceiptBillPayDel,fetchAdjustmentPayHistory,fetchPaymentAdjustmentDel} from '@/api/receipt'
export default {
  name: 'receipthistory',
  data () {
    return {
      allChecked:false,//显示红冲
      supplierBorder: false,
      handlerBorder: false,
      which: 1,
      brokerage: [],
      supplier: [],
      fixedOption: {//弹框显示
        supplierShow: false,
        brokerageShow: false
      },
      queryData: {  
        sheetType:'',
        starSheetDate: '',
        endSheetDate: '',
        sheetCode: '',
        customerName: '',
        customerId:'',
        handMan: '',
        handManId:'',
        part: '',
        singlePerson: '',
        sheetState: '',
        remark:'',
        pageSize: 15,
        pageNum: 1
      },
      loading: true,//表格加载动画
      tableData: [],
      total: 0,      
    }
  },
  components: {
    fixedPage1,
    fixedPage3,
  },
  created () {
    this.queryReceiptList()//付款历史
    this.getBrokerage();//经手人列表
    this.getSupplier();//来往单位列表
  },
  methods: {  
    reLoadData(){//刷新表格
        this.getHistoryReceipt()
    },
    toAdd(){//前往新增
        this.$router.push({path:'payable_adjustment'})
    }, 
    getHistoryReceipt(){ //点击查询搜索历史      
      this.queryData.pageNum=1
      this.queryData.pageSize=15
      if (this.queryData.starSheetDate !== ''&&this.queryData.endSheetDate === '') {
          this.tipShow("结束时间不能为空");
          return false
      } else if(this.queryData.starSheetDate === ''&&this.queryData.endSheetDate !== ''){
          this.tipShow("开始时间不能为空");
          return false
      } else{
        this.queryReceiptList()
      }        
    },
    queryReceiptList(){ //收款单历史列表
      const _self = this        
      let Data={
        createdFrom:_self.queryData.starSheetDate,
        createdTo:_self.queryData.endSheetDate,
        customerId:_self.queryData.customerId,
        customerName:_self.queryData.customerName,
        type:_self.queryData.sheetType,
        handlerUserId:_self.queryData.handManId,
        pageNum:_self.queryData.pageNum,        
        pageSize:_self.queryData.pageSize
      }  
      fetchAdjustmentPayHistory(Data).then(response => {
        if(response.code===0){
          _self.tableData = response.data.list.list
          _self.loading = false
          _self.total = response.data.list.total
          _self.queryData.pageSize = response.data.list.pageSize
          _self.queryData.pageNum = response.data.list.pageNum
        }else{
          this.$message({
            type: 'error',
            message:response.msg
          })
           _self.loading = false
        }   
      })
    },
    copyDataAdd(row){
      console.log("copy:"+JSON.stringify(row))
      this.$router.push({
        name:'payable_adjustment',
        query: {type:'copy',receiptadjData:row}
      })
    },
    goHistory ({inOutbalanceId ,sheetStatus}) {//跳转相应单据详情
      let obj = {
        '40': 'payable_adjustment',//草稿
        '10': 'payable_adjustment_already',//已记账
        '20': 'payable_adjustment_already',//已记账
        '30': 'payable_adjustment_already'//已记账
      }
      if(obj[sheetStatus]==='payable_adjustment'){
        this.$router.push({
            name: obj[sheetStatus],
            query: {type:'darft',receiptadjData:inOutbalanceId}
        })
      }else{
        this.$router.push({
            name: obj[sheetStatus],
            query: { inOutbalanceId }
        })
      }      
    },
    handleSizeChange (val) {//每页条数改变时
      this.queryData.pageSize = val
      this.queryReceiptList()
    },
    handleCurrentChange (val) {//当前页数改变发送请求
      this.queryData.pageNum = val
      this.queryReceiptList()
    },
    querySearchs (queryString, cb) {//搜索遍历字段
      var restaurants
      switch (this.which) {
        case 1:
          restaurants = this.supplier
          break
        case 3:
          restaurants = this.brokerage
          break
        default:
          break
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        switch (this.which) {
          case 1:
            return (restaurant.customerName.indexOf(queryString) > -1)
            break
          case 3:
            return (restaurant.userName.indexOf(queryString) > -1)
            break
          default:
            break
        }
      }
    },
    handleSelect (item) {//下拉选择
      let searchInfos
      switch (this.which) {
        case 1:
          this.queryData.customerId = item.customerId
          this.queryData.customerName = item.value
          break
        case 3:
          this.queryData.handManId = item.userId
          this.queryData.handMan = item.value
          break
        default:
          break
      }
    },
    getSupplierInfo (data) {//组件传参
      this.queryData.customerName = data.name
      this.queryData.customerId = data.name
    },
    getHandlerInfo (data) {//组件传参
      this.queryData.handMan = data.name
      this.queryData.handManId = data.id
    }, 
    getSupplier () {//来往单位列表
      const _self = this
      return new Promise((resolve, reject) => {
        fetchSupplier().then(response => {
          this.supplier = response.data.data.list.list
          for (var i = 0; i < this.supplier.length; i++) {
            this.supplier[i].value = this.supplier[i].customerName
          }
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    getBrokerage () {//获取经手人信息
      const _self = this
      return new Promise((resolve, reject) => {
        fetchBrokerage().then(response => {
          this.brokerage = response.data.data.list.list
          for (var i = 0; i < this.brokerage.length; i++) {
            this.brokerage[i].value = this.brokerage[i].userName
          }
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },     
    receiptAdjustmentDelete (index) { // 删除草稿记录
      const _this = this;
      console.log(_this.tableData[index])
      if (_this.tableData[index].sheetStatus === 40) {
        _this.$confirm('此操作将删除该条订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.delReceiptHistory(_this.tableData[index].inOutbalanceId, index)
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    delReceiptHistory(receiptId, index) {//删除
      const _this = this;
      fetchPaymentAdjustmentDel(receiptId).then(response => {
            if (response.code === 0) {
               _this.queryReceiptList();
              _this.$message({
                type: "success",
                message: "删除成功"
              });              
            } else {
              _this.$message({
                type: "error",
                message:response.msg
              });
            }
          })
    }, 
    
  }
}
</script>
<style scoped>
.title {
  font-size: 24px;
  color: #575757;
}
.receipt-container .table-contain {
  height: calc(100% - 240px);
}
.receipt-container .table-contain .scope-flex{
  display: flex;
}
.receipt-container .table-contain .scope-flex .flex-btn{
  flex:1;
}
.receipt-container .table-contain .el-table thead tr {
  color: #909399;
  font-weight: 500;
  background-color: rgb(226, 233, 239);
}
.receipt-container .red {
  color: #eb453c;
}
.receipt-container .green {
  color: #029b26;
}
.receipt-container .gay {
  color: #9999;
}
.receipt-container .blue1 {
  color: #2369b5;
  user-select: none;
}
.receipt-container .line {
    width: 100%;
    height: 5px;
    margin:5px 0;
    border-bottom: 3px solid #d4d8e1;
}
</style>
<style>

.receipt-container .search-box-form{
  margin:10px 0;
}
.receipt-container .search-box-form .height-m{
      margin-top: 7px;
}
.receipt-container .search-box-form .el-form--inline .el-form-item__label{
    font-weight: 400 !important;
    font-size:12px !important;
    text-align:right;
}
.receipt-container .search-box-form .el-autocomplete.form-item,.receipt-container .search-box-form .el-date-editor {
    height: 100%;
    margin-top: 0;
}
.receipt-container .search-box-form .el-input__icon{
  line-height: 28px;
} 
.receipt-container .search-box-form label{
  display: inline-block;
  width: 70px;
  text-align: right;
  font-size: 12px;
  font-weight: normal;
  color: #606266;
  vertical-align:middle;
}
.receipt-container .search-box-form .el-col{
  margin-bottom: 5px;
}
.receipt-container .search-box-form .el-col .el-input.el-input--large,
.receipt-container .search-box-form .el-col .el-autocomplete.form-item,
.receipt-container .search-box-form .el-col .el-select.el-select--large{
 display: inline-block;
 width: calc(100% - 80px);
}
.receipt-container .search-box-form .el-col .el-select .el-input{
  width:100%;
}
.receipt-container .search-box-form .el-input-group__append{
  padding: 0 10px;
}
.receipt-container .search-box-form .el-col .el-input .el-input__inner{
  height: 28px;
  line-height: 28px;
  font-size:12px;
}
</style>
