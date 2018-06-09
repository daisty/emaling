<style scoped lang="scss">
.accountBtn {
  display: flex;
  padding-top: 20px;
  box-sizing: border-box;
  justify-content: flex-end;
}
.color-info {
  position: relative;
  font-size: 15px;
  p{
    color: #333;
    margin:5px 0;
  }
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
  cursor: pointer;
}
.el-icon-arrow-up:before {
  content: "";
}
.item-bottom{
  margin-bottom: 20px;
}
.input-text{
  height: 32px;
  line-height: 32px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 15px;
  vertical-align: middle;
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
</style>
<style>
  .item-unit .el-form-item__label::before{
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
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
        title="新增商品"
        :before-close="close"
        :visible="true"
        width="600px">
      <el-form :model="form" :rules="rules" ref="form" :label-position="labelPosition" label-width="70px">
        <el-row :gutter="10">
          <el-col :span="12">
              <el-form-item class="item-bottom" label="编号" prop="goodsNo" required>
                  <el-input size="small" v-model="form.goodsNo"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item class="item-bottom" label="品名" prop="goodsName" required>
                  <el-input size="small" v-model="form.goodsName"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item class="item-bottom" label="别名" prop="goodsAlias" required>
              <el-input size="small" v-model="form.goodsAlias"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="item-unit" label="单位" prop="unit">
              <!-- <el-input size="small" v-model="form.unit" maxlength="4"></el-input> -->
              <el-select size="small" value-key v-model="form.unit" placeholder="请选择">
                <el-option
                  v-for="item in unitOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item class="item-bottom" label="所属分类" prop="categoryName">
              <el-input size="small" v-text="form.categoryName" class="input-text"></el-input>
              <i class="el-icon-search search-position" @click="getGoodsCategory"></i>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="item-bottom" label="克重" prop="gramWeight">
              <el-input size="small" v-model="form.gramWeight"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item class="item-bottom" label="成分" prop="ingredient">
              <el-input size="small" v-model="form.ingredient"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="item-bottom" label="幅宽" prop="width">
              <el-input size="small" v-model="form.width" maxlength="4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="color-info" style="height: calc(100% - 120px);">
          <p>颜色信息</p>
          <div class="color-line">
            <input type="number" v-model="val" class="number-add">
            <el-button type="primary" size="mini" style="margin-bottom: 10px;" @click="addForm(val)">批量添加</el-button>
          </div>
          <input-table :trConfig="trConfig" :data="form.colorList"></input-table>
        </div>
        <el-form-item size="small" class="accountBtn">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import InputTable from "@C/BDD_InputTable2";
import {
  fetchAddGoods,
  fetchGoodsUnitName,
  fetchGoodsCategory,
  fetchGoodsCategoryId
} from "@/api/data";
import { mapGetters } from "vuex";
export default {
  props: {
    refreshFun: {
      type: Function
    },
    close: {
      type: Function
    }
  },
  components: { InputTable },
  data() {
    return {
      unitOption: [],
      val: "",
      dialogVisible: false,
      treeData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      colorNumber: {},
      rules: {
        goodsNo: [
          { required: true, message: "请输入商品编号", trigger: "blur" }
        ],
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goodsAlias: [
          { required: true, message: "请输入商品别名", trigger: "blur" }
        ]
      },
      labelPosition: "center",
      /*----------表格列配置----------*/
      trConfig: [
        {
          label: "颜色编号",
          props: "colorNo",
          input: true
        },
        {
          label: "颜色名称",
          props: "colorName",
          input: true
        },
        {
          label: "拼音码",
          props: "pinYin",
          input: true
        },
        {
          label: "厂家色号",
          props: "factoryColorNo",
          input: true
        },
        {
          label: "备注",
          input: true,
          props: "remark"
        }
      ],
      /*----------提交请求集合----------*/
      form: {
        goodsNo: "",
        goodsName: "",
        goodsAlias: "",
        unit: "",
        categoryName: "",
        colorList: [], //表格数据
        remark: "",
        categoryId: "",
        gramWeight: "",
        ingredient: "",
        width: "",
      },

    };
  },

  created() {
    this.getUnitList()
  },
  computed: {
    ...mapGetters(["tenantId"])
    
  },

  methods: {

    handleClose() {
      this.dialogVisible = false;
    },
    handleNodeClick(data) {
      let labelData = data.label;
      let labelId = data.id;
      if (labelId !== "" && labelData !== "") {
        this.form.categoryName = labelData;
        this.form.categoryId = labelId;
      }
    },
    categoryNameAdd() {
      this.dialogVisible = false;
    },
    addForm(val) {
      let colorL = this.form.colorList.length
      for (let i = 0; i < val; i++) {
        this.form.colorList.push({
          colorNo: colorL + i + 1 + "#",
          colorName: "",
          pinYin: "",
          factoryColorNo: "",
          remark: "",
          tenantId: "",
          colorId: "",
          goodsId: ""
        });
      }
    },
    // 获取单位列表数据
    getUnitList() {
      const _self = this;
      return new Promise((resolve, reject) => {
        fetchGoodsUnitName()
          .then(response => {
            this.unitOption = response.data.data.list.list
            for (var i = 0; i < this.unitOption.length; i++) {
              this.unitOption[i].value = this.unitOption[i].unitName;
            }
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          })
      })
    },
    //获取商品分类列表
    getGoodsCategory() {
      const _self = this;
      this.dialogVisible = true;
      return new Promise((resolve, reject) => {
        fetchGoodsCategory()
          .then(response => {
            _self.treeData = response.data.data.treeNode.children;
            for( let i = 0; i < _self.treeData.length; i++) {
              this.form.categoryName = _self.treeData[i].label;
            }
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
          if(this.form.unit === '') {
            this.$message({
              type: "error",
              message: "单位不能为空"
            })
          }else {
            this.add()
          }
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
      let colorL = params.colorList;
      for (let i = 0; i < colorL.length; i++) {
        if (colorL[i].colorNo === "") {
          colorL.splice(i);
        }
      }
      return new Promise((resolve, reject) => {
        fetchAddGoods(params)
          .then(res => {
            if(res.data.code === 0) {
              this.$message.success("新增成功");
              this.loading = false;
              this.refreshFun();
              resolve(true);
            }else {
              this.$message({
                type: "error",
                message: res.data.msg
              })
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
    }
  },
  watch: {}
};
</script>

