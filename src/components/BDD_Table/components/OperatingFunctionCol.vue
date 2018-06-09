<template>
  <template v-for="(item,index) in operType">
    <div class="" Oper_views>
      <template>
      <span v-if="item.type === 'view' && item.name === 'accounting'" class="gay-forbid"
            @click="selectOperFun(businessUrl,lineIndex)"
            :class="{blue:operStatus}">{{v}}</span>
      </template>
    </div>
  </template>
  <template v-for="(item,index) in operType" >
    <el-popover popper-class="moreStyle" trigger="hover" placement="bottom" width="54">
      <template v-if="item.type === 'hidden' && item.name === 'copySheet'">
        <div @click="copy(businessUrl,lineIndex)">复制</div>
      </template>
      <span class="blue" slot="reference">更多</span>
    </el-popover>
  </template>
</template>

<script>
  export default {
    name: 'FunctionOper',
    data() {

    },
    props: {
      lineIndex: {
        type: Number,
        required: true,
      },
      operStatus:{
        type: Boolean,
        required: true,
      },
      deleteStatus: {
        type: Boolean,
        required: true,
      },
      businessUrl: {
        type: String,
        required: true,
      },
      operType: {
        type: object,
        required: true,
      }
    },
    method: {
      goAccount(businessUrl,lineIndex){

      },
      handleDelete(businessUrl,lineIndex){

      },
      copy(businessUrl,lineIndex){

      },
      returnBill(businessUrl,lineIndex){

      },
    }
  }
</script>
