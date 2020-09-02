import React from 'react'
import LoginForm from './LoginForm'
import Notification from './Notification'

const Login = ({notification, loginValues, loginFunctions}) => {
    const displayNotification = () => {
        if (notification !== null)
            return <Notification notificationText={notification} />
    }
    return (
        <div>
            {displayNotification()}
            <LoginForm values={loginValues} functions={loginFunctions}/>
        </div>
    )
}

export default Login