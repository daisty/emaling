<template>
  <div class="table-contain">
    <el-table style="width: 100%;height:calc100%"
      height="100%"
      :data="tableData"
      :summary-method="getSummaries"
      v-loading.body="tableLoading"
      element-loading-text="加载中..."
      border fit highlight-current-row show-summary>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column label="操作" width="60">
        <template slot-scope="scope">
          <i class="el-icon-plus"></i>
          <i class="el-icon-minus"></i>
        </template>
      </el-table-column>
      <el-table-column prop="billNum" label="编号" width="180"></el-table-column>
      <el-table-column prop="jar" label="品名" >
        <!-- <template slot-scope="scope">
          <span v-text="billStatusMap.get(scope.row.billStatus)||scope.row.type"></span>
        </template>
        <template slot-scope="scope">
          <span v-text="billStatusMap.get(scope.row.billStatus)||scope.row.type"></span>
        </template> -->
      </el-table-column>
      <el-table-column prop="type" label="颜色" >
       <!--  <template slot-scope="scope">
          <span v-text="accountStatusMap.get(scope.row.accountStatus)||scope.row.type"></span>
        </template> -->
      </el-table-column>
      <el-table-column prop="totalCount" label="批号" ></el-table-column>
      <el-table-column prop="totalColor" label="条数" ></el-table-column>
      <el-table-column prop="totalStockIn" label="入库数量" ></el-table-column>
      <el-table-column prop="unit" label="单位" ></el-table-column>
      <el-table-column prop="inventory" label="备注" ></el-table-column>
      <el-table-column ></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableLoading: false,
        tableData: [
          { billDate: new Date(), billNum: 'CGRKD-20180417-0005', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货' },
          { billDate: new Date(), billNum: 'CGRKD-20180417-0006', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货' },
          { billDate: new Date(), billNum: 'CGRKD-20180417-0007', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货' },
          { billDate: new Date(), billNum: 'CGRKD-20180417-0008', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货' },
          { billDate: new Date(), billNum: 'CGRKD-20180417-0009', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货' },
          { billDate: new Date(), billNum: 'CGRKD-20180417-0010', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货' },
          { billDate: new Date(), billNum: 'CGRKD-20180417-0011', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货' },
          { billDate: new Date(), billNum: 'CGRKD-20180417-0012', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货' },
          { billDate: new Date(), billNum: 'CGRKD-20180417-0013', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货' },
          { billDate: new Date(), billNum: 'CGRKD-20180417-0014', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货' },
          { billDate: new Date(), billNum: 'CGRKD-20180417-0010', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货' },
          { billDate: new Date(), billNum: 'CGRKD-20180417-0011', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货' },
          { billDate: new Date(), billNum: 'CGRKD-20180417-0012', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货' },
          { billDate: new Date(), billNum: 'CGRKD-20180417-0013', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货' },
          { billDate: new Date(), billNum: 'CGRKD-20180417-0014', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货' }
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
        sums[7] = sums[7].toFixed(2)
        sums[8] = '米'
        return sums
      }
    }
  }

</script>

<style scoped>
  .table-contain{
    height: calc(100% - 240px);
  }
  .table-contain .el-table thead tr {
    color: #909399;
    font-weight: 500;
    background-color: rgb(226,233,239)
  }
</style>
