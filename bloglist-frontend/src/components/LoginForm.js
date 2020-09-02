import React from 'react'

const LoginForm = (props) => {
    return(
        <div>
            <h1>Log in to application:</h1>
            <form onSubmit={props.functions.handleLogin}>
                <div>
                    username:
                    <input type='text' value={props.values.username} onChange={({ target }) => props.functions.setUsername(target.value)}></input>
                </div>
                <div>
                    password:
                    <input type='text' value={props.values.password} onChange={({ target }) => props.functions.setPassword(target.value)}></input>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm