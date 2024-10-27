// eventBus.ts
type EventCallback<T> = (data: T) => void;

interface EventBus {
  on<T>(event: string, callback: EventCallback<T>): void;

  off<T>(event: string, callback: EventCallback<T>): void;

  emit<T>(event: string, data: T): void;
}

class SimpleEventBus implements EventBus {
  private events: { [key: string]: EventCallback<any>[] } = {}

  on<T>(event: string, callback: EventCallback<T>): void {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }

  off<T>(event: string, callback: EventCallback<T>): void {
    if (!this.events[event]) return

    this.events[event] = this.events[event].filter(cb => cb !== callback)
  }

  emit<T>(event: string, data?: T): void {
    if (!this.events[event]) return

    this.events[event].forEach(callback => {
      callback(data)
    })
  }
}

const eventBus = new SimpleEventBus()
export default eventBus
