<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks'
import { onMounted, ref, watch } from 'vue'
import eventBus from '@/helpers/bus'

const tasksStore = useTasksStore()
const isShowInput = ref<boolean>(false)
const searchString = ref<string>('')

watch(searchString, (value) => {
  tasksStore.searchByTitle(value)
})


const showInput = () => {
  isShowInput.value = !isShowInput.value
}
const showCreateNewTaskBlock = () => {
 eventBus.emit('showCreateNewTaskBlock')
}
</script>

<template>
  <v-app-bar color="primary">
    <v-toolbar-title>
      <v-badge :content="tasksStore.tasks.length">ToDo List</v-badge>
    </v-toolbar-title>
    <v-text-field v-show="isShowInput" label="Название таски" variant="underlined"
                  v-model="searchString"></v-text-field>
    <v-btn icon="comment" @click="showCreateNewTaskBlock()"></v-btn>
    <v-btn icon="search" @click="showInput()"></v-btn>
  </v-app-bar>
</template>

<style scoped>

</style>
