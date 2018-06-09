<template>
  <transition name="fade-in">  
    <div class="fix-box" :style="zIndex" v-show="fixedOption.show">
      <div class="content" :style="wh" v-show="fixedOption.show">
        <div class="fix-top" :style="backgroundColor">
          <span class="text">仓库选择</span>
          <b class="close" @click="fixedOption.show=false">×</b>
        </div>
        <div class="fix-content">
          <div class="search">
            <div class="input">
              <el-input size="mini" v-model="depotName" placeholder="请输入仓库名称/编号查询"></el-input>
            </div>
            <el-button size="mini">查询</el-button>
            <el-button style="float:right" size="mini" @click="eve"><i class="el-icon-plus"></i>新增</el-button>
          </div>
          <deport-table></deport-table>
          <this-url></this-url>
          <fixd-bottom1></fixd-bottom1>  
        </div>
      </div>
    </div>
  </transition> 
</template>

<script>
import deportTable from './components/deportTable'
import thisUrl from './components/thisUrl'
import fixdBottom1 from './components/fixdBottom1'
import Bus from '@/utils/bus'
export default {
  props: {
    fixedOption: {
      Object
    }
  },
  data() {
    return {
      depotName: '',
      url: '全部',
      wh: {
        width: '775px',
        height: '560px'
      },
      backgroundColor: {

      },
      zIndex: {

      }
    }
  },
  components: {
    deportTable,
    thisUrl,
    fixdBottom1
  },
  methods: {
    eve() {
      Bus.$emit('NewDepotShow', true, 1)
    }
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
<style>
  .fix-content .search{
    font-size: 0;
  }
  .fix-content .search .el-input input{
    border-color: #868686;
  }
  .fix-content .search .el-input input:hover{
    border-color: #7b8ae6;
    box-shadow: 0 0 4px 0 #7b8ae6;
  }
  .fix-content .search .el-input input:focus{
    border-color: #7b8ae6;
    box-shadow: 0 0 4px 0 #7b8ae6;
  }
  .fix-content .search .el-button{
    color: #333;
    border-color: #868686;
    background-color: #ffcc66;
    margin-left: 25px;
  }
  .fix-content .search .el-button:hover{
    background-color: rgba(255,204,102,.8);
  }
</style>>