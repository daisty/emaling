import { getBrokerage, getSupplier, getDeport } from '@/api/purchase';

const user = {
  state: {
    userArr: [], //经手人
    customerArr: [], //供应商
    storeInfoArr: [] //仓库信息
  },

  mutations: {
    SET_USER_ARR: (state, data) => {
      state.userArr = data;
    },
    SET_CUSTOMER_ARR: (state, data) => {
      state.customerArr = data;
    },
    SET_STOREINFO_ARR: (state, data) => {
      state.storeInfoArr = data;
    }
  },

  actions: {
    async GetBrokerage({ commit }, role) {
      const res = getBrokerage();
      res.then(({ data }) => {
        commit('SET_USER_ARR', data.list.list);
      });
    },
    async GetSupplier({ commit }, role) {
      const res = getSupplier();
      res.then(({ data }) => {
        commit('SET_CUSTOMER_ARR', data.list.list);
      });
    },
    async GetDeport({ commit }, role) {
      const res = getDeport();
      res.then(({ data }) => {
        commit('SET_STOREINFO_ARR', data.storeInfoList.list);
      });
    }
  }
};

export default user;
