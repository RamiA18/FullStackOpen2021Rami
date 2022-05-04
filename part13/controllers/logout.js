const router = require("express").Router();
const session = require("../models/session");

router.delete("/", async (req, res) => {
  const activeSession = await session.findOne({
    userId: req.user,
    token: req.token,
  });
  if (activeSession) {
    activeSession.destroy();
    res.sendStatus(202);
  } else {
    res.status(404).send({ error: "User has already signed out" });
  }
});

module.exports = router;
