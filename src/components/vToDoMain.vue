<script setup lang="ts">
import VLoader from '@/components/vLoader.vue'
import VToDoList from '@/components/vToDoList.vue'
import { useTasksStore } from '@/stores/tasks'

const tasksStore = useTasksStore()
</script>
<template>
  <v-main>
    <v-container>
      <v-loader v-if="tasksStore.loading" />
      <VToDoList v-else />
    </v-container>
  </v-main>
</template>

<style scoped>

</style>
