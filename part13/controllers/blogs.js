const router = require('express').Router()
const { Blog, User } = require('../models')
const jwt = require('jsonwebtoken');
const { JWTSECRET } = require('../util/config');
const { Op } = require('sequelize');

// Middleware 
const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (!authorization || !authorization.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "token invalid/missing" });
  }

  req.token = authorization.substring(7)
  const decodedToken = jwt.verify(req.token, JWTSECRET)
  if (!req.token || !decodedToken) {
    return res.status(401).json({ error: 'token missing/invalid' })
  }

  req.userId = decodedToken.id
  next();
};

// Middleware 
const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);
    next();
}
  
router.get('/', async (req, res) => {
  let where = {}
  if(req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.substring]: req.query.search
          }
        },
        {
          author: {
            [Op.substring]: req.query.search
          }
        }
      ]
    }
  }
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId']},
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [['likes', 'DESC']]
  });
  res.json(blogs);
});

// router.get('/', async (req, res) => {
//   const blogs = await Blog.findAll()
//   res.json(blogs)
//   console.log(blogs)
//   console.log('Blogs fetched successfully')

// try {
//     console.log(req.body)
//     const blogs = await Blog.findAll()
//     res.json(blogs)
//     console.log('Blogs fetched successfully')
// } catch(error) {
//     console.log('Error occured')
//     return res.status(400).json({ error })
// }
// })
 
router.get('/:id', blogFinder, async (req, res) => {
  const reqBlog = req.blog
  if(reqBlog){
    res.json(reqBlog)
  }else{
    return res.status(404).end()

//     try {
//     console.log(req.body)
//     const blog = await Blog.findByPk(req.params.id)
//     res.json(blog)
//     console.log("Blog fetched successfully")
// } catch(error) {
//     console.log('blog not found')
//     return res.status(404).end()
// }
  }
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const blog = await Blog.create({...req.body, userId: user.id});
    res.json(blog);
  }
  catch(error) {
    next(error);
  }

// router.post('/', async (req, res) => {
//   try {
//     const blog = await Blog.create(req.body);
//     console.log("Blog added successfully")
//     return res.json(blog);
//   } catch (error) {
//     console.log("error occured")
//     return res.status(400).json({error});
//   }
// })

router.delete('/:id', tokenExtractor, async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findByPk(id);
  if(blog.userId !== req.userId)
    return res.status(401).send("You are not authorized to do this");

  if(blog) {
    blog.destroy();
    res.status(204).end();
  }
  else {
    res.status(404).end();
  }
});

// router.delete('/:id', blogFinder, async (req, res) => {
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
})


router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
    console.log("likes modified successfully")
  } else {
    console.log("error in likes modification occured")
    return res.status(404).end()
  }
})

module.exports = router;
