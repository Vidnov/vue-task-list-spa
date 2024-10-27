<script setup lang="ts">
import VHeader from '@/components/vHeader.vue'
import VToDoMain from '@/components/vToDoMain.vue'

import { useTasksStore } from '@/stores/tasks'

const tasksStore = useTasksStore()
import { onMounted } from 'vue'

onMounted(async () => {
  await tasksStore.getTasks()
})
</script>

<template>
  <v-app>
    <v-header />
    <v-to-do-main />
  </v-app>
</template>

<style scoped>

</style>
