<template>
  <div class="app-container receipt-recdraft-container">
    <!-- <page-header print="print" title="收款单" :orderNumber="requestData.orderNo"  historyUrl="'/'"></page-header> -->
    <div class="page-title">
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="bill-code">
            <label class="code-label">NO.</label>
            <span class="code">{{requestData.orderNo}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">付款单-草稿</span>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="end">
            <el-button type="primary" size="mini">打印</el-button>
            <el-button @click="historyRender" size="mini">历史</el-button>
          </el-row>
        </el-col>
      </el-row>
      <div class="line"></div>
    </div>
    <div class="search-box-form">  
      <!--查询栏--> 
      <el-row >
        <el-col :span="6">
            <label class="height-m">客户</label>
            <el-autocomplete class="form-item" size="small" v-model="requestData.supplierName" @focus="which=1"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                       @select="handleSelect">
              <el-button slot="append" icon="el-icon-search" @click="fixedOption.supplierShow=true"></el-button>
            </el-autocomplete>
        </el-col>
        <el-col :span="6">
           <label  class="height-m">经手人</label>
            <el-autocomplete class="form-item" size="small" v-model="requestData.handler" @focus="which=3"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                       @select="handleSelect">            
              <el-button  slot="append" icon="el-icon-search" @click="fixedOption.brokerageShow=true"></el-button>
            </el-autocomplete>
        </el-col>
        <el-col :span="6">
          <label>单据日期</label>
            <el-date-picker v-model="requestData.sheetDate" format="yyyy-MM-dd"    value-format="yyyy-MM-dd" type="date"></el-date-picker>
        </el-col>
        <!-- <el-col :span="6">
          <label>应收余额</label>
          <el-input v-model="requestData.receivableBalance"></el-input>
        </el-col> -->
        <el-col :span="6">
          <label>应付余额</label>
          <el-input :disabled="true" v-model="requestData.payableBalance"></el-input>
        </el-col>
        </el-row >
        <el-row >
        <el-col :span="6">
          <label  class="height-m" >付款账号</label>
          <el-autocomplete class="form-item" size="small" v-model="requestData.receivable" @focus="which=4"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                          @select="handleSelect">          
              <el-button slot="append" icon="el-icon-search" @click="fixedOption.receiptShow=true"></el-button>
          </el-autocomplete>
        </el-col>
        <el-col :span="6">
          <label>付款金额</label>
          <el-input v-model="requestData.receivableAmount" @change="sumMoneySettle"></el-input>
        </el-col>
        <el-col :span="6">
          <label class="height-m">付款账号2</label>
          <el-autocomplete class="form-item" size="small" v-model="requestData.receivable2" @focus="which=5"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                          @select="handleSelect">          
              <el-button slot="append" icon="el-icon-search" @click="fixedOption.receiptShow=true"></el-button>
          </el-autocomplete>
        </el-col>
        <el-col :span="6">
          <label>付款金额2</label>
          <el-input v-model="requestData.receivableAmount2"  @change="sumMoneySettle"></el-input>
        </el-col>
        <!-- <el-col :span="6">
          <label>预收款金额</label>
          <el-input  v-model="requestData.prePayment"></el-input>
        </el-col>
        <el-col :span="6">
          <label>使用预收款</label>       
          <el-input v-model="requestData.preUsePayment"></el-input>
        </el-col> -->
      </el-row>                           
    </div>
    <div class="recepit-tb-title">
    	<label class="recepit-tb-h">待收款单据</label>
    	<el-checkbox v-model="allChecked" @change="getReceiptList">显示所有未结算单据</el-checkbox>
    </div>
    
    <div class="table-contain padding">
      <el-table style="width: 100%;height:calc100%" height="100%" :data="tableData" :summary-method="getSummaries"
                size="mini" :border="true"   fit highlight-current-row show-summary  
               v-loading="loading" element-loading-text="数据加载中...">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="操作" style="text-indent: 0px" width="80">
          <template slot-scope="scope">
            <i class="el-icon-circle-plus-outline" @click="add()" style="cursor:pointer"
               @mouseover="insertAddActive($event)" @mouseout="deletedAddActive($event)"></i>
            <i class="el-icon-remove-outline" @click="remove(scope.$index)" style="cursor:pointer"
               @mouseover="insertRemoveActive($event)" @mouseout="deletedRemoveActive($event)"></i>
          </template>
        </el-table-column>
        <el-table-column prop="businessDate" label="单据日期" width="120">         
        </el-table-column>
        <el-table-column prop="businessNo" label="单据编号" width="200">          
        </el-table-column>
        <el-table-column prop="periodReceivables" label="收款期限">          
        </el-table-column>
        <el-table-column prop="saleMoney" label="总商品金额" width="85">          
        </el-table-column>
        <el-table-column prop="saleMoney" label="采购金额">          
        </el-table-column>
        <el-table-column prop="saleMoney" label="本单金额">         
        </el-table-column>
        <el-table-column prop="unSettleMoney" label="未结算">          
        </el-table-column>        
        <el-table-column prop="settleMoney" label="本次结算">
           <template slot-scope="scope">
             <el-input ref="paydarftinput" v-if="scope.row.paydarftFlage"   style="width:100%" size="mini" :autofocus="true" 
             v-model="scope.row.settleMoney"  @blur="hiddenInputData(scope.row,scope.$index)" v-on:change="changeAettleMoney(scope.row)">   </el-input> 
             <span  v-if="!scope.row.paydarftFlage"   @click="showInputData(scope.row,scope.$index)" 
             style="width:100%;height:23px;display:inline-block;"   v-text="scope.row.settleMoney"></span>           
          </template> 
        </el-table-column>
        <el-table-column prop="sheetHandler" label="经手人">         
        </el-table-column>
      </el-table>
    </div>
    <div class="remark">
      <el-input v-model="requestData.remark" placeholder="单据备注"></el-input>
    </div>
    <div class="page-footer">
      <el-button @click="addReceiptBill(20)">保存草稿</el-button>
      <el-button type="danger" @click="addReceiptBill(10)">记账</el-button>
    </div>     
    <fixed-page1 @supplierInfo="getSupplierInfo" :fixedOption="fixedOption"></fixed-page1>
    <fixed-page3 @handlerInfl="getHandlerInfo" :fixedOption="fixedOption"></fixed-page3>
    <fixed-page4 @receiptInfo="getreceiptInfo" :fixedOption="fixedOption"></fixed-page4>
  </div>
</template>

<script>
import PageHeader from '@C/BDD_PageHeader'
import fixedPage1 from '@/components/fixed/fixedSupplier'
import fixedPage3 from '@/components/fixed/fixedBrokerage'
import fixedPage4 from '@/components/fixed/fixedReceipt'
import {timeNow } from '@/utils/BbdCommon'
import { mapGetters } from 'vuex';
import {  fetchBrokerage, fetchSupplier } from '@/api/purchase'
import {fetchReceivableAccountDetail,fetchReceivableAccount,fetchReceiptList,fetchReceiptBillPayUpdate,fetchReceiptPayBillDetail} from '@/api/receipt'

export default {
  name: 'receiptsheetdraft',
  data () {
    return {
      loading:true,//表格加载动画
      childrenCheckList:[],//子单数据
      childrenCheckListAdd:[],//子单外层数据
      receiptCheckList:[],
      fixedOption: {
        supplierShow: false,
        brokerageShow: false,
        receiptShow: false
      },
      requestData: {
        orderNo: '',
        supplierName: '',//客户
        supplierId: '',
        handler: '',//经手人
        handlerUserId: '',
        receivable:'',//付款账户
        receivableid:'',
        receivableAmount:'',//付款金额
        receivable2:'',//付款账户2
        receivableid2:'',   
        receivableAmount2:'',//付款金额2
        receivableBalance:'',//应收余额
        payableBalance:'',//应付余额
        prePayment:'',//预收款金额
        prePayment:'',//使用预收款金额
        sheetDate: timeNow(1),//单据日期
        preferentialAmount:'',//优惠金额
        remark: '',        
      },
      commodityAmounts:'',//总商品总额
      salesAmounts:'',//销售金额总额
      sumMoneys:'',//本金金额总额
      unsettleds:'',//未结算总额
      settlements:'',//本次结算
      tableData: [],
      which: 1,
      brokerage: [],//经手人列表
      receivableaccount:[],//收款账户
      receivableaccount2:[],//收款账户
      supplier: [],//供应商列表
      value: '',
      allChecked:false,//是否选择查看未结算
    }
  },
  created () {
     
  },
  mounted () {   
    // this.getTableData();
    this.getBrokerage();//获取经手人
    this.getSupplier();//获取客户
    this.getReceivableAccount();//获取账户数据
    this.getReceiptDraftList();//获取草稿数据
  },
  computed: {
    ...mapGetters([
      "tenantId"
    ])
  },
  methods: {
    changeAettleMoney(row){//input输入值改变事件
      row.settleMoney>row.unSettleMoney ? row.settleMoney=row.unSettleMoney : row.settleMoney
    },
    hiddenInputData(flag,index){//本次结算 编辑框隐藏
      this.$set(flag, 'paydarftFlage', false)
    },
    showInputData(flag,index){//本次结算 编辑框显示
      if(flag.unSettleMoney!==""&&flag.unSettleMoney>0){        
        this.$set(flag, 'paydarftFlage', true)
        this.$nextTick(function(){ 
          this.$refs.paydarftinput.focus()                
        })    
      }     
    },
    getReceivableAccountName(urlId,type){//账户信息详情
      fetchReceivableAccountDetail(urlId).then(response => {
        if(response.code===0){
          type===1 ? this.requestData.receivable=response.data.bankAccount.bankName : this.requestData.receivable2=response.data.bankAccount.bankName 
        }
      })
    },
    getReceiptDraftList () {//获取收款单-草稿列表     
      let urlId=this.$route.query.settlementId
      fetchReceiptPayBillDetail(urlId).then(response => {
        if(response.code===0){         
        var _this=this
        let item=response.data.receiptBill
        _this.childrenCheckListAdd=response.data.receiptBill
        _this.requestData.supplierName=item.customerName
        _this.requestData.supplierId=item.customerId
        _this.requestData.sheetDate=item.sheetDate
        _this.requestData.orderNo=item.sheetNo
        _this.requestData.handler=item.handler 
        _this.requestData.remark=item.remark ;        
        if(item.payCard1!==""&&item.payCard1!==undefined&&item.payCard1!=="0"){   
          this.getReceivableAccountName(item.payCard1,1)     
          _this.requestData.receivableid=item.payCard1          
          _this.requestData.receivableAmount=item.paymentAmount1
        }                 
        if(item.payCard2!=="0"&&item.payCard2!==undefined&&item.payCard2!==""){    
          this.getReceivableAccountName(item.payCard2,2)    
           _this.requestData.receivableid2=item.payCard2 
           _this.requestData.receivableAmount2=item.paymentAmount2
        }        
        _this.childrenCheckList=item.settlementSheetDetailList
        _this.allChecked=true
        _this.getReceiptList();
         }else{          
          this.$message({
            type: 'error',
            message:response.msg
          })   
          this.loading=false;       
        }
      }).catch(err => {
        this.$message({
          type: 'error',
          message:err
        })
        this.loading=false;
        this.$router.push('payment_history')
      });     
    },    
    sumMoneySettle(){ //收款单金额联动     
      if(this.tableData.length>0){
        if(this.requestData.receivableAmount!==""&&this.requestData.receivableAmount2===""){
           this.settlements=parseFloat(this.requestData.receivableAmount)+0 
        }else  if(this.requestData.receivableAmount2!==""&&this.requestData.receivableAmount===""){
          this.settlements=parseFloat(this.requestData.receivableAmount2)+0 
        }else{
          this.settlements=parseFloat(this.requestData.receivableAmount)+parseFloat(this.requestData.receivableAmount2)
        } 
        if(this.settlements<this.unsettleds||this.settlements===this.unsettleds){
        let listIndex=parseInt(this.tableData.length);
        let allSum=this.settlements
        this.clearInputAndTable()//金额改变时，清空原先的本次结算的值
        for(let i=0;i<this.tableData.length;i++){//金额分配
            if(allSum>this.tableData[i].unSettleMoney){
               this.tableData[i].settleMoney=this.tableData[i].unSettleMoney;
               allSum=allSum-this.tableData[i].settleMoney
            }else{
              this.tableData[i].settleMoney=allSum
              return false; 
            }
        }  
       }else{
         this.$message({
            type: 'error',
            message: '收款金额不能大于未结算金额总额'
         }) 
         this.requestData.receivableAmount!==0?this.requestData.receivableAmount="":this.requestData.receivableAmount
         this.requestData.receivableAmount2!==0?this.requestData.receivableAmount2="":this.requestData.receivableAmount2
         this.clearInputAndTable()//金额大于未结算金额总额时，清空原先的本次结算的值
       }
      }
    },
    clearInputAndTable(){//金额改变时，清空原先的本次结算的值
      this.tableData.forEach(function(item,index){
        item.settleMoney=0                  
      }) 
    },
    tipShow(name){//错误提示
       this.$message({
            type: 'error',
            message: name+'不能为空'
       })
    },    
    addReceiptBill(status){//保存草稿、记账验校
        if (this.requestData.supplierName === '') {
          this.tipShow("客户");
          return false
        } else if(this.requestData.handler===''){
          this.tipShow("经手人");
          return false
        }else if(this.requestData.receivable===''&&this.requestData.receivable2===''){
             this.tipShow("收款账户必填一个，");
             return false
        }else if(this.requestData.receivable===''&&this.requestData.receivableAmount!==''){
            this.tipShow("收款账户");  
            return false
        }else if(this.requestData.receivable!==''&&this.requestData.receivableAmount===''){
            this.tipShow("收款金额");  
            return false
        }else if(this.requestData.receivable2===''&&this.requestData.receivableAmount2!==''){
            this.tipShow("收款账户2");  
            return false
        }else if(this.requestData.receivable2!==''&&this.requestData.receivableAmount2===''){
            this.tipShow("收款金额2");  
            return false
        }else{          
          this.postReceiptBill(status);
        }
    },    
    postReceiptBill(status){//保存草稿与记账      
      var data={
          settlementId:this.$route.query.settlementId,
          sheetStatus:status,
          sheetDate:this.requestData.sheetDate,
          customerId:this.requestData.supplierId,
          customerName:this.requestData.supplierName,
          sheetNo:this.requestData.orderNo,
          payCard1:this.requestData.receivableid,
          paymentAmount1:this.requestData.receivableAmount,
          payCard2:this.requestData.receivableid2,
          paymentAmount2:this.requestData.receivableAmount2,
          handler:this.requestData.handler,
          handlerUserId:this.requestData.handlerUserId,
          remark:this.requestData.remark,
          settlementSheetDetailList:this.tableData                 
      }      
      fetchReceiptBillPayUpdate(data).then(response => {
        if(response.code===0){
          this.$message({
              type: 'success',
              message: '操作成功'
          })
          this.$router.push('payment_history') 
        }else{
          this.$message({
            type: 'error',
            message:response.msg
          })
        }  
      }) 
    },   
    historyRender: function () {//跳转到历史界面
      this.$router.push("/finance/payment_history") //字符串
    },
    querySearchs (queryString, cb) {//下拉搜索遍历
      var restaurants
      switch (this.which) {
        case 1:
          restaurants = this.supplier
          break
        case 3:
          restaurants = this.brokerage
          break
        case 4:
          restaurants = this.receivableaccount
          break
        case 5:
          restaurants = this.receivableaccount2
          break
        default:
          break
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    getReceiptList () {//选择查看子单
      const _this = this
      if(_this.allChecked){   
          this.loading=true  
          if(_this.childrenCheckList!==null||_this.childrenCheckList!==[]){
            this.loading=false      
            _this.tableData=[]          
            _this.childrenCheckList.forEach(function(item){   
                  //  item['darftFlage']=false;
                  _this.$set(item,'paydarftFlage',false)
                  _this.tableData.push(item)  
                  _this.receiptCheckList.push(item)                   
            })               
          }else{
            this.loading=false  
          }           
        }else{
          this.loading=true  
          if(_this.childrenCheckList.length>0){
            this.loading=false            
              _this.tableData.splice(0,_this.childrenCheckList.length)      
              this.add();                    
          }else{
            this.loading=false  
          }  
        }        
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
    getReceivableAccount() {//获取收款账户信息
      const _self = this
      return new Promise((resolve, reject) => {
        fetchReceivableAccount().then(response => {
          this.receivableaccount = response.data.list.list          
          for (var i = 0; i < this.receivableaccount.length; i++) {
              this.receivableaccount[i].value = this.receivableaccount[i].bankName              
          }
           this.receivableaccount2 = response.data.list.list          
          for (var i = 0; i < this.receivableaccount2.length; i++) {
              this.receivableaccount2[i].value = this.receivableaccount2[i].bankName              
          }
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    getSupplier () {//客户列表
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
    createFilter (queryString) {//搜索过滤
      return (restaurant) => {
        switch (this.which) {
          case 1:
            return (restaurant.customerName.indexOf(queryString) > -1)
            break
          case 3:
            return (restaurant.userName.indexOf(queryString) > -1)
            break
          case 4:
            return (restaurant.bankName.indexOf(queryString) > -1)
            break
          case 5:
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
          this.requestData.supplierId = item.customerId
          this.requestData.supplierName = item.value
          break
        case 3:
          this.requestData.handlerUserId = item.userId
          this.requestData.handler = item.value
          break
        case 4:
          this.requestData.receivableid = item.bankAccount
          this.requestData.receivable = item.value
          break
        case 5:
          this.requestData.receivableid2 = item.bankAccount
          this.requestData.receivable2 = item.value
          break
        default:
          break
      }
    },
    getTableData () {//初始化表格
      for (var i = 0; i < 10; i++) {
        this.tableData.push({ receivableDate: '', businessNo: '', periodReceivables: '', saleMoney: '', sheetMoney: '', unSettleMoney: '', settleMoney: '', sheetHandler: ''})
      }
    },
    getSummaries (param) {//合计
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 1 || index === 2 || index === 3 || index === 4 || index === 10 || index === 11) {
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
      this.commodityAmounts = sums[5]
      this.salesAmounts = sums[6]
      this.sumMoneys = sums[7]
      this.unsettleds = sums[8]
      this.settlements = sums[9]
      /*sums[8] = this.tableData[this.y].goodsUnit ? this.tableData[this.y].goodsUnit : ''*/
      return sums
    },
    add () {//表格行添加
      this.tableData.push({ receivableDate: '', businessNo: '', periodReceivables: '', saleMoney: '', sheetMoney: '', unSettleMoney: '', settleMoney: '', sheetHandler: ''})
    },
    remove (index) {//表格行减少
      this.tableData.splice(index, 1)
    },
    getSupplierInfo (data) {//供应商组件传参
      this.requestData.supplierName = data.name
      this.requestData.supplierId = data.id
    },
    getreceiptInfo (data) {//账户组件传参
      this.requestData.receivable = data.name;
      this.requestData.receivableid = data.id;
    },
    getHandlerInfo (data) {//经手人组件传参
      this.requestData.handler = data.name;
      this.requestData.handlerUserId = data.id;
    },
    insertAddActive ($event) {//操作列
      $event.currentTarget.className = "el-icon-circle-plus";
    },
    deletedAddActive ($event) {//操作列
      $event.currentTarget.className = "el-icon-circle-plus-outline";
    },
    insertRemoveActive ($event) {//操作列
      $event.currentTarget.className = "el-icon-remove";
    },
    deletedRemoveActive ($event) {//操作列
      $event.currentTarget.className = "el-icon-remove-outline";
    }
  },
  components: {
    fixedPage1,
    fixedPage3,
    fixedPage4,
    PageHeader
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/modulefilestyle/scss/receipt.scss';
</style>
<style>
.receipt-recdraft-container .table-contain {
  height: calc(100% - 365px);
}
.receipt-recdraft-container .recepit-tb-title{padding:5px 0}
.receipt-recdraft-container .recepit-tb-title .recepit-tb-h{
	color:#009DD9;
	font-size:14px;
	font-weight: bold;
}
.receipt-recdraft-container .recepit-tb-title .el-checkbox{float:right;font-weight:normal}
.receipt-recdraft-container .search-box-form{
  margin-top:10px;
}
.receipt-recdraft-container .table-contain tbody.has-gutter .el-table_1_column_1.is-leaf:nth-child(1) div.cell{
    color:#333;
}
.receipt-recdraft-container .table-contain  tbody.has-gutter div.cell {
    color: red;
    font-size: 14px;
}
.receipt-recdraft-container .search-box-form .height-m{
      margin-top: 7px;
}
.receipt-recdraft-container .search-box-form .el-form--inline .el-form-item__label{
    font-weight: 400 !important;
    font-size:12px !important;
    text-align:right;
}
.receipt-recdraft-container .search-box-form .el-autocomplete.form-item,.receipt-container .search-box-form .el-date-editor {
    height: 100%;
    margin-top: 0;
}
.receipt-recdraft-container .search-box-form .el-input__icon{
  line-height: 28px;
} 
.receipt-recdraft-container .search-box-form label{
  display: inline-block;
  width: 70px;
  text-align: right;
  font-size: 12px;
  font-weight: normal;
  color: #606266;
  vertical-align:middle;
}
.receipt-recdraft-container .search-box-form .el-col{
  margin-bottom: 5px;
}
.receipt-recdraft-container .search-box-form .el-col .el-input.el-input--large,
.receipt-recdraft-container .search-box-form .el-col .el-autocomplete.form-item{
 display: inline-block;
 width: calc(100% - 80px);
}
.receipt-recdraft-container .search-box-form .el-input-group__append{
  padding: 0 10px;
}
.receipt-recdraft-container .search-box-form .el-col .el-input .el-input__inner{
  height: 28px;
  line-height: 28px;
}
.receipt-recdraft-container .search-box-form .el-input.el-input--large{
  font-size: 12px;
}
</style>

