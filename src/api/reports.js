import request from '@/utils/request'
import newRequest from '@/utils/NewRequest';
// 渲染出入库列表
export function fetchOutIndetails(data) {
  return request({
    url: 'api/v1/store/stockOptSheet',
    method: 'get',
    params: data
  })
}


// 库存结存表
export function fetchStoreBalanceSheet(data) {
    return request({
      url: '/api/v1/store/stock/stockGoods',
      method: 'get',
      params: data
    })
  }

// 数据单据统计
export function getSalesSheetStatistic(data) {
  return newRequest({
    url: 'api/v1/sale/saleOrder/count',
    method: 'get',
    params: data
  })
}

// 客户结欠表
export function getCustomerBalanceSheet(data) {
  return newRequest({
    url: 'api/v1/finance/customerFinanceInfo/getCustomerSettleData',
    method: 'get',
    params: data
  })
}

// 客户对账单
export function getCustomerStatementDetail(data) {
  return newRequest({
    url: 'api/v1/finance/receiptBill/getCheckAccount',
    method: 'get',
    params: data
  })
}

// 销售日报表
export function getSalesDayStatistic(data) {
  return newRequest({
    url: '/api/v1/finance/saleStat/daily',
    method: 'get',
    params: data
  })
}

// 销售年报表
export function getSalesYearStatistic(data) {
  return newRequest({
    url: '/api/v1/finance/saleStat/monthly',
    method: 'get',
    params: data
  })
}

// 查应收
export function getCheckReceivable(data) {
  return newRequest({
    url: 'api/v1/finance/customerFinanceInfo/receivable',
    method: 'get',
    params: data
  })
}

// 查应付
export function getCheckPayable(data) {
  return newRequest({
    url: 'api/v1/finance/customerFinanceInfo/payable',
    method: 'get',
    params: data
  })
}

  // 获取经手人列表
  export function fetchBrokerage(data) {
    return request({
      url: '/api/v1/auth/employee/handlers',
      method: 'get',
      params: data
    });
  }

  // 获取供应商列表
  export function fetchSupplier(data) {
    return request({
      url: '/api/v1/auth/customer',
      method: 'get',
      params: data
    });
  }

  // 获取仓库列表
  export function fetchDeport(data) {
    return request({
      url: '/api/v1/auth/storeInfo/list',
      method: 'get',
      params: data
    });
  }

  // 获取商品列表
  export function fetchGoodsList(data) {
    return request({
      url: '/api/v1/auth/goods/list',
      // url: `/api/v1/auth/goods/detailList`,
      method: 'get',
      params: data
    });
  }

  //根据商品编号查询颜色
  export function fetchGoodsColor(goodsNo) {
    let url = '/api/v1/auth/goods/color/';
    url = url + goodsNo;
    return request({
      url,
      method: 'get'
    });
  }


  // ------------------------------------------------------ new
  // 获取经手人列表
  export function getBrokerage() {
    return newRequest({
      url: '/api/v1/auth/employee/handlers',
      method: 'get'
    });
  }

  // 获取供应商列表
  export function getSupplier() {
    return newRequest({
      url: '/api/v1/auth/supplier',
      method: 'get'
    });
  }

  // 获取仓库列表
  export function getDeport() {
    return newRequest({
      url: '/api/v1/auth/storeInfo/list',
      method: 'get'
    });
  }


  // 获取商品列表
  export function getGoodsList(data) {
    return newRequest({
      url: '/api/v1/auth/goods/list',
      method: 'get',
      params: data
    });
  }

  // 获取商品颜色
  export function getGoodsColor(goodsNo) {
    let url = '/api/v1/auth/goods/color/';
    url = url + goodsNo;
    return newRequest({
      url,
      method: 'get'
    });
  }

  // 新建采购入库单时生成单号
  export function getSheetCode() {
    return newRequest({
      url: '/api/v1/purchase/purchaseOrder/getSheetNo',
      method: 'get'
    });
  }
