import request from '@/utils/NewRequest';


// 获取收款账号列表
export function fetchReceivableAccount(data) {
  return request({
    url: 'api/v1/auth/bankAccount',
    method: 'get',
    params: data
  });
}
//账户资料详情
export function fetchReceivableAccountDetail(data) {
  return request({
    url: 'api/v1/auth/bankAccount/'+data,
    method: 'get'
  });
}
//收款单记账接口
export function fetchReceiptBill(data) {
  return request({
    url: 'api/v1/finance/settlementSheet/receiptBill',
    method: 'post',
    data
  });
}
//收款单单据编号
export function fetchSheetNo(data) {
  return request({
    url: '/api/v1/finance/settlementSheet/receiptBill/getSheetNo',
    method: 'get',
    params: data
  });
}
//收款单列表接口
export function fetchReceiptList(data) {
  return request({
    url: 'api/v1/finance/receiptBill',
    method: 'get',
    params: data
  });
}
//收款单历史记录
export function fetchQueryReceiptList(data) {
  return request({
    url: 'api/v1/finance/settlementSheet/receiptBill',
    method: 'get',
    params: data
  });
}
//收款单-详情
export function fetchReceiptBillDetail(data) {
  return request({
    url: 'api/v1/finance/settlementSheet/receiptBill/'+data,
    method: 'get'
  });
}
//收款单(草稿)-更新
export function fetchReceiptBillUpdate(data) {
  return request({
    url: 'api/v1/finance/settlementSheet/receiptBill/'+data.settlementId,
    method: 'put',
    data
  });
}
//收款单(记账)-作废
export function fetchReceiptBillDisCard(data) {
  return request({
    url: 'api/v1/finance/settlementSheet/receiptBill/discard/'+data,
    method: 'put'
  });
}
//收款单-删除
export function fetchReceiptBillDel(data) {
  return request({
    url: 'api/v1/finance/settlementSheet/receiptBill/'+data,
    method: 'delete'
  });
}
//付款单单据编号
export function fetchPaySheetNo(data) {
  return request({
    url: '/api/v1/finance/settlementSheet/paymentBill/getSheetNo',
    method: 'get',
    params: data
  });
}

//付款单记账接口
export function fetchReceiptPayBill(data) {
  return request({
    url: 'api/v1/finance/settlementSheet/paymentBill',
    method: 'post',
    data
  });
}
//付款单列表接口
export function fetchReceiptPayList(data) {
  return request({
    url: 'api/v1/finance/paymentBill',
    method: 'get',
    params: data
  });
}
//付款单历史记录
export function fetchQueryReceiptPayList(data) {
  return request({
    url: 'api/v1/finance/settlementSheet/paymentBill',
    method: 'get',
    params: data
  });
}
//付款单-详情
export function fetchReceiptPayBillDetail(data) {
  return request({
    url: 'api/v1/finance/settlementSheet/paymentBill/'+data,
    method: 'get'
  });
}
//付款单(草稿)-更新
export function fetchReceiptBillPayUpdate(data) {
  return request({
    url: 'api/v1/finance/settlementSheet/paymentBill/'+data.settlementId,
    method: 'put',
    data
  });
}
//付款单(记账)-作废
export function fetchReceiptBillPayDisCard(data) {
  return request({
    url: 'api/v1/finance/settlementSheet/paymentBill/discard/'+data,
    method: 'put'
  });
}
//付款单-删除
export function fetchReceiptBillPayDel(data) {
  return request({
    url: 'api/v1/finance/settlementSheet/paymentBill/'+data,
    method: 'delete'
  });
}

//应收增加编号
export function fetchAdjustmentAddSheetNo(data) {
  return request({
    url: '/api/v1/finance/receiptAdjustment/addSheetNo',
    method: 'get',
    params: data
  });
}
//应收减少编号
export function fetchAdjustmentLessenSheetNo(data) {
  return request({
    url: '/api/v1/finance/receiptAdjustment/lessenSheetNo',
    method: 'get',
    params: data
  });
}
//应收调整新增
export function fetchReceiptAdjustment(data) {
  return request({
    url: 'api/v1/finance/receiptAdjustment',
    method: 'post',
    data
  });
}
//应收调整历史
export function fetchAdjustmentReceiptHistory(data) {
  return request({
    url: 'api/v1/finance/receiptAdjustment',
    method: 'get',
    params: data
  });
}
//应收调整详情
export function fetchAdjustmentReceiptDetail(data) {
  return request({
    url: 'api/v1/finance/receiptAdjustment/'+data,
    method: 'get'
  });
}
//应收调整-草稿(更新)
export function fetchAdjustmentReceiptDarft(data) {
  return request({
    url: 'api/v1/finance/receiptAdjustment/'+data.inOutbalanceId,
    method: 'put',
    data
  });
}
//应收调整草稿删除
export function fetchReceiptAdjustmentDel(data) {
  return request({
    url: 'api/v1/finance/receiptAdjustment/'+data,
    method: 'delete'
  });
}
//应收调整-作废
export function fetchAdjustmentReceiptDisCard(data) {
  return request({
    url: 'api/v1/finance//receiptAdjustment/discard/'+data,
    method: 'put'
  });
}
//应付增加编号
export function fetchAdjustmentPayAddSheetNo(data) {
  return request({
    url: '/api/v1/finance/paymentAdjustment/addSheetNo',
    method: 'get',
    params: data
  });
}
//应付减少编号
export function fetchAdjustmentPayLessenSheetNo(data) {
  return request({
    url: '/api/v1/finance/paymentAdjustment/lessenSheetNo',
    method: 'get',
    params: data
  });
}
//应付调整新增
export function fetchReceiptAdjustmentPay(data) {
  return request({
    url: 'api/v1/finance/paymentAdjustment',
    method: 'post',
    data
  });
}
//应付调整历史
export function fetchAdjustmentPayHistory(data) {
  return request({
    url: 'api/v1/finance/paymentAdjustment',
    method: 'get',
    params: data
  });
}
//应付调整详情
export function fetchAdjustmentPayDetail(data) {
  return request({
    url: 'api/v1/finance/paymentAdjustment/'+data,
    method: 'get'
  });
}
//应付调整-草稿(更新)
export function fetchAdjustmentPayDarft(data) {
  return request({
    url: 'api/v1/finance/paymentAdjustment/'+data.inOutbalanceId,
    method: 'put',
    data
  });
}
//应付调整草稿删除
export function fetchPaymentAdjustmentDel(data) {
  return request({    
    url: 'api/v1/finance/paymentAdjustment/'+data,
    method: 'delete'
  });
}
//应付调整-作废
export function fetchAdjustmentPayDisCard(data) {
  return request({
    url: 'api/v1/finance/paymentAdjustment/discard/'+data,
    method: 'put'
  });
}
