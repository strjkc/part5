import React from 'react'
import PropTypes from 'prop-types'

const FullBlog = ({ blog, functions, user }) => {
  return (
    <div>
      <p>{blog.author}</p>
      <p>{blog.content}</p>
      <p>{blog.url}</p>
      <div>
        <div id='likes'>{blog.likes}</div>
        <button onClick={ () => functions.handleLikes(blog) }>Like</button>
      </div>
      {blog.user.username === user.username
      ? <button onClick={ () => functions.removeBlogs(blog) }>Remove</button>
      : <></>
    }
    </div>
  )
}

FullBlog.propTypes = {
  blog: PropTypes.object.isRequired,
  functions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default FullBlog