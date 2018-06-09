import request from '@/utils/request'

// 新建销售单时生成单号
export function fetchSheetCode() {
  return request({
    url: '/api/v1/sale/saleOrder/getSheetNo',
    method: 'get'
  })
}
// export const fetchSheetCode = () => fetch('/api/v1/purchase/purchaseOrder/getSheetNo')

// 获取经手人列表
export function fetchBrokerage(data) {
  return request({
    url: '/api/v1/auth/user',
    method: 'get',
    params: data
  })
}
// export const fetchBrokerage = data => fetch('/api/v1/auth/user', data)

// 获取供应商列表
export function fetchSupplier(data) {
  return request({
    url: '/api/v1/auth/customer',
    method: 'get',
    params: data
  })
}
// export const fetchSupplier = data => fetch('/api/v1/auth/customer', data)

// 获取仓库列表
export function fetchDeport(data) {
  return request({
    url: '/api/v1/auth/storeInfo/list',
    method: 'get',
    params: data
  })
}
// export const fetchDeport = data => fetch('/api/v1/resource/storeInfo/list', data)

// 获取库存查询仓库列表
export function fetchStockStore() {
  return request({
    url: '/api/v1/auth/storeInfo/list?pageSize=0',
    method: 'get',
  })
}
// export const fetchStockStore = data => fetch('/api/v1/auth/storeInfo/list?pageSize=0', data)

// 获取商品列表
export function fetchGoodsList(data) {
  return request({
    url: '/api/v1/auth/goods/list',
    method: 'get',
    params: data
  })
}
// export const fetchGoodsList = data => fetch('/api/v1/auth/goods/list', data)

// 根据商品编号查询颜色
export function fetchGoodsColor(goodsNo) {
  let url = '/api/v1/auth/goods/color/'
  url = url + goodsNo
  return request({
    url,
    method: 'get'
  })
}
// 获取库存列表
export function fetchStockList(data) {
  return request({
    url: '/api/v1/store/stock',
    method: 'get',
    params: data
  })
}
// 销售库存列表查询
export function fetchSaleStockSearch(data) {
  return request({
    url: '/api/v1/store/stock/queryStock',
    method: 'get',
    params: data
  })
}

// 新增销售单
export function fetchSaveSaleInfo(data) {
  return request({
    url: '/api/v1/sale/saleOrder',
    method: 'POST',
    data
  })
}

// 销售单保存为草稿
export function fetchSaveSaleInfoDraft(data) {
  return request({
    url: '/api/v1/sale/saleOrder/addDraft',
    method: 'POST',
    data
  })
}
// export const fetchSaveSaleInfoDraft = data => fetch('/api/v1//sale/saleOrder/addDraft', data, 'POST')

// 销售单历史
export function fetchSaleOrder(data) {
  return request({
    url: '/api/v1/sale/saleOrder',
    method: 'GET',
    params: data
  })
}
// export const fetchSaleOrder = data => fetch('/api/v1/sale/saleOrder/list', data)

// 删除销售单
export function fetchDelSaleOrder(orderId) {
  return request({
    url: '/api/v1/sale/saleOrder/' + orderId,
    method: 'delete',
    orderId
  })
}
// export const fetchDelSaleOrder = orderId => fetch('/api/v1/sale/saleOrder/' + orderId, {}, 'DELETE')
// 销售单详情
export function fetchSaleOrderDetail(orderId) {
  let url = '/api/v1/sale/saleOrder/'
  url = url + orderId
  return request({
    url,
    method: 'GET'
  })
}
