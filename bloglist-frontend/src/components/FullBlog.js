import React from 'react'
import blogServices from '../services/blogs'

const FullBlog = ({ blog, handleLikes }) => {
  return (
    <div>
      <p>{blog.author}</p>
      <p>{blog.content}</p>
      <p>{blog.url}</p>
      <div>
        {blog.likes}
        <button onClick={ () => handleLikes(blog) }>Like</button>
      </div>
    </div>
  )
}

export default FullBlog