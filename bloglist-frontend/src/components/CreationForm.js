import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreationForm = ({ props }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [content, setContent] = useState('')

  const submitBlog = (event) => {
    event.preventDefault()
    blogService.createBlog({ title,author, content, url })
    .then( response => {
      props.setBlogs(props.blogs.concat(response))
      props.displayNotification(`a new blog ${title} by ${author} added`)
    })
  }
    return(
        <div>
        <h2>Create new</h2>
        <form onSubmit={submitBlog}>
          <div>
            title:
            <input type='text' value={title} onChange={({ target }) => setTitle(target.value) }></input>
          </div>
          <div>
            author:
            <input type='text' value={author} onChange={({ target }) => setAuthor(target.value) }></input>
          </div>
          <div>
            content:
            <input type='text' value={content} onChange={({ target }) => setContent(target.value)}></input>
          </div>
          <div>
            url:
            <input type='text' value={url} onChange={({ target }) => setUrl(target.value) }></input>
          </div>
          <button type='submit'>Post</button>
        </form>
      </div>    
    )
}

export default CreationForm