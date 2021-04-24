const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogsArray) => {
    return blogsArray.reduce((accumulator, blog) => (accumulator += blog.likes), 0)
}

const favouriteBlog = (blogsArray) => {
    return Math.max(...blogsArray.map(blog=>blog.likes))
}
  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
  }