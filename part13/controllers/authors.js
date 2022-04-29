const router = require('express').Router();
const { Blog } = require ('../models');
const { sequelize } = require('../models/blog');

router.get('/', async (request, response) => {
  const result = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('author')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    group: ['author']
  });

  response.json(result);
});

module.exports = router;