import { useState } from 'react'
import type {  TodoState } from '../store/ToDoStore'
import { useTodoStore } from '../store/ToDoStore'

export default function TodoInput() {
  const [text, setText] = useState('')
  const addTodo = useTodoStore((s: TodoState) => s.addTodo)

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault()
    const v = text.trim()
    if (!v) return
    addTodo(v)
    setText('')
  }

  return (
    <form onSubmit={submit} className="mb-4">
      <div className="flex gap-2">
        <input
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Добавить задачу"
        />
        <button className="btn btn-primary" type="submit">
          Добавить
        </button>
      </div>
    </form>
  )
}
