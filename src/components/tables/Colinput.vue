<template>
  <div>
    <!-- <span @click="data.show=true" v-if="!data.show">{{value}}</span> -->
    <span><el-input size="mini"  v-model="data.value"></el-input></span>
  </div>
</template>
<script>
  export default {
     props: {
      data:Object
    },
    data() {
      return {
        show: false,
        value: ''
      }
    },
    methods: {
      // change(event) {
      //   console.log(event)
      //   // var el = event.currentTarget
      //   // el.style.display = 'none'
      // }
    },
    mounted() {
      // console.log(this.data)
    }
  }
</script>

<style type="text/css">
  
</style>