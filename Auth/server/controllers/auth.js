const User = require('../models/user'); 
const jwt = require('jsonwebtoken'); 
const nodemailer = require('nodemailer')
// const sgMail = require('@sendgrid/mail'); 
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// exports.signup =  (req, res)=>{
//   // console.log('req body : ', req.body); why no next()? 
//   // res.json({
//   //   data:"You hit signup endpoint"
//   // })

//   const {name, email, password} = req.body

//   User.findOne({email})//findOne would stop once find, better performance
//   .exec((err, user)=>{
//     if(user){
//       return res.status(400).json({
//         error: 'Email is taken'
//       })
//     }
//   })  
//   let newUser = new User({email, name, password})

//   newUser.save((err, success)=>{
//     if(err){
//       console.log('Sign Up Error :', err)
//       return res.status(400).json({error:err})
//     }else{
//       res.json({message:'Signup Success! Please Sign In'})
//     }
    
    
//   })
// }
exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }) //findOne would stop once find, better performance
    .exec((err, user) => {
      if (user) {
        return res.status(400).json({
          error: "Email is taken"
        });
      }
      const token = jwt.sign(
        { name, email, password },
        process.env.JWT_ACCOUNT_ACTIVATION,
        { expiresIn: "10m" } // because it is only for email verification.
      );

      let transporter = nodemailer.createTransport({
        service: 'naver',
        host: 'smtp.naver.com',
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_USERNAME, // generated ethereal user
          pass: process.env.MAIL_PASSWORD // generated ethereal password
        }
      });
      
      console.log('test :', email, password, name);
      let emailData = {
        // from: process.env.EMAIL_FROM,
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: "Account activation link",
        html: `
      <h2>Please use the following link to activate your account</h2>
      <a href="${process.env.CLIENT_URL}/auth/activate/${token}">${process.env.CLIENT_URL}/auth/activate/${token}</a>
      <hr/>
      <p>This email may contain sensetive information</p>
      <p>${process.env.CLIENT_URL}</p>
      `
      };

      transporter
        .sendMail(emailData)
        .then(sent => {
          // console.log('SIGNUP EMAIL SENT', sent);
          return res.json({
            message: `Email has been sent to ${email}. Follow the instruction to activate your account`
          });
        })
        .catch(err => {
          // console.log('SIGNUP EMAIL SENT ERROR', err);
          console.log('err :', err);
          return res.json({ message: err.message });
        });
    });
};



exports.accountActivation = (req, res) =>{
  const {token} =req.body

  if(token){
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded){
      if(err){
        console.log('JWT veirfy in account activation error :', err);
        return res.status(401).json({
          error: 'Expired link. Signup Again'
        })
      }

      console.log('decoded :', decoded);
      const {name, email, password} = jwt.decode(token)
      const user = new User({name, email, password}) 

      user.save((err, user)=>{
        if(err){
          console.log('Saveuser in Account activation error: ', err);
          return res.status(401).json({
            error: 'Error saving user in database. Try signup again'
          })
        }
        return res.json({
          message: 'Signup success. Please Sign in'
        })
      })
    })
  }else{
    return res.json({
      message: 'Something went wwrong. Try again'
    })
  }
}

exports.signin = (req, res) =>{

  const {email, password} = req.body

  User.findOne({email}).exec((err, user)=>{
    if(err || !user){
      return res.status(400).json({
        error: 'User with that email does not exist. Pease sign up'
      })
    }

    if(!user.authenticate(password)){
          return res.status(400).json({
            error: "Email and password do not match"
          });
    }
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
    const {_id, name, email, role} = user
    return res.json({
      token, 
      user: {_id, name, email, role}
    })
  })
} 