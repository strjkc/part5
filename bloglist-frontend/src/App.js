import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import Main from './components/Main'

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

  return (
    <div>
      {
        user === null
        ? <Login notification={notification} loginValues={{username, password}} loginFunctions={{handleLogin, setPassword, setUsername}} />
        : <Main notification={notification} blogs={blogs} user={user} creationValues={{title,author,content,url}} creationFunctions={{setTitle, setAuthor, setContent, setUrl, submitBlog}} />  
      }
    </div>
  )
}

export default App