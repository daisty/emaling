<style scoped lang="scss">
.accountBtn {
  display: flex;
  padding-top: 20px;
  box-sizing: border-box;
  justify-content: flex-end;
}
.color-info {
  position: relative;
  font-size: 16px;
  .number-add {
    line-height: 26px;
    border-radius: 5px;
    padding-left: 10px;
    border: 1px solid #dcdfe6;
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
.input-text{
  height: 32px;
  line-height: 32px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 15px;
  vertical-align: middle;
}
</style>

<template>
  <div>
    <el-dialog title="商品分类" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
      <el-tree
        class="filter-tree"
        node-key="id"
        :data="treeData"
        :props="defaultProps"
        ref="tree"
        default-expand-all
        @node-click="handleNodeClick">
      </el-tree>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="categoryNameAdd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="分类信息编辑"
        :before-close="close"
        :visible="true"
        width="50%">
      <el-form :model="form" :rules="rules" ref="form" :label-position="labelPosition" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="分类名称" prop="categoryName" required>
                <el-input size="small" v-model="form.categoryName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属分类">
              <el-input size="small" v-text="form.label" class="input-text"></el-input>
              <i class="el-icon-search search-position" @click="getGoodsCategory"></i>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item size="medium" class="accountBtn">
            <el-button size="small" @click="close">取消</el-button>
            <el-button size="small" type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchAddCategory,
  fetchGoodsCategory
} from "@/api/data";
import { mapGetters } from "vuex";
export default {
  props: {
    refreshFun: {
      type: Function
    },
    close: {
      type: Function
    },
  },
  components: {},
  data() {
    return {
      val: "",
      dialogVisible: false,
      treeData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      rules: {
        categoryName: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      },
      labelPosition: "top",
      /*----------提交请求集合----------*/
      form: {
        categoryName: '',
        parentId:sessionStorage.getItem("currentId"),
        label: sessionStorage.getItem("label"),
      },
      currentLabel: '',
      currentId: ''
    };
  },

  created() {
  },
  computed: {
    ...mapGetters(["tenantId"])
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    handleNodeClick(data) {
      this.currentId = this.$refs.tree.getCurrentKey()
      this.currentLabel = this.$refs.tree.getCurrentNode()
      this.form.label = this.currentLabel.label
      this.form.parentId = this.currentId
    },
    categoryNameAdd() {
      this.currentLabel = this.$refs.tree.getCurrentNode();
      this.form.label = this.currentLabel.label;
      this.dialogVisible = false;
    },

    //获取商品分类列表
    getGoodsCategory() {
      const _self = this;
      this.dialogVisible = true;
      return new Promise((resolve, reject) => {
        fetchGoodsCategory()
          .then(response => {
            _self.treeData = response.data.data.treeNode.children;
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },

    //保存
    save() {
      this.$refs["form"].validate(valid => {
        let excuteStatus = true;
        if (valid) {
          this.edit();
        } else {
          console.log("error submit!!");
          excuteStatus = false;
        }
        return excuteStatus;
      });
    },
    //添加分类
    edit() {
      this.loading = true
      let params = this.form
      return new Promise((resolve, reject) => {
        fetchAddCategory(params ,{parentId: params.parentId})
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