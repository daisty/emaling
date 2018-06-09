<template>
  <div>
    <span @click="data.show=true" v-if="!data.show">{{value}}</span>
    <span v-if="data.show">
      <el-autocomplete class="inline-input" size="small" v-model="data.value" :focus="which=1" :fetch-suggestions="querySearchs" :trigger-on-focus="true" @select="handleSelect">
      </el-autocomplete>
    </span>
    <span class="close" v-if="data.show&&data.value!=''"><i @click="openFixed(1)" class="el-icon-circle-close-outline"></i></span>
    <span class="search" v-if="data.show"><i class="el-icon-zoom-in"></i></span>
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
    mounted() {
      console.log(this.data)
    }
  }
</script>

<style type="text/css">
  
</style>