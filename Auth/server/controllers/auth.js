
exports.signup =  (req, res)=>{
  // console.log('req body : ', req.body); why no next()? 
  res.json({
    data:"You hit signup endpoint"
  })
}

