<template>
  <div class="app-container">
    <page-header :refresh="refresh" :print="print" :orderNumber="orderNumber"></page-header>
    <search-box :searchOption="searchOption" :comChange="searchOnChange"></search-box>
    <!-- :query="query" -->
    <input-table :trConfig="trConfig" :data="tableData"></input-table>
    <put-footer :submit="submit" :draft="draft"></put-footer>
  </div>
</template>

<script>
  import PageHeader from '@C/BDD_PageHeader'
  import SearchBox from '@C/BDD_SearchBox'
  import PutFooter from '@C/BDD_PutFooter'
  import InputTable from '@C/BDD_InputTable'

  export default {
    name: 'purchase',
    components: { PageHeader, SearchBox, PutFooter, InputTable },
    data () {
      return {
        orderNumber: "caigoujiesuandan-20180514",
        tableData: [],
        searchOption: [
          {
            key: 'customer'
          },
          {
            key: 'store'
          },
          {
            key: 'user'
          },
          {
            type: 'date',
            title: '单据日期',
            key: 'tme'
          }
        ],
        trConfig: [
          {
            label: '编号',
            props: 'goodsNo',
            select_data: [{ name: '1' }],
            select_value_key: 'name',
            select_change: (data) => {
              console.log(data)
            },

          },
          {
            label: '品名',
            input: true,
            props: 'goodsName'
          },
          {
            label: '颜色',
            props: 'goodsColor',
            select_data: [{ asd: '6666' }],
            select_value_key: 'asd',
            select_change: (data) => {
              console.log(data)
            },
          },
          {
            label: '批号',
            props: 'batchNo'
          },
          {
            label: '条数',
            props: 'itemCount'
          },
          {
            label: '入库数量',
            props: 'orderQuantity'
          },
          {
            label: '单位',
            props: 'goodsUnit'
          },
          {
            label: '结算数量',
            props: 'settleQuantity'
          },
          {
            label: '结算单位',
            props: 'settlePrice'
          },
          {
            label: '结算金额',
            props: 'settleTotalMoney'
          },
          {
            label: '备注',
            props: 'remark'
          },

        ]
      }
    },
    created (){

    },
    mounted () {
    },
    computed: {

    },
    methods: {
      refresh () {
        console.log('刷新')
      },
      print () {
        console.log('打印')
      },
      searchOnChange (key, data) {
        console.log(this[key])
        console.log(key, data)
      },
      query () {

      },
      submit () {

      },
      draft () {

      }
    }
  }


</script>


<style type="text/scss" scoped lang="scss">
.input-table {
  height: calc(100% - 240px);
}
</style>
