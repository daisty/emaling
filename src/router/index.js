import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
import Login from '@/views/login/index'
import Authredirect from '@/views/login/authredirect'
import Page404 from '@/views/errorPage/404'
import Page401 from '@/views/errorPage/401'
import Dashboard from '@/views/dashboard/index'

import SemConfig from '@/views/_purchase/purchaseBussOperSet'

import FirmConfig from '@/views/_purchase/purchaseBussAccountingSet'

import PurchaseOrderAdd from '@/views/_purchase/stock/stock_in_bill_add'

import PurchaseOrder from '@/views/_purchase/stock/stock_in_bill_storage'
import PurchaseOrderHistory from '@/views/_purchase/stock/stock_in_bill_history'
import PurchaseOrderDraft from '@/views/_purchase/stock/stock_in_bill_draft'
import PurchaseOrderCancle from '@/views/_purchase/stock/stock_in_bill_cancel'

import ReturnPurchaseAdd from '@/views/_purchase/return/return_bill_add'
import ReturnPurchase from '@/views/_purchase/return/return_bill_done'
import ReturnPurchaseHistory from '@/views/_purchase/return/return_bill_history'
import ReturnPurchaseDraft from '@/views/_purchase/return/return_bill_draft'
import ReturnPurchaseCancle from '@/views/_purchase/return/return_bill_cancel'

import PurSettlementSheetAdded from '@/views/_purchase/clear/clearing_bill_doing'
import PurSettlementSheetAddedNew from '@/views/_purchase/clear/receipt_settlement_sheet_doing'
import PurSettlementSheet from '@/views/_purchase/clear/clearing_bill_done'
import PurSettlementSheetHistory from '@/views/_purchase/clear/clearing_bill_history'

//sale
import SaleOrderAdd from '@/views/_sale/bill/sale_bill_add'
import SaleOrderAddDraft from '@/views/_sale/bill/sale_bill_draft'
import SaleOrderdetail from '@/views/_sale/bill/sale_bill_done'
import SaleOrderHistory from '@/views/_sale/bill/sale_bill_history'
import SaleOrderReturns from '@/views/_sale/bill/sale_bill_returns'

import Sale from '@/views/_sale/index'

// Finance
import PaymentHistory from '@/views/_finance/payment/paymentHistory'
import PaymentSheet  from '@/views/_finance/payment/paymentSheet'
import PaymentSheetDraft from '@/views/_finance/payment/paymentSheetDraft'
import PaymentSheetAlready  from '@/views/_finance/payment/paymentSheetAlready'
import ReceiptHistory from '@/views/_finance/receipt/receiptHistory'
import ReceiptSheet from '@/views/_finance/receipt/receiptSheet'
import ReceiptSheetDraft from '@/views/_finance/receipt/receiptSheetDraft'
import ReceiptSheetAlready from '@/views/_finance/receipt/receiptSheetAlready'
import PayableAdjustment from '@/views/_finance/reconciliation/payableAdjustment'
import PayableAdjustmentHistory from '@/views/_finance/reconciliation/payableAdjustmentHistory'
import PayableAdjustmentAlready from '@/views/_finance/reconciliation/payableAdjustmentAlready'
import ReceivableAdjustment from '@/views/_finance/reconciliation/receivableAdjustment'
import receivableAdjustmentHistory from '@/views/_finance/reconciliation/receiptAdjustmentHistory'
import receivableAdjustmentAlready from '@/views/_finance/reconciliation/receiptAdjustmentAlready'
import PaymentFunction from '@/views/_finance/paymentFunction'
import ReceiptFunction from '@/views/_finance/receiptFunction'
import ReconciliationFunction from '@/views/_finance/reconciliationFunction'

// data
import Meterial from '@/views/_data/index'
import MeterialConfig from '@/views/_data/dataBussAccountingSet'
import CorporateInformation from '@/views/_data/account_info/settlement_account'
import AccountAdd from '@/views/_data/account_info/add_account'
import AccountEdit from '@/views/_data/account_info/edit_account'
import DataWarehouseInformation from '@/views/_data/warehouse/warehouse_info'
import DataCommodity from '@/views/_data/merchandise/commodity'
import DataClientInformation from '@/views/_data/clientele/client_info'
import DataSupplier  from '@/views/_data/supplier_info/supplier'

//report
import FinanceReportSet from  '@/views/_reports/financeReportSet'
import SalesReportSet from  '@/views/_reports/salesReportSet'
import StoreReportSet from  '@/views/_reports/storeReportSet'
import CustomerBalance from '@/views/_reports/financeReportSet/customerBalanceSheet'
import CustomerStatementDetail from '@/views/_reports/financeReportSet/customerStatementDetail'
import CheckPayable from '@/views/_reports/financeReportSet/checkPayable'
import CheckReceivable from '@/views/_reports/financeReportSet/checkReceivable'
import SalesSheetStatistic from '@/views/_reports/salesReportSet/salesSheetStatistic'
import SalesDayMonthYearStatistic from '@/views/_reports/salesReportSet/salesDayMonthYearStatistic'
import StoreBalanceSheet from '@/views/_reports/storeReportSet/storeBalanceSheet'
import StoreOutIndetails from '@/views/_reports/storeReportSet/storeOutIndetails'


// settings
import AccountBeginning from '@/views/_setting/accountBeginning'
import SystemManagement from '@/views/_setting/systemManagement'
import StaffManagement from '@/views/_setting/systemManage/staffManagement'
import SystemParamSetting from '@/views/_setting/systemManage/systemParamSetting'
import StoreBeginning from '@/views/_setting/accountBeginning/storeBeginning'
import SystemRebuilding from '@/views/_setting/accountBeginning/systemRebuilding'

//inventory
import OperBussSet from '@/views/_inventory/inventory_buss_oper_set'
import BussReports from '@/views/_inventory/inventory_buss_reports_set'
import inventoryCheck from '@/views/_inventory/inventoryBussOperator/inventory_check'
import inventoryCheckHistory from '@/views/_inventory/inventoryBussOperator/inventory_check_history'
import inventoryAllocation from '@/views/_inventory/inventoryBussOperator/inventory_allocation'
import inventoryAllocationHistory from '@/views/_inventory/inventoryBussOperator/inventory_allocation_history'
import inventoryInDetails from '@/views/_inventory/inventoryBussReports/inventory_in_details'
import InventoryOutDetails from '@/views/_inventory/inventoryBussReports/inventory_out_details'
import inventorySearch from '@/views/_inventory/inventoryBussReports/inventory_search'
import inventoryAllocationDraft from '@/views/_inventory/inventoryBussOperator/inventory_allocationDraft'
import inventoryAllocationAlready from '@/views/_inventory/inventoryBussOperator/inventory_allocationAlready'
import inventoryAllocationReview from '@/views/_inventory/inventoryBussOperator/inventory_allocationReview'
import inventoryAllocationCancel from '@/views/_inventory/inventoryBussOperator/inventory_allocationCancel'
import inventoryCheckAlready from '@/views/_inventory/inventoryBussOperator/inventory_checkAlready'
import inventoryCheckDraft from '@/views/_inventory/inventoryBussOperator/inventory_checkDraft'
import inventoryAdd from '@/views/_inventory/inventoryBussOperator/inventory_add'



/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/authredirect', component: Authredirect, hidden: true },
  { path: '/404', component: Page404, hidden: true },
  { path: '/401', component: Page401, hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    meta: { icon: 'icon-shouye' },
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        name: 'dashboard',
        meta: { title: 'dashboard', icon: 'icon-shouye', noCache: true }
      }
    ]
  }
  /*
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [{
      path: 'index',
      component: _import('documentation/index'),
      name: 'documentation',
      meta: { title: 'documentation', icon: 'documentation', noCache: true }
    }]
  }
  */
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/purchase',
    component: Layout,
    meta: { title: 'purchase', icon: 'icon-caigou', roles: ['admin'] },
    redirect: 'noredirect',
    children: [
      {
        path: 'sem_set',
        name: 'sem_set',
        component: SemConfig,
        meta: { title: 'sem_set', roles: ['admin'] },
        more: [
          [
            {
              path: 'stock_in_bill_add',
              name: 'stock_in_bill_add',
              meta: { title: 'stock_in_bill_add', roles: ['admin'] }
            },
            {
              path: 'stock_in_bill_history',
              name: 'stock_in_bill_history',
              meta: { title: 'stock_in_bill_history', roles: ['admin'] }
            }
          ],
          [
            {
              path: 'return_bill_add',
              name: 'return_bill_add',
              meta: { title: 'return_bill_add', roles: ['admin'] }
            },
            {
              path: 'return_bill_history',
              name: 'return_bill_history',
              meta: { title: 'return_bill_history', roles: ['admin'] }
            }
          ]
        ]
      },
      {
        path: 'stock_in_bill_add',
        name: 'stock_in_bill_add',
        component: PurchaseOrderAdd,
        meta: { title: 'stock_in_bill_add', roles: ['admin'] }
      },
      {
        path: 'stock_in_bill_history',
        name: 'stock_in_bill_history',
        component: PurchaseOrderHistory,
        meta: { title: 'stock_in_bill_history', roles: ['admin'] }
      },
      {
        path: 'return_bill_add',
        name: 'return_bill_add',
        component: ReturnPurchaseAdd,
        meta: { title: 'return_bill_add', roles: ['admin'] }
      },
      {
        path: 'return_bill_history',
        name: 'return_bill_history',
        component: ReturnPurchaseHistory,
        meta: { title: 'return_bill_history', roles: ['admin'] }
      },
      {
        path: 'financial_accounting',
        name: 'financial_accounting',
        component: FirmConfig,
        meta: { title: 'financial_accounting', roles: ['admin'] },
        more: [
          [
            // {
            //   path: 'clearing_bill_doing',
            //   name: 'clearing_bill_doing',
            //   meta: { title: 'clearing_bill_doing', roles: ['admin'] }
            // },
            {
              path: 'clearing_bill_history',
              name: 'clearing_bill_history',
              meta: { title: 'clearing_bill_history', roles: ['admin'] }
            },
            // {
            //   path: 'receipt_settlement_sheet_doing',
            //   name: 'receipt_settlement_sheet_doing',
            //   meta: { title: 'receipt_settlement_sheet_doing', roles: ['admin'] }
            // }
          ]
        ]
      },
      // {
      //   path: 'clearing_bill_doing',
      //   name: 'clearing_bill_doing',
      //   component: PurSettlementSheetAdded,
      //   meta: { title: 'clearing_bill_doing', roles: ['admin'] }
      // },
      {
        path: 'receipt_settlement_sheet_doing',
        name: 'receipt_settlement_sheet_doing',
        component: PurSettlementSheetAddedNew,
        meta: { title: 'receipt_settlement_sheet_doing', roles: ['admin'] }
      },
      {
        path: 'clearing_bill_history',
        name: 'clearing_bill_history',
        component: PurSettlementSheetHistory,
        meta: { title: '入库结算单-历史', roles: ['admin'] }
      },
      // 其它隐藏的路由页面：
      {
        hidden: true,
        path: 'stock_in_bill_draft',
        name: 'stock_in_bill_draft',
        component: PurchaseOrderDraft,
        meta: { title: 'stock_in_bill_draft', roles: ['admin'] }
      },
      {
        hidden: true,
        path: 'stock_in_bill_storage',
        name: 'stock_in_bill_storage',
        component: PurchaseOrder,
        meta: { title: 'stock_in_bill_storage', roles: ['admin'] }
      },
      {
        hidden: true,
        path: 'clearing_bill_doing',
        name: 'clearing_bill_doing',
        component: PurSettlementSheetAdded,
        meta: { title: 'clearing_bill_doing', roles: ['admin'] }
      },
      {
        hidden: true,
        path: 'stock_in_bill_cancel',
        name: 'stock_in_bill_cancel',
        component: PurchaseOrderCancle,
        meta: { title: 'stock_in_bill_cancel', roles: ['admin'] }
      },
      {
        hidden: true,
        path: 'clearing_bill_done',
        name: 'clearing_bill_done',
        component: PurSettlementSheet,
        meta: { title: 'clearing_bill_done', roles: ['admin'] }
      },
      {
        hidden: true,
        path: 'return_bill_done',
        name: 'return_bill_done',
        component: ReturnPurchase,
        meta: { title: 'return_bill_done', roles: ['admin'] }
      },
      {
        hidden: true,
        path: 'return_bill_draft',
        name: 'return_bill_draft',
        component: ReturnPurchaseDraft,
        meta: { title: 'return_bill_draft', roles: ['admin'] }
      },
      {
        hidden: true,
        path: 'return_bill_cancel',
        name: 'return_bill_cancel',
        component: ReturnPurchaseCancle,
        meta: { title: 'return_bill_cancel', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/sale',
    component: Layout,
    redirect: '/sale/index',
    meta: { title: 'sale', icon: 'icon-caigou', roles: ['admin'] },
    children: [
      {
        path: 'index',
        component: Sale,
        name: 'sale',
        meta: { title: 'sale', icon: 'icon-web-icon-', roles: ['admin'] },
        more:[
          [
            {
              path: 'sale_bill_add',
              name: 'sale_bill_add',
              component: SaleOrderAdd,
              meta: { title: 'sale_bill_add', roles: ['admin'] }
            },
            {
              path: 'sale_bill_history',
              name: 'sale_bill_history',
              component: SaleOrderHistory,
              meta: { title: 'sale_bill_history', roles: ['admin'] }
            },


          ]
        ]
      },{
        path: 'sale_bill_add',
        name: 'sale_bill_add',
        component: SaleOrderAdd,
        meta: { title: 'sale_bill_add', roles: ['admin'] }
      }, {
        path: 'sale_bill_history',
        name: 'sale_bill_history',
        component: SaleOrderHistory,
        meta: { title: 'sale_bill_history', roles: ['admin'] }
      },
      {
        path: 'sale_bill_done',
        name: 'sale_bill_done',
        component: SaleOrderdetail,
        meta: { title: 'sale_bill_done', roles: ['admin'] }
      },
      {
        path: 'sale_bill_returns',
        name: 'sale_bill_returns',
        component: SaleOrderReturns,
        meta: { title: 'sale_bill_returns', roles: ['admin']}
      }
    ]
  },
  {
    path: '/inventory',
    component: Layout,
    redirect: 'noredirect',
    meta: { title: 'inventory', icon: 'icon-zhishicangku', roles: ['admin'] },
    children: [
      {
        path: 'bussiness_oper_set',
        name: 'bussiness_oper_set',
        component: OperBussSet,
        meta: { title: 'bussiness_oper_set', roles: ['admin']},
        more: [
          [
            {
              path: 'inventory_check',
              name: 'inventory_check',
              meta: { title: 'inventory_check', roles: ['admin'] }
            },
            {
              path: 'inventory_check_history',
              name: 'inventory_check_history',
              meta: { title: 'inventory_check_history', roles: ['admin'] }
            }
          ],
          [
            {
              path: 'inventory_allocation',
              name: 'inventory_allocation',
              meta: { title: 'inventory_allocation', roles: ['admin'] }
            },
            {
              path: 'inventory_allocation_history',
              name: 'inventory_allocation_history',
              meta: { title: 'inventory_allocation_history', roles: ['admin'] }
            }
          ]
        ]

      },
      {
        path: 'bussiness_report_set',
        name: 'bussiness_report_set',
        component: OperBussSet,
        meta: { title: 'bussiness_report_set', roles: ['admin']},
        more: [
            [{
              path: 'inventory_search',
              name: 'inventory_search',
              meta: { title: 'inventory_search', roles: ['admin'] }
            }],
            [{
              path: 'inventory_in_details',
              name: 'inventory_in_details',
              meta: { title: 'inventory_in_details', roles: ['admin'] }
            }],
            [{
              path: 'inventory_out_details',
              name: 'inventory_out_details',
              meta: { title: 'inventory_out_details', roles: ['admin'] }
            }]
        ]
      },
      {
        path: 'inventory_allocation',
        name: 'inventory_allocation',
        component: inventoryAllocation ,
        meta: { title: 'inventory_allocation', roles: ['admin'] }
      },
      {
        path: 'inventory_allocation_history',
        name: 'inventory_allocation_history',
        component: inventoryAllocationHistory,
        meta: { title: 'inventory_allocation_history', roles: ['admin']}
      },
      {
        path: 'inventory_check',
        name: 'inventory_check',
        component: inventoryCheck,
        meta: { title: 'inventory_check', roles: ['admin']}
      },
      {
        path: 'inventory_check_history',
        name: 'inventory_check_history',
        component: inventoryCheckHistory,
        meta: { title: 'inventory_check_history', roles: ['admin']}
      },
      {
        path: 'inventory_in_details',
        name: 'inventory_in_details',
        component: inventoryInDetails,
        meta: { title: 'inventory_in_details', roles: ['admin']}
      },
      {
        path: 'inventory_out_details',
        name: 'inventory_out_details',
        component: InventoryOutDetails,
        meta: { title: 'inventory_out_details', roles: ['admin']}
      },
      {
        path: 'inventory_search',
        name: 'inventory_search',
        component: inventorySearch,
        meta: { title: 'inventory_search', roles: ['admin']}
      },
      {
        path: 'inventory_buss_oper_set',
        name: 'inventory_buss_oper_set',
        component: OperBussSet,
        meta: { title: 'inventory_buss_oper_set', roles: ['admin']}
      },
      {
        path: 'inventory_buss_reports_set',
        name: 'inventory_buss_reports_set',
        component: BussReports,
        meta: { title: 'inventory_buss_reports_set', roles: ['admin']}
      },
      {
        path: 'inventory_add',
        name: 'inventory_add',
        component: inventoryAdd,
        meta: { title: 'inventory_add', roles: ['admin']}
      },
      {
        path: 'inventory_allocationDraft',
        name: 'inventory_allocationDraft',
        component: inventoryAllocationDraft,
        meta: { title: 'inventory_allocationDraft', roles: ['admin']}
      },
      {
        path: 'inventory_allocationAlready',
        name: 'inventory_allocationAlready',
        component: inventoryAllocationAlready,
        meta: { title: 'inventory_allocationAlready', roles: ['admin']}
      },
      {
        path: 'inventory_allocationReview',
        name: 'inventory_allocationReview',
        component: inventoryAllocationReview,
        meta: { title: 'inventory_allocationReview', roles: ['admin']}
      },
      {
        path: 'inventory_allocationCancel',
        name: 'inventory_allocationCancel',
        component: inventoryAllocationCancel,
        meta: { title: 'inventory_allocationCancel', roles: ['admin']}
      },
      {
        path: 'inventory_checkAlready',
        name: 'inventory_checkAlready',
        component: inventoryCheckAlready,
        meta: { title: 'inventory_checkAlready', roles: ['admin']}
      },
      {
        path: 'inventory_checkDraft',
        name: 'inventory_checkDraft',
        component: inventoryCheckDraft,
        meta: { title: 'inventory_checkDraft', roles: ['admin']}
      },
    ]
    // children: [
    //   {
    //     path: 'index',
    //     component: Inventory,
    //     name: 'inventory',
    //     meta: {
    //       title: 'inventory',
    //       icon: 'icon-zhishicangku',
    //       roles: ['admin']
    //     }
    //   }
    // ]
  },
  {
    path: '/finance',
    component: Layout,
    redirect: 'noredirect',
    meta: {title:'finance', icon: 'icon-caiwu',roles:['admin'] },
    children: [
      {
        path: 'receipt_set',
        name: 'receipt_set',
        component: ReceiptFunction,
        meta: { title: 'receipt_set', roles: ['admin'] },
        more: [
          [
            {
              path: 'receipt_sheet',
              name: 'receipt_sheet',
              meta: { title: 'receipt_sheet', roles: ['admin'] }
            },
            {
              path: 'receipt_history',
              name: 'receipt_history',
              meta: { title: 'receipt_history', roles: ['admin'] }
            }
          ]
        ]
      },
      {
        path: 'payment_set',
        name: 'payment_set',
        component: PaymentFunction,
        meta: { title: 'payment_set', roles: ['admin'] },
        more: [
          [
            {
              path: 'payment_sheet',
              name: 'payment_sheet',
              meta: { title: 'payment_sheet', roles: ['admin'] }
            },
            {
              path: 'payment_history',
              name: 'payment_history',
              meta: { title: 'payment_history', roles: ['admin'] }
            }
          ]
        ]
      },
      {
        path: 'reconciliation_set',
        name: 'reconciliation_set',
        component: ReceiptFunction,
        meta: { title: 'reconciliation_set', roles: ['admin'] },
        more: [
          [
            {
              path: 'payable_adjustment',
              name: 'payable_adjustment',
              meta: { title: 'payable_adjustment', roles: ['admin'] }
            },
            {
              path: 'payable_adjustment_history',
              name: 'payable_adjustment_history',
              meta: { title: 'payable_adjustment_history', roles: ['admin'] }
            }
            ],
          [
            {
              path: 'receivable_adjustment',
              name: 'receivable_adjustment',
              meta: { title: 'receivable_adjustment', roles: ['admin'] }
            },
            {
              path: 'receivable_adjustment_history',
              name: 'receivable_adjustment_history',
              meta: { title: 'receivable_adjustment_history', roles: ['admin'] }
            }
          ]
        ]
      },

      {
        path: 'payment_history',
        component: PaymentHistory,
        name: 'payment_history',
        meta: { title: 'payment_history', roles: ['admin'] }
      },
      {
        path: 'payment_sheet',
        component: PaymentSheet,
        name: 'payment_sheet',
        meta: { title: 'payment_sheet', roles: ['admin'] }
      },
      {
        path: 'payment_sheet_draft',
        component: PaymentSheetDraft,
        name: 'payment_sheet_draft',
        meta: { title: 'payment_sheet_draft', roles: ['admin'] }
      },
      {
        path: 'payment_sheet_already',
        component: PaymentSheetAlready,
        name: 'payment_sheet_already',
        meta: { title: 'payment_sheet_already', roles: ['admin'] }
      },
      {
        path: 'receipt_history',
        component: ReceiptHistory,
        name: 'receipt_history',
        meta: { title: 'receipt_history', roles: ['admin'] }
      },
      {
        path: 'receipt_sheet',
        component: ReceiptSheet,
        name: 'receipt_sheet',
        meta: { title: 'receipt_sheet', roles: ['admin'] }
      },
      {
        path: 'receipt_sheet_draft',
        component: ReceiptSheetDraft,
        name: 'receipt_sheet_draft',
        meta: { title: 'receipt_sheet_draft', roles: ['admin'] }
      },
      {
        path: 'receipt_sheet_already',
        component: ReceiptSheetAlready,
        name: 'receipt_sheet_already',
        meta: { title: 'receipt_sheet_already', roles: ['admin'] }
      },
      {
        path: 'payable_adjustment',
        component: PayableAdjustment,
        name: 'payable_adjustment',
        meta: { title: 'payable_adjustment', roles: ['admin'] }
      },
      {
        path: 'payable_adjustment_history',
        component: PayableAdjustmentHistory,
        name: 'payable_adjustment_history',
        meta: { title: 'payable_adjustment_history', roles: ['admin'] }
      },
      {
        path: 'payable_adjustment_already',
        component: PayableAdjustmentAlready,
        name: 'payable_adjustment_already',
        meta: { title: 'payable_adjustment_already', roles: ['admin'] }
      },
      {
        path: 'receivable_adjustment',
        component: ReceivableAdjustment,
        name: 'receivable_adjustment',
        meta: { title: 'receivable_adjustment', roles: ['admin'] }
      },
      {
        path: 'receivable_adjustment_history',
        component: receivableAdjustmentHistory,
        name: 'receivable_adjustment_history',
        meta: { title: 'receivable_adjustment_history', roles: ['admin'] }
      },
      {
        path: 'receivable_adjustment_already',
        component: receivableAdjustmentAlready,
        name: 'receivable_adjustment_already',
        meta: { title: 'receivable_adjustment_already', roles: ['admin'] }
      },
      {
        hidden: true,
        path: 'payment_funcition',
        component: PaymentFunction,
        name: 'payment_funcition',
        meta: { title: 'payment_funcition', roles: ['admin'] }
      },
      {
        hidden: true,
        path: 'receipt_function',
        component: ReceiptFunction,
        name: 'receipt_function',
        meta: { title: 'receipt_function', roles: ['admin'] }
      },
      {
        path: 'reconciliation_function',
        component: ReceiptFunction,
        name: 'reconciliation_function',
        meta: { title: 'reconciliation_function', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/reports',
    component: Layout,
    redirect: 'noredirect',
    meta: {title:'reports', icon: 'icon-caiwu',roles:['admin'] },
    children: [
      {
        path: 'store_report_set',
        name: 'store_report_set',
        component: StoreReportSet,
        meta: { title: 'store_report_set', roles: ['admin'] },
        more: [
           [
            {
              path: 'store_out_in_details',
              name: 'store_out_in_details',
              meta: { title: 'store_out_in_details', roles: ['admin'] }
            }
            ],
          [
            {
              path: 'store_balance_sheet',
              name: 'store_balance_sheet',
              meta: { title: 'store_balance_sheet', roles: ['admin'] }
            }
          ]
        ]
      },
      {
        path: 'sales_report_set',
        name: 'sales_report_set',
        component: SalesReportSet,
        meta: { title: 'sales_report_set', roles: ['admin'] },
        more: [
          [
            {
              path: 'sales_sheet_statistic',
              name: 'sales_sheet_statistic',
              meta: { title: 'sales_sheet_statistic', roles: ['admin'] }
            }
          ],
          [
            {
              path: 'sales_daymonthyear_statistic',
              name: 'sales_daymonthyear_statistic',
              meta: { title: 'sales_daymonthyear_statistic', roles: ['admin'] }
            }
          ]
        ]
      },
      {
        path: 'fiance_report_set',
        name: 'fiance_report_set',
        component: FinanceReportSet,
        meta: { title: 'fiance_report_set', roles: ['admin'] },
        more: [
          [
            {
              path: 'customer_balance_sheet',
              name: 'customer_balance_sheet',
              meta: { title: 'customer_balance_sheet', roles: ['admin'] }
            }
          ],
          [
            {
              path: 'customer_statement_detail',
              name: 'customer_statement_detail',
              meta: { title: 'customer_statement_detail', roles: ['admin'] }
            }
          ],
          [
            {
              path: 'check_receivable',
              name: 'check_receivable',
              meta: { title: 'check_receivable', roles: ['admin'] }
            }
          ],
          [
            {
              path: 'check_payable',
              name: 'check_payable',
              meta: { title: 'check_payable', roles: ['admin'] }
            }
          ]
        ]
      },
      {
        path: 'customer_balance_sheet',
        component: CustomerBalance,
        name: 'customer_balance_sheet',
        meta: { title: 'customer_balance_sheet', roles: ['admin'] }
      },
      {
        path: 'customer_statement_detail',
        component: CustomerStatementDetail,
        name: 'customer_statement_detail',
        meta: { title: 'customer_statement_detail', roles: ['admin'] }
      },
      {
        path: 'check_payable',
        component: CheckPayable,
        name: 'check_payable',
        meta: { title: 'check_payable', roles: ['admin'] }
      },
      {
        path: 'check_receivable',
        component: CheckReceivable,
        name: 'check_receivable',
        meta: { title: 'check_receivable', roles: ['admin'] }
      },
      {
        path: 'sales_sheet_statistic',
        component: SalesSheetStatistic,
        name: 'sales_sheet_statistic',
        meta: { title: 'sales_sheet_statistic', roles: ['admin'] }
      },
      {
        path: 'sales_daymonthyear_statistic',
        component: SalesDayMonthYearStatistic,
        name: 'sales_daymonthyear_statistic',
        meta: { title: 'sales_daymonthyear_statistic', roles: ['admin'] }
      },
      {
        path: 'store_balance_sheet',
        component: StoreBalanceSheet,
        name: 'store_balance_sheet',
        meta: { title: 'store_balance_sheet', roles: ['admin'] }
      },
      {
        path: 'store_out_in_details',
        component: StoreOutIndetails,
        name: 'store_out_in_details',
        meta: { title: 'store_out_in_details', roles: ['admin'] }
      },
      {
        hidden: true,
        path: 'finance_report',
        component: FinanceReportSet,
        name: 'finance_report',
        meta: { title: 'finance_report', roles: ['admin'] }
      },
      {
        hidden: true,
        path: 'sales_report',
        component: SalesReportSet,
        name: 'sales_report',
        meta: { title: 'sales_report', roles: ['admin'] }
      },
      {
        hidden: true,
        path: 'store_report',
        component: StoreReportSet,
        name: 'store_report',
        meta: { title: 'store_report', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    redirect: '/data/index',
    meta: {title: 'data', icon: 'icon-iconset0342', roles: ['admin'] },
    children: [
      {
        path: 'index',
        name: 'meterial',
        component: Meterial,
        meta: { title: 'meterial', roles: ['admin'] },
        more: [
          [
            {
              path: 'commodity',
              name: 'commodity',
              component: DataCommodity,
              meta: { title: 'commodity', roles: ['admin'] }
            }
          ],
          [
            {
              path: 'client_info',
              name: 'client_info',
              component: DataClientInformation,
              meta: { title: 'client_info', roles: ['admin'] }
            }
          ],
          [
            {
              path: 'supplier',
              name: 'supplier',
              component: DataSupplier,
              meta: { title: 'supplier', roles: ['admin'] }
            }
          ]
        ]
      },
      {
        path: 'commodity',
        name: 'commodity',
        component: DataCommodity,
        meta: { title: 'commodity', roles: ['admin']}
      },
      {
        path: 'client_info',
        name: 'client_info',
        component: DataClientInformation,
        meta: { title: 'client_info', roles: ['admin']}
      },
      {
        path: 'supplier',
        name: 'supplier',
        component: DataSupplier,
        meta: { title: 'supplier', roles: ['admin']}
      },
      {
        path: 'institution_managenment',
        name: 'institution_managenment',
        component: MeterialConfig,
        meta: { title: 'institution_managenment', roles: ['admin']},
        more: [
          [
            {
              path: 'settlement_account',
              name: 'settlement_account',
              component: CorporateInformation,
              meta: { title: 'settlement_account', roles: ['admin'] }
            }
          ],
          [
            {
              path: 'warehouse_info',
              name: 'warehouse_info',
              component: DataWarehouseInformation,
              meta: { title: 'warehouse_info', roles: ['admin'] }
            }
          ]
        ]
      },
      {
        path: 'settlement_account',
        name: 'settlement_account',
        component: CorporateInformation,
        meta: { title: 'settlement_account', roles: ['admin'] }
      },
      {
        path: 'warehouse_info',
        name: 'warehouse_info',
        component: DataWarehouseInformation,
        meta: { title: 'warehouse_info', roles: ['admin'] }
      },
      //其它隐藏的页面
      {
        hidden: true,
        path: 'add_account',
        name: 'add_account',
        component: AccountAdd,
        meta: { title: 'add_account', roles: ['admin'] }
      },
      {
        hidden: true,
        path: 'edit_account',
        name: 'edit_account',
        component: AccountEdit,
        meta: { title: 'edit_account', roles: ['admin'] }
      },
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: 'noredirect',
    meta: { title: 'setting', icon: 'icon-shezhi', roles: ['admin'] },
    children: [
      {
        path: 'account_beginning_set',
        name: 'account_beginning_set',
        component: AccountBeginning,
        meta: { title: 'account_beginning_set', roles: ['admin'] },
        more: [
          [
            {
              path: 'staff_management',
              name: 'staff_management',
              meta: { title: 'staff_management', roles: ['admin'] }
            }
          ],
          [
            {
              path: 'system_param_setting',
              name: 'system_param_setting',
              meta: { title: 'system_param_setting', roles: ['admin'] }
            }
          ]
        ]
      },
      {
        path: 'system_management_set',
        name: 'system_management_set',
        component: SystemManagement,
        meta: { title: 'system_management_set', roles: ['admin'] },
        more: [
          [
            {
              path: 'store_beginning',
              name: 'store_beginning',
              meta: {title: 'store_beginning', roles: ['admin']}
            }
          ],
          [
            {
              path: 'system_rebuilding',
              name: 'system_rebuilding',
              meta: { title: 'system_rebuilding', roles: ['admin'] }
            }
          ]
        ]
      },
      {
        path: 'store_beginning',
        name: 'store_beginning',
        component: StoreBeginning,
        meta: { title: 'store_beginning', roles: ['admin'] }
      },
      {
        path: 'system_rebuilding',
        name: 'system_rebuilding',
        component: SystemRebuilding,
        meta: {title: 'system_rebuilding', roles: ['admin']}
      },
      {
        path: 'staff_management',
        name: 'staff_management',
        component: StaffManagement,
        meta: {title: 'store_beginning', roles: ['admin']}
      },
      {
        path: 'system_param_setting',
        name: 'system_param_setting',
        component: SystemParamSetting,
        meta: {title: 'system_param_setting', roles: ['admin']}
      },
      {
        hidden: true,
        path: 'account_beginning',
        name: 'account_beginning',
        component: AccountBeginning,
        meta: {title: 'account_beginning', roles: ['admin']}
      },
      {
        hidden: true,
        path: 'system_management',
        name: 'system_management',
        component: SystemManagement,
        meta: {title: 'system_management', roles: ['admin']}
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
