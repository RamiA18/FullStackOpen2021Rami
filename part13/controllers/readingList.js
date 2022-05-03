const router = require('express').Router();
const userExtractor = require('../util/userExtractor.js');
const { ReadingList } = require('../models');

router.get("/", async (req, res) => {
  const readings = await ReadingList.findAll()
  res.json(readings)
  console.log(readings)
  console.log("Blogs fetched successfully")
})

router.post('/', async(req, res) => {
  const entry = {...req.body}
  const reading = await ReadingList.create(entry);
  res.json(reading);
});

router.put('/:id', userExtractor, async(req,res) => {
  const reading = await ReadingList.findByPk(req.params.id)
  if (reading && reading.userId === req.userId){
    reading.read = req.body.read;
    reading.save();
    res.sendStatus(202);
  }else{
    res.status(401).send({error: "Unauthorized"});
  };
});


module.exports = router;