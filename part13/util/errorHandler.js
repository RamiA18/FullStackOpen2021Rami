const errorHandler = (error, req, res, next) => {
    console.log(error)
    if (error.name === 'SequelizeUniqueConstraintError' && error.errors[0].path === "username" ) {
        return res.status(404).send({ error: "Wrong Format", message:"Check username format" })
    } else if (error.name === 'SequelizeValidationError' && error.errors[0].validatorKey === 'isEmail') {
        return res.status(400).send({ error: "Data could not be validated, username must be an Email"});
    } else if (error.name === 'SequelizeValidationError') {
        return res.status(400).send({ error: "Data could not be validated", message: error.errors[0].message});
    } else if (error.name) {
      return res.status(400).json({ error })
    }
    next(error)
  }



  
  module.exports = errorHandler;