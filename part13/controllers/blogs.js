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
  if(searchInput) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.substring]: searchInput
          }
        },
        {
          author: {
            [Op.substring]: searchInput
          }
        }
      ]
    };
  };

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"]},
    include: {
      model: User,
      attributes: ["name"]
    },
    where,
    order: [["likes", "DESC"]]
  });
  console.log("Blogs fetched successfully");
  res.json(blogs);
});

// router.get("/", async (req, res) => {
//   const blogs = await Blog.findAll()
//   res.json(blogs)
//   console.log(blogs)
//   console.log("Blogs fetched successfully")

// try {
//     console.log(req.body)
//     const blogs = await Blog.findAll()
//     res.json(blogs)
//     console.log("Blogs fetched successfully")
// } catch(error) {
//     console.log("Error occured")
//     return res.status(400).json({ error })
// }
// })
 
router.get("/:id", blogFinder, async (req, res) => {
  const reqBlog = req.blog;
  if(reqBlog){
    console.log("Fetched Successfully");
    res.json(reqBlog)
  }else{
    console.log("Error occured fetching the blog post");
    return res.status(404).send({error: "Not Found"});
  };
});
//     try {
//     console.log(req.body)
//     const blog = await Blog.findByPk(req.params.id)
//     res.json(blog)
//     console.log("Blog fetched successfully")
// } catch(error) {
//     console.log("blog not found")
//     return res.status(404).end()
// }

router.post("/", tokenExtractor, async (req, res, next) => {
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(406).json({ error: "Authentication was not successfully completed" })
    const blog = await Blog.create({...req.body, userId: user.id});
    console.log("Added Successfully");
    res.json(blog);

// router.post("/", async (req, res) => {
//   try {
//     const blog = await Blog.create(req.body);
//     console.log("Blog added successfully")
//     return res.json(blog);
//   } catch (error) {
//     console.log("error occured")
//     return res.status(400).json({error});
//   }
// })

// Delete a blog by the user who posted it
router.delete("/:id", tokenExtractor, async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findByPk(id);
  if(blog.userId !== req.userId){
    return res.status(401).send("You are not authorized to do this");
  };
  if(blog) {
    blog.destroy();
    console.log("Deleted Successfully");
    res.status(204).end();
  }
  else {
    console.log("Blog not found or already deleted");
    res.status(404).end();
  };
});
});
// router.delete("/:id", blogFinder, async (req, res) => {
//   const reqBlog = req.blog
//     if(reqBlog){
//       reqBlog.destroy()
//       res.sendStatus(202)
//     }else{
//       res.sendStatus(404)
//     }
  // try {
  //   await Blog.destroy({ where: { id: req.params.id } });
  //   console.log("Deleted successfully")
  //   res.status(204).end()
  // } catch (error) {
  //   console.log("blog does not exist")
  //   return res.status(404).end()
  // }

// Like a blog post
router.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    console.log("likes modified successfully");
    res.json(req.blog);
  } else {
    console.log("error in likes modification occured");
    return res.status(500).end();
  };
});

module.exports = router;
