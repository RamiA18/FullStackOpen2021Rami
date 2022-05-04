const router = require("express").Router();
const { Blog, User } = require("../models");
const jwt = require("jsonwebtoken");
const { JWTSECRET } = require("../util/config");
const blogFinder = require("../util/blogFinder.js");
const tokenExtractor = require("../util/tokenExtractor.js");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  let where = {};
  const searchInput = req.query.search;
  if (searchInput) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.substring]: searchInput,
          },
        },
        {
          author: {
            [Op.substring]: searchInput,
          },
        },
      ],
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
    order: [["likes", "DESC"]],
  });
  console.log("Blogs fetched successfully");
  res.json(blogs);
});

router.get("/:id", blogFinder, async (req, res) => {
  const reqBlog = req.blog;
  if (reqBlog) {
    res.json(reqBlog);
  } else {
    return res.status(404).send({ error: "Not Found" });
  }
});

router.post("/", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  if (!user)
    return res
      .status(406)
      .json({ error: "Authentication was not successfully completed" });
  const blog = await Blog.create({ ...req.body, userId: user.id });
  res.json(blog);

  // Delete a blog by the user who posted it
  router.delete("/:id", tokenExtractor, async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findByPk(id);
    if (blog.userId !== req.userId) {
      return res.status(401).send("You are not authorized to do this");
    }
    if (blog) {
      blog.destroy();
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  });
});

// Like a blog post
router.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    return res.status(500).end();
  }
});

module.exports = router;
