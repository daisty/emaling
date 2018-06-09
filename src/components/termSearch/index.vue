<style scoped>
.term-search {
  margin-bottom: 10px;
}
.title {
  font-size: 24px;
}
.form-item {
  width: 18%;
  margin-top: 10px;
  margin-left: 10px;
}
.form-btn {
  margin-top: 10px;
  margin-left: 10px;
}
</style>
<template>
  <div class="term-search">
    <!--查询栏-->
    <el-row :gutter="10">
      <el-autocomplete :disabled="disabled" class="inline-input" size="small" v-model="searchOption.supplierName" @focus="which=1" :fetch-suggestions="querySearchs" placeholder="供应商" :trigger-on-focus="true" @select="handleSelect">
        <el-button :disabled="disabled" slot="append" icon="el-icon-search" @click="fixedOption.supplierShow=true"></el-button>
      </el-autocomplete>
      <el-autocomplete :disabled="disabled" class="inline-input" size="small" v-model="searchOption.storeName" @focus="which=2" :fetch-suggestions="querySearchs" placeholder="仓库" :trigger-on-focus="true" @select="handleSelect">
        <el-button :disabled="disabled" slot="append" icon="el-icon-search" @click="fixedOption.deportShow=true"></el-button>
      </el-autocomplete>
      <el-autocomplete :disabled="disabled" class="inline-input" size="small" v-model="searchOption.handler" @focus="which=3" :fetch-suggestions="querySearchs" placeholder="经手人" :trigger-on-focus="true" @select="handleSelect">
        <el-button :disabled="disabled" slot="append" icon="el-icon-search" @click="fixedOption.brokerageShow=true"></el-button>
      </el-autocomplete>
      <el-date-picker :disabled="disabled" class="form-item" size="small" :change="change(1)" v-model="searchOption.sheetDate" type="date" placeholder="单据日期"></el-date-picker>
      <el-date-picker :disabled="disabled" class="form-item" size="small" :change="change(2)" v-model="searchOption.expectOutStoreDate" type="date" placeholder="预计到货日期"></el-date-picker>
    </el-row>
    <fixed-page1 @supplierInfo="getSupplierInfo" :fixedOption="fixedOption"></fixed-page1>
    <fixed-page2 @deportInfo="getDeportInfo" :fixedOption="fixedOption"></fixed-page2>
    <fixed-page3 @handlerInfl="getHandlerInfo" :fixedOption="fixedOption"></fixed-page3>
  </div>
</template>

<script>
import fixedPage1 from '@/components/fixed/fixedSupplier'
import fixedPage2 from '@/components/fixed/fixedNormal'
import fixedPage3 from '@/components/fixed/fixedBrokerage'
import { timeNow, timeToDateFn } from '@/utils/BbdCommon'
import { fetchBrokerage, fetchSupplier, fetchDeport } from '@/api/purchase'
export default {
  name: 'purchase',
  data () {
    return {
      fixedOption: {
        supplierShow: false,
        deportShow: false,
        brokerageShow: false
      },
      which: 1,
      brokerage: [],
      deport: [],
      supplier: [],
      searchOption: {
        sheetDate: timeNow(1),
        expectOutStoreDate: '',
        storeName: '',
        storeId: '',
        supplierName: '',
        supplierId: '',
        handler: '',
        handlerUserId: ''
      }
    }
  },
  props: {
    disabled: {
      type: Boolean
    },
    requestData: {
      type: Object
    },
    defaultValue: {
      type: Object
    }
  },
  mounted () {
    this.getBrokerage()
    this.getSupplier()
    this.getDeport()
    if (this.defaultValue) {
      this.setDefaultValue()
    }
  },
  methods: {
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
    async getBrokerage () {
      const res = await fetchBrokerage()
      if (res.code === 0) {
        this.brokerage = res.data.list.list
        for (var i = 0; i < this.brokerage.length; i++) {
          this.brokerage[i].value = this.brokerage[i].userName
        }
      } else {
        this.$message({
          type: 'error',
          message: res.msg
        })
      }
    },
    async getSupplier () {
      const res = await fetchSupplier()
      if (res.code === 0) {
        this.supplier = res.data.list.list
        for (var i = 0; i < this.supplier.length; i++) {
          this.supplier[i].value = this.supplier[i].customerName
        }
      } else {
        this.$message({
          type: 'error',
          message: res.msg
        })
      }
    },
    async getDeport () {
      const res = await fetchDeport()
      if (res.code === 0) {
        this.deport = res.data.storeInfoList.list
        for (var i = 0; i < this.deport.length; i++) {
          this.deport[i].value = this.deport[i].storeName
        }
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
            return (restaurant.customerName.indexOf(queryString) > -1)
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
    setDefaultValue () {
      for (let item in this.defaultValue) {
        this.searchOption[item] = this.defaultValue[item]
      }

    },
    handleSelect (item) {
      let searchInfos
      switch (this.which) {
        case 1:
          this.searchOption.supplierId = item.customerId
          this.searchOption.supplierName = item.value
          this.$emit('searchInfo', this.searchOption)
          break
        case 2:
          this.searchOption.storeId = item.storeId
          this.searchOption.storeName = item.value
          this.$emit('searchInfo', this.searchOption)
          break
        case 3:
          this.searchOption.handlerUserId = item.userId
          this.searchOption.handler = item.value
          this.$emit('searchInfo', this.searchOption)
          break
        default:
          break
      }
    },
    change (index) {
      if (index === 1) {
        this.searchOption.sheetDate = timeToDateFn(new Date(this.searchOption.sheetDate).getTime() / 1000, 1)
      } else if (this.searchOption.expectOutStoreDate !== '' && index === 2) {
        this.searchOption.expectOutStoreDate = timeToDateFn(new Date(this.searchOption.expectOutStoreDate).getTime() / 1000, 1)
      }
      this.$emit('searchInfo', this.searchOption)
    },
    openFixed (index) {
      this.$emit('openshow', { index: index, })
    },
    getSupplierInfo (data) {
      this.searchOption.supplierName = data.name
      this.searchOption.supplierId = data.id
    },
    getDeportInfo (data) {
      this.searchOption.storeName = data.name
      this.searchOption.storeId = data.id
    },
    getHandlerInfo (data) {
      this.searchOption.handler = data.name;
      this.searchOption.handlerUserId = data.id;
    }
  },
  components: {
    fixedPage1,
    fixedPage2,
    fixedPage3
  }
}
</script>
