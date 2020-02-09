const User = require('../models/user') 



exports.read = (req, res)=>{
  // console.log('user :', user);
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

exports.update = (req, res) =>{
  // console.log('header :', req.headers);
  // console.log('update :', req.user, 'update data :', req.body);

  const {name, password} = req.body

  User.findOne({_id: req.user._id}, (err, user)=>{
    if(err || !user){
      return res.status(400).json({
        error: 'User not found'
      })
    }
    if(!name){
      return res.status(400).json({
        error: 'name is required'
      })
    }else{
      user.name =name
    }

    if(password) {
      if(password.length < 6){
        return res.status(400).json({
          error: 'Password should be min 6 charactors long'
        })
      } else{
        user.password = password
      }
    }

    user.save((err, updateUser)=>{
      if(err){
        console.log('Update error', err);
        return res.status(400).json({
          error : 'User update failed'
        })
      }
      updateUser.hashed_password = undefined
      updateUser.salt = undefined; 
      res.json(updateUser)
    })
  })
}
