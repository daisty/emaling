<template>
  <div class="app-container receipt-recdis-container">
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
            <span style="padding:0;" class="title">收款单-已记账</span>
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
            <el-autocomplete :disabled="true" class="form-item" size="small" v-model="requestData.supplierName" :trigger-on-focus="true">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-autocomplete>
        </el-col>
        <el-col :span="6">
           <label  class="height-m">经手人</label>
            <el-autocomplete :disabled="true" class="form-item" size="small" v-model="requestData.handler"
                      :trigger-on-focus="true">            
              <el-button  slot="append" icon="el-icon-search"></el-button>
            </el-autocomplete>
        </el-col>
        <el-col :span="6">
          <label>单据日期</label>
            <el-date-picker :disabled="true" v-model="requestData.sheetDate" format="yyyy-MM-dd"    value-format="yyyy-MM-dd" type="date"></el-date-picker>
        </el-col>
        <el-col :span="6">
          <label>应收余额</label>
          <el-input :disabled="true" v-model="requestData.receivableBalance"></el-input>
        </el-col>
        </el-row >
        <!-- <el-col :span="6">
          <label>应付余额</label>
          <el-input :disabled="true" v-model="requestData.payableBalance"></el-input>
        </el-col> -->
        <el-row >
        <el-col :span="6">
          <label  class="height-m" >收款账号</label>
          <el-autocomplete :disabled="true" class="form-item" size="small" v-model="requestData.receivable" 
                       :trigger-on-focus="true">          
              <el-button slot="append" icon="el-icon-search"></el-button>
          </el-autocomplete>
        </el-col>
        <el-col :span="6">
          <label>收款金额</label>
          <el-input :disabled="true" v-model="requestData.receivableAmount"></el-input>
        </el-col>
        <el-col :span="6">
          <label class="height-m">收款账号2</label>
          <el-autocomplete :disabled="true" class="form-item" size="small" v-model="requestData.receivable2"
                        :trigger-on-focus="true">          
              <el-button slot="append" icon="el-icon-search"></el-button>
          </el-autocomplete>
        </el-col>
        <el-col :span="6">
          <label>收款金额2</label>
          <el-input :disabled="true" v-model="requestData.receivableAmount2" ></el-input>
        </el-col>
        <!-- <el-col :span="6">
          <label>预收款金额</label>
          <el-input :disabled="true"  v-model="requestData.prePayment"></el-input>
        </el-col>
        <el-col :span="6">
          <label>使用预收款</label>       
          <el-input :disabled="true" v-model="requestData.preUsePayment"></el-input>
        </el-col> -->
      </el-row>                           
    </div>
    <div class="recepit-tb-title">
    	<label class="recepit-tb-h">待收款单据</label>
    	<el-checkbox :disabled="true" v-model="allChecked">显示所有未结算单据</el-checkbox>
    </div>    
    <div class="table-contain padding">
      <el-table style="width: 100%;height:calc100%" height="100%" :data="tableData" :summary-method="getSummaries"
                 v-loading="loading" element-loading-text="数据加载中..."
                size="mini" :border="true"   fit highlight-current-row show-summary                   >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="businessDate" label="单据日期" width="120">         
        </el-table-column>
        <el-table-column prop="businessNo" label="单据编号" width="200">          
        </el-table-column>
        <el-table-column prop="" label="收款期限">          
        </el-table-column>
        <el-table-column prop="saleMoney" label="总商品金额" width="85">          
        </el-table-column>
        <el-table-column prop="saleMoney" label="销售金额">          
        </el-table-column>
        <el-table-column prop="saleMoney" label="本单金额">         
        </el-table-column>
        <el-table-column prop="unSettleMoney" label="未结算">          
        </el-table-column>        
        <el-table-column prop="settleMoney" label="本次结算">
        </el-table-column>
        <el-table-column prop="sheetHandler" label="经手人">         
        </el-table-column>
      </el-table>
    </div>
    <div class="remark">
      <el-input :disabled="true" v-model="requestData.remark" placeholder="单据备注"></el-input>
    </div>
    <div class="page-footer" v-show="disableDel">
      <el-button type="danger" @click="postReceiptBill">红冲(作废)</el-button>
    </div>  
  </div>
</template>

<script>
import PageHeader from '@C/BDD_PageHeader'
import {fetchReceivableAccountDetail,fetchReceiptBill,fetchReceiptBillDetail,fetchReceiptBillDisCard} from '@/api/receipt'

export default {
  name: 'receiptsheetalready',
  data () {
    return {
      loading:true,//表格加载动画
      disableDel:true,//已记账是否显示红冲
      childrenCheckList:[],//子单数据
      childrenCheckListAdd:[],//子单外层数据
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
        sheetDate:'',//单据日期
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
      itemRow:''      
    }
  },
  created () {
    // this.getTableData()   
    this.getReceiptDraftList();//获取草稿数据
  },
  mounted () {     
  },
  methods: { 
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
    getReceiptDraftList () {//获取收款单-记账列表     
      let urlId=this.$route.query.settlementId
      fetchReceiptBillDetail(urlId).then(response => {
        if(response.code===0){
        var _this=this        
        let item=response.data.receiptBill
        if(item.settleStatus===20||item.settleStatus===30){
          _this.disableDel=false
        }
        _this.childrenCheckListAdd=response.data.receiptBill
        _this.requestData.supplierName=item.customerName
        _this.requestData.orderNo=item.sheetNo
        _this.requestData.handler=item.handler 
        _this.requestData.handlerUserId=item.handlerUserId 
        _this.requestData.remark=item.remark         
        if(item.payCard1!==0&&item.payCard1!==""&&item.payCard1!==undefined){           
          this.getReceivableAccountName(item.payCard1,1)          
          _this.requestData.receivableid=item.payCard1
          _this.requestData.receivableAmount=item.paymentAmount1
        }                 
        if(item.payCard2!==""&&item.payCard2!==undefined&&item.payCard2!==0){  
           this.getReceivableAccountName(item.payCard2,2)
           _this.requestData.receivableid2=item.payCard2
           _this.requestData.receivableAmount2=item.paymentAmount2
        }        
        _this.childrenCheckList=item.settlementSheetDetailList
        this.loading=false
        if(_this.childrenCheckList!==null||_this.childrenCheckList!==[]){            
            _this.childrenCheckList.forEach(function(item){
               _this.tableData.unshift(item)                    
            })               
          }
        }else{
          this.$message({
            type: 'error',
            message:response.msg
          })
        }
      }) 
      .catch(err => {
        this.$message({
          type: 'error',
          message:"获取数据失败"
        })
        this.$router.push('receipt_history')
      });         
    },  
    postReceiptBill(){ //收款单点击作废操作 
      let urlId=this.$route.query.settlementId 
      let _this=this 
      if(urlId===undefined){}else{
      _this.$confirm('此操作将红冲(作废)该条订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.putReceiptSheet(urlId)
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })   
      }
    },
    putReceiptSheet(urlId){//收款单作废请求
      fetchReceiptBillDisCard(urlId).then(response => {
        if(response.code===0){
          this.$message({
            type: 'success',
            message: '作废成功'
          })
          this.$router.push('receipt_history')
        }else{
          this.$message({
            type: 'error',
            message:response.msg
          })
        }           
      }).catch(err => {
        this.$message({
          type: 'error',
          message:"操作失败"
        })
      }); 
    },
  	indexMethod(index) {
        return index+1;
    },  
    //跳转到历史界面
    historyRender: function () {
      this.$router.push("/finance/receipt_history") //字符串
    }, 
    getTableData () {
      for (var i = 0; i < 10; i++) {
        this.tableData.push({ payTime: '', businessNo: '',   saleMoney: '', actualMoney: '', unSettleMoney: '', settleMoney: '', hander: '' })
      }
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 1 || index === 2 || index === 3  || index === 9 || index === 10) {
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
      this.commodityAmounts = sums[4]
      this.salesAmounts = sums[5]
      this.sumMoneys = sums[6]
      this.unsettleds = sums[7]
      this.settlements = sums[8]
      /*sums[8] = this.tableData[this.y].goodsUnit ? this.tableData[this.y].goodsUnit : ''*/
      return sums
    },
    add () {//表格行添加
      this.tableData.push({ sheetDate: '', sheetCode: '', periodReceivables: '', commodityAmount: '', salesAmount: '', sumMoney: '', unsettled: '', discount: '', settlement: '', handMan: '' })
    },
    remove (index) {
      this.tableData.splice(index, 1)
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
    
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/modulefilestyle/scss/receipt.scss';
</style>
<style>
.receipt-recdis-container .table-contain {
  height: calc(100% - 365px);
}
.receipt-recdis-container .recepit-tb-title{padding:5px 0}
.receipt-recdis-container .recepit-tb-title .recepit-tb-h{
	color:#009DD9;
	font-size:14px;
	font-weight: bold;
}
.receipt-recdis-container .recepit-tb-title .el-checkbox{float:right;font-weight:normal}
.receipt-recdis-container .search-box-form{
  margin-top:10px;
}
.receipt-recdis-container .table-contain tbody.has-gutter .el-table_1_column_1.is-leaf:nth-child(1) div.cell{
    color:#333;
}
.receipt-recdis-container .table-contain  tbody.has-gutter div.cell {
    color: red;
    font-size: 14px;
}
.receipt-recdis-container .search-box-form .height-m{
      margin-top: 7px;
}
.receipt-recdis-container .search-box-form .el-form--inline .el-form-item__label{
    font-weight: 400 !important;
    font-size:12px !important;
    text-align:right;
}
.receipt-recdis-container .search-box-form .el-autocomplete.form-item,.receipt-container .search-box-form .el-date-editor {
    height: 100%;
    margin-top: 0;
}
.receipt-recdis-container .search-box-form .el-input__icon{
  line-height: 28px;
} 
.receipt-recdis-container .search-box-form label{
  display: inline-block;
  width: 70px;
  text-align: right;
  font-size: 12px;
  font-weight: normal;
  color: #606266;
  vertical-align:middle;
}
.receipt-recdis-container .search-box-form .el-col{
  margin-bottom: 5px;
}
.receipt-recdis-container .search-box-form .el-col .el-input.el-input--large,
.receipt-recdis-container .search-box-form .el-col .el-autocomplete.form-item{
 display: inline-block;
 width: calc(100% - 80px);
}
.receipt-recdis-container .search-box-form .el-input-group__append{
  padding: 0 10px;
}
.receipt-recdis-container .search-box-form .el-col .el-input .el-input__inner{
  height: 28px;
  line-height: 28px;
}
.receipt-recdis-container .search-box-form .el-input.el-input--large{
  font-size: 12px;
}

</style>

