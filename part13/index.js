// require('dotenv').config()
// const { Sequelize, Model, DataTypes } = require('sequelize')
// const express = require('express')
// const app = express()
// app.use(express.json())


// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   },
// });


// class Blog extends Model {}
// Blog.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   author: {
//     type: DataTypes.TEXT
//   },
//   url: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//   title: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//   likes: {
//     type: DataTypes.INTEGER,
//     default: 0
//   }
// }, {
//   sequelize,
//   underscored: true,
//   timestamps: false,
//   modelName: 'blog'
// })

// // if table 'blogs' does not exist, create one
// Blog.sync()

// // Get all blogs
// app.get('/api/blogs', async (req, res) => {
//   try {
//     console.log(req.body)
//     const blogs = await Blog.findAll()
//     res.json(blogs)
//     console.log('Blogs fetched successfully')
//   } catch(error) {
//     console.log('Error occured')
//     return res.status(400).json({ error })
//   }
// })

// // Get blog by ID
// app.get('/api/blogs/:id', async (req, res) => {
//   try {
//     console.log(req.body)
//     const blog = await Blog.findByPk(req.params.id)
//     res.json(blog)
//     console.log("Blog fetched successfully")
//   } catch(error) {
//     console.log('blog not found')
//     return res.status(404).end()
//   }
// })

// // Create a blog post
// app.post('/api/blogs/', async (req, res) => {
//   try {
//     console.log(req.body);
//     const blog = await Blog.create(req.body);
//     console.log("Blog added successfully")
//     return res.json(blog);
//   } catch (error) {
//     console.log("error occured")
//     return res.status(400).json({error});
//   }
// })

// // Delete a blog
// app.delete('api/blogs/:id', async (req, res) => {
//   try {
//     await Blog.destroy({ where: { id: req.params.id } });
//     res.status(404).end()
//     console.log("Deleted successfully")
//   } catch (error) {
//     console.log("blog does not exist")
//   }
// })


// const PORT = process.env.PORT || 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })


require("dotenv").config();
require('express-async-errors')
const express = require('express')
const app = express()
app.use(express.json())

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const errorHandler = require('./util/errorHandler');
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const authorsRouter = require('./controllers/authors');
const readingListRouter = require('./controllers/readingList');
const logoutRouter = require('./controllers/logout')

app.use('/api/authors', authorsRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter)
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/readinglist', readingListRouter);
app.use(errorHandler);



const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()