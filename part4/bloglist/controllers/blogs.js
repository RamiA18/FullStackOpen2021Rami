const blogsRouter = require('express').Router()
// const { res } = require('../app.js')
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (req, res) => {
  try{
  const blogs = await Blog.find({})
    res.json(blogs.map(blog => blog.toJSON()))
} catch (exception) {
  next(exception)
}
})

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
      res.json(blog.toJSON())
    } else {
      res.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (req, res, next) => {

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0
  })

  try {
    const savedBlog = await blog.save()
    res.json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
  })

blogsRouter.delete('/:id', async (req, res, next) => {
  try{
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
    const body = req.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(updatedBlog)

  } catch(exception) {
    next(exception)
  }
})


// blogsRouter.put('/:id', (req, respons, next) => {
//   const body = req.body

//   const blog = {
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes
//   }

//   Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
//     .then(updatedBlog => {
//       respons.json(updatedBlog)
//     })
//     .catch(error => next(error))
// })

module.exports = blogsRouter