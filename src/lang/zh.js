export default {
  route: {
    // 自定义的菜单：
    purchase: '采购',
    sem_set: '实操作业',
    financial_accounting: '财务记账',
    stock_in_bill: '采购入库单',
    clearing_bill: '入库结算单',
    return_bill: '采购退货单',
    stock_in_bill_history: '历史',
    stock_in_bill_history_tag: '采购入库单历史',
    return_bill_history: '历史',
    return_bill_history_tag: '采购退货单历史',
    clearing_bill_history: '入库结算单-历史',
    clearing_bill_history_tag: '入库结算单历史',
    sale_bill_history: '历史',
    sale_bill_history_tag: '销售单历史',

    stock_in_bill_add: '采购入库单',
    stock_in_bill_draft: '采购入库单-草稿',
    stock_in_bill_storage: '采购入库单-已入库',
    stock_in_bill_cancel: '采购入库单-作废',

    clearing_bill_doing: '入库结算单',
    clearing_bill_done: '历史',
    clearing_bill_done: '入库结算单历史',

    return_bill_add: '采购退货单',
    return_bill_done: '采购退货单-已退货',
    return_bill_draft: '采购退货单-草稿',
    return_bill_cancel: '采购退货单-已作废',

    sale_bill_add: '销售开单',
    sale_bill_draft: '销售开单-草稿',
    sale_bill_done: '销售开单-详情',
    sale_bill_returns: '销售退货单-历史',

    sale: '销售',
    inventory: '库存',
    bussiness_oper_set: '实操作业',
    bussiness_report_set: '库存报表',
    inventory_check: '库存盘点',
    inventory_check_history: '历史',
    inventory_check_history_tag: '库存盘点历史',
    inventory_allocation: '库存调拨',
    inventory_allocation_history: '历史',
    inventory_allocation_history_tag: '库存调拨历史',
    inventory_search: '库存查询',
    inventory_in_details: '入库明细',
    inventory_out_details: '出库明细',

    finance: '资金',
    payment_set: '付款',
    payment_sheet: '付款单',
    payment_sheet_draft:'付款单-草稿',
    payment_sheet_already:'付款单-已记账',
    payment_history: '历史',
    payment_history_tag: '付款单历史',
    receipt_set: '收款',
    receipt_sheet: '收款单',
    receipt_sheet_draft:'收款单-草稿',
    receipt_sheet_already:'收款单-已记账',
    receipt_history: '历史',
    receipt_history_tag: '收款单历史',
    reconciliation_set: '调账',
    payable_adjustment: '应付调账',
    receivable_adjustment: '应收调账',
    payable_adjustment_history: '历史',
    payable_adjustment_history_tag: '应付调账历史',
    receivable_adjustment_history: '历史',
    receivable_adjustment_history_tag: '应收调账历史',
    payable_adjustment_already: '应付调账-已记账',
    receivable_adjustment_already: '应收调账-已记账',

    reports: '报表',
    store_report_set: '库存报表',
    store_out_in_details: '出入库明细',
    store_balance_sheet: '库存结存表',
    sales_report_set: '销售报表',
    sales_sheet_statistic: '销售单据统计',
    fiance_report_set: '资金报表',
    sales_daymonthyear_statistic: '销售日月年报表',
    customer_balance_sheet: '客户结欠表',
    customer_statement_detail: '客户对账单-明细',
    check_payable: '查应付',
    check_receivable: '查应收',

    data: '资料',
    meterial: '常用资料',
    institution_managenment: '机构管理',
    settlement_account: '结算账户',
    warehouse_info: '仓库信息',
    commodity: '商品',
    'commodity_add': '添加',
    'client_add': '添加',
    'supplier_add': '添加',
    client_info: '客户信息',
    supplier: '供应商',

    setting: '设置',
    system_management_set: '系统管理',
    account_beginning_set: '期初开账',
    store_beginning: '库存期初',
    system_rebuilding: '系统重建',
    staff_management: '职员管理',
    system_param_setting: '系统参数',

    // vue-element-admin自带的菜单
    dashboard: '首页',
    introduction: '简述',
    documentation: '文档',
    permission: '权限测试页',
    icons: '图标',
    components: '组件',
    componentIndex: '介绍',
    tinymce: '富文本编辑器',
    markdown: 'Markdown',
    jsonEditor: 'JSON编辑器',
    dndList: '列表拖拽',
    splitPane: 'Splitpane',
    avatarUpload: '头像上传',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: '小组件',
    backToTop: '返回顶部',
    charts: '图表',
    keyboardChart: '键盘图表',
    lineChart: '折线图',
    mixChart: '混合图表',
    example: '综合实例',
    Table: 'Table',
    dynamicTable: '动态Table',
    dragTable: '拖拽Table',
    inlineEditTable: 'Table内编辑',
    complexTable: '综合Table',
    treeTable: '树形表格',
    customTreeTable: '自定义树表',
    tab: 'Tab',
    form: '表单',
    createForm: '创建表单',
    editForm: '编辑表单',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    exportZip: 'Export Zip',
    theme: '换肤',
    clipboardDemo: 'Clipboard',
    i18n: '国际化'
  },
  navbar: {
    logOut: '退出登录',
    dashboard: '首页',
    github: '项目地址',
    screenfull: '全屏',
    theme: '换肤'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    roles: '你的权限',
    switchRoles: '切换权限'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  }
}
