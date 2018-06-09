/**
 * 分页查询时，后台返回的数据中分页参数的命名，返回示例：
 *
 * {
 *
 * "msg":"ok",
 * "code":1,
 * "succ":true,
 * "oper":"default",
 * "page":{
 *          "current":1,
 *          "pages":2,
 *          "records":[],
 *          "size":3,
 *          "total":5
 *        }
 * }
 * */
export const pageParamNames = ['current', 'pages', 'size', 'total']

/**
 * 下拉选择框数据：单据状态
 */
export const billStatusOptions = [
  // “全部”不用作为一个option，清空下拉选择框，没有值就代表要查全部。后台没有收到该项查询参数，就不用拼接查询条件。
  // 如果前台传一个特殊值给后台来代表“全部”，后台还要判断这个特殊值，麻烦。
  // {value: 111,label: '全部'},
  { value: '', label: '全部' },
  { value: -10, label: '已作废' },
  { value: -20, label: '草稿' },
  { value: 30, label: '已入库' }
]

/**
 * 用于把状态翻译成中文的Map：单据状态
 * @type {Map<any, any>}
 */
export const billStatusMap = new Map([
  [-10, '已作废'],
  [-20, '草稿'],
  [30, '已入库']
])

/**
 * 下拉选择框数据：记账状态
 */
export const accountStatusOptions = [
  { value: '', label: '全部' },
  { value: 10, label: '已记账' },
  { value: 20, label: '未记账' }
]

/**
 * 用于把状态翻译成中文的Map：单据状态
 * @type {Map<any, any>}
 */
export const accountStatusMap = new Map([[20, '未记账'], [10, '已记账']])

export const inStoreColSet = [
  { lable: '序号', props: 'index', type: 1 },
  { lable: '操作', props: 'oper', type: 2 },
  { lable: '编号', props: 'goodsNo', type: 3 },
  { lable: '品名', props: 'goodsName', type: 3 },
  { lable: '颜色', props: 'goodsColor', type: 4 },
  { lable: '批号', props: 'bacthNo', type: 4 },
  { lable: '条数', props: 'itemCount', type: 4 },
  { lable: '入库数量', props: 'orderQuantity', type: 4 },
  { lable: '单位', props: 'goodsUnit', type: 4 },
  { lable: '备注', props: 'remark', type: 4 }
]

// 图标icon
export const iconArr = [
  'icon-shouye',
  'icon-caigou',
  'icon-web-icon-',
  'icon-zhishicangku',
  'icon-caiwu',
  'icon-iconset0342',
  'icon-shezhi'
]

export const saleStatusOptions = [
  { value: '', label: '全部'},
  { value: '-10', label: '已作废'},
  { value: '-20', label: '草稿'},
  { value: '30', label: '已记账'},
]

export const saleStatusMap = new Map([
  [-10, '已作废'],
  [-20, '草稿'],
  [30, '已记账']
])

// 结算账号属性
export const materialValueOptions =[
  {
    value: '1', label: '公司'
  },
  {
    value: '2', label: '私人'
  }
]
export const meterialValueMap = new Map([[1, '公司'], [2, '私人']])

//账户资料状态
export const bankAccountStatusOptions = [
  {
    value: '1', label: '启用'
  },
  {
    value: '2', label: '停用'
  }
]

//盘点单类型
export const inventoryCheckMap = [
  { value: -10, label: '盘亏' },
  { value: -20, label: '盘盈' }
]
export const bankAccountStatusMap = new Map([[2, '启用'], [1, '停用']])


/**
 * 下拉选择框数据：库存调拨的单据状态
 */
export const stockStatusOptions = [
  { value: '', label: '全部' },
  { value: -10, label: '已作废' },
  { value: 10, label: '待审核' },
  { value: 20, label: '草稿' },
  { value: 30, label: '已完成' }
]

/**
 * 用于把状态翻译成中文的Map：单据状态
 * @type {Map<any, any>}
 */
export const stockStatusMap = new Map([
  [-10, '已作废'],
  [10, '待审核'],
  [20, '草稿'],
  [30, '已完成']
])