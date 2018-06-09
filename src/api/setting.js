import newRequest from '@/utils/NewRequest'

export function getDepartmentTree() {
  return newRequest({
    url: 'api/v1/auth/structure/getTree',
    method: 'get'
  })
}

//商品分类树形列表
export function fetchGoodsCategory(){
  return newRequest({
      url: '/api/v1/auth/goodsCategory/getTree',
      method: 'get'  
  })
}
// 员工列表
export function fetchGetEmployee(data){
  return newRequest({
      url: '/api/v1/auth/employee',
      method: 'get',
      params:data
  })
}
// 员工新增
export function fetchAddEmployee(data){
  return newRequest({
      url: '/api/v1/auth/employee',
      method: 'post',
      data
  })
}
//员工启用、停用
export function fetchStopEmployee(data){
  return newRequest({
      url: '/api/v1/auth/employee/'+data.employeeId+'/'+data.enabled,
      method: 'GET',
      params:data
  })
}
//员工删除
export function fetchDelEmployee(data){
  return newRequest({
      url: '/api/v1/auth/employee/'+data,
      method: 'delete'
  })
}
//员工更新
export function fetchUpdateEmployee(data){
  return newRequest({
      url: '/api/v1/auth/employee/'+data.employeeId,
      method: 'put',
      data
  })
}
//用户、操作员列表不分页
export function fetchGetUserList(data){
  return newRequest({
      url: '/api/v1/auth/user?pageSize=0',
      method: 'get',
      data
  })
}
//部门列表
export function fetchStructureList(data){
  return newRequest({
      url: 'api/v1/auth/structure',
      method: 'get',
      params:data
  })
}
//部门新增
export function fetchAddStructure(data){
  return newRequest({
      url: 'api/v1/auth/structure',
      method: 'post',
      data
  })
}
//部门更新
export function fetchUpdateStructure(data){
  return newRequest({
      url: 'api/v1/auth/structure/'+data.structureId,
      method: 'put',
      data
  })
}
//部门删除 
export function fetchDelStructure(data){
  return newRequest({
      url: 'api/v1/auth/structure/'+data,
      method: 'delete'
  })
}
//仓库列表
export function fetchStoreList(data){
  return newRequest({
      url: 'api/v1/auth/storeInfo/list?pageSize=0',
      method: 'get',
      data
  })
}

//export const fetchGoodsCategory = data => fetch('/api/v1/auth/goodsCategory/list', data);

//商品选择列表
export function fetchGoodsList(data){
  return newRequest({
      url: '/api/v1/auth/goods/list',
      method: 'get',
      params: data
  })
}
//export const fetchGoodsList = data => fetch('/api/v1/auth/goods/list', data);

//库存期初列表查询
export function fetchStorePeriod(data) {
  return newRequest({
    url: '/api/v1/store/stockInit',
    method: 'get',
    params: data
  })
}


