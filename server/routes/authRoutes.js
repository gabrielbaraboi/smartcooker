const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const auth = require("../middleware/auth");

//REGISTER
router.post("/register", controller.registerUser);

//LOGIN
router.post("/login", controller.loginUser);
router.post("/guestLogin", controller.guestLogin);

//GET ALL USERS
router.get("/users", auth, controller.getAllUsers);

module.exports = router;
