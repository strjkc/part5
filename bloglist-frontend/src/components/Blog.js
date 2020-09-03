import React, { useState } from 'react'
import FullBlog from './FullBlog'

const Blog = ({ blog, functions }) => {
  const [displayBlog, setDisplayBlog] = useState(false)
  const showFullBlog = { display: displayBlog ? '' : 'none' }

  return (
    <div>
      { blog.title }
      <button onClick={() => setDisplayBlog(!displayBlog)}>{displayBlog ? 'Hide' : 'View'}</button>
      <div style={showFullBlog}>
        <FullBlog blog={blog} functions={functions}/>
      </div>
    </div>
  )
}
export default Blog
