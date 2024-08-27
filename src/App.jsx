import { useEffect, useState } from "react"

function App() {

  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const [doer, setDoer] = useState('')
  const [name, setName] = useState('')
  const [idTodo, setIdTodo] = useState('')




  const handleGetTodos = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('https://66cdd9708ca9aa6c8ccbe2cc.mockapi.io/todos')
      const jsonReponse = await response.json()
      console.log(jsonReponse)
      setTodos(jsonReponse)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  // goi handleGetTodos de lay danh sach sau khi components render
  useEffect(() => {
    handleGetTodos()
  }, [])
  const handleGetTodo = async (id) => {
    try {
      setIsLoading(true)
      const response = await fetch(`https://66cdd9708ca9aa6c8ccbe2cc.mockapi.io/todos/${id}`)
      const jsonReponse = await response.json()
      console.log(jsonReponse)
      setTodos(jsonReponse)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handlePostTodo = async () => {
    // console.log(doer)
    // console.log(idTodo)
    // console.log(name)
    try {
      setIsLoading(true)
      // 
      // {
      //   "name": "name 2",
      //   "isCompleted": false,
      //   "doer": "doer 2",
      //   "id": "2"
      // },
      const response = await fetch('https://66cdd9708ca9aa6c8ccbe2cc.mockapi.io/todos', {
        method: 'POST',
        body:{
          isCompleted:false,
          id:idTodo,
          name:name,
          doer:doer
        }
      })

      //
      const jsonReponse = await response.json()
      console.log(jsonReponse)
      handleGetTodos()
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }
  const handlePutTodo = async () => {  }

  const handleDeleteTodo = async () => {  }
  return (
    <div>
      <div>error: {error}</div>
      <div>isLoading: {isLoading.toString()}</div>
      <div>List todo:</div>
      <button onClick={handleGetTodos}>Refresh</button>

      {/* My list todo */}
      <div>{

        isLoading ? <p>Loading...</p> :
          todos.map(todo => <div
            key={todo.id}
            style={{
              display: 'flex'
            }}
          >
            <p>id:{todo.id}</p>
            <p>name:{todo.name}</p>
            <p>doer:{todo.doer}</p>

          </div>)
      }</div>

      {/* FORM CREATE TODO */}
      <hr />
      <div>
        <input placeholder="Nhap id" value={idTodo} onChange={e => setIdTodo(e.target.value)} />
        <input placeholder="Nhap name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Nhap doer" value={doer} onChange={e => setDoer(e.target.value)} />

        <button onClick={handlePostTodo}>Xac nhan tao</button>
      </div>
    </div>
  )
}

export default App
