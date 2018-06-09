import request from '@/utils/request';
// import request from '@/utils/NewRequest';

// 获取结算账户列表
export function fetchSettlementAccount(data) {
    return request({
        url: '/api/v1/auth/bankAccount',
        method: 'get',
        params: data
    })
}
//export const fetchSettlementAccount = data => fetch('/api/v1/auth/bankAccount',data);

//删除结算账户
export function fetchDelSettlementAccount(bankAccountId) {
    return request({
        url: '/api/v1/auth/bankAccount/' + bankAccountId,
        method: 'delete',
        bankAccountId
    })
}
//export const fetchDelSettlementAccount = bankAccountId => fetch('/api/v1/auth/bankAccount/' + bankAccountId ,{}, 'DELETE');

//账户资料启用/停用状态
export function fetchSettlementStatus(data){
    return request({
        url: '/api/v1/auth/bankAccount/updatedStatus/' + data.bankAccountId,
        method: 'put',
        data
    })

}
//export const fetchSettlementStatus = bankAccountId => fetch('/api/v1/auth/bankAccount/updatedStatus/' + bankAccountId ,{}, 'PUT');

//新增账户资料
export function fetchAddSettlementAccount(data) {
    return request({
        url: '/api/v1/auth/bankAccount',
        method: 'post',
        data
    })
}
//export const fetchAddSettlementAccount = data => fetch('/api/v1/auth/bankAccount', data, 'post')

//修改账户资料
export function fetchEditSettlementAccount(data) {
    return request({
        url: '/api/v1/auth/bankAccount/' + data.bankAccountId,
        method: 'put',
        data
    })
}
//export const fetchEditSettlementAccount = data => fetch('/api/v1/auth/bankAccount/' + data.bankAccountId, data, 'PUT')

//获取仓库信息列表
export function fetchWarehouseInfo(data) {
    return request({
        url: '/api/v1/auth/storeInfo/list',
        method: 'get',
        params: data
    })
}
//export const fetchWarehouseInfo = data => fetch('/api/v1/resource/storeInfo/list', data);

//删除仓库信息
export function fetchDelWarehouse(storeId) {
    return request({
        url: '/api/v1/auth/storeInfo/' + storeId,
        method: 'delete',
        storeId
    })
}
//export const fetchDelWarehouse = storeId => fetch('/api/v1/resource/storeInfo/' + storeId ,{}, 'DELETE');

//新增仓库信息
export function fetchAddWarehouseInfo(data) {
    return request({
        url: '/api/v1/auth/storeInfo',
        method: 'post',
        data
    })
}
//export const fetchAddWarehouseInfo = data => fetch('/api/v1/resource/storeInfo', data, 'post')

//修改仓库信息
export function fetchEditWarehouseInfo(data) {
    return request({
        url: '/api/v1/auth/storeInfo/' + data.storeId,
        method: 'put',
        data
    })
}
//export const fetchEditWarehouseInfo = data => fetch('/api/v1/resource/storeInfo/' + data.storeId, data, 'PUT')

//仓库信息启用/停用状态
export function fetchWarehouseInfoStatus(data){
    return request({
        url: '/api/v1/auth/storeInfo/updatedStatus/' + data.storeId,
        method: 'put',
        data
    })

}
//export const fetchWarehouseInfoStatus = storeId => fetch('/api/v1/resource/storeInfo/updatedStatus/' + storeId ,{}, 'PUT');


//商品分类列表
export function fetchGoodsCategory(){
    return request({
        url: '/api/v1/auth/goodsCategory/getTree',
        method: 'get'  
    })
}
//export const fetchGoodsCategory = data => fetch('/api/v1/auth/goodsCategory/list', data);

//商品分类列表id
export function fetchGoodsCategoryId(data){
    return request({
        url: '/api/v1/auth/goodsCategory',
        method: 'get',
        data 
    })
}
//export const fetchGoodsCategoryId = data => fetch('/api/v1/auth/goodsCategory', data);

//新增商品分类
export function fetchAddCategory(data) {
    return request({
        url: '/api/v1/auth/goodsCategory',
        method: 'post',
        data
    })
}
//export const fetchAddGoods = data => fetch('/api/v1/auth/goodsCategory', data, 'post')


//删除商品分类
export function fetchDelCategory(categoryId) {
    return request({
        url: '/api/v1/auth/goodsCategory/' + categoryId,
        method: 'delete',
        categoryId
    })
}
//export const fetchDelCategory = categoryId => fetch('/api/v1/auth/goodsCategory/' + categoryId ,{}, 'DELETE');

//商品列表
export function fetchGoodsList(data){
    return request({
        url: '/api/v1/auth/goods/list',
        method: 'get',
        params: data
    })
}
//export const fetchGoodsList = data => fetch('/api/v1/auth/goods/list', data);

//新增商品
export function fetchAddGoods(data) {
    return request({
        url: '/api/v1/auth/goods',
        method: 'post',
        data
    })
}
//export const fetchAddGoods = data => fetch('/api/v1/auth/goods', data, 'post')

//商品计量单位列表
export function fetchGoodsUnitName(data){
    return request({
        url: '/api/v1/auth/goods/unit',
        method: 'get',
        params: data
    })
}
//export const fetchGoodsUnitName = data => fetch('/api/v1/auth/goods/unit', data);

//新增计量单位
export function fetchAddUnitName(data) {
    return request({
        url: '/api/v1/auth/goods/unit',
        method: 'post',
        data
    })
}
//export const fetchAddUnitName = data => fetch('/api/v1/auth/goods/unit', data, 'post')

//修改单位列表
export function fetchEditUnit(data) {
    return request({
        url: '/api/v1/auth/goods/unit/' + data.unitId,
        method: 'put',
        data
    })
}
//export const fetchEditUnit = data => fetch('/api/v1/auth/goods/unit/' + data.unitId, data, 'PUT')

//删除单位
export function fetchDelUnit(unitId) {
    return request({
        url: '/api/v1/auth/goods/unit/' + unitId,
        method: 'delete',
        unitId
    })
}
//export const fetchDelUnit = unitId => fetch('/api/v1/auth/goods/unit/' + unitId ,{}, 'DELETE');

//修改仓库信息
export function fetchEditGoods(data) {
    return request({
        url: '/api/v1/auth/goods/' + data.goodsId,
        method: 'put',
        data
    })
}
//export const fetchEditGoods = data => fetch('/api/v1/auth/goods/' + data.goodsId, data, 'PUT')

//商品详情
export function fetchGetCommodityDetail(goodsId) {
    return request({
        url: '/api/v1/auth/goods/' + goodsId,
        method: 'get',
        goodsId
    })
}
//export const fetchGetCommodityDetail = goodsId => fetch('/api/v1/auth/goods/' + goodsId ,{}, 'get');

//删除商品
export function fetchDelCommodity(goodsId) {
    return request({
        url: '/api/v1/auth/goods/' + goodsId,
        method: 'delete',
        goodsId
    })
}
//export const fetchDelCommodity = goodsId => fetch('/api/v1/auth/goods/' + goodsId ,{}, 'DELETE');

//复制商品
export function fetchCopyCommodity(goodsId) {
    return request({
        url: '/api/v1/auth/goods/copy/' + goodsId,
        method: 'GET',
        goodsId
    })
}
//export const fetchCopyCommodity = goodsId => fetch('/api/v1/auth/goods/copy/' + goodsId, {}, 'get')

//商品启用/停用状态
export function fetchCommodityStatus(data){
    return request({
        url: '/api/v1/auth/goods/updatedStatus/' + data.goodsId,
        method: 'put',
        data
    })

}
//export const fetchCommodityStatus = goodsId => fetch('/api/v1/auth/goods/updatedStatus/' + goodsId ,{}, 'PUT');

// 获取库存查询仓库列表
export function fetchStockStore() {
    return request({
        url: '/api/v1/auth/storeInfo/list?pageSize=0',
        method: 'get',
    })
}
// export const fetchStockStore = data => fetch('/api/v1/auth/storeInfo/list?pageSize=0', data)

//商品库存期初新增
export function fetchCommodityInventory (data) {
    return request({
        url: '/api/v1/store/stockInit',
        method: 'post',
        data
    })
}
//export const fetchCommodityInventory = data => fetch('/api/v1/store/stockInit', data, 'POST')

// 客户资料列表
export function fetchClientInfo(data){
    return request({
        url: '/api/v1/auth/customer',
        method: 'get',
        params: data
    })
}
//export const fetchClientInfo = data => fetch('/api/v1/auth/customer', data);

//新增客户资料
export function fetchAddClientInfo(data) {
    return request({
        url: '/api/v1/auth/customer',
        method: 'post',
        data
    })
}
//export const fetchAddClientInfo = data => fetch('/api/v1/auth/customer', data, 'post')

//修改客户资料
export function fetchEditClientInfo(data) {
    return request({
        url: '/api/v1/auth/customer/' + data.customerId,
        method: 'put',
        data
    })
}
//export const fetchEditGoods = data => fetch('/api/v1/auth/goods/' + data.customerId, data, 'PUT')

//删除客户资料
export function fetchDelClientInfo(customerId) {
    return request({
        url: '/api/v1/auth/customer/' + customerId,
        method: 'delete',
        customerId
    })
}
//export const fetchDelClientInfo = customerId => fetch('/api/v1/auth/customer/' + customerId ,{}, 'DELETE');

//客户资料启用/停用状态
export function fetchClientInfoStatus(data){
    return request({
        url: '/api/v1/auth/customer/updatedStatus/' + data.customerId,
        method: 'put',
        data
    })

}
//export const fetchClientInfoStatus = customerId => fetch('/api/v1/auth/goods/updatedStatus/' + customerId ,{}, 'PUT');

// 客户详情资料
export function fetchClientInfoDetail(customerId) {
    return request({
        url: '/api/v1/auth/customer/' + customerId,
        method: 'get',
        customerId
    })
}
//export const fetchClientInfoDetail = customerId = > fetch('/api/v1/auth/customer/' + customerId, {}, 'GET' )

// 供应商列表
export function fetchSupplierList(data) {
    return request({
        url: '/api/v1/auth/supplier',
        method: 'get',
        params: data
    })
}
//export const fetchSupplierList = data => fetch('/api/v1/auth/supplier/list', data);

//新增供应商
export function fetchAddSupplier(data) {
    return request({
        url: '/api/v1/auth/supplier',
        method: 'post',
        data
    })
}
//export const fetchAddSupplier = data => fetch('/api/v1/auth/supplier' + data, 'POST')

//修改供应商
export function fetchEditSupplier(data) {
    return request({
        url: '/api/v1/auth/supplier/' + data.customerId,
        method: 'put',
        data
    })
}
//export const fetchEditSupplier = data => fetch('/api/v1/auth/supplier/' + data.customerId, data, 'PUT')

//删除供应商
export function fetchDelSupplier(customerId) {
    return request({
        url: '/api/v1/auth/supplier/' + customerId,
        method: 'delete',
        customerId
    })
}
//export const fetchDelSupplier = customerId => fetch('/api/v1/auth/supplier/' + customerId ,{}, 'DELETE');

//供应商启用/停用状态
export function fetchSupplierStatus(data){
    return request({
        url: '/api/v1/auth/supplier/updatedStatus/' + data.customerId,
        method: 'put',
        data
    })

}
//export const fetchSupplierStatus = customerId => fetch('/api/v1/auth/goods/updatedStatus/' + customerId ,{}, 'PUT');

// 供应商详情信息
export function fetchSupplierDetail(customerId) {
    return request({
        url: '/api/v1/auth/supplier/' + customerId,
        method: 'get',
        customerId
    })
}
//export const fetchSupplierDetail = customerId = > fetch('/api/v1/auth/supplier/' + customerId, {}, 'GET' )
