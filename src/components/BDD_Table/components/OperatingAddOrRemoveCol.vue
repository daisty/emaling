<template slot-scope="scope">
  <i class="el-icon-circle-plus-outline" @click="add()" style="cursor:pointer" @mouseover="insertAddActive($event,iconClass)" @mouseout="deletedAddActive($event,iconClass)"></i>
  <i class="el-icon-remove-outline" @click="remove(lineIndex)" style="cursor:pointer" @mouseover="insertRemoveActive($event,iconClass)" @mouseout="deletedRemoveActive($event,iconClass)"></i>
</template>

<script>
  export default {
    name: 'LineOper',
    data(){
      return{
      }
    },
    props: {
      lineIndex: {
        type: Number
      },
      iconClass: {
        type: String
      }
    },
    method:{
      insertAddActive($event,iconClass){
        $event.currentTarget.className = iconClass;
      },
      deletedAddActive($event,iconClass){
        $event.currentTarget.className = iconClass;
      },
      insertRemoveActive($event,iconClass){
        $event.currentTarget.className = iconClass;
      },
      deletedRemoveActive($event,iconClass){
        $event.currentTarget.className = iconClass;
      }
    }
  }
</script>
