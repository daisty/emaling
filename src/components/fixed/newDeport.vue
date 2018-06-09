<template>
  <transition name="fade-in">  
    <div class="fix-box" :style="zIndex" v-show="NewDepotShow">
      <div class="content" :style="wh" v-show="NewDepotShow">
        <div class="fix-top" :style="backgroundColor">
          <span class="text">仓库信息编辑</span>
          <b class="close" @click="NewDepotShow=false">×</b>
        </div>
        <div class="fix-content">
          <!-- <el-form :model="newDeportForm" :rules="rules" ref="newDeportForm"> -->
            <div style="margin-bottom:15px">
              <el-input size="mini" placeholder="仓库名称" v-model="deportName"></el-input>
            </div>
            <div style="margin-bottom:15px">
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-input size="mini" placeholder="仓库编码" v-model="deportName">
                  </el-input>
                </el-col>
                <el-col :span="12">
                  <el-input size="mini" v-model="deportName" placeholder="助记码">
                  </el-input>
                </el-col>
              </el-row>
            </div>
            <div style="margin-bottom:15px">
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-input size="mini" v-model="deportName" placeholder="联系人">
                  </el-input>
                </el-col>
                <el-col :span="12">
                  <el-input size="mini" v-model="deportName" placeholder="电话">
                  </el-input>
                </el-col>
              </el-row>
            </div>
            <div style="margin-bottom:15px">
              <el-input size="mini" v-model="deportName" placeholder="地址"></el-input>
            </div>
            <div style="margin-bottom:15px">
              <el-input size="mini" v-model="deportName" placeholder="备注"></el-input>
            </div>
            <div>
              <el-button style="float:right;border-color:#ccc;" size="mini">取消</el-button>
              <el-button style="float:right;margin-right:10px;" type="primary" size="mini">保存</el-button>
            </div>
          <!-- </el-form> -->
        </div>
      </div>
    </div>
  </transition> 
</template>

<script>
import Bus from '@/utils/bus'

export default {
  data() {
    return {
      NewDepotShow: false,
      index: 1,
      deportName: '',
      wh: {
        width: '435px',
        height: '315px'
      },
      backgroundColor: {

      },
      zIndex: {

      }
    }
  },
  created() {
    Bus.$on('NewDepotShow', (state, index) => {
      if (this.index === index) {
        this.NewDepotShow = state
      }
    })
  }
}
</script>

<style scoped lang="scss">
  .fade-in-enter-active{
    transition: all .3s;
  }
  .fade-in-leave-active{
    transition: all .3s;
  }
  .fade-in-enter{
    transform: translate3d(0, -100px, 0);
    opacity: 0;
  }
  .fade-in-leave-to{
    transform: translate3d(0, -100px, 0);
    opacity: 0;
  }
  .fix-box {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    // background: rgba(0,0,0,.3);
    z-index:1;
    .content{
      position: absolute;
      overflow: hidden;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border-width: 1px;
      border-style: solid;
      border-color: #868686;
      background-color: #fff;
      .fix-top{
        background-color: #868686;
        height: 32px;
        color: #fff;
        position: relative;
        span.text{
          line-height: 32px;
          padding-left: 10px;
          font-size: 14px;
        }
        b.close{
          width: 20px;
          height: 19px;
          font-weight: 700;
          background-color: #fff;
          text-align: center;
          line-height: 19px;
          color: #868686;
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          cursor:pointer;
          &:hover{
            background:#f56c6c;
            color: #fff;
          }
        }
      }
      .fix-content{
        width:100%;
        height: calc(100% - 32px);
        padding: 15px;
        .input{
          width:220px;
          display:inline-block;
        }
      }
    }
  }
</style>
