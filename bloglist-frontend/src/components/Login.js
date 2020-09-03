import React from 'react'
import LoginForm from './LoginForm'
import Notification from './Notification'

const Login = ({ notification, user }) => {
  const showNotification = () => {
    if (notification.notification !== null)
      return <Notification notificationText={ notification.notification } />
  }
  return (
    <div>
      {showNotification()}
      <LoginForm notification={ notification } user={ user }/>
    </div>
  )
}

export default Login