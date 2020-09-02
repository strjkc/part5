import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect( () => {
    const savedUser = window.localStorage.getItem('user')
    if(savedUser)
      setUser(JSON.parse(savedUser))
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logged in')
    blogService.login({username, password})
    .then(response => { 
      setUser(response)
      window.localStorage.setItem('user', JSON.stringify(response))

     })
  }

  const loginForm = () => (
    <div>
      <h1>Log in to application:</h1>
      <form onSubmit={handleLogin}>
        <div>
        username:
        <input type='text' value={username} onChange={({ target }) => setUsername(target.value)}></input>
        </div>
        <div>
        password:
        <input type='text' value={password} onChange={({ target }) => setPassword(target.value)}></input>
        </div>
        <button type='submit'>Login</button>
        </form>
    </div>
  )

  return (
    <div>
      {
        user === null
        ? loginForm()
        : <div>
            <h2>blogs</h2>
            <div>{user.name} logged in</div>
            {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
            )}
          </div> 

      }
      
    </div>
  )
}

export default App