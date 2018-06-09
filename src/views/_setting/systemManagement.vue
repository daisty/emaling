<template>
  <div class="app-container">
    <h1>
      {{ pageName }}
    </h1>
  </div>
</template>

<script>
  export default{
    name: 'systemManagement',
    data() {
        return{
            pageName: '系统管理'
        }
    }
  }
</script>
