import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StateCreator } from 'zustand'

export type Todo = {
  id: string
  text: string
  done: boolean
  createdAt: number
}

export type TodoState = {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  removeTodo: (id: string) => void
  editTodo: (id: string, text: string) => void
  clearCompleted: () => void
}

const makeId = () => Math.random().toString(36).slice(2, 8)

const initializer: StateCreator<TodoState> = (set, get) => ({
  todos: [],
  addTodo: (text: string) => {
    const t: Todo = { id: makeId(), text, done: false, createdAt: Date.now() }
    set({ todos: [t, ...get().todos] })
  },
  removeTodo: (id: string) => {
    set({ todos: get().todos.filter((td) => td.id !== id) })
  },
  editTodo: (id: string, text: string) => {
    set({ todos: get().todos.map((td) => (td.id === id ? { ...td, text } : td)) })
  },
  toggleTodo: (id: string) => {
    set({ todos: get().todos.map((td) => (td.id === id ? { ...td, done: !td.done } : td)) })
  },
  clearCompleted: () => {
    set({ todos: get().todos.filter((td) => !td.done) })
  },
})

export const useTodoStore = create<TodoState>()(
  persist(initializer, {
    name: 'todo-storage',
    partialize: (state) => ({ todos: state.todos }),
  })
)
