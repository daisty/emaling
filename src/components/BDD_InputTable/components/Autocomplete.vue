<template>
  <el-select :value="model[props]" filterable @change="change" remote placeholder="" :disabled="disabled">
    <el-option v-for="(item,index) in option" v-if="item[valueKey]" :key="item[valueKey]" :label="item[valueKey]" :value="item">
    </el-option>
  </el-select>
  <!-- <el-autocomplete v-model="model[props]" size="mini" :fetch-suggestions="querySearch" @select="change" :value-key="valueKey"></el-autocomplete> -->
</template>
<script>
export default {
  data () {
    return {
      data: '',
      str: '',
      SelectData: []
    }
  },
  props: {
    model: {
      type: Object
    },
    selectChange: {
      type: Function
    },
    valueKey: {
      type: String
    },
    selectData: {
      type: [Array, Object]
    },
    props: {
      type: String
    },
    index: {
      type: [Number, String]
    },
    selectDatalineKey: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },
  computed: {
    option () {
      if (!this.selectData) return []
      return (this.modelProps ? this.selectData[this.modelProps] : this.selectData) || []
    },
    modelProps(){
      return this.model[this.selectDatalineKey]
    }
  },
  watch: {
    // selectData () {
    //   console.log(this.selectDatalineKey,this.selectData)
    //   this.SelectData = this.selectData
    // }

  },
  methods: {
    querySearch (queryString, cb) {
      let selectData = (this.selectDatalineKey ? this.selectData[this.model[this.selectDatalineKey]] : this.selectData) || []
      var results = queryString ? selectData.filter((item) => {
        return item[this.valueKey].indexOf(queryString) > -1
      }) : selectData
      cb(results)
    },
    change (data) {
      this.selectChange(this.index, data)
    },
    filterMethod (queryString, cb) {
      this.str = queryString
    }
  }
}
</script>
