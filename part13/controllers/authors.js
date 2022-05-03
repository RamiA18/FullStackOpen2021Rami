const router = require("express").Router();
const { Blog } = require ("../models");
const { sequelize } = require("../models/blog");

router.get("/", async (req, res) => {
  const getResult = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("author")), "blogs"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"]
    ],
    group: ["author"]
  });
  if (!getResult) res.status(404).send({error: "No authors found"})

  res.json(getResult);
});

module.exports = router;