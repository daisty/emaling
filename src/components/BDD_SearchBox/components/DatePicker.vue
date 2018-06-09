<template>
  <div>
    <el-date-picker type="date" :placeholder="'选择日期'" value-format="yyyy-MM-dd" v-model="data[item.key.split(':')[0]]" @change="selectChange($event,item.onChange,item.key.split(':')[0])" :disabled="disabled" clearable />
    <template v-if="item.key.split(':').length>1">
      <span class="data-zhi">至</span>
      <el-date-picker type="date" :placeholder="'选择日期'" value-format="yyyy-MM-dd" v-model="data[item.key.split(':')[1]]" :picker-options="pickerOptions" @change="selectChange($event,item.onChange,item.key.split(':')[1])"  :disabled="disabled" clearable />
    </template>
  </div>
</template>
<script>

export default {
  data () {
    return {
      date1: '',
      date2: '',
      pickerOptions: {
        disabledDate: (time, data) => {
          return time.getTime() < new Date(this.data[this.item.key.split(':')[0]])
        },
      },
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
<style lang="scss">
.data-zhi {
  // 至
  padding-left: 3px;
}
</style>
