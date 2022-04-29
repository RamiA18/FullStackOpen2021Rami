const router = require('express').Router();
const { User, Blog } = require('../models');

router.get('/', async (req, res) => {
  const findResult = await User.findAll({
    include: {
      model: Blog,
      attributes: ['title', 'author', 'url', 'likes']
    }
  });
  res.json(findResult);
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  }
  catch(error) {
    next(error);
    console.log(req.body)
  }
});

router.put('/:username', async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ where: { username: username }});
    const name = req.body.name.toString();
    user.name = name;
    await user.save();
    res.json(user);
  }
  catch(error) {
    next(error);
  }
});

module.exports = router;