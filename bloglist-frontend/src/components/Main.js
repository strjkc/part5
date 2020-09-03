import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import Notification from './Notification'
import CreationForm from './CreationForm'
import blogService from '../services/blogs'

const Main = ({ notification, user }) => {
  const [displayCreation, setDisplayCreation] = useState(false)
  const [blogs, setBlogs] = useState([])

  const displayCreationForm = { display: displayCreation ? '' : 'none' }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  const showNotification = () => {
    if (notification.notification !== null)
      return <Notification notificationText={notification.notification}/>
  }
  const handleLogout = () => {
    window.localStorage.removeItem('user')
    window.location.reload()
  }
  return (
    <div>
      <h2>blogs</h2>
      {showNotification()}
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
        <div style={displayCreationForm}>
          <CreationForm blog={{ blogs, setBlogs }} displayNotification={notification.displayNotification} setDisplayCreation={setDisplayCreation} />
        </div>
        <button onClick={() => setDisplayCreation(!displayCreation)}>{displayCreation ? 'Cancel' : 'New note'}</button>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Main