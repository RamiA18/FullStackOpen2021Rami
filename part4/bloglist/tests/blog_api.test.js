const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const Blog = require('../models/blog.js')

const api = supertest(app)

const initialBlogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ]


beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObject = initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObject.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

test ('blogs return as json' , async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('have a unique identifier named "id"', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

test('new blog added', async () => {
    // const response = await api.post('/api/blogs')
    const firstResponse = await api.get('/api/blogs')
    const expectation = firstResponse.body.length + 1
    const newBlog = {
        title: 'Random Title',
        author: 'Random eAuthor',
        url: 'https://randomWebsite.com',
        likes: 5,
      }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      const secondResponse = await api.get('/api/blogs')
      const resultLength = secondResponse.body.length
      expect(resultLength).toEqual(expectation)
  })





  test('likes equal 0 if undefined', async () => {
    const newBlog = {
      title: 'Another Random Example',
      author: 'Another JohnSmith',
      url: 'http://www.AotherRandom.com',
    }

     const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', "application/json; charset=utf-8")

      console.log(response.body)
    expect(response.body.likes).toBe(0)
  })


  test('error 404 returned if title and url are missing', async () => {
    const newBlog = {
      author: 'Another JohnSmith',
    }

     const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', "application/json; charset=utf-8")
  })


afterAll(() => {
    mongoose.connection.close()
})
