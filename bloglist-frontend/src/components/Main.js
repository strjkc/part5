import React from 'react'
import Blog from './Blog'
import Notification from './Notification'
import CreationForm from './CreationForm'

const Main = ({notification, blogs, user, creationValues, creationFunctions}) => {
    const displayNotification = () => {
        if (notification !== null)
            return <Notification notificationText={notification}/>
    }

    const handleLogout = () => {
        window.localStorage.removeItem('user')
        window.location.reload()
      }

    return (
        <div>
            <h2>blogs</h2>
            {displayNotification()}
            <div>
              {user.name} logged in
              <button onClick={handleLogout}>Logout</button>
              <CreationForm values={creationValues} functions={creationFunctions} />
            </div>
            {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default Main 