const express = require("express");
const router = express.Router();
const controller = require("../controllers/recipeController");

router.get("/count", controller.countRecipes);
router.get("/filter", controller.filterRecipesByIngredients);
router.get("/all", controller.getRecipes);

module.exports = router;
