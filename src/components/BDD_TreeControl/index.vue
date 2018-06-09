<template>
  <div class="custom-tree-container" >
      <div class="tree-title">
        <p class="shopping">{{treeControlConfig.title}}</p>
        <i class="el-icon-close" v-if="treeControlConfig.isNeedIcon" @click="handleDelCategory"></i>
        <i class="el-icon-plus" v-if="treeControlConfig.isNeedIcon"  @click="addCategory"></i>
        <i class="el-icon-d-arrow-left"  v-if="treeControlConfig.isRightIcon"></i>
      </div>
      <el-tree
        class="filter-tree"
        node-key="id"
        :data="treeControlConfig.treeData"
        :props="treeControlConfig.defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree2"
        @node-click="handleNodeClick">
      </el-tree>
  </div>
</template>

<script>
  export default{
    name:'TreeControl',
    props:{
      treeControlConfig:{
        type:Object,
        required:true
      }
    },
    data(){
      return {
        isNeedIcon: true,
        isRightIcon: false,
        nodeInfo:{
          children:[null],
          id:"",
          label:"",
          pid:"",
        },
        
      }
    },
    methods:{
      handleDelCategory(){
        console.log("in the TreeControl")
        if(this.nodeInfo.children.length != 0){
          this.$message({
            type: "warning",
            message: "部门下面存在子组织，请先删除子组织！"
          });
        }else {
          //删除节点
        }


      },
      handleNodeClick(data){
        var _self = this
        console.log("in the handleNodeClick")
        _self.nodeInfo.pid = data.pid
        _self.nodeInfo.children = data.children
        _self.nodeInfo.label = data.label
        _self.nodeInfo.id = data.id
      },
      addCategory:()=>{
        console.log("in the addCategory")
      },
      filterNode:()=>{
        console.log("in the filterNode")
      },
      showCategory($event){
        $event.currentTarget.className = "el-icon-d-arrow-left" ? "el-icon-d-arrow-right" : "el-icon-d-arrow-right";
        
      }
    }
  }
</script>

<style scoped lang="scss">
.custom-tree-container {
      /*flex: 0 0 130px;*/
      border: 1px solid #cad1d8;
      overflow: hidden;
    .tree-title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #333;
      border-bottom: 1px solid #cad1d8;
      .shopping {
        flex: 1;
        height: 20px;
        padding-left: 10px;
        font-size: 16px;
        border: 0 none;
        margin: 8px;
      }
      i {
        padding: 5px;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }
</style>
