const express = require('express'); 
const router = express.Router()
const { signup, signin, accountActivation } = require("../controllers/auth");


const {
  userSignupValidator,
  userSignInValidator
} = require("../validators/auth"); // just array of check result. 
const {runValidataion} = require('../validators') // actuall Middleware. 

router.post('/signup', userSignupValidator, runValidataion, signup); // without correct order, validation would not work. 
// app sent it to router, router give it to the controller

router.post("/account-activation", accountActivation);
router.post("/signin", userSignInValidator, runValidataion, signin);
module.exports = router