const errorHandler = (error, req, res, next) => {
    console.log(error)
    if (error.name === 'NotFound') {
        return res.status(404).end()
    } else if (error.name === 'idError') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'SequelizeValidationError') {
        return res.status(400).send({ error: 'Data could not be validated, check format' });
    } else if (error.name) {
      return res.status(400).json({ error })
    }
    next(error)
  }
  
  module.exports = errorHandler;