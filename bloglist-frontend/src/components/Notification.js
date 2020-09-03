import React from 'react'

const Notification = (props) => {
  const notificationStyle = {
    color: 'green',
    border: '3px solid green',
  }
  return (
    <div style={notificationStyle}>{props.notificationText}</div>
  )
}

export default Notification