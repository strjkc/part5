import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import Main from './components/Main'

const App = () => {
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

  return (
    <div>
      {
        user === null
          ? <Login notification={{ notification, displayNotification }} user={{ user, setUser }}/>
          : <Main notification={{ notification, displayNotification }}  user={ user }/>
      }
    </div>
  )
}

export default App