const router = require("express").Router();
const { User, Blog } = require("../models");

router.get("/", async (req, res) => {
  const findResult = await User.findAll({
    include: {
      model: Blog,
      attributes: ["title", "author", "url", "likes"],
    },
  });
  if (!findResult)
    res
      .status(404)
      .send({ error: "No users Found", message: "No users has been found" });
  res.json(findResult);
});

router.post("/", async (req, res, next) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.put("/:id", async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findOne({ where: { id: userId } });
  if (!user)
    return res
      .status(404)
      .send({ error: "User not found", message: "User does not exist" });
  const newName = req.body.name.toString();
  user.name = newName;
  await user.save();
  res.json(user);
});

router.get("/:id", async (req, res) => {
  let whereRead = {};
  if (req.query.read) {
    whereRead = {
      read: req.query.read,
    };
  }
  const user = await User.findOne({
    attributes: ["name", "username"],
    include: {
      model: Blog,
      as: "readings",
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      through: {
        attributes: ["read", "id"],
        where: whereRead,
      },
    },
    where: { id: req.params.id },
  });
  if (!user)
    res
      .status(404)
      .send({ error: "User not Found", message: "No user has been found" });
  res.json(user);
});

module.exports = router;
