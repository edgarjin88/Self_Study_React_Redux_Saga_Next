const User = require('../models/user') 



exports.read = (req, res)=>{
  console.log('user :', user);
  const userId = req.params.id // catched :id params 
  User.findById(userId).exec((err, user)=>{
    if(err|| !user){
      return res.status(400).json({
        error:'User not found' 
      })
    }
    user.hashed_password=undefined
    user.salt=undefined
    res.json(user) 
  })
}