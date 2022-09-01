const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);
router.post("/guestLogin", controller.guestLogin);
router.get("/users", auth, controller.getAllUsers);

module.exports = router;
