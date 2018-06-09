<template>
  <el-select v-model="data[item.key||item.type]" filterable placeholder="请选择" @change="selectChange($event,item.onChange,item.type)" :disabled="disabled">
    <el-option v-if="item[valueKey]" v-for="(item,index) in listData" :key="index" :label="item[valueKey]" :value="item[valueKey]+':'+item[idKey]">
    </el-option>
  </el-select>
</template>
<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data () {
    return {
      keys: {
        handler: {
          state: 'userArr',
          actions: 'GetBrokerage',
          valueKey: 'userName',
          idKey: 'userId'
        },
        supplier: {
          state: 'customerArr',
          actions: 'GetSupplier',
          valueKey: 'customerName',
          idKey: 'customerId'
        },
        store: {
          state: 'storeInfoArr',
          actions: 'GetDeport',
          valueKey: 'storeName',
          idKey: 'storeId'
        },
        storeName: {
          state: 'customerArr',
          actions: 'GetSupplier',
          valueKey: 'customerName',
          idKey: 'customerId'
        },
        targetStoreName: {
          state: 'customerArr',
          actions: 'GetSupplier',
          valueKey: 'customerName',
          idKey: 'customerId'
        }
      }
    }
  },
  props: {
    item: {
      type: Object
    },
    comChange: {
      type: Function,
      required: true
    },
    data: {
      type: Object,
      default: {}
    },
     disabled:{
      type: Boolean
    }

  },
  computed: {
    ...mapState({
      purchase: state => state.purchase
    }),
    state () {
      return this.keys[this.item.type].state
    },
    actions () {
      return this.keys[this.item.type].actions
    },
    listData () {
      return this.purchase[this.state]
    },
    valueKey () {
      return this.keys[this.item.type].valueKey
    },
    idKey () {
      return this.keys[this.item.type].idKey
    }
  },

  created () {
    if (this.listData.length == 0) {
      this.$store.dispatch(this.actions)
    }
  },

  methods: {
    selectChange (data, set, key) {
      if (set) set(key, data)
      else this.comChange(key, data)
    },
    querySearch (queryString, cb) {
      var results = queryString ? this.listData.filter((item) => {
        return item[this.valueKey].indexOf(queryString) > -1
      }) : this.listData
      cb(results)
    }
  }
}
</script>
<style lang="scss">

</style>
