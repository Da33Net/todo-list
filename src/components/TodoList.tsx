import TodoItem from './TodoItem'
import type { TodoState } from '../store/ToDoStore'
import { useTodoStore } from '../store/ToDoStore'

export default function TodoList() {
  const todos = useTodoStore((s: TodoState) => s.todos)
  const clearCompleted = useTodoStore((s: TodoState) => s.clearCompleted)

  return (
    <div>
      <ul>
        {todos.map((t) => (
          <TodoItem key={t.id} todo={t} />
        ))}
      </ul>
      <div className="mt-3">
        <button onClick={clearCompleted} className="btn btn-secondary">
          Удалить выполненные
        </button>
      </div>
    </div>
  )
}
