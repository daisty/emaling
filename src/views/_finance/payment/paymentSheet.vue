<template>
  <div class="app-container  receipt-pay-container">
    <div class="page-title">
      <!--标题栏-->
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="bill-code">
            <label class="code-label">NO.</label>
            <span class="code" v-text="requestData.orderNo">FKD000000000001</span>
          </div>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">付款单</span>
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
       <el-row>
         <el-col :span="6">
            <label class="height-m">供应商</label>
            <el-autocomplete class="form-item" size="small" v-model="requestData.supplierName" @focus="which=1"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                       @select="handleSelect">
              <el-button slot="append" icon="el-icon-search" @click="fixedOption.supplierShow=true"></el-button>
            </el-autocomplete>
        </el-col>
        <el-col :span="6">   
          <label class="height-m">经手人</label>   
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
        </el-row>
        <el-row>
        <el-col :span="6">
          <label class="height-m">付款账户</label>
          <el-autocomplete class="form-item" size="small" v-model="requestData.payable" @focus="which=4"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                          @select="handleSelect">          
              <el-button slot="append" icon="el-icon-search" @click="fixedOption.receiptShow=true"></el-button>
          </el-autocomplete>
        </el-col>
        <el-col :span="6">
          <label>付款金额</label>
          <el-input v-model="requestData.payableAmount" @change="sumMoneySettle"></el-input>
        
        </el-col>
        <el-col :span="6">
          <label class="height-m">付款账户2</label>
          <el-autocomplete class="form-item" size="small" v-model="requestData.payable2" @focus="which=5"
                       :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                          @select="handleSelect">          
              <el-button slot="append" icon="el-icon-search" @click="fixedOption.receiptShow=true"></el-button>
          </el-autocomplete>
        </el-col>
        <el-col :span="6">
          <label>付款金额2</label>
          <el-input v-model="requestData.payableAmount2"  @change="sumMoneySettle"></el-input>
        </el-col>
        </el-row>
        <!-- <el-col :span="6">
          <label>预收款金额</label>
          <el-input v-model="requestData.prePayment"></el-input>
        </el-col>
        <el-col :span="6">
          <label>使用预收款</label>
          <el-input v-model="requestData.preUsePayment"></el-input>
        </el-col> -->    
    </div>
    <div class="recepit-tb-title">
    	<label class="recepit-tb-h">待付款单据</label>
    	<el-checkbox :disabled="showAllCheck" v-model="allChecked" @change="getReceiptPayList">显示所有未结算单据</el-checkbox>
    </div>
    <div class="table-contain padding">
      <el-table style="width: 100%;height:calc100%" height="100%" :data="tableData" :summary-method="getSummaries"
           v-loading="loading" element-loading-text="数据加载中..."
                size="mini" :border="true" fit highlight-current-row show-summary>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="操作" style="text-indent: 0px" width="80">
          <template slot-scope="scope">
            <i class="el-icon-circle-plus-outline" @click="add()" style="cursor:pointer"
               @mouseover="insertAddActive($event)" @mouseout="deletedAddActive($event)"></i>
            <i class="el-icon-remove-outline" @click="remove(scope.$index)" style="cursor:pointer"
               @mouseover="insertRemoveActive($event)" @mouseout="deletedRemoveActive($event)"></i>
          </template>
        </el-table-column>
        <el-table-column prop="receivableDate" label="单据日期" width="100">
        </el-table-column>
        <el-table-column prop="businessNo" label="单据编号" width="160">
        </el-table-column>
        <el-table-column prop="goodsColor" label="付款期限">
        </el-table-column>
        <el-table-column prop="saleMoney" label="总商品金额">
        </el-table-column>
        <el-table-column prop="saleMoney" label="采购金额">
        </el-table-column>
        <el-table-column prop="sheetMoney" label="本单金额">
        </el-table-column>
        <el-table-column prop="unSettleMoney" label="未结算">
        </el-table-column>
        <el-table-column prop="settleMoney" label="本次结算">
          <template slot-scope="scope">
            <el-input ref="settleinput" v-if="scope.row.darftFlage"   size="mini" :autofocus="true" v-model="scope.row.settleMoney" v-on:change="changeAettleMoney(scope.row)"  @blur.stop="hiddenInputData(scope.row)"></el-input>
            <div  v-if="!scope.row.darftFlage" @click="showInputData(scope.row)" style="width:100%;height:23px"   v-text="scope.row.settleMoney"></div>            
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
    <fixed-page2 @deportInfo="getDeportInfo" :fixedOption="fixedOption"></fixed-page2>
    <fixed-page3 @handlerInfl="getHandlerInfo" :fixedOption="fixedOption"></fixed-page3>
    <fixed-page4 @receiptInfo="getreceiptInfo" :fixedOption="fixedOption"></fixed-page4>
  </div>
</template>

<script>
import fixedPage1 from '@/components/fixed/fixedSupplier'
import fixedPage2 from '@/components/fixed/fixedNormal'
import fixedPage3 from '@/components/fixed/fixedBrokerage'
import fixedPage4 from '@/components/fixed/fixedReceipt'
import { timeToDateFn, timeNow } from '@/utils/BbdCommon'
import { mapGetters } from 'vuex';
import { fetchSheetCode, fetchGoodsList, fetchGoodsColor, fetchBrokerage, fetchSupplier, fetchDeport, fetchSaveInstroeInfo, fetchSaveInstroeInfoDraft } from '@/api/purchase'
import {fetchReceivableAccount,fetchReceiptPayList,fetchPaySheetNo,fetchReceiptPayBill,fetchReceivableAccountDetail} from '@/api/receipt'

export default {
  name: 'paysheet',
  data () {
    return {
      loading:false,
      receiptCheckList:[],//选择后列表
      allChecked:'',//未结算状态选择
      showAllCheck:false,
      ulshow: false,
      fixedOption: {
        supplierShow: false,
        deportShow: false,
        brokerageShow: false,
        receiptShow: false
      },
      requestData: {
        orderNo: '',
        handler: '',
        handlerUserId: '',
        supplierName: '',
        supplierId: '',
        storeName: '',
        storeId: '',
        remark: '',
        sheetDate: timeNow(1),
        expectOutStoreDate: '',
        goodsUnit: '',
        totalItem: 0,
        totalQuantity: 0,
        purchaseGoodsList: [],
        receivableaccount:[],//付款账户
        payable:'',//付款账户
        payableid:'',
        payableAmount:'',//付款金额
        payable2:'',//付款账户2
        payableid2:'',   
        payableAmount2:''//付款金额
      },
      tableData: [],
      which: 1,
      brokerage: [],
      settlements:'',//本次结算总额
      commodityAmounts:'',
      salesAmounts:'',
      sumMoneys:'',
      unsettleds:'',
      deport: [],
      supplier: [],
      querySelectArr: [],
      value: '',
      autofocus: false,
      x: 1,
      y: 0,
    }
  },
  created () {
    
  },
  mounted () {
    this.getTableData()//创建十条数据
    this.getSheetNo()//获取单据编号
    this.getBrokerage()
    this.getSupplier()
    this.getReceivableAccount()//获取付款账户信息
    this.getRouterData()
  },
  computed: {
    ...mapGetters([
      "tenantId"
    ])
  },
  watch:{
　},
  methods: {
    changeAettleMoney(row){//input输入框限制
      row.settleMoney>row.unSettleMoney ? row.settleMoney=row.unSettleMoney : row.settleMoney
    },
    hiddenInputData(flag){//本次结算 编辑框隐藏
      this.$set(flag,'darftFlage',false)
    },
    showInputData(flag){//本次结算 编辑框显示
      if(flag.unSettleMoney!==""&&flag.unSettleMoney>0){
         this.$set(flag,'darftFlage',true)
         this.$nextTick(function(){
            this.$refs.settleinput.focus()
         })
      }     
    },
    getReceivableAccountName(urlId,type){//账户信息详情
      fetchReceivableAccountDetail(urlId).then(response => {
        if(response.code===0){
          type===1?this.requestData.payable=response.data.bankAccount.bankName :this.requestData.payable2=response.data.bankAccount.bankName            
        }
      })
    },
    getRouterData(){//获取路由传过来的参数
      let _this=this;      
      let routerQuery=this.$route.query.rowData 
      let routerQuerys=this.$route.query.data
      if(routerQuery!==undefined){ 
        _this.requestData.supplierName=routerQuery.customerName;
        _this.requestData.supplierId=routerQuery.customerId;
        _this.requestData.remark=routerQuery.remark;
        _this.requestData.handler=routerQuery.handler;
        _this.requestData.handlerUserId=routerQuery.handlerUserId;
        if(routerQuery.payCard1!==undefined){
          this.getReceivableAccountName(routerQuery.payCard1,1)
          _this.requestData.payableid=routerQuery.payCard1;//收款账户
          _this.requestData.payableAmount=routerQuery.paymentAmount1;//收款金额
        }
        if(routerQuery.payCard2!==undefined){
          this.getReceivableAccountName(routerQuery.payCard2,2)
          _this.requestData.payableid2=routerQuery.payCard2;//收款账户
          _this.requestData.payableAmount2=routerQuery.paymentAmount2;//收款金额
        }    
      }else if(routerQuerys!==undefined){
        _this.requestData.supplierName=routerQuerys.customerName;
        _this.requestData.supplierId=routerQuerys.customerID;
        _this.requestData.payableBalance=routerQuerys.debitBalance;
        _this.showAllCheck=true
      }               
    },
    sumMoneySettle(value){ //付款单金额联动  
      if(this.requestData.payableBalance!==""){
        let sum;
        if(this.requestData.payableAmount!==""&&this.requestData.payableAmount2===""){
           sum=parseFloat(this.requestData.payableAmount)+0 
        }else  if(this.requestData.payableAmount2!==""&&this.requestData.payableAmount===""){
          sum=parseFloat(this.requestData.payableAmount2)+0 
        }else{
          sum=parseFloat(this.requestData.payableAmount)+parseFloat(this.requestData.payableAmount2)
        } 
        if(sum>this.requestData.payableBalance){
          this.$message({
            type: 'error',
            message: '付款金额不能大于应付金额'
          })
          this.requestData.payableAmount=""
          this.requestData.payableAmount2=""
        }
      }
    let sumMoneys=parseFloat(this.requestData.payableAmount)+parseFloat(this.requestData.payableAmount2)   
      if(this.tableData.length>0&&this.tableData[0].settleMoney!==""){       
        if(this.requestData.payableAmount!==""&&this.requestData.payableAmount2===""){
           this.settlements=parseFloat(this.requestData.payableAmount)+0 
        }else  if(this.requestData.payableAmount2!==""&&this.requestData.payableAmount===""){
          this.settlements=parseFloat(this.requestData.payableAmount2)+0 
        }else{
          this.settlements=sumMoneys
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
         this.requestData.payableAmount!==0?this.requestData.payableAmount="":this.requestData.payableAmount
         this.requestData.payableAmount2!==0?this.requestData.payableAmount2="":this.requestData.payableAmount2
         this.clearInputAndTable()//金额大于未结算金额总额时，清空原先的本次结算的值
       }  
      }
    },
    clearInputAndTable(){
      this.tableData.forEach(function(item,index){//金额改变时，清空原先的本次结算的值
        item.settleMoney=0                  
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
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    getSheetNo(){//获取单据编号
      fetchPaySheetNo().then(response => {       
        this.requestData.orderNo=response.data.sheetNo;    
      }) 
    },
     tipShow(name){
       this.$message({
            type: 'error',
            message: name+'不能为空'
       })
    },    
    addReceiptBill(status){//记账判断必填项
        if (this.requestData.supplierName === '') {
          this.tipShow("客户");
          return false
        } else if(this.requestData.handler===''){
          this.tipShow("经手人");
          return false
        }else if(this.requestData.payable===''&&this.requestData.payable2===''){
            this.tipShow("付款账户必须填写一个，");
            return false
        }
        else if(this.requestData.payable!==''&&this.requestData.payableAmount===''){
            this.tipShow("付款金额");
            return false
        }else if(this.requestData.payableAmount!==''&&this.requestData.payable===''){
            this.tipShow("付款账户");
            return false
        }else if(this.requestData.payable2!==''&&this.requestData.payableAmount2===''){
           
             this.tipShow("付款金额2");
             return false
        }else if(this.requestData.payableAmount2!==''&&this.requestData.payable2===''){
            this.tipShow("付款账户2");
            return false
        }else{
           this.postReceiptBill(status);//执行记账请求
        }
    },
    postReceiptBill(status){//执行记账请求
      if(this.tableData[0].businessNo===""||this.tableData[0].receivableDate===""){
        this.tableData=[]
      }
      let data={
          sheetStatus:status,
          sheetDate:this.requestData.sheetDate,
          customerId:this.requestData.supplierId,
          customerName:this.requestData.supplierName,          
          shouldSettlementAmount:this.requestData.payableBalance,
          sheetNo:this.requestData.orderNo,
          payCard1:this.requestData.payableid,
          paymentAmount1:this.requestData.payableAmount,
          payCard2:this.requestData.payableid2,
          paymentAmount2:this.requestData.payableAmount2,
          handler:this.requestData.handler,
          handlerUserId:this.requestData.handlerUserId,
          remark:this.requestData.remark,
          settlementSheetDetailList:this.tableData  
      }
      fetchReceiptPayBill(data).then(response => { 
        this.$message({
            type: 'success',
            message: '操作成功'
        })
        this.$router.push('payment_history')   
      }) 
    },
    getReceiptPayList () {//获取收款单列表
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
      fetchReceiptPayList(data).then(response => {
        if(response.code===0){
          this.loading=false
          let arrLength=response.data.list.list
          if(_self.allChecked){
            if(arrLength!==null||arrLength!==[]){
              _self.tableData=[]
              arrLength.forEach(function(item,index){
                   _self.$set(item,'darftFlage',false)
                   item['sourceSheetId']=item.inOutbalanceId
                    _self.tableData.push(item)   
                    _self.receiptCheckList.push(item) 
              })     
            }  
          }else{
            if(arrLength.length>0){          
               _self.tableData.splice(0,arrLength.length)
               this.add()                          
            } 
          }
        }else{
          this.loading=false
        }        
      })
    }, 
    getreceiptInfo (data) {//组件传参
      this.requestData.payable = data.name;
      this.requestData.payableid = data.id;
    },
    //跳转到采购入库单历史界面
    historyRender: function () {
      this.$router.push("/finance/payment_history") //字符串
    },
    querySearchs (queryString, cb) {
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
          restaurants = this.receivableaccount
          break
        default:
          break
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    getBrokerage () {//获取经手人
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
    getSupplier () {//获取供应商
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
    getDeport () {
      const _self = this
      return new Promise((resolve, reject) => {
        fetchDeport().then(response => {
          this.deport = response.data.data.storeInfoList.list
          for (var i = 0; i < this.deport.length; i++) {
            this.deport[i].value = this.deport[i].storeName
          }
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
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
        case 2:
          this.requestData.storeId = item.storeId
          this.requestData.storeName = item.value
          break
        case 3:
          this.requestData.handlerUserId = item.userId
          this.requestData.handler = item.value
          break
        case 4:
          this.requestData.payableid = item.bankAccountId
          this.requestData.payable = item.value
          break
        case 5:
          this.requestData.payableid2 = item.bankAccountId
          this.requestData.payable2 = item.value
          break
        default:
          break
      }
    },
    getTableData () {//初始化表格
      for (var i = 0; i < 10; i++) {
        this.tableData.push({ receivableDate: '', businessNo: '', saleMoney: '', sheetMoney: '', unSettleMoney: '', settleMoney: '', sheetHandler: '', darftFlage: false})
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
        if (index === 1 || index === 2 || index === 3 || index === 4 || index === 11 || index === 12) {
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
      return sums
    },
    querySelect (queryString) {
      var goodsArr
      if (this.x === 3) {
        goodsArr = this.colorList
      } else {
        goodsArr = this.goodsList
      }
      var results
      if(this.x == 3){
        results = this.colorList
      }else{
        results = queryString ? goodsArr.filter(this.createFilter2(queryString)) : goodsArr
      }

      this.querySelectArr = results
      return results
    },
    createFilter2 (queryString) {
      return (item) => {
        switch (this.x) {
          case 1:
            item.value = item.goodsNo
            return (item.goodsNo.indexOf(queryString) > -1)
            break
          case 2:
            item.value = item.goodsName
            return (item.goodsName.indexOf(queryString) > -1)
            break
          case 3:
            item.value = item.colorName
            return (item.colorName.indexOf(queryString) > -1)
            break
          default:
            break
        }
      }
    },
    add () {
      this.tableData.push({ goodsNo: '', goodsName: '', goodsColor: '', batchNo: '', itemCount: '', orderQuantity: '', goodsUnit: '', remark: '', goodsId: '', goodsColorId: '' })
    },
    remove (index) {
      this.tableData.splice(index, 1)
    },
    getSupplierInfo (data) {//组件传参
      this.requestData.supplierName = data.name
      this.requestData.supplierId = data.id
    },
    getDeportInfo (data) {
      this.requestData.storeName = data.name
      this.requestData.storeId = data.id
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
    },
  },
  components: {
    fixedPage1,
    fixedPage2,
    fixedPage3,
    fixedPage4
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/modulefilestyle/scss/receipt.scss';
</style>
<style>
.receipt-pay-container .table-contain {
  height: calc(100% - 365px);
}
.receipt-pay-container .recepit-tb-title{padding:5px 0}
.receipt-pay-container .recepit-tb-title .recepit-tb-h{
	color:#009DD9;
	font-size:14px;
	font-weight: bold;
}
.receipt-pay-container .recepit-tb-title .el-checkbox{float:right;font-weight:normal}
.receipt-pay-container .search-box-form{
  margin-top:10px;
}
.receipt-pay-container .search-box-form .height-m{
      margin-top: 7px;
}
.receipt-pay-container .search-box-form .el-form--inline .el-form-item__label{
    font-weight: 400 !important;
    font-size:12px !important;
    text-align:right;
}
.receipt-pay-container .search-box-form .el-autocomplete.form-item,.receipt-container .search-box-form .el-date-editor {
    height: 100%;
    margin-top: 0;
}
.receipt-pay-container .search-box-form .el-input__icon{
  line-height: 28px;
} 
.receipt-pay-container .search-box-form label{
  display: inline-block;
  width: 70px;
  text-align: right;
  font-size: 12px;
  font-weight: normal;
  color: #606266;
  vertical-align:middle;
}
.receipt-pay-container .search-box-form .el-col{
  margin-bottom: 5px;
}
.receipt-pay-container .search-box-form .el-col .el-input.el-input--large,
.receipt-pay-container .search-box-form .el-col .el-autocomplete.form-item,
.receipt-pay-container .search-box-form .el-col .el-select.el-select--large{
 display: inline-block;
 width: calc(100% - 80px);
}
.receipt-pay-container .search-box-form .el-input-group__append{
  padding: 0 10px;
}
.receipt-pay-container .search-box-form .el-col .el-input .el-input__inner{
  height: 28px;
  line-height: 28px;  
}
.receipt-pay-container .search-box-form .el-input.el-input--large{
  font-size: 12px;
}
.receipt-pay-container .table-contain tbody.has-gutter .el-table_1_column_1.is-leaf:nth-child(1) div.cell{
    color:#333;
}
.receipt-pay-container .table-contain  tbody.has-gutter div.cell {
    color: red;
    font-size: 14px;
}
</style>
