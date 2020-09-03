import React, { useState } from 'react'
import FullBlog from './FullBlog'

const Blog = ({ blog, handleLikes }) => {
  const [displayBlog, setDisplayBlog] = useState(false)
  const showFullBlog = { display: displayBlog ? '' : 'none' }

  return (
    <div>
      { blog.title }
      <button onClick={() => setDisplayBlog(!displayBlog)}>{displayBlog ? 'Hide' : 'View'}</button>
      <div style={showFullBlog}>
        <FullBlog blog={blog} handleLikes={handleLikes}/>
      </div>
    </div>
  )
}
export default Blog
