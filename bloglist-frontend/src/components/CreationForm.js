import React from 'react'

const CreationForm = ({values, functions}) => {
    return(
        <div>
        <h2>Create new</h2>
        <form onSubmit={functions.submitBlog}>
          <div>
            title:
            <input type='text' value={values.title} onChange={({target}) => functions.setTitle(target.value) }></input>
          </div>
          <div>
            author:
            <input type='text' value={values.author} onChange={({target}) => functions.setAuthor(target.value) }></input>
          </div>
          <div>
            content:
            <input type='text' value={values.content} onChange={({ target }) => functions.setContent(target.value)}></input>
          </div>
          <div>
            url:
            <input type='text' value={values.url} onChange={({target}) => functions.setUrl(target.value) }></input>
          </div>
          <button type='submit'>Post</button>
        </form>
      </div>    
    )
}

export default CreationForm