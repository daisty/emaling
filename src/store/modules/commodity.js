import { getGoodsList } from '@/api/purchase';

const commodity ={
  state: {
    commodityArr: [], //商品
    commodityColorArr: []  //商品颜色
  },

  mutations: {
    SET_COMMODITY_ARR: (state, data) =>{
      state.commodityArr = data;
    },
    SET_COMMODITYCOLOR_ARR: (state, data) =>{
      state.commodityColorArr = data;
    }
  },

  actions:{
     async GetGoods({ commit }, role) {
      const res = getGoodsList();
      console.log("2354342352352352535")
      res.then(({ data }) => {
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
        commit('SET_COMMODITY_ARR', data.list.list);
      });
    },
    async GetGoodsColor({ commit }, role) {
      const res = getGoodsColor();
      res.then(({ data }) => {
        commit('SET_COMMODITYCOLOR_ARR', data.list.list);
      });
    }
  }
}

export default commodity
