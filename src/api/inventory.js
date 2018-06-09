import request from '@/utils/NewRequest'

//获取库存盘点单的单号
export const getStockCheckNo = () =>{
  return request({
    url: '/api/v1/store/stockCount/getSheetNo',
    method: 'get',
  })
}

//获取调拨单的单号
export const getstockAllotNo = () =>{
  return request({
    url: '/api/v1/store/stockAllot/getSheetNo',
    method: 'get',
  })
}
//获取盘点单详情
export const fenchstockCountContent = (data) => {
    return request({
        url: 'api/v1/store/stockCount/'+data,
        method: 'get',
    })
}
//获取销售库存列表
export const fenchqueryStock = (data) => {
    return request({
        url: 'api/v1/store/stock/queryStock',
        method: 'get',
        params: data
    })
}
// 获取库存商品列表
export function fetchStockList(data) {
  return request({
    url: 'api/v1/store/stock/getGoods',
    method: 'get',
    params: data
  })
}
//获取仓库盘点单列表
export const stockCountList = (data) => {
    return request({
        url: '/api/v1/store/stockCount',
        method: 'get',
        params: data
    })
}
//库存盘点单新增接口
export const AddstockCount = (data) => {
    return request({
        url: '/api/v1/store/stockCount',
        method: 'post',
        data
    })
}
//库存盘点单草稿新增接口
export const AddstockCountDraft = (data) => {
    return request({
        url: 'api/v1/store/stockCount/addDraft',
        method: 'post',
        data
    })
}

//获取库存调拨单历史列表
export function stockAllotList(data) {
    return request({
        url: '/api/v1/store/stockAllot/list',
        method: 'get',
        params: data
    })
}
//获取库存调拨单详情
export function fetchstockAllotContent(data) {
    return request({
        url: '/api/v1/store/stockAllot/'+data,
        method: 'get',
//      params: data
    })
}

//出入库明细
export const stockOptSheet = (data) => {
    return request({
        url: 'api/v1/store/stockOptSheet',
        method: 'get',
        params: data
    })
}
//根据商品获取颜色接口
export const fetchgoodsColor = (data) => {
    return request({
        url: 'api/v1/store/stock/getColor',
        method: 'get',
        params: data
    })
}
//库存调拨出库单创建
export function fetchAddStockAllot(data) {
    return request({
        url: '/api/v1/store/stockAllot',
        method: 'post',
        data
    })
}
//销售库存列表
export function stockqueryStock(data){
    return request({
        url: 'api/v1/store/stock/queryStock',
        method: 'GET',
        params: data
    })
}
//查询商品列表
export function fetchgoodsList(data){
    return request({
        url: 'api/v1/auth/goods/list',
        method: 'GET',
        params: data
    })
}
//查询商品颜色列表
export function fetchgoodsColorList(data){
    return request({
        url: 'api/v1/auth/goods/color/'+data,
        method: 'GET',
    })
}
//仓库库存列表
export function fetchstock(data) {
    return request({
        url: 'api/v1/store/stock',
        method: 'GET',
        params: data
    })
}

//调拨单审核入库
export function stockAllotConfirm(data) {
    return request({
        url: 'api/v1/store/stockAllot/ensure/'+data,
        method: 'PUT',
    })
}
//调拨单取消审核
export function stockAllotcancel(data) {
    return request({
        url: 'api/v1/store/stockAllot/cancel/'+data,
        method: 'PUT',
    })
}
//调拨单草稿删除接口
export function DelectAllot(data) {
    return request({
        url: 'api/v1/store/stockAllot/'+data,
        method: 'DELETE',
    })
}
//调拨单草稿更新接口
export function updateAllotDraft(data) {
    return request({
        url: 'api/v1/store/stockAllot/'+data.stockAllotId,
        method: 'PUT',
        data
    })
}