import React, { useState } from 'react'
import blogService from '../services/blogs'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    blogService.login({ username, password })
      .then(response => {
        props.user.setUser(response)
        blogService.setToken(response.token)
        window.localStorage.setItem('user', JSON.stringify(response))
      })
      .catch( () => {
        props.notification.displayNotification('wrong username or password')
        console.log('error, wrong name')
      })
  }

  return(
    <div id='login-container'>
      <h1>Log in to application:</h1>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input id='username-input' type='text' value={username} onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password:
          <input id='password-input' type='text' value={password} onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm