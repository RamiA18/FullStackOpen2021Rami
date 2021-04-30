import React from 'react'

const Blog = ({blog}) => (
  <div>
    <span style={{fontWeight: "bold"}}> Title: </span>{blog.title} ... <span style={{fontWeight: "bold"}}> Author: </span> {blog.author}
  </div>  
)

export default Blog