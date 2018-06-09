<template>
  <div class="search-box">
    <el-form :label-position="labelPosition" :inline="true" class="demo-form-inline" ref="ruleForm" :rules="query?{}:rules" :model="data" label-width="100px">
      <template v-for="(item,index) in searchOption" v-if="searchOption">
        <el-form-item :label="title[item.type]||item.title" :prop="item.key||item.type">

          <!-- 输入框 -->
          <template v-if="item.type=='input'">
            <el-input placeholder="请输入内容" v-model="data[item.key]" :placeholder="item.placeholder||'请输入'" clearable @change="selectChange($event,item.onChange,item.key)" :disabled="disabled" />
          </template>

          <!-- 时间组件 -->
          <template v-if="item.type=='date'">
            <date-picker :item="item" :data="data" :comChange="comChange" :disabled="disabled" ></date-picker>
          </template>

          <!-- 选择器 -->
          <template v-if="item.type=='select'">
            <select-d :item="item" :data="data" :comChange="comChange" :disabled="disabled" ></select-d>
          </template>

          <template v-if="autocomplete.indexOf(item.type) > -1">
            <autocomplete :item="item" :data="data" :comChange="comChange" :disabled="disabled"></autocomplete>
          </template>

        </el-form-item>
      </template>
      <el-button v-if="query" type="danger" @click="query">查询</el-button>
    </el-form>
  </div>
</template>

<script>
import { DatePicker, SelectD, Autocomplete } from "./components";
import ElRadioGroup from "../../../node_modules/element-ui/packages/radio/src/radio-group";

export default {
  name: 'SearchBox',
  data () {
    return {
      labelPosition:'left',
      data: {
        test: ''
      },
      title: {
        handler: '经手人',
        supplier: '供应商',
        store: '仓库',
        storeName: '调出仓库',
        targetStoreName: '调入仓库'
      },
      autocomplete: ['handler', 'supplier', 'store', 'storeName', 'targetStoreName'],
      rules: {}
    }
  },
  props: {
    searchOption: {
      type: Array,
      required: true
    },
    comChange: {
      type: Function,
      required: true
    },
    query: {
      type: Function,
    },
    defaultSearchData: {
      type: Object
    },
    disabled:{
      type: Boolean
    }
  },
  components: {
    ElRadioGroup,
    DatePicker,
    SelectD,
    Autocomplete
  },
  created () {
    this.setDefault()
    if (!this.query) {
      this.addRules()
    }
    if(this.defaultSearchData){
      this.setDefaultValue()
    }

  },
  mounted () {
  },
  methods: {
    selectChange (data, set, key) {
      if (set) {
        set(key, data)
      } else {
        this.comChange(key, data)
      }
    },
    addRules () {
      let rules = {}
      for (let i = 0; i < this.searchOption.length; i++) {
        let { type, key } = this.searchOption[i]
        rules[key || type] = [{
          required: true,
          message: type == 'input' ? '请填写' : '请选择',
          trigger: 'change'
        }]
      }
      this.rules = rules
    },
    submitForm (callBack) {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (callBack) callBack()
          else alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    setDefault () {
      let obj = {}
      for (let i = 0; i < this.searchOption.length; i++) {
        obj[this.searchOption[i].key] = this.searchOption[i].defaultValue || ''
      }
      this.data = {
        ...this.data,
        ...obj
      }
    },
    setDefaultValue () {
      this.data = {
        ...this.data,
        ...this.defaultSearchData
      }
    }
  }
}

// [
//         {
//           type: 'input',
//           title: '输入框',
//           key: 'orderNumber',
//           onChange: (key, value) => {
//             this[key] = value
//           }
//         },
//         {
//           type: 'date',
//           title: '起止时间',
//           key: 'startTime:endTime'
//         },
//         {
//           type: 'select',
//           title: '选择什么',
//           key: 'selectData',
//           options: [
//             { label: '选择1', value: '1' },
//             { label: '选择2', value: '2' }
//           ]
//         },
//         {
//           key: 'user'
//         },
//         {
//           key: 'customer'
//         },
//         {
//           key: 'store'
//         },
//       ]
</script>

<style lang="scss">
.search-box {
  padding-top: 10px;
  padding-bottom: 0px;
  .el-form-item {
    width: 30%;
    height: 20%;
    margin-bottom: 10px;
    margin-right: 15px;
  }
  .el-form-item__label{
    font-size: 12px;
    color: #575757;
  }
}
</style>
