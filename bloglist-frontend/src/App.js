import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreationForm from './components/CreationForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [content, setContent] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  const submitBlog = (event) => {
    event.preventDefault()
    blogService.createBlog({title,author, content, url})
    .then( response => { 
      setBlogs(blogs.concat(response))
      displayNotification(`a new blog ${title} by ${author} added`)
    })
  }

  const displayNotification = (text) => {
    setNotification(text)
    setTimeout(() => setNotification(null), 3000)
  }

  useEffect( () => {
    const savedUser = window.localStorage.getItem('user')
    if(savedUser)
    {
      setUser(JSON.parse(savedUser))
      blogService.setToken(JSON.parse(savedUser).token)
    }
  }, [])

  const handleLogin = (event) => {
      event.preventDefault()
      console.log('logged in')
      blogService.login({username, password})
      .then(response => { 
      setUser(response)
      blogService.setToken(response.token)
      window.localStorage.setItem('user', JSON.stringify(response))
     })
    .catch( () => {
      displayNotification('wrong username or password')
      console.log('error, wrong name')
    }
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    window.location.reload()
  }

  return (
    <div>
      {
        user === null
        ? <div>
          { notification !== null
              ? <Notification notificationText={notification} /> : <></>}
              <LoginForm values={{username, password}} functions={{setUsername, setPassword, handleLogin}}/>
          </div>
        : <div>
            <h2>blogs</h2>
            { notification !== null
              ? <Notification notificationText={notification} /> : <></>}
            <div>
              {user.name} logged in
              <button onClick={handleLogout}>Logout</button>
              <CreationForm values={{title,author,content,url}} functions={{setTitle, setAuthor, setContent, setUrl, submitBlog}} />
              </div>
            {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
            )}
          </div> 
      }
    </div>
  )
}

export default App