<template>
  <div class="Bdd_Table_Contain">
    <el-table :data="tableData" style="width:100%;height:calc(100%)" :summary-method="getSummaries"
              @cell-click="cellClick" border fit highlight-current-row show-summary size="mini" height="100%">
      <template v-for="(item,index) in selectColOption" v-if="selectColOption">
        <el-table-column :label="item.title" v-if="item.name = 'index'">
          <!--序列号-->
          <template v-if="item.type ==='index'">
            <span @click.stop="click($event,scope.$index)" v-text=""></span>
          </template>
          <!--操作-->
          <template v-if="item.type='operation'">
            <span @click.stop="click($event,scope.$index)" v-text=""></span>
          </template>
          <!--输入-->
          <template v-if="item.type='input'">
            <span @click.stop="click($event,scope.$index)" v-text=""></span>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
  import { LineOper, FunctionOper } from "./components";
  export default {
    name: 'Bdd_Table',
    data() {

    }

  }
</script>


