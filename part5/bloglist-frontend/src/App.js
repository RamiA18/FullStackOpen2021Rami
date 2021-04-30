import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification.js'
import blogService from './services/blogs'
import loginService from './services/login' 
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogOut = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.noToken()
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage
  (null)
      }, 5000)
    }
  }

  const HandleAddingBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`a new blog ${title} has been added `)
      setTimeout(() => {
      setErrorMessage
  (null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
      setTitle('')

    })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button className= "btn btn-primary btn-sm" type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={HandleAddingBlog}>
      <div>
        Title:
      <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
        </div>
        <div>
          Author:
        <input
          type="text"
          value={author}
          name="title"
          onChange={({ target }) => setAuthor(target.value)}
        />
        </div>
        <div>
          URL:
        <input
          type="text"
          value={url}
          name="title"
          onChange={({ target }) => setUrl(target.value)}
        />
        </div>
      
      <button className="btn btn-secondary btn-sm" type="submit">save</button>
    </form>  
  )

  return (
  <div className="container">
      <h1>Blogs</h1>

      <Notification message={errorMessage} />

      {user === null ?
      loginForm() :
      <div>
      <p>{user.name} logged-in <button className="btn btn-danger btn-sm" onClick={handleLogOut}>Logout</button> </p>

      {blogForm()}
            <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    }
    </div>
  )
}

export default App