<template>
    <section class="app-main" style="height: calc(100% - 34px);position:relative;overflow:hidden;background:rgb(226,233,239)">
      <!--<transition name="fade" mode="out-in">-->
        <keep-alive :include="cachedViews">
          <router-view></router-view>
        </keep-alive>
      <!--</transition>-->
    </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
<style type="text/css" scoped="">
  #app .app-container{
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    margin: 15px 15px;
    padding: 15px;
    background-color: #fff;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
  }
</style>>

