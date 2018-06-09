import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import errorLog from './modules/errorLog';
import permission from './modules/permission';
import tagsView from './modules/tagsView';
import user from './modules/user';
import getters from './getters';
import state from './state';
// new store
import purchase from './modules/purchase';
import commodity from './modules/commodity'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    purchase,
    commodity
  },
  getters,
  state
});

export default store;
