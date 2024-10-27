<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import eventBus from '@/helpers/bus'
import VCreateNewTaskBlock from '@/components/vCreateNewTaskBlock.vue'
import VCardToDo from '@/components/vCardToDo.vue'

const tasksStore = useTasksStore()
const isShowCreateNewTaskBlock = ref<boolean>(false)

const showCreateNewTaskBlock = () => {
  isShowCreateNewTaskBlock.value = !isShowCreateNewTaskBlock.value
}
const scrollHandler = () => {
  const obj: any = document.querySelector('#end-list')
  const { top } = obj.getBoundingClientRect()
  const height = document.documentElement.clientHeight
  if (top <= height) {
    if (tasksStore.loading) {
      return
    }
    tasksStore.addTasksOnView()
  }
}

onMounted(() => {
  window.scrollTo(0, 0)
  window.addEventListener('scroll', scrollHandler)
  eventBus.on('showCreateNewTaskBlock', showCreateNewTaskBlock)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollHandler)
  eventBus.off('showCreateNewTaskBlock', showCreateNewTaskBlock)
})

</script>

<template>
  <v-container>
    <v-create-new-task-block v-if="isShowCreateNewTaskBlock" />
    <v-card-to-do />
  </v-container>
</template>

<style>

</style>
