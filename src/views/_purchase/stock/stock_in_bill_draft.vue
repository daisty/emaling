<template>
  <div class="app-container">
    <page-title :option="option"></page-title>
    <term-search v-if="requestData.orderNo" :defaultValue="requestData"></term-search>
    <div class="table-contain padding">
      <el-table style="width: 100%;height:calc100%" height="100%" :data="requestData.purchaseGoodsList" :summary-method="getSummaries" size="mini" border fit highlight-current-row show-summary>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="操作" style="text-indent: 0px" width="80">
          <template slot-scope="scope">
            <i class="el-icon-circle-plus-outline" @click="add()" style="cursor:pointer" @mouseover="insertAddActive($event)" @mouseout="deletedAddActive($event)"></i>
            <i class="el-icon-remove-outline" @click="remove(scope.$index)" style="cursor:pointer" @mouseover="insertRemoveActive($event)" @mouseout="deletedRemoveActive($event)"></i>
          </template>
        </el-table-column>
        <el-table-column prop="goodsNo" label="编号" width="100">
          <template slot-scope="scope">
            <span @click.stop="click($event,1,scope.$index)" v-text="scope.row.goodsNo"></span>
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="品名" width="140">
          <template slot-scope="scope">
            <span @click.stop="click($event,2,scope.$index)" v-text="scope.row.goodsName"></span>
          </template>
        </el-table-column>
        <el-table-column prop="goodsColor" label="颜色">
          <template slot-scope="scope">
            <span @click.stop="click($event,3,scope.$index)" v-text="scope.row.goodsColor"></span>
          </template>
        </el-table-column>
        <el-table-column prop="batchNo" label="批号">
          <template slot-scope="scope">
            <span @click.stop="click($event,4,scope.$index)" v-text="scope.row.batchNo"></span>
          </template>
        </el-table-column>
        <el-table-column prop="itemCount" label="条数">
          <template slot-scope="scope">
            <span @click.stop="click($event,5,scope.$index)" v-text="scope.row.itemCount"></span>
          </template>
        </el-table-column>
        <el-table-column prop="orderQuantity" label="入库数量">
          <template slot-scope="scope">
            <span @click.stop="click($event,6,scope.$index)" v-text="scope.row.orderQuantity"></span>
          </template>
        </el-table-column>
        <el-table-column prop="goodsUnit" label="单位">
          <template slot-scope="scope">
            <span v-text="scope.row.goodsUnit"></span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
          <template slot-scope="scope">
            <span @click.stop="click($event,8,scope.$index)" v-text="scope.row.remark"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="input-select" ref="inputSelect">
      <span class="span">
        <input type="text" ref="input" @click.stop="" v-model="value" @keyup="keyUp()">
        <div class="contain" ref="contain">
          <div class="san"></div>
          <ul class="dropDown">
            <li v-for="item in querySelectArr" @click="sureSelect(item)" :key="item.value" v-text="item.value"></li>
          </ul>
        </div>
        <!--  <span class="close"><i @click="openFixed(1)" class="el-icon-circle-close-outline"></i></span>
        <span class="search" :class="{zIndex:show}"><i class="el-icon-zoom-in"></i></span> -->
      </span>
    </div>
    <div class="remark">
      <el-input :disabled="true" v-model="requestData.remark" placeholder="单据备注"></el-input>
    </div>
    <page-footer :pageFooterOption="pageFooterOption"></page-footer>
  </div>
</template>

<script>
import pageTitle from '@/components/pageTitle'
import tableStock from '@/components/tables/tableStock'
import termSearch from '@/components/termSearch'
import pageFooter from '@/components/pageFooter/pageFooterStock'
import {
  getPurchaseOrderDetails,
  discardPurchasePurchaseOrder
} from '@api/purchase'
export default {
  name: 'purchase',
  data () {
    return {
      orderId: this.$route.query.orderId,
      option: {
        pageName: '采购入库单(详情-已入库)',
        isCode: true,
        isNeedBtn: false,
        btnName1: '打印',
        btnName2: '历史'
      },
      pageFooterOption: {
        isNeed_1: true,
        isNeed_2: true,
        btnText1: '退货',
        btnText2: '作废',
        click1 () {

        },
        click2: () => {
          discardPurchasePurchaseOrder({
            orderId: this.orderId,
            orderType: 1
          }).then((data) => {
            if (data.code == 0) {
              this.$router.push('stock_in_bill_history')
            }
          });

        }
      },
      remark: '',
      requestData: {
        orderNo: '',
        supplierName: '',
        supplierId: '',
        handler: '',
        handlerUserId: '',
        storeName: '',
        storeId: '',
        sheetDate: '',
        expectOutStoreDate: '',
        purchaseGoodsList: [],//表格数据
        remark: ''
      },
      value: '',
      querySelectArr: []
    }
  },
  created () {
    this.getPurchaseOrderDetails()
  },
  methods: {
    getPurchaseOrderDetails () {
      getPurchaseOrderDetails(this.orderId).then(({ data }) => {
        const Data = data.purchaseOrder
        this.requestData = {
          ...this.requestData,
          ...data.purchaseOrder,
        }
        this.option = {
          ...this.option,
          sheetNo: this.requestData.orderNo
        }
      })
    },
    click (event, x, y) {
      //      console.log("the event info is: "+event.clientX+" "+event.offsetX+" "+event.clientY+" "+event.offsetY)
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
        case 8:
          this.value = this.tableData[this.y].remark
          break
        default:
          break;
      }
      this.$refs.inputSelect.style.top = event.clientY - event.offsetY + 1 + 'px'
      this.$refs.inputSelect.style.left = event.clientX - event.offsetX + 'px'
      this.$refs.inputSelect.style.width = event.target.offsetWidth + 'px'
      this.$refs.inputSelect.style.height = event.target.offsetHeight + 'px'
      this.$refs.contain.style.display = 'none'
      this.$refs.input.focus()
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 1 || index === 2 || index === 3 || index === 4 || index === 5 || index === 9) {
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
      this.requestData.totalItem = sums[6]
      this.requestData.totalQuantity = sums[7]
      sums[8] = this.tableData[this.y].goodsUnit ? this.tableData[this.y].goodsUnit : ''
      return sums
    }
  },
  components: {
    pageTitle,
    termSearch,
    tableStock,
    pageFooter
  }
}
</script>
<style type="text/scss" scoped lang="scss">
.remark {
  margin-top: 10px;
  box-shadow: 10px -8px 20px -10px #aaa, 5px 12px 20px -10px #aaa;
  .el-input__inner {
    border-color: #f2f2f2;
  }
}
</style>
