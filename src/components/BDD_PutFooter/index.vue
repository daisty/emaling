<template>
  <div class="page-fotter">
    <el-button type="primary" @click="submit">入库</el-button>
    <el-button @click="draft">保存草稿</el-button>
  </div>
</template>
<script>

export default {
  data () {
    return {
      title: this.$route.meta.title,
      inHistory: this.$route.name.indexOf('history') !== -1
    }
  },
  props: {
    submit: {
      type: Function,
      required: true
    },
    draft: {
      type: Function,
      required: true
    }
  },
  components: {

  },
  created () {
  },
  mounted () {
  },
  methods: {
    /**
     * 去新增相应单据
     */
    newGodownEntry () {
      let to = this.$route.name.replace('history', 'add')
      console.log(to)
    },
    /**
     * 去新增相应单据
     */
    goHistory () {
      let toArr = this.$route.name.split('_')
      toArr.splice(toArr.length - 1, 1, 'history')
      console.log(toArr.join('_'))
    },


  }

}
</script>

<style lang="scss">
.page-fotter {
  display: flex;
  justify-content: center;
  padding-top: 16px;
}
</style>
