<template>
  <div class="page-header">
    <span v-if="orderNumber != 'empty'">NO.</span>
    <span v-if="orderNumber != 'empty'">{{orderNumber}}</span>

    <el-button   v-if="newUrl"  type="primary" size="mini" @click="newGodownEntry">
      <i v-if="newIcon" class="icon" :class="newIcon"></i>
      新增{{newTitle}}
    </el-button>

    <h5 class="title">{{title}}</h5>
    <el-button-group>

      <!-- 必存在的打印按钮 -->
      <el-button class='print-button' v-if="print" type="primary" size="mini" @click="print">打印</el-button>

      <!-- 非历史的入库数据库按钮 -->
      <el-button v-if="historyUrl" type="primary" size="mini" @click="goHistory">历史</el-button>

      <!-- 历史页头按钮 -->

      <el-button v-if="refresh" type="primary" size="medium" @click="refresh">刷新</el-button>

    </el-button-group>
  </div>
</template>

<script>

export default {
  data () {
    return {
      inHistory: this.$route.name.indexOf('history') !== -1
    }
  },
  props: {
    orderNumber: {
      default: "empty",
      type: String
    },
    title: {
      type: String
    },
    refresh: {
      type: Function
    },
    print: {
      type: Function
    },
    historyUrl: {
      type: String
    },
    newUrl: {
      type: String
    },
    newTitle:{
      type: String
    },
    newIcon:{
      type: String
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
      this.$router.push(this.newUrl)
      // let to = this.$route.name.replace('history', 'add')
      // console.log(to)
    },
    /**
     * 去新增相应单据
     */
    goHistory () {
      this.$router.push(this.historyUrl)
      // let toArr = this.$route.name.split('_')
      // toArr.splice(toArr.length - 1, 1, 'history')
      // console.log(toArr.join('_'))
    },


  }

}
</script>

<style lang="scss">
.page-header {
  height: 45px;
  padding-top: 5px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
  position: relative;
  h5 {
    display: inline;
    font-size: 20px;
    position: absolute;
    top: 5px;
    left: 50%;
    margin: 0;
    transform: translate(-50%, 0);
  }
  .el-button-group {
    float: right;
    .print-button{
      margin-top: 5px;
    }
  }
}
</style>

