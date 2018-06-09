<template>
  <div class="app-container">
    <div class="sysTips">
      系统重建将清除 <span style="color: red">所有单据、订单</span> 和一下选项数据且 <span style="color: red">不能恢复！请谨慎</span>
    </div>
    <!-- 表格栏 -->
    <div class="table-contain system-table">
      <el-table style="width:100%;"
        height="100%"
        ref="multipleTable"
        :data="tableData"
        @row-click="rowClick"
        @selection-change="handleSelectionChange"
        border fit highlight-current-row>
        <el-table-column prop="options" label="选项" width="300">
        </el-table-column>
        <el-table-column prop="description" label="描述" width="400">
        </el-table-column>
        <el-table-column
          type="selection"
          width="100">
        </el-table-column>
        <el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="warning-text">注意： 若需单独备份数据，请联系客服！系统重建后请点击右上角的“刷新”或者重新登录后进行系统开账！</div>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="200px" class="demo-ruleForm">
      <el-row :gutter="10">
        <el-col :span="15">
          <el-form-item class="item-bottom" label="为确保安全，请输入登录密码" prop="pass">
            <el-input size="small" type="password" v-model="ruleForm2.pass"></el-input>
            <el-button size="mini" type="primary" @click="submitForm('ruleForm2')">确定</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default{
    name: 'systemRebuilding',
    data() {
        return{
          tableData: [
            {
              options: '业务草稿',
              description: '将清除所有业务草稿'
            },{
              options: '库存期初',
              description: '将清除所有库存期初'
            },{
              options: '往来期初',
              description: '将清除所有期初往来账'
            },{
              options: '银行现金期初',
              description: '将清除银行现金期初'
            },{
              options: '商品',
              description: '将清除所有商品和分类结构数据'
            },{
              options: '往来单位',
              description: '将清除所有客户、供应商信息'
            },{
              options: '职员',
              description: '将清除职员和对应的操作员'
            },{
              options: '操作员',
              description: '将清除操作员登录账号信息'
            },
          ],
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          // pass: [
          //   { validator: validatePass, trigger: 'blur' }
          // ],
          // checkPass: [
          //   { validator: validatePass2, trigger: 'blur' }
          // ],
          // age: [
          //   { validator: checkAge, trigger: 'blur' }
          // ]
        }
      }
    },

    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      rowClick(row, event, clo){
        this.multipleSelection = row;
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="scss">
    .sysTips{
      margin: 20px 0;
      font-size: 14px;
    }
    .system-table{
      height: calc(100% - 350px);
      .el-table thead{
        color: #333 !important;
      }
      .el-table td{
        &:nth-of-type(3){
          text-align: center;
        }
      }
      .el-checkbox{
        width: 14px;
        height: 14px;
        .el-checkbox__inner{
          width: 14px;
          height: 14px;
        }
      }
    }
    .warning-text {
      background: #fdfbe2;
      border: 1px solid #f2e3c9;
      color: #c29952;
      font-size: 13px;
      text-align: center;
      padding: 2px;
      display: inline-block;
      vertical-align: middle;
      margin: 20px 0;
    }
</style>

