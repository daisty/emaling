<template>
  <div class="app-container receipt-rec-container">
    <!-- <page-header print="print" title="收款单" :orderNumber="requestData.orderNo"  historyUrl="'/'"></page-header> -->
    <div class="page-title">
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="bill-code">
            <label class="code-label">NO.</label>
            <span class="code" v-text="requestData.orderNo">SKD000000000001</span>
          </div>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">收款单</span>
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
        <el-col :span="6">
          <label>应收余额</label>
          <el-input :disabled="true" v-model="requestData.receivableBalance"></el-input>
        </el-col>
         </el-row >
        <!-- <el-col :span="6">
          <label>应付余额</label>
          <el-input v-model="requestData.payableBalance"></el-input>
        </el-col> -->
         <el-row >
        <el-col :span="6">
          <label  class="height-m" >收款账号</label>
          <el-autocomplete class="form-item" size="small" v-model="requestData.receivable" @focus="which=4"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                          @select="handleSelect">          
              <el-button slot="append" icon="el-icon-search" @click="fixedOption.receiptShow=true"></el-button>
          </el-autocomplete>
        </el-col>
        <el-col :span="6">
          <label>收款金额</label>
          <el-input type="number"   v-model="requestData.receivableAmount" @change="sumMoneySettle"></el-input>
        </el-col>
        <el-col :span="6">
          <label class="height-m">收款账号2</label>
          <el-autocomplete class="form-item" size="small" v-model="requestData.receivable2" @focus="which=5"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                          @select="handleSelect">          
              <el-button slot="append" icon="el-icon-search" @click="fixedOption.receiptShow=true"></el-button>
          </el-autocomplete>
        </el-col>
        <el-col :span="6">
          <label>收款金额2</label>
          <el-input type="number" v-model="requestData.receivableAmount2"  @change="sumMoneySettle"></el-input>
        </el-col>
        </el-row >
        <!-- <el-col :span="6">
          <label>预收款金额</label>
          <el-input  v-model="requestData.prePayment"></el-input>
        </el-col>
        <el-col :span="6">
          <label>使用预收款</label>       
          <el-input v-model="requestData.preUsePayment"></el-input>
        </el-col> -->                           
    </div>
    <div class="recepit-tb-title">
    	<label class="recepit-tb-h">待收款单据</label>
    	<el-checkbox :disabled="showAllCheck" v-model="allChecked" @change="getReceiptList">显示所有未结算单据</el-checkbox>
    </div>
    <div class="table-contain padding">
      <el-table style="width: 100%;height:calc100%" height="100%" :data="tableData" :summary-method="getSummaries"
              v-loading="loading" element-loading-text="数据加载中..."
                size="mini" :border="true"   fit highlight-current-row show-summary   >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="操作" style="text-indent: 0px" width="80">
          <template slot-scope="scope">
            <i class="el-icon-circle-plus-outline" @click="add()" style="cursor:pointer"
               @mouseover="insertAddActive($event)" @mouseout="deletedAddActive($event)"></i>
            <i class="el-icon-remove-outline" @click="remove(scope.$index)" style="cursor:pointer"
               @mouseover="insertRemoveActive($event)" @mouseout="deletedRemoveActive($event)"></i>
          </template>
        </el-table-column>
        <el-table-column prop="receivableDate" label="单据日期" width="120">         
        </el-table-column>
        <el-table-column prop="businessNo" label="单据编号" width="200">          
        </el-table-column>
        <el-table-column prop="periodReceivables" label="收款期限">          
        </el-table-column>
        <el-table-column prop="saleMoney" label="总商品金额" width="85">          
        </el-table-column>
        <el-table-column prop="saleMoney" label="销售金额">          
        </el-table-column>
        <el-table-column prop="sheetMoney" label="本单金额">   
        </el-table-column>
        <el-table-column prop="unSettleMoney" label="未结算">    
        </el-table-column>        
        <el-table-column prop="settleMoney" label="本次结算">
          <template slot-scope="scope">
            <el-input class="cell-click-input" ref="receiptinput" size="mini" :autofocus="true" v-if="scope.row.editeFlage" v-model="scope.row.settleMoney" v-on:change="changeAettleMoney(scope.row)"  @blur.stop="hiddenInputData(scope.row)"></el-input>
            <div style="width:100%;heihgt:28px;"  v-if="!scope.row.editeFlage"  v-text="scope.row.settleMoney" @click="showInputData(scope.row)"></div>                        
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
import fixedPage2 from '@/components/fixed/fixedNormal'
import fixedPage3 from '@/components/fixed/fixedBrokerage'
import fixedPage4 from '@/components/fixed/fixedReceipt'
import { timeToDateFn, timeNow } from '@/utils/BbdCommon'
import { mapGetters } from 'vuex';
import { fetchSheetCode, fetchGoodsList, fetchGoodsColor, fetchBrokerage, fetchSupplier, fetchDeport, fetchSaveInstroeInfo, fetchSaveInstroeInfoDraft } from '@/api/purchase'
import { fetchReceivableAccount,fetchReceivableAccountDetail,fetchReceiptList,fetchReceiptBill,fetchSheetNo} from '@/api/receipt'

export default {
  name: 'receiptsheet',
  data () {
    return {
      loading:false,//loading动画
      receiptCheckList:[],
      showEdit:false,
      ulshow: false,
      fixedOption: {
        supplierShow: false,
        deportShow: false,
        brokerageShow: false,
        receiptShow: false
      },
      requestData: {
        orderNo: '',
        supplierName: '',//客户
        supplierId: '',
        handler: '',//经手人
        handlerUserId: '',
        receivable:'',//收款账户
        receivableid:'',
        receivableAmount:'',//收款金额
        receivable2:'',//收款账户2
        receivableid2:'',   
        receivableAmount2:'',//收款金额2
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
      deport: [],
      supplier: [],
      querySelectArr: [],
      value: '',
      autofocus: false,
      x: 1,
      y: 0,
      dropDown: false,
      allChecked:false,
      showAllCheck:false,
      itemRow:''      
    }
  },
  created () {
    this.getSheetNo();//获取单据编号
    this.getTableData()
    this.getBrokerage()
    this.getReceivableAccount()
    this.getSupplier()   
  },
  mounted () {
    this.getRouterData();
  },
  computed: {
    ...mapGetters([
      "tenantId"
    ])
  },
  methods: {
    
    changeAettleMoney(row){//列表结算金额联动      
      row.settleMoney>row.unSettleMoney ? row.settleMoney=row.unSettleMoney : row.settleMoney; 
    },
    hiddenInputData(flag){//本次结算 编辑框隐藏
      this.$set(flag,'editeFlage',false) 
    },
    showInputData(flag){//本次结算 编辑框显示
      if(flag.unSettleMoney!==""&&flag.unSettleMoney>0){    
         this.$set(flag,'editeFlage',true)     
         this.$nextTick(function(){
          this.$refs.receiptinput.focus()
         })
      }     
    },
     getReceivableAccountName(urlId,type){//账户信息详情
      fetchReceivableAccountDetail(urlId).then(response => {
        if(response.code===0){
          if(type===1){
            this.requestData.receivable=response.data.bankAccount.bankName 
          }else{
            this.requestData.receivable2=response.data.bankAccount.bankName 
          }  
        }
      })
    },
    getRouterData(){//获取路由传过来的参数
      let _this=this;      
      let routerQuery=this.$route.query.rowData 
      let routerQuerys=this.$route.query.data
      if(routerQuery!==undefined){ 
        console.log(routerQuery)
        _this.requestData.sheetDate=routerQuery.sheetDate;
        _this.requestData.supplierName=routerQuery.customerName;
        _this.requestData.supplierId=routerQuery.customerId;
         _this.requestData.remark=routerQuery.remark;
        _this.requestData.handler=routerQuery.handler;
        _this.requestData.handlerUserId=routerQuery.handlerUserId;
         if(routerQuery.payCard1!==undefined){
          this.getReceivableAccountName(routerQuery.payCard1,1)
          _this.requestData.receivableid=routerQuery.payCard1;//收款账户
          _this.requestData.receivableAmount=routerQuery.paymentAmount1;//收款金额
        }
        if(routerQuery.payCard2!==undefined){
          this.getReceivableAccountName(routerQuery.payCard2,2)
          _this.requestData.receivableid2=routerQuery.payCard2;//收款账户
          _this.requestData.receivableAmount2=routerQuery.paymentAmount2;//收款金额
        }  
      }else if(routerQuerys!==undefined){
        _this.requestData.supplierName=routerQuerys.customerName;
        _this.requestData.supplierId=routerQuerys.customerID;
        _this.requestData.receivableBalance=routerQuerys.receivables;
        _this.showAllCheck=true
      }               
    },
    sumMoneySettle(){ //收款单金额联动  
      if(this.requestData.receivableBalance!==""){
        let sum;
        if(this.requestData.receivableAmount!==""&&this.requestData.receivableAmount2===""){
           sum=parseFloat(this.requestData.receivableAmount)+0 
        }else  if(this.requestData.receivableAmount2!==""&&this.requestData.receivableAmount===""){
          sum=parseFloat(this.requestData.receivableAmount2)+0 
        }else{
          sum=parseFloat(this.requestData.receivableAmount)+parseFloat(this.requestData.receivableAmount2)
        } 
        if(sum>this.requestData.receivableBalance){
          this.$message({
            type: 'error',
            message: '收款金额不能大于应收金额'
          })
          this.requestData.receivableAmount=""
          this.requestData.receivableAmount2=""
        }
      }
      if(this.tableData.length>0&&this.tableData[0].settleMoney!==""){//列表内容不为空时
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
        this.clearInputAndTable()
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
         this.clearInputAndTable()
       }  
      }
    },
    clearInputAndTable(){
      this.tableData.forEach(function(item,index){//金额改变时，清空原先的本次结算的值
        item.settleMoney=""                  
      }) 
    },
    getSheetNo(){//获取单据编号
      fetchSheetNo().then(response => {       
        this.requestData.orderNo=response.data.sheetNo;    
      }) 
    },
    tipShow(name){//错误提示
       this.$message({
            type: 'error',
            message: name+'不能为空'
       })
    },    
    addReceiptBill(status){//草稿、记账判断
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
    postReceiptBill(status){ //保存草稿、记账提交    
      if(this.tableData[0].businessNo===""||this.tableData[0].receivableDate===""){
        this.tableData=[]
      }
      let data={
          sheetStatus:status,
          sheetDate:this.requestData.sheetDate,
          customerId:this.requestData.supplierId,
          customerName:this.requestData.supplierName,
          shouldSettlementAmount:this.requestData.receivableBalance,
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
      fetchReceiptBill(data).then(response => {
        if(response.code===0){
          this.$message({
              type: 'success',
              message: '操作成功'
          })
          this.$router.push('receipt_history')   
        }else{
          this.$message({
              type: 'error',
              message:response.msg
          })
        }        
      }) 
    },    
    historyRender: function () {//跳转到历史界面
      this.$router.push("/finance/receipt_history") //字符串
    },
    querySearchs (queryString, cb) {//检索字段
      var restaurants
      switch (this.which) {
        case 1:
          restaurants = this.supplier
          break
        case 2:
          restaurants = this.deport
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
    getReceiptList () {//获取未结算收款单列表
      const _self = this
      var data
      var arrIndex=[];
      var queryData={
        customerName:this.requestData.supplierName,
        operator:this.requestData.handler,
        createdFrom:this.requestData.sheetDate,
        pageNum:1,
        pageSize:15
      }        
      data=_self.queryData      
      this.loading=true  
      fetchReceiptList(data).then(response => {
        if(response.code===0){
          this.loading=false  
          let arrLength=response.data.list.list
          if(_self.allChecked){                
            if(arrLength!==null||arrLength!==[]){  
              _self.tableData=[]             
              arrLength.forEach(function(item,index){ 
                  _self.$set(item,'editeFlage',false);
                  item['sourceSheetId'] =item.inOutbalanceId 
                  _self.tableData.push(item)             
                  _self.receiptCheckList.push(item)                     
              })         
            }           
          }else{
            if(arrLength.length>0){          
              _self.tableData.splice(0,arrLength.length)  
              this.add();
            }    
          }  
        }else{
          this.loading=false
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
    createFilter (queryString) {//过滤字段
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
          this.requestData.receivableid = item.bankAccountId
          this.requestData.receivable = item.value
          break
        case 5:
          this.requestData.receivableid2 = item.bankAccountId
          this.requestData.receivable2 = item.value
          break
        default:
          break
      }
    },
    getTableData () {//表格初始化
      for (var i = 0; i < 10; i++) {
        this.tableData.push({ receivableDate: '', businessNo: '', periodReceivables: '', saleMoney: '', sheetMoney: '', unSettleMoney: '', settleMoney: '', sheetHandler: '',editeFlage:false})
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
      this.tableData.push({ receivableDate: '', businessNo: '', periodReceivables: '', saleMoney: '', sheetMoney: '', unSettleMoney: '', settleMoney: '', sheetHandler: '',editeFlage:false})
    },
    remove (index) {//表格行移除
      this.tableData.splice(index, 1)
    },
    getSupplierInfo (data) {//组件传参
      this.requestData.supplierName = data.name
      this.requestData.supplierId = data.id
    },
    getreceiptInfo (data) {//组件传参
      this.requestData.receivable = data.name;
      this.requestData.receivableid = data.id;
    },
    getHandlerInfo (data) {//组件传参
      this.requestData.handler = data.name;
      this.requestData.handlerUserId = data.id;
    },
    insertAddActive ($event) {
      $event.currentTarget.className = "el-icon-circle-plus";
    },
    deletedAddActive ($event) {
      $event.currentTarget.className = "el-icon-circle-plus-outline";
    },
    insertRemoveActive ($event) {
      $event.currentTarget.className = "el-icon-remove";
    },
    deletedRemoveActive ($event) {
      $event.currentTarget.className = "el-icon-remove-outline";
    }
  },
  components: {
    fixedPage1,
    fixedPage2,
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
.receipt-rec-container .table-contain {
  height: calc(100% - 365px);
}
.receipt-rec-container .recepit-tb-title{padding:5px 0}
.receipt-rec-container .recepit-tb-title .recepit-tb-h{
	color:#009DD9;
	font-size:14px;
	font-weight: bold;
}
.receipt-rec-container .recepit-tb-title .el-checkbox{float:right;font-weight:normal}
.receipt-rec-container .search-box-form{
  margin-top:10px;
}
.receipt-rec-container .table-contain tbody.has-gutter .el-table_1_column_1.is-leaf:nth-child(1) div.cell{
    color:#333;
}
.receipt-rec-container .table-contain  tbody.has-gutter div.cell {
    /* color: red; */
    font-size: 14px;
}
.receipt-rec-container .search-box-form .height-m{
      margin-top: 7px;
}
.receipt-rec-container .search-box-form .el-form--inline .el-form-item__label{
    font-weight: 400 !important;
    font-size:12px !important;
    text-align:right;
}
.receipt-rec-container .search-box-form .el-autocomplete.form-item,.receipt-container .search-box-form .el-date-editor {
    height: 100%;
    margin-top: 0;
}
.receipt-rec-container .search-box-form .el-input__icon{
  line-height: 28px;
} 
.receipt-rec-container .search-box-form label{
  display: inline-block;
  width: 70px;
  text-align: right;
  font-size: 12px;
  font-weight: normal;
  color: #606266;
  vertical-align:middle;
}
.receipt-rec-container .search-box-form .el-col{
  margin-bottom: 5px;
}
.receipt-rec-container .search-box-form .el-col .el-input.el-input--large,
.receipt-rec-container .search-box-form .el-col .el-autocomplete.form-item{
 display: inline-block;
 width: calc(100% - 80px);
}
.receipt-rec-container .search-box-form .el-input-group__append{
  padding: 0 10px;
}
.receipt-rec-container .search-box-form .el-col .el-input .el-input__inner{
  height: 28px;
  line-height: 28px;
}
.receipt-rec-container .search-box-form .el-input.el-input--large{
  font-size: 12px;
} 
.receipt-rec-container  .el-table td>.cell{
    text-indent:0;
}
</style>

