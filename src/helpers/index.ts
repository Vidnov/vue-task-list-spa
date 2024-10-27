import type { PostsResponse } from '@/type/PostsResponse'
import type { Task } from '@/type/Task'

export function fetchTasks(): Promise<PostsResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch('/src/data/data.json')
        .then(response => {
          if (!response.ok) {
            reject('Ошибка сети')
            return
          }
          return response.json()
        })
        .then(data => {
          if (!data || !data.posts || data.posts.length === 0) {
            reject('Данных нет')
          } else {
            resolve(data)
          }
        })
        .catch(err => {
          reject(err.message || 'Произошла ошибка при получении данных')
        })
    }, 0)
  })
}

export function changeCompletedStatusCache(array: Task[], id: string): Task[] {
  return array.map(el => {
    const result = el
    if (el.id === id) {
      result.completed = true
    }
    return result
  })
}

export function changeRemoveCacheData(array: Task[], id: string): Task[] {
  return array.filter(el => el.id !== id)
}

export function changeEditCacheData(array: Task[], task: Task): Task[] {
  return array.map(el => {
    let result = el
    if (el.id === task.id) {
      result = task
    }
    return result
  })
}

export function createNewCacheElem(array: Task[], newTask: Task): Task[] {
  array.unshift(newTask)
  return array
}

export async function getHash(obj: object): Promise<string> {
  const jsonString = JSON.stringify(obj)

  const uniqueString = `${jsonString}-${Date.now()}-${Math.random()}`

  const encoder = new TextEncoder()

  const data = encoder.encode(uniqueString)

  const hashBuffer = await crypto.subtle.digest('SHA-256', data)

  const hashArray = Array.from(new Uint8Array(hashBuffer))

  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export function cacheData(array: Task[]): void {
  localStorage.setItem('posts', JSON.stringify(array))
}

export function getCacheData(): Task[] {
  const data: string | null = localStorage.getItem('posts')
  if (data) {
    return JSON.parse(data)
  } else {
    return []
  }
}
