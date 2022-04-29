const webtoken = require('jsonwebtoken');
const router = require('express').Router();
const { JWTSECRET } = require('../util/config');
const User = require('../models/user');

router.post('/', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({
    where: {
      username: username
    }
  });

  const passwordCorrect = password === 'apassword';

  if(!(user && passwordCorrect)) {
    return res.status(401).json({error:'Credentials are invalid'});
  }

  const userTokenData = {
    username: user.username,
    id: user.id
  };

  const token = webtoken.sign(userTokenData, JWTSECRET);
  res.json({accessToken: token})
});

module.exports = router;