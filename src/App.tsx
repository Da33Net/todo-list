import './App.css'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

function App() {
  return (
    
    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-2xl font-bold p-2 mb-4 bg-orange-500 text-white ">Todo List</h1>
      <TodoInput />
      <TodoList />
    </div>
  )
}

export default App
