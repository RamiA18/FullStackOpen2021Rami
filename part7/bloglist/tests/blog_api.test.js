const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const helper = require("../utils/test_helper");
const api = supertest(app);
const User = require("../models/user");
const Blog = require("../models/blog");
const { initial } = require("lodash");
let token;

beforeAll(async () => {
  await User.deleteMany({});
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash("apassword", saltRounds);
  const user = new User({ username: "root", passwordHash });
  await user.save();

  const login = await api
    .post("/api/login")
    .send({ username: "root", password: "apassword" })
    .set("Accept", "application/json")
    .expect("Content-Type", /application\/json/);
  token = login.body.token;
});

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("Fetching Blog(s)", () => {
  test("blogs return as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test('have a unique identifier named "id"', async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });

  test("a single Blog can be requested", async () => {
    const AllBlogs = await helper.blogsInDb();
    const aBlogPost = AllBlogs[0];
    const response = await api
      .get(`/api/blogs/${aBlogPost.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body.id).toEqual(aBlogPost.id);
  });
});

describe("adding New Blog Successfully", () => {
  test("Added new blog", async () => {
    const firstBlogArray = await helper.blogsInDb();
    const firstLength = firstBlogArray.length;

    const newBlog = {
      title: "Random1 Title",
      author: "Random eAuthor",
      url: "https://randomWebsite.com",
      likes: 5,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const secondBlogArray = await helper.blogsInDb();
    const secondLength = secondBlogArray.length;
    expect(secondLength).toEqual(firstLength + 1);
  });

  test("likes equal 0 if undefined", async () => {
    const initialBlogs = await helper.blogsInDb();
    const newBlog = {
      title: "Another Random Example",
      author: "Another JohnSmith",
      url: "http://www.AotherRandom.com",
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(0);
  });
});

describe("Errors testings", () => {
  test("error 400 returned if title is missing", async () => {
    const initialBlogs = await helper.blogsInDb();
    const newBlog = {
      author: "Another JohnSmith",
      url: "www.awebsite.com",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${token}`)
      .expect(400)
      .expect("Content-Type", "application/json; charset=utf-8");
    const finalBlogs = await helper.blogsInDb();
    expect(initialBlogs.length).toEqual(finalBlogs.length);
  });

  test("error 400 returned if url is missing", async () => {
    const initialBlogs = await helper.blogsInDb();
    const newBlog = {
      title: "Another JohnSmith",
      author: "Another JohnSmith",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${token}`)
      .expect(400)
      .expect("Content-Type", "application/json; charset=utf-8");
    const finalBlogs = await helper.blogsInDb();
    expect(initialBlogs.length).toEqual(finalBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
