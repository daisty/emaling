<template>
  <div class="input-table2">
    <el-table :data="data" style="width: 100%" height="100%" :summary-method="summaryMethod||null" size="mini" border fit highlight-current-row>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="addline(scope.$index)" :disabled="disabled">
            <i class="el-icon-circle-plus-outline icon"></i>
          </el-button>
          <el-button type="text" size="mini" @click="remove(scope.$index)" :disabled="disabled||data.length==1">
            <i class="el-icon-remove-outline icon"></i>
          </el-button>
        </template>
      </el-table-column>
      <template v-for="(tr) in trConfig">

        <el-table-column :prop="tr.props" :label="tr.label" v-if="tr.select_data" :width="tr.width">
          <template slot-scope="scope">
            <autocomplete :model="scope.row" :disabled="tr.noDisabled!==true&&disabled" :selectDatalineKey="tr.select_data_line_key" :props="tr.props" :index="scope.$index" :selectChange="tr.select_change" :valueKey="tr.select_value_key" :selectData="tr.select_data" class="table-input"></autocomplete>
          </template>
        </el-table-column>

        <el-table-column :prop="tr.props || tr.colorNo" :label="tr.label" v-if="tr.input" :width="tr.width">
          <template slot-scope="scope">
            <el-input v-model="scope.row[tr.props || tr.colorNo]" class="table-input" :disabled="tr.noDisabled!==true&&disabled"></el-input>
          </template>
        </el-table-column>

        <el-table-column v-if='!tr.select_data&&!tr.input' :prop="tr.props" :label="tr.label" :width="tr.width"></el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
import Autocomplete from "./components/Autocomplete";
export default {
  data () {
    return {
      INIT_DATA: {}
    }
  },
  props: {
    trConfig: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    summaryMethod: {
      type: Function
    },
    disabled: {
      type: Boolean
    },
    colorPros: {
      type: Object
    }

  },
  created () {
    this.initData()
  },
  components: {
    Autocomplete
  },
  methods: {
    initData () {
      let INIT_DATA = {}
      
      for (let i = 0; i < this.trConfig.length; i++) {     
        INIT_DATA[this.trConfig[i].props] = ''
      }
      this.INIT_DATA = INIT_DATA

      //如果绑定module为空
      if (this.data.length == 0) {
        this.add20line()
      }
    },

    add20line () {
      for (let i = 0; i < 5; i++) {
        this.INIT_DATA.colorNo = i + 1 + "#"
        this.data.push(JSON.parse(JSON.stringify(this.INIT_DATA)))
      }
    },
    addline (index) {
      this.INIT_DATA.colorNo = this.data.length + 1 + "#"
      this.data.push(JSON.parse(JSON.stringify(this.INIT_DATA)))
    },
    remove (index) {
      this.data.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" >
.input-table2 {
  height: calc(100% - 240px);
  margin-bottom: 0;
  .el-table--mini td {
    height: 28px;
    padding: 0 !important;
    border-collapse: collapse;
    .el-input input {
      border-color: transparent;
      background: transparent;
      padding-left: 10px;
      height: 28px;
    }
    .el-input input:focus {
      border-color: #409eff;
      background: #fff;
      padding-left: 15px;
      height: 100%;
    }
    .table-input {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      div {
        width: 100%;
        height: 100%;
        input {
          height: 100%;
        }
      }
    }
  }
}
.icon {
  font-size: 18px;
  color: #999;
}
</style>


