const blogsRouter = require("express").Router();
const Blog = require("../models/blog.js");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog.toJSON());
  } else {
    res.status(404).end();
  }
});

blogsRouter.post("/", async (req, res) => {
  const token = req.token;
  const decodedToken = await jwt.verify(token, process.env.SECRET);
  const user = req.user;

  if (!token || !decodedToken) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  if (!req.body.title || !req.body.url) {
    return res.status(400).json({ error: "title or url is missing" });
  }

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0,
    user: user.id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (req, res) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const user = req.user;
  const blog = await Blog.findById(req.params.id);

  if (!token || !decodedToken || !user || !user._id || !blog) {
    return res.status(401).json({ error: "missing/invalid information" });
  }

  if (blog.user.toString() !== user._id.toString()) {
    res.status(400).end();
  }

  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const blog = {
    likes: body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
