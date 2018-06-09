<template>
  <div class="menu-wrapper">
    <ul class="l-menu">
      <li class="parent" v-for="item in routes" v-if="!item.hidden&&item.children">
        <router-link style="padding-left:14px;" v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name">
          <i v-if="item.meta&&item.meta.icon" class="icon iconfont" :class="item.meta.icon"></i>
          <span class="font" v-if="item.children[0].meta&&item.children[0].meta.title">{{generateTitle(item.children[0].meta.title)}}</span>
        </router-link>
        <div v-else>
          <div>
            <i v-if="item.meta&&item.meta.icon" class="icon iconfont" :class="item.meta.icon"></i>
            <span class="font" v-if="item.meta&&item.meta.title">{{generateTitle(item.meta.title)}}</span>
          </div>
          <div class="child">
            <ul class="child-flex">
              <li class="child_1" v-for="child in item.children" v-if="!child.hidden&&child.more" :key="child.name">
                <div class="child_2">
                  <router-link class="s" :to="item.path+'/'+child.path" :key="child.name">
                    <span v-if="child.meta&&child.meta.title">{{generateTitle(child.meta.title)}}</span>
                  </router-link>
                </div>
                <ul class="child3">
                  <li class="b" v-for="(children,index) in child.more" :key="index">
                    <div class="child4" v-for="little in children" :key="little.name">
                      <router-link :to="item.path+'/'+little.path">
                        <span v-if="little.meta&&little.meta.title">{{generateTitle(little.meta.title)}}</span>
                      </router-link>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>

          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { generateTitle } from "@/utils/i18n";

export default {
  name: "SidebarItem",
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden;
      });
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    },
    generateTitle
  }
};
</script>
<style lang="scss" scoped>
.menu-wrapper {
  font-size: 12px;
  .l-menu {
    list-style: none;
    padding-left: 20px;
    color: rgba(255, 255, 255, 0.8);
    ul,
    li {
      list-style: none;
    }
    li.parent {
      height: 40px;
      line-height: 40px;
      margin-top: 10px;
      cursor: pointer;
      position: relative;
      .icon {
        font-size: 18px;
        // vertical-align:middle;
      }
      // &:after{
      //   content: "";
      //   display: block;
      //   width: 0 !important;
      //   height: 0 !important;
      //   border: 12px solid;
      //   border-color: transparent #e2e9ef transparent transparent;
      //   position: absolute;
      //   right: 0;
      //   margin-top: -12px;
      //   top: 50%;
      // }
      > div {
        padding-left: 14px;
      }
      .font {
        font-size: 16px;
      }
      .b {
        line-height: 35px;
        position: relative;
        &:hover {
          background: #efefef;
          div:nth-child(1) a {
            color: #47a6e9;
          }
        }
      }
      .s {
        font-size: 14px;
        color: #47a6e9 !important;
        font-weight: 700;
        padding-left: 15px;
      }
      .child_1 {
        // float: left;
        width: 160px;
        border-right: 1px dashed #ccc;
        &:last-child {
          border-right: none;
        }
      }

      .child {
        width: auto;
        height: auto;
        overflow: hidden;
        position: absolute;
        background: #fff;
        padding: 20px 25px 14px;
        top: 0px;
        left: 106px;
        z-index: 1;
        box-shadow: 10px -8px 20px -10px #aaa, 5px 12px 20px -10px #aaa;
        border: 1px solid #e1e1e1;
        border-left: 0;
        display: none;
        a {
          color: #333;
        }
        .child-flex{
          display: flex;
          padding-left: 0;
        }
      }
      .child3 {
        padding-left: 15px;
      }
      &:hover {
        background-color: #346ac9;
        color: #fff;
        .child {
          display: block;
          &:hover {
            display: block;
          }
        }
      }
      .child4 {
        display: inline-block;
      }
      .b div:nth-child(2) {
        width: 35px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: #47a6e9;
        color: #fff !important;
        border-radius: 3px;
        position: absolute;
        right: 15px;
        top: 7px;
        a {
          color: #fff;
        }
        &:hover {
          background-color: #346ac9;
          color: #fff !important;
        }
      }
    }
  }
}
</style>
<style lang="scss">
#app {
  .el-submenu__title:hover + .el-menu {
    display: block !important;
  }
  .el-submenu {
    position: relative;
  }
  .el-menu--inline {
    &:hover {
      display: block !important;
    }
    background: #fff !important;
    position: absolute;
    padding: 20px 0 14px;
    top: 0px;
    left: 180px;
    z-index: 1;
    display: none !important;
    box-shadow: 10px -8px 20px -10px #aaa, 5px 12px 20px -10px #aaa;
    border: 1px solid #e1e1e1;
    border-left: 0;
  }
  .el-submenu .el-menu-item {
    background: #fff !important;
    color: #333 !important;
    height: 35px;
    line-height: 35px;
    &:hover {
      background: #efefef !important;
      color: #47a6e9 !important;
    }
  }
  // .title{
  //   color:#47a6e9;
  //   height: 40px;
  //   line-height: 40px;
  //   margin-bottom: 5px;
  //   padding-left:30px;
  //   .tag{
  //     display:inline-block;
  //     width:6px;
  //     height: 6px;
  //     background:#47a6e9;
  //     margin-top:16px;
  //     vertical-align: top;
  //     margin-right: 3px;
  //   }
  //   .title-text{
  //     font-size: 18px!important;
  //   }
  // }
  .sidebar-container {
    overflow: inherit;
  }
}
</style>

