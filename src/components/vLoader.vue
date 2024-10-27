<script setup lang="ts">
</script>

<template>
  <div class="loader-position">
    <v-progress-circular
      color="primary"
      indeterminate
      :size="101"
      :width="9"
    ></v-progress-circular>
  </div>
</template>

<style scoped>
.loader-position {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh
}
</style>
