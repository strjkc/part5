import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import Main from './components/Main'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

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
        : <Main notification={notification}  user={user}   />  
      }
    </div>
  )
}

export default App