const express = require("express");
const router = express.Router();

const { requireSignin, adminMiddleware } = require("../controllers/auth");
//read callback
const { read, update } = require("../controllers/user");


router.get("/user/:id",requireSignin, read); 
router.put("/user/update", requireSignin, update); 
//check the restriction, only for each user. 

router.put("/admin/update", requireSignin, adminMiddleware, update); 


module.exports = router;
