const express = require("express");
const router = express.Router();
const controller = require("../controllers/recipeController");
const auth = require("../middleware/auth");

router.get("/count", controller.countRecipes);
router.get("/filter", controller.filterRecipesByIngredients);
router.get("/random", controller.getRandomRecipes);
router.get("/:id", controller.getRecipeById);
router.post("/favorite/add", auth, controller.addFavorite);
router.post("/favorite/remove", auth, controller.removeFavorite);
router.get("/favorite/get", auth, controller.getFavorites);

module.exports = router;
