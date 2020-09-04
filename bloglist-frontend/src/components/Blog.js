import React, { useState } from 'react'
import FullBlog from './FullBlog'

const Blog = ({ blog, functions, user }) => {
  const [displayBlog, setDisplayBlog] = useState(false)
  const showFullBlog = { display: displayBlog ? '' : 'none' }

  const blogStyle = {
    border: '1px black solid',
    padding: '5px',
    margin: '3px 0 3px 0'
  }

  return (
    <div className='blogContainer' style={blogStyle}>
      { blog.title }
      <button onClick={() => setDisplayBlog(!displayBlog)}>{displayBlog ? 'Hide' : 'View'}</button>
      <div className='fullBlogContainer' style={showFullBlog}>
        <FullBlog blog={blog} user={user} functions={functions}/>
      </div>
    </div>
  )
}
export default Blog
