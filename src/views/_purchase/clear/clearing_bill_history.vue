<style scoped>
  .head{
    text-align: center;
    line-height: 45px;
  }
  .form-item{
    width:220px;
    margin-top: 10px;
    margin-left: 10px;
  }
  .form-item button {
   float: right;
  }
  .form-btn{
    margin-top: 10px;
    margin-left: 10px;
  }
  .table-contain{
    height: calc(100% - 220px);
  }
  .line{
    width: 100%;
    height: 5px;
    border-bottom: 3px solid #d4d8e1;
  }
  .scope-flex{
    display: flex;
  }
  .scope-flex .flex-btn{
    flex:1;
  }
</style>

<style>

</style>
<template>
  <div class="app-container">
    <!--标题栏-->
    <div class="head">
      <span style="padding:0;" class="title">采购入库结算单-历史</span>
      <div style="float:right">
        <el-button type="primary" plain>刷新</el-button>
        <el-button type="primary" plain>历史</el-button>
      </div>
    </div>
    <div class="line"></div>
    <div style="margin-top: 10px;"></div>
    <!--查询栏-->
    <el-row :gutter="10">
      <el-date-picker class="form-item" v-model="tableQuery.dateStart" type="date" placeholder="单据日期（起）"></el-date-picker>
      <el-date-picker class="form-item" v-model="tableQuery.dateEnd" type="date" placeholder="单据日期（止）"></el-date-picker>
      <el-input class="form-item" style="width:200px;" v-model="tableQuery.billNum" placeholder="单据编号">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-input class="form-item" v-model="tableQuery.inventory" placeholder="仓库">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-input class="form-item" v-model="tableQuery.supplier" placeholder="供应商">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-input class="form-item" v-model="tableQuery.handler" placeholder="经手人">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-select class="form-item" v-model="tableQuery.billStatus" placeholder="单据状态">
        <el-option v-for="op in billStatusOptions" :key="op.value" :label="op.label" :value="op.value"></el-option>
      </el-select>
      <el-select class="form-item" v-model="tableQuery.accountStatus" placeholder="记账状态">
        <el-option v-for="op in accountStatusOptions" :key="op.value" :label="op.label" :value="op.value"></el-option>
      </el-select>
      <el-input class="form-item" v-model="tableQuery.billRemark" placeholder="单据备注"></el-input>
      <el-button class="form-btn" type="danger" >查询</el-button>
      <el-checkbox class="form-item" v-model="tableQuery.showCancel">显示作废</el-checkbox>
    </el-row>
    <div style="margin-top: 20px;"></div>
    <!--表格栏-->
    <!--{totalCount:3,totalColor:2,totalStockIn:223.69,unit:'米',inventory:'中大仓库',suppiler:'A',handler:'Kalvin'},-->
    <div class="table-contain">
      <el-table style="width: 100%;height:100%"
        height="100%"
        :data="tableData"
        v-loading.body="tableLoading"
        element-loading-text="加载中..."
        border fit highlight-current-row>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <div class="scope-flex">
              <el-button class="flex-btn" @click="handleUpdate(scope.row)" type="text" size="small">删除</el-button>
              <el-button class="flex-btn" @click="handleDelete(scope.row)" type="text" size="small">更多</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="单据日期" >
          <template slot-scope="scope">
            <span v-text="parseDate(scope.row.billDate)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="billNum" label="单据编号" width="180">
            <template slot-scope="scope">
              <span @click="goHistory(scope.row.billStatus)" style="cursor:pointer;" v-text="scope.row.billNum"></span>
          </template>
        </el-table-column>
        <el-table-column prop="billNum" label="来源单据" width="180">
            <template slot-scope="scope">
              <span @click="goHistory(scope.row.billStatus)" style="cursor:pointer;" v-text="scope.row.billNum"></span>
          </template>
        </el-table-column>
        <el-table-column prop="jar" label="单据状态" >
          <template slot-scope="scope">
            <span v-text="billStatusMap.get(scope.row.billStatus)||scope.row.type"></span>
          </template>
        </el-table-column>
        <el-table-column prop="totalCount" label="总条数" ></el-table-column>
        <el-table-column prop="totalColor" label="总颜色数量" ></el-table-column>
        <el-table-column prop="totalStockIn" label="总入库数量" ></el-table-column>
        <el-table-column prop="unit" label="单位" ></el-table-column>
        <el-table-column prop="money" label="总商品金额" ></el-table-column>
        <el-table-column prop="inventory" label="入库仓库" ></el-table-column>
        <el-table-column prop="handler" label="经手人" ></el-table-column>
        <el-table-column prop="remark" label="备注" ></el-table-column>
      </el-table>
    </div>

    <div style="margin-top: 10px;"></div>
    <!--分页栏-->
    <div class="block" style="text-align:center">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="tablePage.current"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="tablePage.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tablePage.total">
    </el-pagination>
    </div>

  </div>
</template>

<script>
  import { parseDate } from '@/utils'
  import { billStatusOptions, accountStatusOptions, billStatusMap, accountStatusMap } from '@/utils/constants'
  export default {
    name: 'purchase',
    data() {
      return {
        parseDate,
        billStatusOptions,
        accountStatusOptions,
        billStatusMap,
        accountStatusMap,
        option: {
          pageName: '采购入库结算单-历史',
          isCode: false,
          isNeedBtn: false,
          btnName1: '刷新',
          btnName2: '打印'
        },
        tableQuery: {
          dateStart: null,
          dateEnd: null,
          billNum: null,
          inventory: null,
          supplier: null,
          handler: null,
          billStatus: null,
          accountStatus: null,
          showCancel: true
        },
        tableLoading: false,
//        tableData: [
//          { billDate: new Date(), billNum: 'CGRKD-20180417-0005', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货', money: 1000 },
//          { billDate: new Date(), billNum: 'CGRKD-20180417-0006', billStatus: 113, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货', money: 1000 },
//          { billDate: new Date(), billNum: 'CGRKD-20180417-0007', billStatus: 114, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货', money: 1000 },
//          { billDate: new Date(), billNum: 'CGRKD-20180417-0008', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货', money: 1000 },
//          { billDate: new Date(), billNum: 'CGRKD-20180417-0009', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货', money: 1000 },
//          { billDate: new Date(), billNum: 'CGRKD-20180417-0010', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货', money: 1000 },
//          { billDate: new Date(), billNum: 'CGRKD-20180417-0011', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货', money: 1000 },
//          { billDate: new Date(), billNum: 'CGRKD-20180417-0012', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货', money: 1000 },
//          { billDate: new Date(), billNum: 'CGRKD-20180417-0013', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货', money: 1000 },
//          { billDate: new Date(), billNum: 'CGRKD-20180417-0014', billStatus: 112, accountStatus: 222, totalCount: 3, totalColor: 2, totalStockIn: 223.69, unit: '米', inventory: '中大仓库', suppiler: 'A', handler: 'Kalvin', remark: '赶紧发货', money: 1000 }
//        ],
        tableData: [],
        tablePage: {
          current: 1,
          pages: 10,
          size: 10,
          total: 100
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      goHistory(val) {
        switch (val) {
          case 112:
            this.$router.push('stock_in_bill_cancel')
            break
          case 113:
            this.$router.push('stock_in_bill_draft')
            break
          case 114:
            this.$router.push('stock_in_bill_storage')
            break
          default:
            break
        }
      },
      // 分页
      handleSizeChange(val) {
        this.tablePage.size = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.tablePage.current = val
        this.fetchData()
      },

      //  查询
      fetchData() {
        /*
        this.tableLoading = true
        queryProduct(this.tableQuery,this.tablePage).then(response => {
          this.tableData = response.page.records
          this.tableLoading = false
          //设置后台返回的分页参数
          pageParamNames.forEach(name=>this.$set(this.tablePage,name,response.page[name]))
        })
        */
      },

      //  更新
      handleUpdate(row) {
        /*
        this.temp = Object.assign({}, row) // copy obj
        this.temp.time = new Date()
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        //清空验证表单
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        */
      },
      updateData() {
        /*
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)//copy obj
            updateProduct(tempData).then(() => {
              for (const v of this.tableData) {
                if (v.id === this.temp.id) {
                  const index = this.tableData.indexOf(v)
                  this.tableData.splice(index, 1, this.temp)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
        */
      },

      //  新增
      handleCreate() {
        /*
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        */
      },
      createData() {
        /*
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            addProduct(this.temp).then((resp) => {
              this.temp.time = resp.time;//后台传回来新增记录的时间
              this.tableData.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
        */
      },

      // 删除
      handleDelete(row) {
        console.log('handle delete')
      },
      // 更多
      handleDetail(row) {
        console.log('handle detail')
      },

      //  清空缓存对象
      resetTemp() {
        /*
        this.temp = {
          id: undefined,
          name: null,
          port: null,
          jar: '/usr/local/m2m/m2mcollector/thrid-party-jar/thrid-party-xxxx.jar',
          time: null,
          type: null
        }
        */
      }
    }// methods-end
  }
</script>
