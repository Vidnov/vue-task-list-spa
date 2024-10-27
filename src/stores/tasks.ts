import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/type/Task'
import type { Post, PostsResponse } from '@/type/PostsResponse'
import type { Steps } from '@/type/Steps'
import {
  fetchTasks,
  changeCompletedStatusCache,
  changeRemoveCacheData,
  changeEditCacheData,
  createNewCacheElem,
  getHash,
  cacheData,
  getCacheData
} from '@/helpers'


export const useTasksStore = defineStore('tasks', () => {
  let tasks = ref<Task[]>([])
  let tasksSearch = ref<Task[]>([])
  let task = ref<Task>({
    id: '',
    title: '',
    completed: false,
    remove: false,
    disabled: false
  })
  const cacheTasks = computed<Task[]>(() => {
    if (tasksSearch.value.length) {
      return tasksSearch.value
    }
    return tasks.value
  })
  const loading = ref<boolean>(false)
  const isGetAllTasks = ref<boolean>(false)
  const error = ref<string | null>(null)
  const statusChange = ref<boolean>(false)
  const steps = reactive<Steps>({
    start: 0,
    finish: 30
  })


  let cache = ref<Task[]>([])
  const searchByTitle = (searchString: string) => {
    if (searchString === '') {
      tasksSearch.value = []
      return
    }
    tasksSearch.value = tasks.value.filter(item =>
      item.title && item.title.toLowerCase().includes(searchString.toLowerCase())
    )
  }
  const getTasks = async () => {
    try {
      loading.value = true
      cache.value = getCacheData()
      if (cache.value) {
        tasks.value = cache.value.slice(steps.start, steps.finish)
        changeSteps()
      } else {
        const response: PostsResponse = await fetchTasks() // Получаем один объект
        if (response.posts) {
          const dataPosts = response.posts.map((post: Post) => {
            let result: Task = {
              id: post.id,
              title: post.name,
              completed: false,
              remove: false,
              disabled: false
            }
            return result
          })
          cache.value = dataPosts
          cacheData(dataPosts)
          tasks.value = dataPosts.slice(steps.start, steps.finish)
          changeSteps()
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        error.value = e.message
      } else {
        error.value = String(e)
      }
    } finally {
      loading.value = false
    }
  }
  const completed = (id: string) => {
    tasks.value = tasks.value.map(el => {
      const result = el
      if (el.id === id) {
        result.completed = true
      }
      return result
    })

    const completedCacheData = changeCompletedStatusCache(cache.value, id)
    cacheData(completedCacheData)
  }
  const removeElement = (id: string) => {
    if (tasksSearch.value.length) {
      tasksSearch.value = tasksSearch.value.filter(el => el.id !== id)
    }
    tasks.value = tasks.value.filter(el => el.id !== id)
  }
  const remove = (id: string) => {
    if (tasksSearch.value.length) {
      tasksSearch.value = tasksSearch.value.map(el => {
        const result = el
        if (el.id === id) {
          result.completed = false
          result.disabled = true
          result.remove = true
        }
        return result
      })
    }
    tasks.value = tasks.value.map(el => {
      const result = el
      if (el.id === id) {
        result.completed = false
        result.disabled = true
        result.remove = true
      }
      return result
    })
    cache.value = changeRemoveCacheData(cache.value, id)
    cacheData(cache.value)
    setTimeout(() => {
      removeElement(id)
    }, 500)
  }
  const edit = (id: string) => {
    const editTask = tasks.value.find(el => el.id === id)
    if (editTask) {
      task.value = Object.assign({}, editTask)
      statusChange.value = true
    }
  }
  const actionTask = async () => {
    try {
      if (task.value.title === '') {
        return
      }
      if (statusChange.value) {
        changeTask()
      } else {
        await createNewTask()
      }
    } catch (e) {
      console.error(e)
    }
  }
  const changeTask = () => {
    if (tasksSearch.value.length) {
      tasksSearch.value = tasksSearch.value.map(el => {
        let result = el
        if (el.id === task.value.id) {
          result = Object.assign({}, task.value)
        }
        return result
      })
    }
    tasks.value = tasks.value.map(el => {
      let result = el
      if (el.id === task.value.id) {
        result = Object.assign({}, task.value)
      }
      return result
    })
    statusChange.value = false
    cache.value = changeEditCacheData(cache.value, task.value)
    cacheData(cache.value)
    task.value.title = ''
  }
  const createNewTask = async () => {
    try {
      const obj = {
        title: task.value.title,
        completed: false,
        remove: false,
        disabled: false
      }
      const taskId = await getHash(obj)
      const newTask = { ...obj, id: taskId }
      tasks.value.unshift(newTask)
      const newCacheData = createNewCacheElem(cache.value, newTask)
      cacheData(newCacheData)
    } catch (e) {
      console.error(e)
    } finally {
      task.value.title = ''
    }
  }
  const addTasksOnView = () => {
    if (checkCacheTasks()) {
      return
    }
    loading.value = true
    const data = cache.value.slice(steps.start, steps.finish)
    if (!data.length) {
      isGetAllTasks.value = true
    }
    changeSteps()
    tasks.value.push(...data)
    loading.value = false
  }
  const checkCacheTasks = () => {
    return isGetAllTasks.value
  }
  const changeSteps = () => {
    steps.start = steps.finish
    steps.finish = steps.finish + 30
  }

  return {
    steps,
    cacheTasks,
    tasks,
    task,
    statusChange,
    loading,
    error,
    tasksSearch,
    getTasks,
    createNewTask,
    changeTask,
    actionTask,
    edit,
    remove,
    completed,
    addTasksOnView,
    searchByTitle
  }
})
