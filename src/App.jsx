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
      // fetch built-in fucntion


      const response =   // <-requqest
        await fetch('https://66cdd9708ca9aa6c8ccbe2cc.mockapi.io/todos', {
          method: 'GET'
        }) // return response

      // khong phai ep thanh json
      const jsonReponse = await response.json()
      console.log(jsonReponse)
      setTodos(jsonReponse)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }
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
      console.log(idTodo)
      console.log(name)
      console.log(doer)

      // axios

      // req (body: Object) -> json.striyfy(body) (chuoi hoa) -> network
      // res (object<-string(json)) <- network(json)
      const response = await fetch('https://66cdd9708ca9aa6c8ccbe2cc.mockapi.io/todos', {
        method: 'POST',
        body: JSON.stringify({
          isCompleted: false,
          id: idTodo,
          name: name,
          doer: doer
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTlkNWVlZWE0NzM2MjFiY2YxMWQ4ZWUzMjBhZjU4ZSIsIm5iZiI6MTcyNTI3Mzc1NS42NDI4MjIsInN1YiI6IjY2ZDU5NTlhMTlhM2FhMzQ1OGIxYjExMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-hVZmxPrFtQK2zY09UxZ9mcpSu_xdsc8jmjl7eosA7A"
        }
      })
      // object
      console.log(response)
      //
      // mat khau, tai khoan
      // .json()
      // object cua cai todo moi
      // .json .parse
      const jsonReponse = await response.json()
      console.log(jsonReponse)
      handleGetTodos()
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }
  //json, text, xml,
  const handlePutTodo = async (todo) => {
    const response = 
    await fetch(`https://66cdd9708ca9aa6c8ccbe2cc.mockapi.io/todos/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...todo,
        name: 'moi sua'
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  // arrow function = function 
  // () tham so truyen vao - parameters
  // {}
  // const id = todo.id
  const handleDeleteTodo = async (id) => {
    // Xoa
    const response = await fetch(`https://66cdd9708ca9aa6c8ccbe2cc.mockapi.io/todos/${id}`, {
      method: 'DELETE'
    })
  }
  const [clothes, setClothes] = useState([])
  const [query, setQuery] = useState({
    page: 1, // trang hien tai
    pageSize: 10, // so todo trong 1 trang
  })
  const listClothes = async () => {

    // limit, size, pageSize -> pageSize: 10 

    // offset: (page-1) * pageSize
    const offset = (query.page - 1) * query.pageSize

    const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${query.pageSize}`)
    // offset 0: 0-9 (page 1)
    // offset 10: 10-19 (page 2)
    // offset 20: 
    // page 1: offset 0-9
    // page 2: offset 10-19
    // page 3: offset 20
    const jsonResponse = await response.json()
    console.log(jsonResponse)
    setClothes(jsonResponse)
  }
  // goi handleGetTodos de lay danh sach sau khi components render
  useEffect(() => {
    listClothes()
  }, [query])
  useEffect(() => {
    handleGetTodos()
    listClothes()
  }, [])

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
            <button onClick={() => handlePutTodo(todo)}>Sua</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Xoa</button>

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
    // <div>
    //   {
    //     clothes.length ===0  ?<p>EMpty</p> :clothes.map(cloth => <img width={100} height={100} src={cloth?.images?.[0]} />)
    //   }
    //   <button onClick={() => {
    //     setQuery({
    //       pageSize: 10,
    //       page: 1
    //     })
    //   }}>1</button>
    //   <button onClick={() => {
    //     setQuery({
    //       pageSize: 10,
    //       page: 2
    //     })
    //   }}>2</button>
    // </div>
  )
}

export default App
