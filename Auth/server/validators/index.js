const {validationResult} = require('express-validator'); 

exports.runValidataion = (req, res, next)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){ //if any error
    return res.status(422).json({error:errors.array()[0].msg}) ; //just errors[0] ? 
  }
  next()// next means next middleware callback function. 
}

