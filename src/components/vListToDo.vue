<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks'

const tasksStore = useTasksStore()
</script>

<template>
  <v-list-item
    v-for="item in tasksStore.cacheTasks"
    :key="item.id"
    :value="item"
    color="primary"
    :disabled="item.disabled"
  >
    <template v-slot:prepend v-if="!item.completed">
      <v-icon class="icon" @click="tasksStore.completed(item.id)">check</v-icon>
    </template>

    <v-list-item-title :class="{'completed': item.completed, 'remove': item.remove}"
                       v-text="item.title"></v-list-item-title>
    <template v-slot:append>
      <v-icon class="icon" @click="tasksStore.remove(item.id)">delete</v-icon>
      <v-icon class="icon" @click="tasksStore.edit(item.id)">edit</v-icon>
    </template>
  </v-list-item>
</template>


<style lang="scss" scoped>
$completedColor: #1867C0;

.icon {
  transition: all 1s;

  &:hover {
    color: $completedColor;
    transform: scale(1.2);
  }
}

.remove {
  position: relative;
  animation: 1s remove ease;
}

.completed {
  position: relative;
  animation: 1s show ease-in-out;
  padding: 0 20px;
  color: $completedColor;

  &:before {
    content: '';
    position: absolute;
    border: 1px solid $completedColor;
    top: 50%;
    right: 0;
    left: 0;
    transform: translateY(-50%);
  }
}

@keyframes remove {
  0% {
    left: 0;
    opacity: 1
  }
  100% {
    opacity: 0.5;
    left: 50%;
  }
  75% {
    opacity: 0;
    left: 75%;
  }
  100% {
    opacity: 0;
    left: 100%;
  }
}

@keyframes show {
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
}
</style>
