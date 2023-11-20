<template>
  <hotel class="hotels"></hotel>
</template>

<script>
import Hotel from './Hotel'
export default {
  name: 'Appindex',
  components: {Hotel}
}
</script>

<style scoped>
.hotels {
  width: 1200px;
  margin-left: 35px;
}
</style>
