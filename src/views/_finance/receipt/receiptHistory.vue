<template>
  <div class="app-container receipt-rechistory-container ">
    <div class="page-title">
      <!--标题栏-->
      <el-row :gutter="10">
        <el-col :span="8">
        	<el-button type="danger" size="mini" align="left" icon="el-icon-circle-plus-outline" @click="toAdd">新增收款单</el-button>
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
          <el-date-picker v-model="queryData.endSheetDate"  format="yyyy-MM-dd"    value-format="yyyy-MM-dd"  type="date"></el-date-picker>
			  </el-col>
        <el-col :span="5">
          <label>单据编号</label>
			    <el-input v-model="queryData.sheetCode"></el-input>
			  </el-col>
        <el-col :span="5">
          <label  class="height-m">往来单位</label>
          <el-autocomplete class="form-item" size="small" v-model="queryData.intercourseUnit" @focus="which=1"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                       @select="handleSelect">
              <el-button slot="append" icon="el-icon-search" @click="fixedOption.supplierShow=true"></el-button>
          </el-autocomplete>
			  </el-col>
        <el-col :span="5">
          <label  class="height-m">收款账户</label>
          <el-autocomplete class="form-item" size="small" v-model="queryData.receivableAccount" @focus="which=4"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                          @select="handleSelect">          
              <el-button slot="append" icon="el-icon-search" @click="fixedOption.receiptShow=true"></el-button>
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
          <label>单据状态</label>	
          <el-select v-model="queryData.sheetState" placeholder="请选择">
            <el-option label="全部" value=""> </el-option>
            <el-option label="已记账" value="10"> </el-option>
            <el-option label="草稿" value="20"> </el-option>
          </el-select>
			  </el-col>
        <el-col :span="5">
          <label>单据备注</label>
			    <el-input v-model="queryData.remark"></el-input>
			  </el-col>
        <el-col :span="2">
			    <el-button type="danger" size="mini"  @click="getHistoryReceipt">查询</el-button>
			    <!-- <el-checkbox v-model="allChecked">显示红冲</el-checkbox> -->
        </el-col>
			</el-row>
    </div>
    <div class="table-contain">
      <el-table header-align="center" style="width: 100%;height:100%" height="100%" :data="tableData"
      :summary-method="getSummaries" show-summary v-loading="loading" element-loading-text="数据加载中..."
       border fit highlight-current-row :stripe="true" size="mini"> 
        <el-table-column fixed type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column fixed label="操作">
          <template slot-scope="scope">
            <div class="scope-flex">
            	<el-button v-if="scope.row.sheetStatus===10" :disabled="true" class="flex-btn" type="text" size="mini">删除</el-button>
              <el-button v-else class="flex-btn" type="text" size="mini"  @click="receiptDelete(scope.$index)">删除</el-button>
              <el-button class="flex-btn" type="text" size="mini"  @click="copyDataAdd(scope.row)" >复制</el-button> 
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed prop="sheetDate" label="单据日期" width="95">
        </el-table-column>
        <el-table-column fixed prop="sheetNo" label="单据编号" width="190">
          <template slot-scope="scope">
            <span class="blue1" @click="goHistory(scope.row)" style="cursor:pointer;" v-text="scope.row.sheetNo"></span>
          </template>
        </el-table-column>
        <el-table-column prop="sheetStatus" label="单据状态">
          <template slot-scope="scope">
            <span v-if="scope.row.sheetStatus===10" :class="{red:scope.row.settleStatus===20,blue1:scope.row.settleStatus===30}">
              已记账             
            </span>
            <span v-else-if="scope.row.sheetStatus===20" >草稿</span>            
          </template>
        </el-table-column>
        <el-table-column prop="customerName" label="往来单位">
        </el-table-column>
        <!-- <el-table-column prop="" label="优惠金额"></el-table-column> -->
        <el-table-column prop="actualMoney" label="金额"></el-table-column>
        <el-table-column prop="bankName1" label="收款账户1" width="120">
        </el-table-column>
        <el-table-column prop="paymentAmount1" label="收款金额1">
          <template slot-scope="scope">
            <span v-if="scope.row.paymentAmount1!==0" v-text="scope.row.paymentAmount1" >
              {{scope.row.paymentAmount1}}            
            </span>           
          </template>
        </el-table-column>
        <el-table-column prop="bankName2" label="收款账户2"  width="120"></el-table-column>
        <el-table-column prop="paymentAmount2" label="收款金额2">
          <template slot-scope="scope">
            <span v-if="scope.row.paymentAmount2!==0" v-text="scope.row.paymentAmount2" >
              {{scope.row.paymentAmount2}}            
            </span>           
          </template>
        </el-table-column>
        <el-table-column prop="" label="使用预收款" width="100"></el-table-column>
        <el-table-column prop="handler" label="经手人"></el-table-column>
        <el-table-column prop="remark" label="摘要"></el-table-column>
        <el-table-column prop="remark" label="单据备注" width="250"></el-table-column>
      </el-table>
    </div>

    <div style="margin-top: 10px;"></div>
    <!--分页栏-->
    <div class="block" style="text-align:center">
      <el-pagination @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
        :current-page="queryData.pageNum"
         :page-sizes="[15, 30, 45, 60, 75]"
          :page-size="queryData.pageSize" 
          layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <fixed-page1 @supplierInfo="getSupplierInfo" :fixedOption="fixedOption"></fixed-page1>
    
    <fixed-page3 @handlerInfl="getHandlerInfo" :fixedOption="fixedOption"></fixed-page3>
    <fixed-receipt @receiptInfo="getreceiptInfo" :fixedOption="fixedOption"></fixed-receipt>
  </div>
</template>

<script>
import fixedPage1 from '@/components/fixed/fixedSupplier'
import fixedPage3 from '@/components/fixed/fixedBrokerage'
import fixedReceipt from '@/components/fixed/fixedReceipt'
import {  fetchBrokerage,  fetchSupplier} from '@/api/purchase'
import {fetchReceiptBillDel,fetchQueryReceiptList,fetchReceivableAccount,fetchReceivableAccountDetail} from '@/api/receipt'
export default {
  name: 'receipthistory',
  data () {
    return {
      allChecked:false,//显示红冲     
      receivableaccountList:[],//收款账户
      supplierBorder: false,
      deportBorder: false,
      handlerBorder: false,
      which: 1,
      brokerage: [],
      supplier: [],
      fixedOption: {//弹框显示
        supplierShow: false,
        brokerageShow: false,
        receiptShow:false,
      },
      queryData: {
        starSheetDate:'',//单据开始日期
        endSheetDate:'',//单据结束日期
        sheetCode: '',//单据编号
        intercourseUnit: '',//来往单位
        intercourseUnitid:'',
        receivableAccount: '',
        receivableAccountid:'',
        handMan: '',
        handManId: '',
        part: '',
        singlePerson: '',
        sheetState: '',
        remark:'',
        pageSize: 15,
        pageNum: 1
      },
      loading: false,//表格加载动画
      tableData: [],
      total: 0,
      allAmounts:'',
      amounts1:'',
      amounts2:''
    }
  },
  components: {
    fixedPage1,
    fixedPage3,
    fixedReceipt,//账户弹框
  },
  created () {
    this.queryReceiptList()//收款人历史
    this.getBrokerage();//经手人列表
    this.getReceivableAccount();//获取收款账户信息
    this.getSupplier();//来往单位列表
  },
  methods: {
    tipShow(name){
       this.$message({
            type: 'error',
            message: name+'不能为空'
       })
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
    getReceivableAccount() {//获取收款账户信息
      const _self = this
      fetchReceivableAccount().then(response => {
      	_self.receivableaccountList = response.data.list.list          
          for (var i = 0; i < _self.receivableaccountList.length; i++) {
              _self.receivableaccountList[i].value = _self.receivableaccountList[i].bankName              
          }
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
  	toAdd(){//前往新增收款单界面
  		 this.$router.push("/finance/receipt_sheet") //字符串
  	},
    inputFocuse (index) {
      this.which = index
      if (this.which === 1) {
        this.supplierBorder = true
      } else if (this.which === 2) {
        this.deportBorder = true
      } else {
        this.handlerBorder = true
      }
    },
    copyDataAdd(row){
      console.log(JSON.stringify(row))
      this.$router.push({
        name:'receipt_sheet',
        query: { rowData:row }
      })
    },
    goHistory ({settlementId ,sheetStatus}) {//前往单据详情页面    
      let obj = {
        '20': 'receipt_sheet_draft',//草稿
        '10': 'receipt_sheet_already'//已记账
      }
      console.log(obj[sheetStatus])
      this.$router.push({
        name: obj[sheetStatus],
        query: { settlementId }
      })
    },
     getSummaries (param) {//合计
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 1 || index === 2 || index === 3 || index === 4 || index === 5|| index === 7|| index === 9|| index === 11|| index === 12|| index === 13|| index === 14) {
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index]
        }
      })
      this.allAmounts = sums[6]
      this.amounts1 = sums[8]
      this.amounts2 = sums[10]
      /*sums[8] = this.tableData[this.y].goodsUnit ? this.tableData[this.y].goodsUnit : ''*/
      return sums
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
        case 4:
          restaurants = this.receivableaccountList
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
          case 2:
            return (restaurant.storeName.indexOf(queryString) > -1)
            break
          case 3:
            return (restaurant.userName.indexOf(queryString) > -1)
            break
          case 4:
            return (restaurant.bankName.indexOf(queryString) > -1)
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
          this.queryData.intercourseUnitid = item.customerId
          this.queryData.intercourseUnit = item.value
          break
        case 2:
          this.requestData.storeId = item.storeId
          this.requestData.storeName = item.value
          break
        case 3:
          this.queryData.handManId = item.userId
          this.queryData.handMan = item.value
          break
        case 4:
          this.queryData.receivableAccountid = item.bankAccount
          this.queryData.receivableAccount = item.value
          break
        default:
          break
      }
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
    getreceiptInfo (data) {//组件账号传参
      this.queryData.receivableAccount = data.name;
      this.queryData.receivableAccountid = data.id;
    },
    getSupplierInfo (data) {//组件传参
      this.queryData.intercourseUnit = data.name
      this.queryData.intercourseUnitid = data.name
    },
    getHandlerInfo (data) {//组件传参
      this.queryData.handMan = data.name
      this.queryData.handManId = data.id
    },
    // 删除记录
    receiptDelete (index) {
      if (this.tableData[index].sheetStatus === 20) {
        this.$confirm('此操作将删除该条订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.tableData[index].settlementId, index)
          this.delReceiptHistory(this.tableData[index].settlementId, index)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    delReceiptHistory(receiptId, index) {
      const _this = this;
      fetchReceiptBillDel(receiptId).then(response => {
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
    queryReceiptList(){ //收款单历史列表
      const _self = this        
      let Data={
        handler:_self.queryData.handMan,
        customerName:_self.queryData.intercourseUnit,
        sheetNo:_self.queryData.sheetCode,
        sheetStatus:_self.queryData.sheetState,
        payCard1:_self.queryData.receivableAccount,
        remark:_self.queryData.remark,
        createdFrom:this.queryData.starSheetDate,
        createdTo:this.queryData.endSheetDate,
        pageNum:_self.queryData.pageNum,        
        pageSize:_self.queryData.pageSize
      }  
      this.loading=true
      fetchQueryReceiptList(Data).then(response => {      
        if(response.code===0){
          this.loading=false
          _self.tableData = response.data.list.list
          _self.loading = false
          _self.total = response.data.list.total
          _self.queryData.pageSize = response.data.list.pageSize
          _self.queryData.pageNum = response.data.list.pageNum
        }else{
          this.loading=false
        }	       
      })      
    }
  }
}
</script>
<style scoped>
.receipt-rechistory-container .table-contain {
  height: calc(100% - 240px);
}
.receipt-rechistory-container .table-contain .scope-flex{
  display: flex;
}
.receipt-rechistory-container .table-contain .scope-flex .flex-btn{
  flex:1;
}
.receipt-rechistory-container .table-contain .el-table thead tr {
  color: #909399;
  font-weight: 500;
  background-color: rgb(226, 233, 239);
}
.receipt-rechistory-container .red {
  color: #eb453c;
}
.receipt-rechistory-container .green {
  color: #029b26;
}
.receipt-rechistory-container .gay {
  color: #9999;
}
.receipt-rechistory-container .blue1 {
  color: #2369b5;
  user-select: none;
}
.receipt-rechistory-container .line {
    width: 100%;
    height: 5px;
    margin:5px 0;
    border-bottom: 3px solid #d4d8e1;
}
</style>
<style> 
/* @import '../../../assets/modulefilestyle/css/table_edit.css'; */
.receipt-rechistory-container .search-box-form{
  margin:10px 0;
}
.receipt-rechistory-container .search-box-form .height-m{
      margin-top: 7px;
}
.receipt-rechistory-container .search-box-form .el-form--inline .el-form-item__label{
    font-weight: 400 !important;
    font-size:12px !important;
    text-align:right;
}
.receipt-rechistory-container .search-box-form .el-autocomplete.form-item,.receipt-container .search-box-form .el-date-editor {
    height: 100%;
    margin-top: 0;
}
.receipt-rechistory-container .search-box-form .el-input__icon{
  line-height: 28px;
} 
.receipt-rechistory-container .search-box-form label{
  display: inline-block;
  width: 70px;
  text-align: right;
  font-size: 12px;
  font-weight: normal;
  color: #606266;
  vertical-align:middle;
}
.receipt-rechistory-container .search-box-form .el-col{
  margin-bottom: 5px;
}
.receipt-rechistory-container .search-box-form .el-col .el-input.el-input--large,
.receipt-rechistory-container .search-box-form .el-col .el-autocomplete.form-item,
.receipt-rechistory-container .search-box-form .el-col .el-select.el-select--large{
 display: inline-block;
 width: calc(100% - 80px);
}
.receipt-rechistory-container .search-box-form .el-col .el-select .el-input.el-input--large.el-input--suffix{
  width:100%;
}
.receipt-rechistory-container .search-box-form .el-input-group__append{
  padding: 0 10px;
}
.receipt-rechistory-container .search-box-form .el-col .el-input .el-input__inner{
  height: 28px;
  line-height: 28px;
  font-size:12px;
}
</style>