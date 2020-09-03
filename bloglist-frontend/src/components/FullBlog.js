import React from 'react'

const FullBlog = ({ blog, functions, user }) => {
  return (
    <div>
      <p>{blog.author}</p>
      <p>{blog.content}</p>
      <p>{blog.url}</p>
      <div>
        {blog.likes}
        <button onClick={ () => functions.handleLikes(blog) }>Like</button>
      </div>
      {blog.user.username === user.username
      ? <button onClick={ () => functions.removeBlogs(blog) }>Remove</button>
      : <></>
    }
    </div>
  )
}

export default FullBlog