<script setup lang="ts">
import { computed } from 'vue'
import { useTasksStore } from '@/stores/tasks'

const tasksStore = useTasksStore()

const textButton = computed(() => {
  return tasksStore.statusChange ? 'Сохранить изменения' : 'Создать Задачу'
})
</script>

<template>
  <v-sheet class="mx-auto">
    <v-form validate-on="submit lazy" @submit.prevent="tasksStore.actionTask">
      <v-text-field
        v-model="tasksStore.task.title"
        label="Введите задачу"
      ></v-text-field>

      <v-btn
        class="mt-2"
        type="submit"
        block
        @click=""
      >
        {{ textButton }}
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<style scoped>

</style>
