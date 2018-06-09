<template>
  <div class="app-container clearing-bill-doing">
    <div class="page-title">
      <div class="bill-code">
        <label class="code-label">NO.</label>
        <span class="code" v-text="requestData1.sheetNo">CGRKD-20180417-0002</span>
        <label style="padding-left:30px;font-size:15px" class="code-label">源单</label>
        <span class="code" style="color:#0066FF" v-text="requestData1.sourceSheetNo"></span>
      </div>
      <div class="title">入库结算单</div>
      <div class="btnd">
        <el-button type="primary">打印</el-button>
        <el-button @click="historyRender">采购历史</el-button>
      </div>
      <div class="line"></div>
    </div>
    <div class="term-search">
      <!--查询栏-->
      <el-row :gutter="0" type="flex" justify="left">
      <el-col :span="6">
          <span>供应商</span><span class="required-code">*</span>
          <el-autocomplete class="form-item" size="small" v-model="requestData1.supplierName" @focus="which=1" :fetch-suggestions="querySearchs" placeholder="请选择"
            :trigger-on-focus="true"
            @select="handleSelect" :disabled="isDisabled">
            <el-button slot="append" icon="el-icon-search" @click="fixedOption.supplierShow=true" :disabled="isDisabled"></el-button>
          </el-autocomplete>
        </el-col>
        <el-col :span="5" class="el-col-padding">
          <span>仓库</span><span class="required-code">*</span>
          <el-autocomplete class="form-item" size="small" v-model="requestData1.storeName" @focus="which=2"
                      :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                      @select="handleSelect" placeholder="请选择" :disabled="isDisabled">
            <el-button slot="append" icon="el-icon-search" @click="fixedOption.deportShow=true" :disabled="isDisabled"></el-button>
          </el-autocomplete>
        </el-col>
        <el-col :span="6" class="el-col-padding">
          <span>经手人</span><span class="required-code">*</span>
          <el-autocomplete class="form-item" size="small" v-model="requestData1.handler" @focus="which=3"
                      :fetch-suggestions="querySearchs" :trigger-on-focus="true"
                      @select="handleSelect" placeholder="请选择" :disabled="isDisabled">
          <el-button slot="append" icon="el-icon-search" @click="fixedOption.brokerageShow=true" :disabled="isDisabled"></el-button>
        </el-autocomplete>
        </el-col>
        <el-col :span="7" class="el-col-padding">
          <span>单据日期</span><span class="required-code">*</span>
          <el-date-picker class="form-item" size="small"  v-model="requestData1.sheetDate" type="date" >
          </el-date-picker>
        </el-col>
      </el-row>
    </div>
    <div class="table-contain padding">
      <el-table v-loading="loading" style="width: 100%;height:calc100%" height="100%" :data="tableData" :summary-method="getSummaries" size="mini" border fit highlight-current-row show-summary>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="goodsNo" label="编号" width="100">
          <template slot-scope="scope">
            <span v-text="scope.row.goodsNo"></span>
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="品名" width="100">
          <template slot-scope="scope">
            <span v-text="scope.row.goodsName"></span>
          </template>
        </el-table-column>
        <el-table-column prop="goodsColor" label="颜色">
          <template slot-scope="scope">
            <span v-text="scope.row.goodsColor"></span>
          </template>
        </el-table-column>
        <el-table-column prop="batchNo" label="批号">
          <template slot-scope="scope">
            <span v-text="scope.row.batchNo"></span>
          </template>
        </el-table-column>
        <el-table-column prop="itemCount" label="条数">
          <template slot-scope="scope">
            <span v-text="scope.row.itemCount"></span>
          </template>
        </el-table-column>
        <el-table-column prop="orderQuantity" label="入库数量">
          <template slot-scope="scope">
            <span v-text="scope.row.orderQuantity"></span>
          </template>
        </el-table-column>
        <el-table-column prop="goodsUnit" label="单位">
          <template slot-scope="scope">
            <span v-text="scope.row.goodsUnit"></span>
          </template>
        </el-table-column>
        <el-table-column prop="settleQuantity" label="结算数量">
          <template slot-scope="scope">
            <el-input class="input-num" v-model.number="scope.row.settleQuantity" @blur="getData(scope.row)" @keyup.enter.native="getData(scope.row)" type="number" :min="0"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="goodsPrice" label="结算单价" >
          <template slot-scope="scope">
            <el-input class="input-num" v-model.number="scope.row.goodsPrice" @blur="getData(scope.row)"  @keyup.enter.native="getData(scope.row)" type="number" :min="0"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="totalMoney" label="结算金额">
          <template slot-scope="scope">
            <span v-text="scope.row.totalMoney"></span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
          <template slot-scope="scope">
            <span v-text="scope.row.remark"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="remark">
      <el-input v-model="requestData1.remark" placeholder="单据备注"></el-input>
    </div>
    <div class="page-footer">
      <el-row :gutter="0" type="flex" justify="left">
      <el-col :span="6">
          <span>前欠贷款</span>
          <el-input class="form-item" size="small" v-model="requestData.credit"></el-input>
        </el-col>
        <el-col :span="6" class="el-col-padding">
          <!-- <div class="total-money-input">
            <span>本单金额</span>
            <div class="total-money">{{requestData1.totalMoney}}</div>
          </div> -->
          <span>本单金额</span>
          <el-input class="form-item" size="small" v-model="requestData1.totalMoney" type="text"></el-input>
        </el-col>
        <el-col :span="6" class="el-col-padding">
          <span>本单优惠</span>
          <el-input class="form-item" size="small" v-model="requestData1.discountMoney"></el-input>
        </el-col>
        <el-col :span="6" class="el-col-padding">
        </el-col>
      </el-row>
      <el-row :gutter="0" type="flex" justify="left">
      <el-col :span="6">
          <span>其他费用</span>
          <el-input class="form-item" size="small" v-model="requestData1.otherMoney"></el-input>
        </el-col>
        <el-col :span="6" class="el-col-padding">
          <span>付款账户</span>
          <el-input class="form-item" size="small" v-model="requestData1.bankAccount" @focus="which=4"
                      :fetch-suggestions="querySearchs"  :trigger-on-focus="true"
                      @select="handleSelect">
              <el-button slot="append" icon="el-icon-search" @click="fixedOption.receiptShow=true"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6" class="el-col-padding">
          <span>付款金额</span>
          <el-input class="form-item" size="small" v-model="requestData1.settleMoney"></el-input>
        </el-col>
        <el-col :span="6" class="el-col-padding">
        </el-col>
      </el-row>
      <div class="footer-btn">
        <el-button @click="saveInfoDraft()">保存草稿</el-button>
        <el-button type="danger" @click="saveInfo()">记账</el-button>
      </div>
    </div>
    <div class="input-select" ref="inputSelect">
      <span class="span">
        <input type="text" ref="input" @blur="reset()" @click.stop="" v-model="value" @keyup="keyUp()">
        <div class="contain" ref="contain">
          <div class="san"></div>
          <ul class="dropDown">
            <li v-for="item in querySelectArr" @click="sureSelect(item)" :key="item.value" v-text="item.value"></li>
          </ul>
        </div>
      </span>
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
import { getClearingBillDoing, clearingBillDoingAccount, fetchSettleSheetCode, fetchGoodsList, fetchGoodsColor, fetchBrokerage, fetchSupplier, fetchDeport } from '@/api/purchase'
export default {
  name: 'purchase',
  data () {
    return {
      loading:true,
      isShow: false,
      fixedOption: {
        supplierShow: false,
        deportShow: false,
        brokerageShow: false,
        receiptShow: false
      },
      requestData: {
        orderNo: '',
        expectOutStoreDate: '',
        goodsUnit: '',
        purchaseGoodsList: [],
        credit:'' // 前欠贷款
      },
      // 以上数据暂时不需要， 下面是请求记账需要的数据-----------
      requestData1: {
        handler: '',
        handlerId: '',
        supplierName: '',
        supplierId: '',
        storeName: '',
        storeId: '',
        sheetDate: timeNow(1), // 时间
        sheetNo:'', // 单据编号
        totalItem: 0, // 总条数
        totalQuantity: 0, // 入库总数量
        remark: '', // 单据备注
        discountMoney: 0, // 本单优惠
        otherMoney: 0, // 其他费用
        settleMoney: 0, // 付款金额 -- 应结算金额
        bankAccount: '', // 付款账户
        bankAccountId: '', // 付款账户id
        totalMoney: 0, // 本单金额
        orderId: '', //入库结算单id--采购入库单ID
        sourceSheetNo: '', // 来源单据
        purchaseOrderBalanceDetailsList: [] // 数组参数集合
      },
      isDisabled: false,
      tableData: [],

      which: 1,
      brokerage: [],
      deport: [],
      supplier: [],
      querySelectArr: [],
      value: '',
      autofocus: false,
      x: 1,
      y: 0,
    }
  },
  computed: {
  },
  created () {
    this.getSheetNo()
    this.getAccount()
    this.getTableData()
    this.getBrokerage()
    this.getSupplier()
    this.getDeport()
    this.getGoods()
  },
  mounted () {

  },
  methods: {
    // 获取单据编号
    getSheetNo () {
        const _self = this
        return new Promise((resolve, reject) => {
          fetchSettleSheetCode().then(response => {
            _self.requestData1.sheetNo = response.data.data.sheetNo
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      },
    // 获取url带来的orderId
    getAccount(){
      this.requestData1.orderId = this.$route.query.orderId
      const _self = this
      return new Promise((resolve, reject) => {
        getClearingBillDoing(this.requestData1.orderId).then(response => {
          // console.log(response, 1111111111)
          if(response.data.purchaseOrder){
            var accountData = response.data.purchaseOrder
            _self.isDisabled = true
          }else{
            var accountData = response.data.purchaseOrderSettle
          }
          _self.requestData1.supplierName = accountData.supplierName
          _self.requestData1.supplierId = accountData.supplierId
          _self.requestData1.storeName = accountData.storeName
          _self.requestData1.storeId = accountData.storeId
          _self.requestData1.handler = accountData.handler
          _self.requestData1.handlerId = accountData.handlerUserId
          _self.requestData1.sheetDate = accountData.sheetDate
          _self.requestData1.sourceSheetNo = accountData.orderNo ? accountData.orderNo : _self.requestData1.sheetNo
          _self.tableData = accountData.purchaseGoodsList
          _self.loading = false
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    // 获取数据
    getData(flag) {
      console.log(flag)
      if( typeof(flag.settleQuantity) !== "number" || (flag.settleQuantity === Infinity) || isNaN(flag.settleQuantity) || flag.settleQuantity < 0) {
        flag.settleQuantity = 0
        this.$message({
            type: 'error',
            message: '请输入正确的结算数量'
        })
      }
      if( typeof(flag.goodsPrice) !== "number" || (flag.goodsPrice === Infinity) || isNaN(flag.goodsPrice) || flag.goodsPrice < 0) {
        flag.goodsPrice = 0
        console.log(flag.goodsPrice , 111111)
        this.$message({
            type: 'error',
            message: '请输入正确的结算单价'
        })
      }
      if(flag.goodsPrice === undefined){
        flag.goodsPrice = 0
      }
      if(flag.settleQuantity === undefined){
        flag.settleQuantity = 0
      }
      let totalMoneyData =  flag.goodsPrice * flag.settleQuantity
      this.$set(flag,'totalMoney',totalMoneyData)
      // 把数据更新到表格数组中
    },
    // 跳转到采购历史
    historyRender: function () {
      this.$router.push({ path: '/purchase/clearing_bill_history' })
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
        default:
          break
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    // 付款账户
    getreceiptInfo (data) {
      console.log(data)
      this.requestData1.bankAccount = data.name;
      this.requestData1.bankAccountId = data.id;
    },
    getBrokerage () {
      const _self = this
      return new Promise((resolve, reject) => {
        fetchBrokerage({pageSize: 2147483647}).then(response => {
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
    getSupplier () {
      const _self = this
      return new Promise((resolve, reject) => {
        fetchSupplier({pageSize: 2147483647}).then(response => {
          this.supplier = response.data.data.list.list
          for (var i = 0; i < this.supplier.length; i++) {
            this.supplier[i].value = this.supplier[i].supplierName
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
        fetchDeport({pageSize: 2147483647}).then(response => {
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
    async getGoods () {
      const res = await fetchGoodsList()
      if (res.code === 0) {
        this.goodsList = res.data.list.list
      } else {
        this.$message({
          type: 'error',
          message: res.msg
        })
      }
    },
    async getColor (goodsNo) {
      const res = await fetchGoodsColor(goodsNo)
      if (res.code === 0) {
        this.colorList = res.data.list
      } else {
        this.$message({
          type: 'error',
          message: res.msg
        })
      }
    },
    createFilter (queryString) {
      return (restaurant) => {
        switch (this.which) {
          case 1:
            return (restaurant.supplierName.indexOf(queryString) > -1)
            break
          case 2:
            return (restaurant.storeName.indexOf(queryString) > -1)
            break
          case 3:
            return (restaurant.userName.indexOf(queryString) > -1)
            break
          default:
            break
        }
      }
    },
    handleSelect (item) {
      let searchInfos
      switch (this.which) {
        case 1:
          this.requestData1.supplierId = item.customerId
          this.requestData1.supplierName = item.value
          break
        case 2:
          this.requestData1.storeId = item.storeId
          this.requestData1.storeName = item.value
          break
        case 3:
          this.requestData1.handlerId = item.userId
          this.requestData1.handler = item.value
          break
        default:
          break
      }
    },
    change (index) {
      if (index === 1) {
        this.requestData1.sheetDate = timeToDateFn(new Date(this.requestData1.sheetDate).getTime() / 1000, 1)
      } else if (this.requestData1.expectOutStoreDate !== '' && index === 2) {
        this.requestData.expectOutStoreDate = timeToDateFn(new Date(this.requestData.expectOutStoreDate).getTime() / 1000, 1)
      }
    },
    getTableData () {
      for (var i = 0; i < 10; i++) {
        this.tableData.push({ goodsNo: '', goodsName: '', goodsColor: '', batchNo: '', itemCount: '', orderQuantity: '', goodsUnit: '', remark: '', goodsId: '', goodsColorId: '', settleQuantity: '', goodsPrice: '', totalMoney: '' })
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
        if ( index === 1 || index === 2 || index === 3 || index === 4 || index === 7 || index === 11 ) {
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
      this.requestData1.totalItem = sums[5]
      this.requestData1.totalQuantity = sums[6]
      this.requestData1.totalMoney = sums[10]
      return sums
    },
    querySelect (queryString) {
      var goodsArr
      if (this.x === 3) {
        goodsArr = this.colorList
      } else {
        goodsArr = this.goodsList
      }
      var results = queryString ? goodsArr.filter(this.createFilter2(queryString)) : goodsArr
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
    sureSelect (row) {
      if (this.x === 3) {
        this.tableData[this.y].goodsColor = row.colorName
        this.tableData[this.y].goodsColorId = row.colorId
      } else {
        this.tableData[this.y].goodsNo = row.goodsNo
        this.tableData[this.y].goodsName = row.goodsName
        this.tableData[this.y].goodsUnit = row.unit ? row.unit : ''
        this.tableData[this.y].itemCount = 1
        this.tableData[this.y].orderQuantity = 1
        this.tableData[this.y].goodsId = row.goodsId
        this.getColor(row.goodsNo)
      }
    },
    add () {
      this.tableData.push({ goodsNo: '', goodsName: '', goodsColor: '', batchNo: '', itemCount: '', orderQuantity: '', goodsUnit: '', remark: '', goodsId: '', goodsColorId: '', settleQuantity: '', goodsPrice: '', totalMoney: '' })
    },
    click (event, x, y) {
      // console.log(x, y)
      this.x = x
      this.y = y
      if (x > 2 && (this.tableData[this.y].goodsNo === '' || this.tableData[this.y].goodsName === '')) {
        this.$refs.inputSelect.style.display = 'none'
        return false
      }
      if (this.$refs.inputSelect.style.display === '' || this.$refs.inputSelect.style.display === 'none') {
        this.$refs.inputSelect.style.display = 'block'
      }
      switch (this.x) {
        case 1:
          this.value = this.tableData[this.y].goodsNo
          break
        case 2:
          this.value = this.tableData[this.y].goodsName
          break
        case 3:
          this.value = this.tableData[this.y].goodsColor
          break
        case 4:
          this.value = this.tableData[this.y].batchNo
          break
        case 5:
          this.value = this.tableData[this.y].itemCount
          break
        case 6:
          this.value = this.tableData[this.y].orderQuantity
          break
        case 7:
          this.value = this.tableData[this.y].goodsUnit
          break
        case 8:
          this.value = this.tableData[this.y].remark
          break
        default:
          break;
      }
      this.$refs.contain.style.display = 'none'
      this.$refs.input.focus()
      this.$refs.inputSelect.style.top = event.clientY - event.offsetY + 1 + 'px'
      this.$refs.inputSelect.style.left = event.clientX - event.offsetX + 'px'
      this.$refs.inputSelect.style.width = event.target.offsetWidth + 'px'
      this.$refs.inputSelect.style.height = event.target.offsetHeight + 'px'
    },
    keyUp () {
      if (this.querySelect(this.value).length !== 0 && this.x < 4) {
        this.$refs.contain.style.display = 'block'
      }
      this.sure()
    },
    sure () {
      switch (this.x) {
        case 1:
          this.tableData[this.y].goodsNo = this.value
          break
        case 2:
          this.tableData[this.y].goodsName = this.value
          break
        case 3:
          this.tableData[this.y].goodsColor = this.value
          break
        case 4:
          this.tableData[this.y].batchNo = this.value
          break
        case 5:
          this.tableData[this.y].itemCount = this.value
          break
        case 6:
          this.tableData[this.y].orderQuantity = this.value
          break
        case 7:
          this.tableData[this.y].goodsUnit = this.value
          break
        case 8:
          this.tableData[this.y].remark = this.value
          break
        default:
          break;
      }
    },
    reset () {
      var _self = this
      setTimeout(() => {
        _self.$refs.inputSelect.style.display = 'none'
      }, 200)
    },
    // tranfer (data) {
    //   console.log(this.tableData, 11111)
    //   for (let i = 0; i < this.tableData.length; i++) {
    //     return this.tableData[i].goodsPrice || this.tableData[i].settleQuantity || this.tableData[i].goodsPrice === 'undefined' || this.tableData[i].settleQuantity === 'undefined' ? true : false
    //   }
    //   // var tableUnfilled
    //   // console.log(tableUnfilled)
    // },
    // 入库结算单记账
    saveInfo () {
      console.log(this.tableData, 11111)
      for (let i = 0; i < this.tableData.length; i++) {
        console.log(this.tableData[i].goodsPrice)
        console.log(typeof(this.tableData[i].settleQuantity))
        var tableUnfilled  =   ( this.tableData[i].goodsPrice !='undefined') ? false : true
        var tableUn2 =  (this.tableData[i].settleQuantity !='undefined' ) ? false : true
      }
      console.log(tableUnfilled, tableUn2)
      if( tableUnfilled || tableUn2 ){
        this.$message({
            type: 'error',
            message: '请填写完整结算数量和结算单价'
          })
        return false
      }
        // 判断表格内是否有未填写的资料
      if (this.requestData1.sheetDate === '') {
        this.$message({
          type: 'error',
          message: '单据日期不能为空'
        })
        return false
      } else if (this.requestData1.sheetNo === '') {
        this.$message({
          type: 'error',
          message: '单据编号不能为空'
        })
        return false
      } else if (this.requestData1.sourceSheetNo === '') {
        this.$message({
          type: 'error',
          message: '来源单据不能为空'
        })
        return false
      } else if (this.requestData1.settleMoney === '') {
        this.$message({
          type: 'error',
          message: '付款金额不能为空'
        })
        return false
      } else if (this.requestData1.handler === '') {
        this.$message({
          type: 'error',
          message: '经手人不能为空'
        })
        return false
      } else if (this.requestData1.storeName === '') {
        this.$message({
          type: 'error',
          message: '仓库不能为空'
        })
        return false
      } else {
          this.requestData1.purchaseOrderBalanceDetailsList = this.tableData
          // 因为接收的参数名和要传过去的参数名不一样  所以要改参数名
          for(let i=0; i<this.requestData1.purchaseOrderBalanceDetailsList.length; i++){
            let data = this.requestData1.purchaseOrderBalanceDetailsList[i]
            data["actualItemCount"] = data.itemCount
            data["actualQuantity"] = data.orderQuantity
          }
          return new Promise((resolve, reject) => {
            clearingBillDoingAccount(this.requestData1).then(response => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.$router.push('receipt_history')
              resolve(true)
            }).catch(err => {
              console.log(err)
              this.$message({
                type: 'error',
                message: '操作失败'
              })
              reject(false)
            })
          })
        //   clearingBillDoingAccount( this.requestData1 ).then(response => {
        //   if(response.code === 0){
        //     this.$message({
        //         type: 'success',
        //         message: '操作成功'
        //     })
        //     this.$router.push('receipt_history')
        //   }else{
        //     this.$message({
        //         type: 'error',
        //         message:response.msg
        //     })
        //   }
        // })
      }
    },
    async saveInfoDraft () {
      this.tranfer(this.tableData)
      this.requestData.goodsUnit = this.requestData.purchaseGoodsList[0] ? this.requestData.purchaseGoodsList[0].goodsUnit : ''
      if (this.requestData.supplierName === '') {
        this.$message({
          type: 'error',
          message: '供应商不能为空'
        })
        return false
      } else if (this.requestData.storeName === '') {
        this.$message({
          type: 'error',
          message: '仓库不能为空'
        })
        return false
      } else if (this.requestData.handler === '') {
        this.$message({
          type: 'error',
          message: '经手人不能为空'
        })
        return false
      } else {
        const res = await fetchSaveInstroeInfoDraft(this.requestData)
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '保存草稿成功'
          })
          this.$router.push('stock_in_bill_history')
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      }
    },
    remove (index) {
      this.tableData.splice(index, 1)
    },
    getSupplierInfo (data) {
      this.requestData1.supplierName = data.name
      this.requestData1.supplierId = data.id
    },
    getDeportInfo (data) {
      this.requestData1.storeName = data.name
      this.requestData1.storeId = data.id
    },
    getHandlerInfo (data) {
      this.requestData1.handler = data.name
      this.requestData1.handlerId = data.id
    }
  },
  components: {
    fixedPage1,
    fixedPage2,
    fixedPage3,
    fixedPage4
  }
}
</script>
<style type="text/scss" scoped lang="scss">
.remark {
  margin-top: 10px;
  box-shadow: 10px -8px 10px -10px #aaa, 5px 8px 10px -10px #aaa;
  .el-input__inner {
    border-color: #f2f2f2;
  }
}
.term-search,.page-footer {
  margin-bottom: 10px;
  font-size: 12px;
  color: #575757;
  .el-row {
    margin: 0px !important;
  }
}
.page-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #f4f4f4;
  height: 100px;
  // line-height: 95px;
  text-align: center;
  .footer-btn{
    position: absolute;
    top:50%;
    right: 10px;
    transform: translate(0, -50%);
  }
  .total-money-input{
    display: flex;
    -ms-flex-item-align: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    border: 1px solid #000;
    .total-money{
      width: calc(100% - 36px);
      // height: calc(100% - 240px);
      height: 100%;
    }
  }
}
.title {
  font-size: 24px;
}
.form-item {
  width: 66%;
  margin-top: 10px;
}
.form-btn {
  margin-top: 10px;
  margin-left: 10px;
}
.page-title {
  line-height: 45px;
  height: 45px;
  position: relative;
  div.title {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    font-size: 24px;
    color: #575757;
  }
  .bill-code {
    vertical-align: middle;
    position: absolute;
    left: 0;
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
  .btnd {
    position: absolute;
    top: 0;
    right: 0;
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
</style>
<style lang="scss">
.clearing-bill-doing .input-num{
  height: 27px;
  display: flex;
  .el-input__inner  {
    height: 100%;
    padding: 0 10px;
    border: 0 none;
    background: transparent;
    &:focus {
      background: #fff;
      border: 1px #409eff solid;
      outline: -webkit-focus-ring-color auto 5px;
    }
  }
}
.input-select {
  position: fixed;
  top: 0;
  left: 0;
  display: none;
}
.span {
  position: relative;
  width: 100%;
  input {
    font-size: 12px;
    width: 100%;
    line-height: 20px;
    // text-indent:10px;
    &.border {
      border: none !important;
      background-color: transparent !important;
    }
  }
  span.search {
    height: 26px;
    width: 20px;
    line-height: 26px;
    text-align: center;
    &.zIndex {
      z-index: 1;
    }
    z-index: -1;
  }
}
.contain {
  position: relative;
  top: 1px;
  left: 0px;
  background: #fff;
  width: 100%;
  z-index: 1000;
  display: none;
  &.show {
    display: block;
  }
}
span.close {
  position: absolute;
  width: 12px;
  height: 12px;
  line-height: 12px;
  text-align: center;
  top: 7px;
  right: 25px;
  cursor: pointer;
}
span.close:hover {
  color: #eb453c;
}
span.search {
  position: absolute;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  top: 0px;
  right: 0px;
  cursor: pointer;
}
.dropDown {
  list-style: none;
  border: 1px solid #ccc;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin: 0;
  padding-left: 0px;
  max-height: 140px;
  overflow: auto;
  &:hover::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 8px;
  }
  li {
    height: 28px;
    line-height: 28px;
    padding-left: 20px;
    cursor: pointer;
    text-align: left !important;
    font-size: 12px;
    &:hover {
      background-color: #f5f7fa;
    }
  }
}
</style>
<style>
.clearing-bill-doing .table-contain {
  height: calc(100% - 240px);
}
.padding .el-table thead tr th {
  /*  color: #333;
    font-weight: 500;
    background-color: #E2E9Ef;
    border-right-color:#ccc */
}
.padding .el-table--mini td {
  padding: 1px !important;
}
.padding .el-table td > .cell {
  height: 27px;
  line-height: 27px;
}
.padding .el-table th > .cell,
.padding .el-table td > .cell {
  /* text-align: center; */
  width: 100%;
  position: relative;
  overflow: visible;
}
.padding el-table td > .cell .el-input {
  position: relative;
  top: -11px;
}
.padding .el-table td > .cell span input {
  height: 26px;
  line-height: 26px;
}
.padding .el-table td > .cell span {
  display: block;
  width: 100%;
  height: 100%;
}
.clearing-bill-doing .el-col-padding{
  padding: 0px !important
}
.clearing-bill-doing .el-loading-mask{
  z-index: 3;
}
.clearing-bill-doing .required-code{
  color: #f00;
}
</style>
