<template>
  <div class="app-container receipt-container receipt-adj-container " v-loading="loading">
    <div class="page-title">
      <!--标题栏-->
      <el-row :gutter="10">
        <el-col :span="8">
        	<div class="bill-code">
            <label class="code-label">NO.</label>
            <span class="code" v-text="requestData.sheetNo">YFZJ0000000001</span>
          </div>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title" v-show="!showDraftTiTle">应付调账单</span>
            <span style="padding:0;" class="title" v-show="showDraftTiTle">应付调账单-草稿</span>
          </el-row>
        </el-col>
        <el-col :span="8">
            <el-row type="flex" justify="end">
                <el-button type="default" size="mini" @click="historyRender">历史</el-button>
            </el-row>        	
        </el-col>
      </el-row>
      <div class="line"></div>
    </div>
    <!--标题栏-->
    <div class="search-box-form">
      <el-row >
        <el-col :span="6" class="search-radio">
          <el-radio v-model="requestData.type" label="330" @change="radioCheck" >应付增加</el-radio>
          <el-radio v-model="requestData.type" label="340"  @change="radioCheck">应付减少</el-radio>
        </el-col>
        <el-col :span="6">
          <label>单据日期</label>
            <el-date-picker v-model="requestData.businessDate" format="yyyy-MM-dd"    value-format="yyyy-MM-dd" type="date"></el-date-picker>
        </el-col>
        <el-col :span="6">
            <label class="height-m">来往单位</label>
            <el-autocomplete class="form-item" size="small" v-model="requestData.customerName" @focus="which=1"
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
      </el-row>  
    </div>
    <div class="table-contain">
      <el-table header-align="center" style="width: 100%;height:100%" height="100%" :data="tableData" border fit highlight-current-row size="mini" show-summary  :summary-method="getSummaries"> 
        <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
        <el-table-column fixed label="操作" width="95">
          <template slot-scope="scope">
            <i class="el-icon-circle-plus-outline"  style="cursor:pointer"></i>
            <i class="el-icon-remove-outline"  style="cursor:pointer"></i>
          </template>
        </el-table-column>
        <el-table-column fixed prop="subjectNumber" label="科目编号" width="150">
        </el-table-column>
        <el-table-column fixed prop="subjectName" label="科目名称" width="190">
        </el-table-column>
        <el-table-column prop="receivableMoney" label="金额" width="150">
          <template slot-scope="scope">
            <el-input ref="autoinput" size="mini" v-show="scope.row.editeFlage"  v-model="scope.row.receivableMoney" @blur.stop="hiddenInputData(scope.row)"></el-input>
            <div style="width:100%;height:28px" size="mini" v-show="!scope.row.editeFlage" @click.stop="showInputData(scope.row)" v-text="scope.row.receivableMoney">{{scope.row.receivableMoney}}</div>            
          </template>
        </el-table-column>
        <el-table-column prop="" label="">
        </el-table-column>        
      </el-table>
    </div>
    <div class="remark">
      <el-input v-model="requestData.remark" placeholder="单据备注"></el-input>
    </div>
    <div class="page-footer" v-show="!showDraftTiTle">
      <el-button @click="addAdjustmentBill(40)">保存草稿</el-button>
      <el-button type="danger" @click="addAdjustmentBill(10)">记账</el-button>
    </div>
    <div class="page-footer" v-show="showDraftTiTle">
      <el-button @click="UpdateAdjustmentBill(40)">保存草稿</el-button>
      <el-button type="danger" @click="UpdateAdjustmentBill(10)">记账</el-button>
    </div>
    <fixed-supplier @supplierInfo="getSupplierInfo" :fixedOption="fixedOption"></fixed-supplier>
    <fixed-brokerage @handlerInfl="getHandlerInfo" :fixedOption="fixedOption"></fixed-brokerage>
  </div>
</template>

<script>
import fixedSupplier from '@/components/fixed/fixedSupplier'
import fixedBrokerage from '@/components/fixed/fixedBrokerage'
import {fetchBrokerage, fetchSupplier } from '@/api/purchase'
import {fetchAdjustmentPayAddSheetNo,fetchAdjustmentPayLessenSheetNo,fetchReceiptAdjustmentPay,fetchAdjustmentPayDarft,fetchAdjustmentPayDetail,fetchAdjustmentReceiptDetail} from '@/api/receipt'
export default {
  name: 'receiptadjustment',
  components: {
    fixedSupplier,
    fixedBrokerage
  },
  data () {
    return {
      showInput:true,
      showDraftTiTle:false,//显示草稿标题
      which:1,
      loading:false,//是否loading
      radioName:'1',//单选按钮默认是哪个
      supplier:[],//来往单位列表
      brokerage:[],//经手人列表
      requestData:{
        sheetNo:'',        
        businessDate:'',//单据日期
        customerName:'',//来往单位
        customerId:'',//来往单位id
        handlerUserId:'',//经手人id
        type:'330',
        handler:'',//经手人
        remark:''//备注
      },
      receivableMoneys:'',
      tableData:[],//表格
      fixedOption:{//是否弹窗
        supplierShow:false,
        brokerageShow:false
      },

    }
  },
  created(){
    this.getBrokerage()
    this.getSupplier();
    this.getSheetNo();
    this.getTableData();
    this.getRouterData();
  },
  methods:{
    hiddenInputData(flag){//隐藏编辑框
      flag.editeFlage=false
    },
    showInputData(flag){//显示编辑框
      flag.editeFlage=true
       this.$nextTick(function(){
        this.$refs.autoinput.focus()
      })
    },
    historyRender(){//前往历史页面
      this.$router.push({path:'payable_adjustment_history'})
    },
    getRouterData(){//获取路由传递的参数
      if(this.$route.query!=undefined){
        console.log(this.$route.query.type)
        switch(this.$route.query.type){
          case 'darft':
             this.showDraftTiTle=true//显示草稿标题
             this.getRouterDetailData(this.$route.query.receiptadjData)
             break;
          case 'copy':
             this.getRouterCopyData(this.$route.query.receiptadjData)
             break;
          default:
             break
        }
      }
    },
    getRouterCopyData(row){//获取复制过来的数据
       let _this=this
        _this.requestData.businessDate=row.businessDate;
        _this.requestData.customerName=row.customerName;
        _this.requestData.customerId=row.customerId;
        _this.requestData.type=(row.type).toString();
        _this.requestData.handlerUserId=row.HandlerUserId;
        _this.requestData.handler=row.handler;
        _this.requestData.remark=row.remark;  
        _this.tableData[0].receivableMoney=row.receivableMoney;                
    },
    getRouterDetailData(id){//草稿详情  
      fetchAdjustmentReceiptDetail(id).then(response => {
        if(response.code===0){
          console.log(response)  
          let _this=this
          _this.requestData.sheetNo=response.data.receiptBill.businessNo;
          _this.requestData.businessDate=response.data.receiptBill.businessDate;
          _this.requestData.customerName=response.data.receiptBill.customerName;
          _this.requestData.customerId=response.data.receiptBill.customerId;
          _this.requestData.type=(response.data.receiptBill.type).toString();
          _this.requestData.handlerUserId=response.data.receiptBill.sheetHandlerUserId;
          _this.requestData.handler=response.data.receiptBill.handler;
          _this.requestData.remark=response.data.receiptBill.remark;
          //待完善地方
          _this.tableData[0].receivableMoney=response.data.receiptBill.receivableMoney      
        }else{
          this.$message({
              type: 'error',
              message:response.msg
          })
        }        
      }) 
    },
    UpdateAdjustmentBill(state){//草稿更新判断
      if (this.requestData.businessDate === ''||this.requestData.businessDate === undefined) {
          this.tipShow("单据日期");
          return false
        } else if(this.requestData.customerName===''||this.requestData.customerId===''){
          this.tipShow("来往单位");
          return false
        }else if(this.requestData.handler===''||this.requestData.handlerUserId===""){
             this.tipShow("经手人");
             return false
        }else if(this.tableData[0].receivableMoney===''){
             this.tipShow("调整金额");
             return false
        }
        else{          
          this.darftUpdate(state);
        }
    },
    darftUpdate(status){//草稿详情更新
      this.requestData['inOutbalanceId']=this.$route.query.receiptadjData
      this.requestData['businessNo']=this.requestData.sheetNo     
      this.requestData['sheetStatus']=status
      this.requestData['receivableMoney']=this.tableData[0].receivableMoney
      fetchAdjustmentPayDarft(this.requestData).then(response => {
        if(response.code===0){
          this.$message({
              type: 'success',
              message: '操作成功'
          })
          this.$router.push('payable_adjustment_history')             
        }else{
          this.$message({
              type: 'error',
              message:response.msg
          })
        }        
      }) 
    },
    tipShow(name){//错误提示
       this.$message({
            type: 'error',
            message: name+'不能为空'
       })
    }, 
    addAdjustmentBill(status){//保存草稿、记账判断
        if (this.requestData.businessDate === ''||this.requestData.businessDate === undefined) {
          this.tipShow("单据日期");
          return false
        } else if(this.requestData.customerName===''||this.requestData.customerId===''||this.requestData.customerName===undefined){
          this.tipShow("来往单位");
          return false
        }else if(this.requestData.handler===''||this.requestData.handlerUserId===""||this.requestData.handler===undefined){
             this.tipShow("经手人");
             return false
        }else if(this.tableData[0].receivableMoney===''){
             this.tipShow("调整金额");
             return false
        }
        else{          
          this.postAdjustmentBill(status);
        }
    },
    postAdjustmentBill(status){ //保存草稿、记账提交后跳转历史      
     console.log(status)  
      this.requestData['businessNo']=this.requestData.sheetNo     
      this.requestData['sheetStatus']=status
      this.requestData['receivableMoney']=this.tableData[0].receivableMoney
      fetchReceiptAdjustmentPay(this.requestData).then(response => {
        if(response.code===0){
          this.$message({
              type: 'success',
              message: '操作成功'
          })          
          this.$router.push('payable_adjustment_history')             
        }else{
          this.$message({
              type: 'error',
              message:response.msg
          })
        }        
      }) 
    },
    getTableData () {//初始化表格
      this.tableData.push({subjectNumber:'',subjectName:'',receivableMoney:'',editeFlage:false})
    },
    radioCheck(value){//单选框值变化时
      this.getSheetNo()
    },
    getSheetNo(){//编号获取
      if(this.requestData.type==='330'){ //应收增加编号      
        fetchAdjustmentPayAddSheetNo().then(response => {   
          this.requestData.sheetNo=response.data.sheetNo
        })  
      }else{//应收减少编号
        fetchAdjustmentPayLessenSheetNo().then(response => {   
          this.requestData.sheetNo=response.data.sheetNo
        }) 
      }
    },
    getSupplierInfo (data) {//供应商组件传参
      this.requestData.customerName = data.name
      this.requestData.customerId = data.id
    },
    getHandlerInfo (data) {//经手人组件传参
      this.requestData.handler = data.name;
      this.requestData.handlerUserId = data.id;
    },    
    querySearchs (queryString, cb) {//搜索遍历
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
    createFilter (queryString) {//搜索过滤
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
          this.requestData.customerId = item.customerId
          this.requestData.customerName = item.value
          break        
        case 3:
          this.requestData.handlerUserId = item.userId
          this.requestData.handler = item.value
          break       
        default:
          break
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
    getSummaries (param) {//合计
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 1 || index === 2|| index ===3|| index ===5) {
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
      this.receivableMoneys = sums[4]
      return sums
    },
  }
}
</script>
<style type="text/scss" scoped lang="scss">
//公共样式 
.remark {
  margin-top: 10px;
  box-shadow: 10px -8px 10px -10px #aaa, 5px 8px 10px -10px #aaa;
  .el-input__inner {
    border-color: #f2f2f2;
  }
}
.term-search {
  margin-bottom: 10px;
  .el-row { 
    margin: 0px !important;
  }
}
.title {
  font-size: 24px;
}
.form-item {
  width: 19%;
  margin-top: 10px;
}
.form-btn {
  margin-top: 10px;
  margin-left: 10px;
}
.page-title {
  line-height: 45px;
  .bill-code {
    vertical-align: middle;
  }
  .title {
    font-size: 24px;
    color: #575757;
  }
  .code-label {
    font-size: 18px;
    padding-right: 3px;
    font-weight: normal;
  }
  .code {
    text-decoration: underline;
    line-height: 20px;
    font-size: 13px;
    color: #666;
  }
  button {
    margin-top: 5px;
  }
  .line {
    width: 100%;
    height: 5px;
    border-bottom: 3px solid #d4d8e1;
  }
}
.page-footer {
  width: 100%;
  background-color: #f4f4f4;
  height: 95px;
  line-height: 95px;
  text-align: center;
}
</style>
<style scoped>
.receipt-container .page-footer {
  width: 100%;
  background-color: #f4f4f4;
  height: 95px;
  line-height: 95px;
  text-align: center;
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
.receipt-adj-container .search-box-form{
  margin:10px 0;
}
.receipt-adj-container .search-box-form .height-m{
      margin-top: 7px;
}
.receipt-adj-container .search-box-form .el-form--inline .el-form-item__label{
    font-weight: 400 !important;
    font-size:12px !important;
    text-align:right;
}
.receipt-adj-container .search-box-form .el-autocomplete.form-item,.receipt-container .search-box-form .el-date-editor {
    height: 100%;
    margin-top: 0;
}
.receipt-adj-container .search-box-form .el-input__icon{
  line-height: 28px;
} 
.receipt-adj-container .search-box-form label{
  display: inline-block;
  width: 70px;
  text-align: right;
  font-size: 12px;
  font-weight: normal;
  color: #606266;
  vertical-align:middle;
}
.receipt-adj-container .search-box-form .el-col{
  margin-bottom: 5px;
}
.receipt-adj-container .search-box-form .el-col .el-input.el-input--large,
.receipt-adj-container .search-box-form .el-col .el-autocomplete.form-item{
 display: inline-block;
 width: calc(100% - 80px);
}
.receipt-adj-container .search-box-form .el-input-group__append{
  padding: 0 10px;
}
.receipt-adj-container .search-box-form .el-col .el-input .el-input__inner{
  height: 28px;
  line-height: 28px;
}
.receipt-adj-container .search-box-form .el-input.el-input--large{
  font-size: 12px;
}
.search-radio{
  line-height:30px
}
</style>



