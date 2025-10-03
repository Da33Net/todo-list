import { useState } from 'react'
import type { Todo, TodoState } from '../store/ToDoStore'
import { useTodoStore } from '../store/ToDoStore'

export default function TodoItem({ todo }: { todo: Todo }) {
  // typed selectors — avoids implicit 'any' when noImplicitAny is enabled
  const toggle = useTodoStore((s: TodoState) => s.toggleTodo)
  const remove = useTodoStore((s: TodoState) => s.removeTodo)
  const edit = useTodoStore((s: TodoState) => s.editTodo)
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(todo.text)

  const save = () => {
    const v = text.trim()
    if (!v) return
    edit(todo.id, v)
    setEditing(false)
  }

  return (
    <li className="card ">
      <input type="checkbox"    className="form-checkbox h-5 w-5 "
 checked={todo.done} onChange={() => toggle(todo.id)} />
      {editing ? (
        <div className="flex gap-2 flex-1">
          <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 px-2 py-1 border rounded" />
          <button onClick={save} className="btn btn-success">
            Сохранить
          </button>
        </div>
      ) : (
        <>
          <span className={`flex-1 ${todo.done ? 'todo-done' : ''}`}>{todo.text}</span>
          <div className="flex gap-2">
            <button onClick={() => setEditing(true)} className="btn btn-warn">
              Ред.
            </button>
            <button onClick={() => remove(todo.id)} className="btn btn-danger">
              Удалить
            </button>
          </div>
        </>
      )}
    </li>
  )
}
