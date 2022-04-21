const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const auth = require("../middleware/auth");

//REGISTER
router.post("/register", controller.registerUser);

//LOGIN
router.post("/login", controller.loginUser);

module.exports = router;
