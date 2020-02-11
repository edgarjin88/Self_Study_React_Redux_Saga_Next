const User = require('../models/user'); 
const jwt = require('jsonwebtoken'); 
const expressJWT = require('express-jwt')
const nodemailer = require('nodemailer')
const _ =require('lodash')
const {OAuth2Client} = require('google-auth-library')
require("dotenv").config();
// without this, no .env would work. 


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


// exports.requireSignin = expressJWT({
//   secret: process.env.JWT_SECRET //make the data available to req.user._id add the "user property" to req.

// }) //if no userProperty, basic value is "user"

exports.requireSignin = expressJWT({
  secret: process.env.JWT_SECRET
})  //this part just add req.user only

//use sendgrid as well later. 
//validate the token in "authorization" of header 


exports.adminMiddleware = (req, res, next)=>{
    User.findById({_id: req.user._id}).exec((err, user)=>{
      console.log('user  found :', user);
      if(err || !user){
      return res.status(400).json({
        error: 'User not found'
      })
    }
    if(user.role !== 'admin'){
      return res.status(400).json({
        error: 'Admin resource. Access denied'
      })
    }

    req.profile = user
    // console.log('req profile: ', req.profile);
    next(); 
})

}


///forgot password
exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist"
      });
    }
    const token = jwt.sign( //create token
      { _id: user._id, name: user.name },
      process.env.JWT_RESET_PASSWORD,
      { expiresIn: "10m" } // because it is only for email verification.
    );

    let transporter = nodemailer.createTransport({
      service: "naver",
      host: "smtp.naver.com",
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME, // generated ethereal user
        pass: process.env.MAIL_PASSWORD // generated ethereal password
      }
    });

    // console.log("test :", email, password, name);
    let emailData = {
      // from: process.env.EMAIL_FROM,
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: "Reset Password",
      html: `
      <h2>Please use the following link to reset your password</h2>
      <a href="${process.env.CLIENT_URL}/auth/password/reset/${token}">${process.env.CLIENT_URL}/auth/password/reset/${token}</a>
      <hr/>
      <p>This email may contain sensetive information</p>
      <p>${process.env.CLIENT_URL} 'what is this?' </p>
      `
    };

    return user.updateOne({resetPassword:token}, (err, success)=>{
      if(err){
        console.log('Resetp password link error', err);
        return res.status(400).json({
          error:'Database connection error on user password forgot request'
        })
      }else{
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
            console.log("err :", err);
            return res.json({ message: err.message });
          })
        }
    })
  })
}


exports.resetPassword = (req, res)=>{

  const {resetPasswordLink, newPassword} = req.body;

  if(resetPasswordLink){
    jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err, decoded){
      if(err){
        return res.status(400).json({
          error: 'Expired link. Try again'
        })
      }
      console.log('decoded :', decoded);
      
      // User.findOne({resetPasswordLink}, (err, user)=>{ //  original code 
      User.findOne({_id: decoded._id}, (err, user)=>{
        if(err ||!user){
          console.log('user: ', user);
          console.log('err: ', err);
          return res.status(400).json({
            error: 'Something went wrong. Try again'
          }); 
        }

        const updatedFields = {
          password: newPassword, 
          resetPasswordLink: ''
        }

        user = _.extend(user, updatedFields )
        user.save((err, result)=>{
          if(err){
            return res.status(400).json({
              error: 'Error resetting user password'
            })
          }

          res.json({
            message: "Great! You can log in with new passowrd"
          })
        })
      })
    })
  }

}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
exports.googleLogin = (req, res) =>{
  const {idToken} = req.body

  client.verifyIdToken({idToken, audience: process.env.GOOGLE_CLIENT_ID}) //idToken from client side 
  .then(response =>{
    console.log(' google login res :', response);
    const {email_verified, name, email} = response.payload
    if(email_verified){
      User.findOne({email}).exec((err, user)=>{
        if(user){
          const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
          const {_id, email, name, role} = user
          return res.json({ token, user: { _id, email, name, role } });
   
        }else{
          let password = email + process.env.JWT_SECRET // password patern
          user = new User({name, email, password})
          user.save((err, data)=>{
            if(err){
              console.log('error gogle login on user save :', err);
              return res.status(400).json({
                error: 'User sign up failed with google'
              })
            }else{

          const token = jwt.sign({_id: data._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
          const {_id, email, name, role} = user
          console.log('user info :', user);
          return res.json({
            token,
            user:  {_id, email, name, role } // key=valu
          });

            }
          })
        }
      })
    }else{ //email is not verified
      return res.status(400).json({
        error: "Google login failed. Email not verified"
      });
    }
  })
}