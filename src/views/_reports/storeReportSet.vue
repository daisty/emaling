<template>
  <div class="app-container">
    <meterial-reports></meterial-reports>
  </div>
</template>

<script>
import MeterialReports from '@/views/_reports/index'
  export default {
    components: {
      MeterialReports
    },
    data() {
      return{
        pageName: "库存报表"
      }
    }
  }
</script>
