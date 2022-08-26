const express = require("express");
const router = express.Router();
const controller = require("../controllers/ingredientController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

router.post("/new", auth, isAdmin, controller.createIngredient);
router.get("/all", controller.getAllIngredients);

module.exports = router;
