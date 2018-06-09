<template>
  <div class="app-container receipt-container receipt-adj-container " v-loading="loading">
    <div class="page-title">
      <!--标题栏-->
      <el-row :gutter="10">
        <el-col :span="8">
        	<div class="bill-code">
            <label class="code-label">NO.</label>
            <span class="code">{{requestData.sheetNo}}</span>
          </div>  
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="center" align="middle">
            <span style="padding:0;" class="title">应收调账单-已记账</span>
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
          <el-radio :disabled="true" v-model="requestData.type" label="310" >应收增加</el-radio>
          <el-radio :disabled="true" v-model="requestData.type" label="320">应收减少</el-radio>
        </el-col>
        <el-col :span="6">
          <label>单据日期</label>
            <el-date-picker :disabled="true" v-model="requestData.businessDate" format="yyyy-MM-dd"    value-format="yyyy-MM-dd" type="date"></el-date-picker>
        </el-col>
        <el-col :span="6">
            <label class="height-m">来往单位</label>
            <el-autocomplete :disabled="true" class="form-item" size="small" v-model="requestData.customerName">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-autocomplete>
        </el-col>
        <el-col :span="6">
           <label  class="height-m">经手人</label>
            <el-autocomplete :disabled="true" class="form-item" size="small" v-model="requestData.handler">            
              <el-button  slot="append" icon="el-icon-search"></el-button>
            </el-autocomplete>
        </el-col>        
      </el-row>  
    </div>
    <div class="table-contain">
      <el-table header-align="center" style="width: 100%;height:100%" height="100%" :data="tableData" border fit highlight-current-row size="mini" show-summary  :summary-method="getSummaries"> 
        <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
        <el-table-column fixed prop="subjectNumber" label="科目编号" width="150">
        </el-table-column>
        <el-table-column fixed prop="subjectName" label="科目名称" width="190">
        </el-table-column>
        <el-table-column prop="receivableMoney" label="金额" width="150">
        </el-table-column>
        <el-table-column prop="" label="">
        </el-table-column>        
      </el-table>
    </div>
    <div class="remark">
      <el-input :disabled="true" v-model="requestData.remark" placeholder="单据备注"></el-input>
    </div>
    <div class="page-footer" v-show="hideDisCard">
      <el-button type="danger" @click="adjustmentDiscard">作废(红冲)</el-button>
    </div>
  </div>
</template>

<script>
import {fetchAdjustmentReceiptDisCard,fetchAdjustmentReceiptDetail} from '@/api/receipt'
export default {
  name: 'receiptadjustmentdiscard',
  components: {
  },
  data () {
    return {
      hideDisCard:true,
      loading:false,//是否loading
      requestData:{
        sheetNo:'',        
        businessDate:'',//单据日期
        customerName:'',//来往单位
        customerId:'',//来往单位id
        handlerUserId:'',//经手人id
        type:'310',
        handler:'',//经手人
        remark:''//备注
      },
      receivableMoneys:'',
      tableData:[],//表格     
    }
  },
  created(){
    this.getTableData();
    this.getRouterData();
  },
  methods:{
    adjustmentDiscard(){//作废操作提示
      let urlId=this.$route.query.inOutbalanceId 
      let _this=this 
      if(urlId===undefined){}else{
      _this.$confirm('此操作将红冲(作废)该条订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.putAdjustmentDiscard(urlId)
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })   
      }
    },
    putAdjustmentDiscard(urlId){//应收调整作废
       fetchAdjustmentReceiptDisCard(urlId).then(response => {
        if(response.code===0){
          this.$message({
            type: 'success',
            message: '作废成功'
          })
          this.$router.push('receivable_adjustment_history')
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
    historyRender(){//前往历史页面
      this.$router.push({path:'receivable_adjustment_history'})
    },
    getRouterData(){//获取路由传递的参数
      if(this.$route.query!=undefined){
        console.log(this.$route.query.inOutbalanceId)
        this.getRouterDetailData(this.$route.query.inOutbalanceId)
      }else{
        this.$router.push({path:'receivable_adjustment_history'})
      }
    },  
    getRouterDetailData(id){//草稿详情  
      fetchAdjustmentReceiptDetail(id).then(response => {
        if(response.code===0){
          console.log(response)  
          if(response.data.receiptBill.sheetStatus===20||response.data.receiptBill.sheetStatus===30){
                this.hideDisCard=false
            }
          let _this=this
          
          _this.requestData.sheetNo=response.data.receiptBill.businessNo;
          _this.requestData.businessDate=response.data.receiptBill.businessDate;
          _this.requestData.customerName=response.data.receiptBill.customerName;
          _this.requestData.customerId=response.data.receiptBill.customerId;
          _this.requestData.type=(response.data.receiptBill.type).toString();
          _this.requestData.handlerUserId=response.data.receiptBill.sheetHandlerUserId;
          _this.requestData.handler=response.data.receiptBill.sheetHandler;
          _this.requestData.remark=response.data.receiptBill.remark;
          //待完善地方
          _this.tableData[0].receivableMoney=response.data.receiptBill.receivableMoney      
        }else{
          this.$message({
              type: 'error',
              message:'获取失败'
          })
        }        
      }).catch(err => {
        this.$message({
          type: 'error',
          message:"此单不存在"
        })
        this.$router.push({path:'receivable_adjustment_history'})
      });  
    },
    tipShow(name){//错误提示
       this.$message({
            type: 'error',
            message: name+'不能为空'
       })
    }, 
    getTableData () {//初始化表格
      this.tableData.push({subjectNumber:'',subjectName:'',receivableMoney:'',editeFlage:false})
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
  color: #575757;
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



