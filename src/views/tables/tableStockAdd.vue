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
          <i class="el-icon-plus" style="cursor:pointer"></i>
          <i class="el-icon-minus" style="cursor:pointer"></i>
        </template>
      </el-table-column>
      <el-table-column prop="billNum" label="编号" width="180">
        <template slot-scope="scope">
          <span @click="scope.row.billNum.show=true" v-if="!scope.row.billNum.show">{{scope.row.billNum.value}}</span>
          <span v-if="scope.row.billNum.show"><el-input size="mini" @blur="check(scope.row.billNum.value,scope.row.billNum.show)" v-model="scope.row.billNum.value"></el-input></span>
          <span class="close" v-if="scope.row.billNum.show&&scope.row.billNum.value!=''"><i class="el-icon-circle-close-outline"></i></span>
          <span class="search" v-if="scope.row.billNum.show"><i class="el-icon-zoom-in"></i></span>
        </template>
      </el-table-column>
      <el-table-column prop="jar" label="品名" >
        <template slot-scope="scope">
          <span @click="scope.row.jar.show=true" v-if="!scope.row.jar.show">{{scope.row.jar.value}}</span>
          <span v-if="scope.row.jar.show"><el-input size="mini"  v-model="scope.row.jar.value"></el-input></span>
          <span class="close" v-if="scope.row.jar.show&&scope.row.jar.value!=''"><i class="el-icon-circle-close-outline"></i></span>
          <span class="search" v-if="scope.row.jar.show"><i class="el-icon-zoom-in"></i></span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="颜色" >
       <template slot-scope="scope">
          <span @click="scope.row.type.show=true" v-if="!scope.row.type.show">{{scope.row.type.value}}</span>
          <span v-if="scope.row.type.show"><el-input size="mini"  v-model="scope.row.type.value"></el-input></span>
        </template>
      </el-table-column>
      <el-table-column prop="totalCount" label="批号" >
        <template slot-scope="scope">
          <span @click="scope.row.totalCount.show=true" v-if="!scope.row.totalCount.show">{{scope.row.totalCount.value}}</span>
          <span v-if="scope.row.totalCount.show"><el-input size="mini"  v-model="scope.row.totalCount.value"></el-input></span>
        </template>
      </el-table-column>
      <el-table-column prop="totalColor" label="条数" >
        <template slot-scope="scope">
          <span @click="scope.row.totalColor.show=true" v-if="!scope.row.totalColor.show">{{scope.row.totalColor.value}}</span>
          <span v-if="scope.row.totalColor.show"><el-input size="mini"  v-model="scope.row.totalColor.value"></el-input></span>
        </template>
      </el-table-column>
      <el-table-column prop="totalStockIn" label="入库数量" >
        <template slot-scope="scope">
          <span @click="scope.row.totalStockIn.show=true" v-if="!scope.row.totalStockIn.show">{{scope.row.totalStockIn.value}}</span>
          <span v-if="scope.row.totalStockIn.show"><el-input size="mini"  v-model="scope.row.totalStockIn.value"></el-input></span>
        </template>
      </el-table-column>
      <el-table-column prop="unit" label="单位" >
      </el-table-column>
      <el-table-column prop="inventory" label="备注" >
        <template slot-scope="scope">
          <span @click="scope.row.inventory.show=true" v-if="!scope.row.inventory.show">{{scope.row.inventory.value}}</span>
          <span v-if="scope.row.inventory.show"><el-input size="mini"  v-model="scope.row.inventory.value"></el-input></span>
        </template>
      </el-table-column>
      <el-table-column ></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        tableData: [
          { billNum: { value: '', show: false }, jar: { value: '', show: false }, type: { value: '', show: false }, totalCount: { value: '', show: false }, totalColor: { value: '', show: false }, totalStockIn: { value: '', show: false }, unit: '米', inventory: { value: '', show: false }},
          { billNum: { value: '', show: false }, jar: { value: '', show: false }, type: { value: '', show: false }, totalCount: { value: '', show: false }, totalColor: { value: '', show: false }, totalStockIn: { value: '', show: false }, unit: '米', inventory: { value: '', show: false }},
          { billNum: { value: '', show: false }, jar: { value: '', show: false }, type: { value: '', show: false }, totalCount: { value: '', show: false }, totalColor: { value: '', show: false }, totalStockIn: { value: '', show: false }, unit: '米', inventory: { value: '', show: false }},
          { billNum: { value: '', show: false }, jar: { value: '', show: false }, type: { value: '', show: false }, totalCount: { value: '', show: false }, totalColor: { value: '', show: false }, totalStockIn: { value: '', show: false }, unit: '米', inventory: { value: '', show: false }},
          { billNum: { value: '', show: false }, jar: { value: '', show: false }, type: { value: '', show: false }, totalCount: { value: '', show: false }, totalColor: { value: '', show: false }, totalStockIn: { value: '', show: false }, unit: '米', inventory: { value: '', show: false }},
          { billNum: { value: '', show: false }, jar: { value: '', show: false }, type: { value: '', show: false }, totalCount: { value: '', show: false }, totalColor: { value: '', show: false }, totalStockIn: { value: '', show: false }, unit: '米', inventory: { value: '', show: false }},
          { billNum: { value: '', show: false }, jar: { value: '', show: false }, type: { value: '', show: false }, totalCount: { value: '', show: false }, totalColor: { value: '', show: false }, totalStockIn: { value: '', show: false }, unit: '米', inventory: { value: '', show: false }},
          { billNum: { value: '', show: false }, jar: { value: '', show: false }, type: { value: '', show: false }, totalCount: { value: '', show: false }, totalColor: { value: '', show: false }, totalStockIn: { value: '', show: false }, unit: '米', inventory: { value: '', show: false }},
          { billNum: { value: '', show: false }, jar: { value: '', show: false }, type: { value: '', show: false }, totalCount: { value: '', show: false }, totalColor: { value: '', show: false }, totalStockIn: { value: '', show: false }, unit: '米', inventory: { value: '', show: false }},
          { billNum: { value: '', show: false }, jar: { value: '', show: false }, type: { value: '', show: false }, totalCount: { value: '', show: false }, totalColor: { value: '', show: false }, totalStockIn: { value: '', show: false }, unit: '米', inventory: { value: '', show: false }},
          { billNum: { value: '', show: false }, jar: { value: '', show: false }, type: { value: '', show: false }, totalCount: { value: '', show: false }, totalColor: { value: '', show: false }, totalStockIn: { value: '', show: false }, unit: '米', inventory: { value: '', show: false }},
          { billNum: { value: '', show: false }, jar: { value: '', show: false }, type: { value: '', show: false }, totalCount: { value: '', show: false }, totalColor: { value: '', show: false }, totalStockIn: { value: '', show: false }, unit: '米', inventory: { value: '', show: false }},
          { billNum: { value: '', show: false }, jar: { value: '', show: false }, type: { value: '', show: false }, totalCount: { value: '', show: false }, totalColor: { value: '', show: false }, totalStockIn: { value: '', show: false }, unit: '米', inventory: { value: '', show: false }},
          { billNum: { value: '', show: false }, jar: { value: '', show: false }, type: { value: '', show: false }, totalCount: { value: '', show: false }, totalColor: { value: '', show: false }, totalStockIn: { value: '', show: false }, unit: '米', inventory: { value: '', show: false }},
          { billNum: { value: '', show: false }, jar: { value: '', show: false }, type: { value: '', show: false }, totalCount: { value: '', show: false }, totalColor: { value: '', show: false }, totalStockIn: { value: '', show: false }, unit: '米', inventory: { value: '', show: false }},
          { billNum: { value: '', show: false }, jar: { value: '', show: false }, type: { value: '', show: false }, totalCount: { value: '', show: false }, totalColor: { value: '', show: false }, totalStockIn: { value: '', show: false }, unit: '米', inventory: { value: '', show: false }},
          { billNum: { value: '', show: false }, jar: { value: '', show: false }, type: { value: '', show: false }, totalCount: { value: '', show: false }, totalColor: { value: '', show: false }, totalStockIn: { value: '', show: false }, unit: '米', inventory: { value: '', show: false }},
          { billNum: { value: '', show: false }, jar: { value: '', show: false }, type: { value: '', show: false }, totalCount: { value: '', show: false }, totalColor: { value: '', show: false }, totalStockIn: { value: '', show: false }, unit: '米', inventory: { value: '', show: false }}
        ]
      }
    },
    methods: {
      getSummaries(param) {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
            return
          }
          if (index === 0) {
            sums[index] = '合计'
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
        sums[8] = '米'
        return sums
      },
      check(s, show) {
        if (s === '') {
          show = false
        }
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
  .padding .el-table--mini td .show input{
    opacity: 1;
  }
  .padding .el-table th>.cell,.padding .el-table td>.cell{
    text-align: center;
    width: 100%;
    position: relative;
  }
  .padding .el-table td>.cell span input{
    height: 23px;
    line-height: 23px;
  }
  .padding .el-table td>.cell span{
    display: block;
    width: 100%;
    height: 23px;
  }
  .padding .el-table td>.cell span.close{
    position: absolute;
    width: 12px;
    height: 12px;
    line-height: 12px;
    text-align: center;
    top: 6px;
    right: 30px;
    cursor: pointer;
  }
  .padding .el-table td>.cell span.close:hover{
    color: #eb453c;
  }
  .padding .el-table td>.cell span.search{
    position: absolute;
    width: 12px;
    height: 12px;
    line-height: 12px;
    text-align: center;
    top: 6px;
    right: 15px;
    cursor: pointer;
  }
</style>
