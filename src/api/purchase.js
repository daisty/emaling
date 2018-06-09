import request from '@/utils/request';
import newRequest from '@/utils/NewRequest';

// 新建采购入库单时生成单号
export function fetchSheetCode() {
  return request({
    url: '/api/v1/purchase/purchaseOrder/getSheetNo',
    method: 'get'
  });
}
// export const fetchSheetCode = () => fetch('/api/v1/purchase/purchaseOrder/getSheetNo')

// 采购入库结算单生成单号
export function fetchSettleSheetCode() {
  return request({
    url: '/api/v1/purchase/purchaseOrderSettle/getSheetNo',
    method: 'get'
  });
}
// export const fetchSettleSheetCode = () => fetch('/api/v1/purchase/purchaseOrderSettle/getSheetNo')

// 获取经手人列表
export function fetchBrokerage(data) {
  return request({
    url: '/api/v1/auth/employee/handlers',
    method: 'get',
    params: data
  });
}
// export const fetchBrokerage = data => fetch('/api/v1/auth/user', data)

// 获取供应商列表
export function fetchSupplier(data) {
  return request({
    url: '/api/v1/auth/customer',
    method: 'get',
    params: data
  });
}
// export const fetchSupplier = data => fetch('/api/v1/auth/customer', data)

// 获取仓库列表
export function fetchDeport(data) {
  return request({
    url: '/api/v1/auth/storeInfo/list',
    method: 'get',
    params: data
  });
}
// export const fetchDeport = data => fetch('/api/v1/resource/storeInfo/list', data)

// 获取商品列表
export function fetchGoodsList(data) {
  return request({
    url: '/api/v1/auth/goods/list',
    method: 'get',
    params: data
  });
}
// export const fetchGoodsList = data => fetch('/api/v1/auth/goods/list', data)

//根据商品编号查询颜色
export function fetchGoodsColor(goodsNo) {
  let url = '/api/v1/auth/goods/color/';
  url = url + goodsNo;
  return request({
    url,
    method: 'get'
  });
}

//新增采购入库单保存
export function fetchSaveInstroeInfo(data) {
  return request({
    url: '/api/v1/purchase/purchaseOrder',
    method: 'post',
    data
  });
}
// export const fetchSaveInstroeInfo = data => fetch('/api/v1/purchase/purchaseOrder', data, 'POST')

//采购入库单保存为草稿
export function fetchSaveInstroeInfoDraft(data) {
  return request({
    url: '/api/v1/purchase/purchaseOrder/addDraft',
    method: 'post',
    data
  });
}
// export const fetchSaveInstroeInfoDraft = data => fetch('/api/v1/purchase/purchaseOrder/addDraft', data, 'POST')

//采购入库单历史
export function fetchPurchaseOrder(data) {
  return request({
    url: '/api/v1/purchase/purchaseOrder',
    method: 'get',
    params: data
  });
}
// export const fetchPurchaseOrder = data => fetch('/api/v1/purchase/purchaseOrder', data)

//删除采购入库单
export function fetchDelPurchaseOrder(orderId) {
  return request({
    url: '/api/v1/purchase/purchaseOrder/',
    method: 'delete',
    orderId
  });
}
// export const fetchDelPurchaseOrder = orderId => fetch('/api/v1/purchase/purchaseOrder/' + orderId, {}, 'DELETE')

// ------------------------------------------------------ new
// 获取经手人列表
export function getBrokerage() {
  return newRequest({
    url: '/api/v1/auth/employee/handlers',
    method: 'get'
  });
}
// export const fetchBrokerage = data => fetch('/api/v1/auth/user', data)

// 获取供应商列表
export function getSupplier() {
  return newRequest({
    url: '/api/v1/auth/supplier',
    method: 'get'
  });
}
// export const fetchSupplier = data => fetch('/api/v1/auth/customer', data)

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

//新增采购入库单保存
export function saveInstroeInfo(data) {
  return newRequest({
    url: '/api/v1/purchase/purchaseOrder',
    method: 'post',
    data
  });
}

//采购入库单保存为草稿
export function saveInstroeInfoDraft(data) {
  return newRequest({
    url: '/api/v1/purchase/purchaseOrder/addDraft',
    method: 'post',
    data
  });
}

// 采购入库结算单生成单号
export function getSettleSheetCode() {
  return newRequest({
    url: '/api/v1/purchase/purchaseOrderSettle/getSheetNo',
    method: 'get'
  });
}

//获取入库结算单详情
export function getPurchaseSettlementSheet(orderSettleId) {
  let url = 'api/v1/purchase/purchaseOrderSettle/';
  url = url + orderSettleId;
  return newRequest({
    url,
    method: 'get'
  })
}

//采购入库单历史
export function getPurchaseOrder(data) {
  return newRequest({
    url: '/api/v1/purchase/purchaseOrder',
    method: 'get',
    params: data
  });
}

// 新建采购入库单时生成单号
export function getPurchaseOrderDetails(data) {
  return newRequest({
    url: '/api/v1/purchase/purchaseOrder/'+data,
    method: 'get'
  });
}

// 采购入库单作废
export function discardPurchasePurchaseOrder(data) {
  return newRequest({
    url: '/api/v1/purchase/purchaseOrder/discard',
    method: 'put',
    data
  });
}

// 入库结算单-------------
// 获取入库结算单
export function getClearingBillDoing(orderId) {
  return newRequest({
    url: `/api/v1/purchase/purchaseOrder/account/${orderId}`,
    method: 'get',
  });
}
// 入库结算单记账
export function clearingBillDoingAccount(data) {
  return newRequest({
    url: '/api/v1/purchase/purchaseOrderSettle',
    method: 'post',
    data
  });
}
