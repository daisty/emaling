<template>
  <el-select @change="selectChange($event,item.onChange,item.key)" :placeholder="item.placeholder||'请输入'" v-model="data[item.key]" clearable :disabled="disabled">
    <el-option v-if="item.options" v-for="item_s in item.options" :key="item_s.value" :label="item_s.label" :value="item_s.value">
    </el-option>
  </el-select>
</template>
<script>

export default {
  data () {
    return {
      value: ''
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
      type: Object
    },
    disabled: {
      type: Boolean
    }

  },
  methods: {
    selectChange (data, set, key) {
      if (set) set(key, data)
      else this.comChange(key, data)
    }
  }
}
</script>

