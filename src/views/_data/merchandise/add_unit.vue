<style scoped lang="scss">
  .accountBtn {
    display: flex;
    padding-top: 20px;
    box-sizing: border-box;
    justify-content: flex-end;
  }
  .color-info {
    height: 100%;
    position: relative;
    font-size: 16px;
    overflow: hidden;
    .add-btn{
      display: flex;
      justify-content: flex-end;
      margin-bottom: 10px;
    }
  }
  .search-position {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 15px;
    margin-right: 10px;
  }
  .el-icon-arrow-up:before {
    content: "";
  }
  .color-input {
    width: 100%;
    height: inherit;
    padding: 0;
    .input-num {
      width: 100%;
      height: 32px;
      border: 0 none;
      background-color: transparent;
      &:focus {
        background-color: #fff;
      }
    }
  }
  .page-contain {
    margin-top: 15px;
    font-size: 0;
    line-height: 28px;
    span {
      display: inline-block;
      line-height: 20px;
      text-align: center;
      font-size: 12px;
      color: #333;
      margin-right: 10px;
      vertical-align: middle;
      i {
        color: #97bafe;
        padding: 0 4px;
      }
      input {
        border: 1px solid #ccc;
        width: 30px;
        height: 20px;
        text-align: center;
        margin: 0 5px;
      }
    }
    span.prev,
    span.next {
      width: 60px;
      border: 1px solid #ccc;
      cursor: pointer;
    }
    span.jumper {
      margin-left: 10px;
    }
    .scope-flex {
      display: flex;
      span {
        flex: 1;
      }
    }
  }
  .blue {
    color: #0096ff;
    cursor: pointer;
    user-select: none;
  }
  .table-contain{
    height: 20rem;
    overflow: hidden;
  }
</style>

<template>
  <div>
    <el-dialog title="单位新增" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose" width="600px">
      <el-form :model="form" :rules="rules" ref="form" :label-position="labelPosition" label-width="80px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="单位名称" prop="unitName" required>
              <el-input size="small" v-model="form.unitName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="拼音码" prop="pinYin" required>
              <el-input size="small" v-model="form.pinYin"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input size="small" v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item size="small" class="accountBtn">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchAddUnitName
} from "@/api/data";
import { mapGetters } from "vuex";
export default {
  props: {
    refreshFun: {
      type: Function
    },
    handleClose: {
      type: Function
    },
  },
  components: {},
  data() {
    return {
      dialogVisible: true,
      rules: {
        unitName: [
          { required: true, message: "请输入单位名称", trigger: "blur" }
        ],
        pinYin: [{ required: true, message: "请输入拼音码", trigger: "blur" }]
      },
      labelPosition: "top",
      /*----------提交请求集合----------*/
      form: {
        unitName: "",
        pinYin: "",
        remark: ""
      },
    };
  },

  created() {
  },
  computed: {
    ...mapGetters(["tenantId"])
  },
  methods: {

    //保存
    save() {
      this.$refs["form"].validate(valid => {
        let excuteStatus = true;
        if (valid) {
          this.add();
        } else {
          console.log("error submit!!");
          excuteStatus = false;
        }
        return excuteStatus;
      });
    },
    //添加
    add() {
      this.loading = true;
      let params = this.form;
      return new Promise((resolve, reject) => {
        fetchAddUnitName(params)
          .then(res => {
            if (res.data.code === 0) {
              this.$message.success("添加成功");
              this.loading = false;
              this.refreshFun();
              resolve(true);
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          })
          .catch(err => {
            console.log(err);
            this.$message({
              type: "error",
              message: err.msg
            });
            this.loading = false;
            reject(false);
          });
      });
    },

  },
  mounted() {
    const shop = this.$route.query;
    //

    //编辑
    // console.log(goods);
    //this.form = shop; //list传来的row
    // this.form.goodsNo = goods.goodsNo;
    // this.form.goodsName = goods.goodsName;
    // this.form.goodsAlias = goods.goodsAlias;
    // this.form.unit = goods.unit;
    // this.form.categoryName = goods.categoryName;
    // this.form.categoryId = goods.categoryId;
    // this.form.colorList = goods.colorList;
    // console.log(goods.colorList);
    // console.log(shop.row);
  },
  watch: {}
};
</script>