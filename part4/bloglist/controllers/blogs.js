const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name:1})
    res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
      res.json(blog.toJSON())
    } else {
      res.status(404).end()
    }
})

blogsRouter.post('/', async (req, res) => {
  const token = req.token
  const decodedToken = await jwt.verify(token, process.env.SECRET)
  const user = req.user

  if (!token || !decodedToken) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  if(!req.body.title || !req.body.url){
		return res.status(400).json({ error: "title or url is missing" })
	}

  // const user = await User.findById(decodedToken.userId)
  // console.log(decodedToken)
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0,
    user:  user.id
  })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    // res.status(201).json(savedBlog.toJSON())
    res.json(savedBlog.toJSON())
  
})


  blogsRouter.delete('/:id', async (req, res) => {
    const token = req.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const user = req.user
    const blog = await Blog.findById(req.params.id)


      if (!token || !decodedToken || !user || !user._id || !blog) {
        return res
        .status(401)
        .json({ error: 'missing/invalid information' })
      }
    
      if (blog.user.toString() !== user._id.toString()) {
        res
        .status(400)
        .end()
      }
  
      await Blog.findByIdAndRemove(req.params.id)
      res
      .status(204)
      .end()

      })





// blogsRouter.delete('/:id', async (req, res) => {

//   const token = getTokenFrom(req)
//   const decodedToken = jwt.verify(token, process.env.SECRET)

//   if (!token || !decodedToken) {
//       return res.status(401).json({ error: 'token missing or invalid' })
//     } 

//     const blog = await Blog.findById(req.params.id)  
//     if (blog.user.toString() === req.decodedToken.userId.toString()) {
//       await Blog.findByIdAndRemove(req.params.id)
//       res.status(204).end()
//     }
//     res
//     .status(204)
//     .json ({ error: 'You are not authorized to delete this blog' })

//     // await Blog.findByIdAndRemove(req.params.id)
//     // res.status(204).end()
//   })

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
    const blog = {
      likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.status(200).json(updatedBlog)
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