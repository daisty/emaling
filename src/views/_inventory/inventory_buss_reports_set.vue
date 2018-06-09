<template>
  <div class="app-container">
    <p class="prompt-info radius5">
      <span>
        点击卡片
        <svg class="icon" aria-hidden="true">
           <use xlink:href="#icon-star_full"></use>
        </svg>
        即可将其加入常用菜单
      </span>
    </p>
    <div>
      <div class="purchase-buss-oper-tile">
        <p>业务操作</p>
      </div>
    </div>
    <div class="purchase-buss-oper-menu">
      <div class="purchase-buss-oper-stock" @click="newPurchase">
        <div class="purchase-buss-oper-stock-button">
          <p>采购入库单</p>
        </div>
      </div>
      <div class="purchase-buss-oper-stock" @click="newPurchase">
        <div class="purchase-buss-oper-stock-button">
          <p>采购退货单</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'inventoryBussReportSet',
    methods: {
      newPurchase() {
        sessionStorage.clear()
        console.log(sessionStorage)
        this.$router.push("stock_in_bill_add");
      }
    }
  };
</script>
<style type="text/css">
  .prompt-info {
    font-size: 12px;
    height: 24px;
    background-color: #f5f5f5;
    padding: 6px 6px;
  }

  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .purchase-buss-oper-tile {
    margin-top: 16px;
    font-size: 21px;
    color: #cc9a9a;
  }

  .purchase-buss-oper-menu {
    width: 800px;
    height: 100px;
    padding: 6px;
  }

  .purchase-buss-oper-stock {
    width: 250px;
    height: 100px;
    margin: 20px;
  }

  .purchase-buss-oper-stock-button {
    width: 210px;
    height: 70px;
    border-style: solid;
    border-width: 1px;
    border-color: #5a5e66;
    margin: 12px 30px 0px 12px;
    padding-top: 7px;
    padding-bottom: 7px;
    padding-left: 12px;
  }
</style>
