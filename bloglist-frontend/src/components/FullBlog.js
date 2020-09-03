import React from 'react'

const FullBlog = ({ blog, functions }) => {
  return (
    <div>
      <p>{blog.author}</p>
      <p>{blog.content}</p>
      <p>{blog.url}</p>
      <div>
        {blog.likes}
        <button onClick={ () => functions.handleLikes(blog) }>Like</button>
      </div>
      <button onClick={ () => functions.removeBlogs(blog.id) }>Remove</button>
    </div>
  )
}

export default FullBlog