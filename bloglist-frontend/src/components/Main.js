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
  //displays the notification element if the state of the notification text is not null
  const showNotification = () => {
    if (notification.notification !== null)
      return <Notification notificationText={notification.notification}/>
  }
  const handleLogout = () => {
    window.localStorage.removeItem('user')
    window.location.reload()
  }

  const handleLikes = (blog) => {
    blogService.updateLikes(blog)
      .then(response => setBlogs(blogs.map(blog => blog.id === response.id ? response : blog).sort((a, b) => b.likes - a.likes)))
  }

  const removeBlogs = (blog) => {
    const blogToRemove = blog
   if(window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`))
      blogService.deleteBlog(blogToRemove.id)
        .then(setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id)))
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
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} functions={{ removeBlogs, handleLikes }} />
      )}
    </div>
  )
}

export default Main