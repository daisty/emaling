<template>
  <div class="table-contain padding">
    <el-table style="width: 100%;height:calc100%"
      height="100%"
      :data="tableData"
      :summary-method="getSummaries"
      size="mini"
      border fit highlight-current-row show-summary>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column label="操作" width="60">
        <template slot-scope="scope">
          <i class="el-icon-plus" @click="add()" style="cursor:pointer"></i>
          <i class="el-icon-minus" @click="remove(scope.$index)" style="cursor:pointer"></i>
        </template>
      </el-table-column>
      <el-table-column prop="goodsNo" label="编号" width="180">
        <template slot-scope="scope">
         <span @click.stop="click($event,1,scope.$index)" v-text="scope.row.goodsNo"></span>
        </template>
      </el-table-column>
      <el-table-column prop="goodsName" label="品名" width="180">
        <template slot-scope="scope">
          <span @click.stop="click($event,2,scope.$index)" v-text="scope.row.goodsName"></span>
        </template>
      </el-table-column>
      <el-table-column prop="goodsColor" label="颜色" >
       <template slot-scope="scope">
          <span @click.stop="click($event,3,scope.$index)" v-text="scope.row.goodsColor"></span>
        </template>
      </el-table-column>
      <el-table-column prop="batchNo" label="批号" >
        <template slot-scope="scope">
           <span @click.stop="click($event,4,scope.$index)" v-text="scope.row.batchNo"></span>
        </template>
      </el-table-column>
      <el-table-column prop="itemCount" label="条数" >
        <template slot-scope="scope">
          <span @click.stop="click($event,5,scope.$index)" v-text="scope.row.itemCount"></span>
        </template>
      </el-table-column>
      <el-table-column prop="orderQuantity" label="入库数量" >
        <template slot-scope="scope">
          <span @click.stop="click($event,6,scope.$index)" v-text="scope.row.orderQuantity"></span>
        </template>
      </el-table-column>
      <el-table-column prop="goodsUnit" label="单位" >
        <template slot-scope="scope">
          <span @click.stop="click($event,7,scope.$index)" v-text="scope.row.goodsUnit"></span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" >
        <template slot-scope="scope">
         <span @click.stop="click($event,8,scope.$index)" v-text="scope.row.remark"></span>
        </template>
      </el-table-column>
      <el-table-column ></el-table-column>
    </el-table>
    <div class="input-select" ref="inputSelect">
      <span class="span">
        <input type="text" ref="input" @click.stop="" v-model="value" @keyup="change()">
        <div class="contain" ref="contain">
          <div class="san"></div>
          <ul class="dropDown">
            <li v-for="item in querySearchs(value)" @click="sureSelect(item)" :key="item.value" v-text="item.value"></li>
          </ul>
        </div>
       <!--  <span class="close"><i @click="openFixed(1)" class="el-icon-circle-close-outline"></i></span>
        <span class="search" :class="{zIndex:show}"><i class="el-icon-zoom-in"></i></span> -->
      </span>
    </div>
  </div>
</template>

<script>
  import { fetchGoodsList, fetchGoodsColor } from '@/api/purchase'
  export default {
    data() {
      return {
        goodsNo: '',
        show: true,
        value: '',
        autofocus: false,
        x: '',
        y: 0,
        purchaseGoods:[],
        inStoreColSet: [
          {lable: '序号', props: 'index', type: '1' },
          {lable: '操作', props: 'oper', type: '2' },
          {lable: '编号', props: 'goodsNo', type: '3' },
          {lable: '品名', props: 'goodsName', type: '3'},
          {lable: '颜色', props: 'goodsColor', type: '4' },
          {lable: '批号', props: 'batchNo', type: '4' },
          {lable: '条数', props: 'itemCount', type: '4'},
          {lable: '入库数量', props:'orderQuantity', type: '4' },
          {lable: '单位', props: 'goodsUnit', type: '4' },
          {lable: '备注', props: 'remark', type: '4' }
        ],
        tableData: []
      }
    },
    components: {
      // colInputs,
      // colInput
    },
    created() {
      this.getTableData()
      this.reset()
    },
    mounted() {
      this.getGoods()
    },
    methods: {
      getTableData() {
        for (var i = 0; i < 10; i++) {
          this.tableData.push({ goodsNo: '', goodsName: '', goodsColor: '', batchNo: '', itemCount: '', orderQuantity: '', goodsUnit: '', remark: ''})
          this.purchaseGoods.push({})
        }
      },
      getSummaries(param) {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
            return
          }
          if(index === 1 || index === 2 || index === 3 || index === 4 || index === 5 || index===9) {
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
        sums[8] = this.tableData[this.y].goodsUnit?this.tableData[this.y].goodsUnit:''
        return sums
      },
      check(index, row, value, show) {
        if (value === '') {
          show.show = false
        }
      },
      async getGoods() {
        const res = await fetchGoodsList()
        console.log(res)
        if (res.code === 0) {
          this.goodsList = res.data.list.list
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      },
      async getColor(goodsNo) {
        const res = await fetchGoodsColor(goodsNo)
        console.log(res)
        if (res.code === 0) {
          this.colorList = res.data.list
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      },
      querySearchs(queryString) {
        var goodsArr
        if (this.which === 3) {
          goodsArr = this.colorList
        } else {
          goodsArr = this.goodsList
        }
        var results = queryString ? goodsArr.filter(this.createFilter(queryString)) : goodsArr
        return results
      },
      createFilter(queryString) {
        return (item) => {
          switch (this.which) {
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
      add() {
        this.tableData.push({ goodsNo: '', goodsName: '', goodsColor: '', batchNo: '', itemCount: '', orderQuantity: '', goodsUnit: '', remark: ''})
        this.purchaseGoods.push({})
      },
      sureSelect(row) {
        if(this.x ===3){
          this.tableData[this.y].goodsColor = row.colorName
          this.tableData[this.y].goodsColorId = row.colorNo
        }else{
          this.tableData[this.y].goodsNo = row.goodsNo
          this.tableData[this.y].goodsName = row.goodsName
          this.tableData[this.y].goodsUnit = row.unit?row.unit:''
          this.tableData[this.y].itemCount = 1
          this.tableData[this.y].orderQuantity = 1
          this.tableData[this.y].goodsColor = row.colorName
          this.purchaseGoods = this.tableData
          this.purchaseGoods[this.y].goodsId = row.goodsId
          this.getColor(row.goodsNo)
        }
        this.Transfer()
      },
      click(event, x, y) {
          this.x = x
          this.y = y
          this.which = x
          if (x>2 && (this.tableData[this.y].goodsNo === '' || this.tableData[this.y].goodsName === '')) {
            this.$refs.inputSelect.style.display = 'none'
            return false
          }
          if(this.$refs.inputSelect.style.display === '' || this.$refs.inputSelect.style.display === 'none'){
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
      change() {
        console.log(this.querySearchs(this.value))
        if(this.querySearchs(this.value).length !== 0){
          this.$refs.contain.style.display = 'block'
        }
        this.sure()
        this.Transfer()
      },
      sure() {
        switch (this.x) {
          case 1:
            this.tableData[this.y].goodsNo = this.value
            this.purchaseGoods[this.y].goodsNo = this.value
            break
          case 2:
            this.tableData[this.y].goodsName = this.value
            this.purchaseGoods[this.y].goodsName = this.value
            break
          case 3:
            this.tableData[this.y].goodsColor = this.value
            this.purchaseGoods[this.y].goodsColor = this.value
            break
          case 4:
            this.tableData[this.y].batchNo = this.value
            this.purchaseGoods[this.y].batchNo = this.value
            break
          case 5:
            this.tableData[this.y].itemCount = this.value
            this.purchaseGoods[this.y].itemCount = this.value
            break
          case 6:
            this.tableData[this.y].orderQuantity = this.value
            this.purchaseGoods[this.y].orderQuantity = this.value
            break
          case 7:
            this.tableData[this.y].goodsUnit = this.value
            this.purchaseGoods[this.y].goodsUnit = this.value
            break
          case 8:
            this.tableData[this.y].remark = this.value
            this.purchaseGoods[this.y].remark = this.value
            break
          default:
            break;
        }
      },
      reset() {
        var _self = this
        document.onclick = function() {
         _self.$refs.inputSelect.style.display = 'none'
        }
      },
      remove(index) {
        this.tableData.splice(index,1)
      },
      Transfer() {
        this.$emit('purchaseGoods',this.purchaseGoods)
      }
    }
  }
</script>

<style>
  .table-contain{
    height: calc(100% - 240px);
  }
  .padding .el-table thead tr th {
   /*  color: #333;
    font-weight: 500;
    background-color: #E2E9Ef;
    border-right-color:#ccc */
  }
  .padding .el-table--mini td {
    padding: 1px!important;
  }
  .padding .el-table td>.cell{
    height: 27px;
    line-height: 27px;
  }
  .padding .el-table th>.cell,.padding .el-table td>.cell{
    /* text-align: center; */
    width: 100%;
    position: relative;
    overflow: visible;
  }
  .padding el-table td>.cell .el-input{
    position: relative;
    top: -11px;
  }
  .padding .el-table td>.cell span input{
    height: 26px;
    line-height: 26px;
  }
  .padding .el-table td>.cell span{
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
<style lang="scss">
  .input-select {
    position: fixed;
    top:0;
    left:0;
    display:none;
  }
  .span{
    position:relative;
    width: 100%;
    input{
      font-size:12px;
      width:100%;
      line-height:20px;
      // text-indent:10px;
      &.border{
        border:none!important;
        background-color: transparent!important;
      }
    }
    span.search{
      height: 26px;
      width:20px;
      line-height:26px;
      text-align:center;
      &.zIndex{
        z-index: 1;
      }
      z-index: -1;
    }
  }
  .contain{
    position:relative;
    top:1px;
    left:0px;
    background:#fff;
    width:100%;
    z-index: 1000;
    display:none;
    &.show{
      display:block;
    }
  }
  span.close{
    position: absolute;
    width: 12px;
    height: 12px;
    line-height: 12px;
    text-align: center;
    top: 7px;
    right: 25px;
    cursor: pointer;
  }
  span.close:hover{
    color: #eb453c;
  }
  span.search{
    position: absolute;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    top: 0px;
    right: 0px;
    cursor: pointer;
  }
  .dropDown{
    list-style:none;
    border: 1px solid #ccc;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    margin:0;
    padding-left:0px;
    max-height:140px;
    overflow:auto;
    &:hover::-webkit-scrollbar{
      width: 8px;
    }
    &::-webkit-scrollbar{
      width:0px;
    }
    &::-webkit-scrollbar-thumb{
      background-color:#ccc;
      border-radius:8px;
    }
    li{
      height:28px;
      line-height:28px;
      padding-left:20px;
      cursor: pointer;
      text-align:left!important;
      font-size:12px;
      &:hover{
        background-color:#f5f7fa;
      }
    }
  }
</style>
