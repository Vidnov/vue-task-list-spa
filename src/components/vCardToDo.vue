<script setup lang="ts">

import VListToDo from '@/components/vListToDo.vue'
</script>

<template>
  <v-col>
    <v-card
      class="mx-auto"
    >
      <v-list density="compact" md="8">
        <v-list-subheader>TASKS</v-list-subheader>
        <v-list-to-do />
      </v-list>
      <div id="end-list"></div>
    </v-card>
  </v-col>
</template>

<style scoped>

</style>
