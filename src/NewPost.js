import React from 'react'

const NewPost = ({handleSubmit, postTitle, setPostTitle, postBody, setPostBody}) => {
  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form action="" className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input 
          type="text"
          required
          id='title'
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="body">Body</label>
        <textarea
          type="text"
          required
          id='body'
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </main>
  )
}

export default NewPost