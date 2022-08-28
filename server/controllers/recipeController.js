const Recipe = require("../models/Recipe");
const Favorite = require("../models/Favorite");
const User = require("../models/User");

const filterRecipesByIngredients = async (req, res) => {
	try {
		let { ingredients } = req.query;
		if (typeof ingredients === "string") {
			ingredients = ingredients.split(",");
		}

		ingredients = [...new Set(ingredients)];
		console.log(ingredients);
		const recipes = await Recipe.find({
			ingredients_clean: { $in: ingredients },
		});

		const results = sortRecipes(recipes, ingredients);
		console.log(results.length);

		res.status(200).json(results.slice(0, 20));
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Filter recipes failed!" });
	}
};

function sortRecipes(recipes, ingredients) {
	const results = recipes
		.map((recipe) => {
			let matching_count = 0;
			let matching_ratio = 0;
			for (let i = 0; i < ingredients.length; i++) {
				if (recipe.ingredients_clean.includes(ingredients[i])) {
					matching_count++;
				}
				matching_ratio =
					matching_count / recipe.ingredients_clean.length;
			}
			return {
				...recipe._doc,
				matching_count,
				matching_ratio,
			};
		})
		.sort((a, b) => {
			let ratioDiff = b.matching_ratio - a.matching_ratio;
			if (ratioDiff === 0) {
				return b.matching_count - a.matching_count;
			}
			return ratioDiff;
		});
	return results;
}

const addFavorite = async (req, res) => {
	try {
		const { recipeId } = req.body;
		const userId = req.user._id;

		const favorites = await Favorite.findOne({ user: userId });
		if (favorites && favorites.favorites.includes(recipeId)) {
			res.status(400).json({ message: "Recipe already in favorites!" });
			return;
		} else if (!favorites) {
			const newFavorite = new Favorite({
				user: userId,
				favorites: [recipeId],
			});
			await newFavorite.save();
		} else {
			favorites.favorites.push(recipeId);
			await favorites.save();
		}
		res.status(200).json({ message: "Favorite added!" });
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Failed to add recipe to favorites!" });
	}
};

const getFavorites = async (req, res) => {
	try {
		const userId = req.user._id;
		const favorites = await Favorite.findOne({ user: userId });
		if (!favorites) {
			res.status(200).json({ message: "No favorites found!" });
		} else {
			const recipes = await Recipe.find({
				_id: { $in: favorites.favorites },
			});
			res.status(200).json(recipes);
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Get favorites failed!" });
	}
};

const removeFavorite = async (req, res) => {
	try {
		const { recipeId } = req.body;
		const userId = req.user._id;
		const favorite = await Favorite.findOne({ user: userId });
		if (!favorite) {
			res.status(200).json({ message: "No favorites found!" });
		} else {
			const index = favorite.favorites.indexOf(recipeId);
			favorite.favorites.splice(index, 1);
			await favorite.save();
			res.status(200).json({ message: "Favorite removed!" });
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Remove favorite failed!" });
	}
};

const getRandomRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.aggregate([
			{
				$sample: { size: 20 },
			},
		]);

		res.status(200).json(recipes);
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Get recipes failed!" });
	}
};

const countRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.find();
		res.status(200).json(recipes.length);
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Count meal failed!" });
	}
};

const getRecipeById = async (req, res) => {
	try {
		const { id } = req.params;
		const recipe = await Recipe.findById(id);
		res.status(200).json(recipe);
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Get recipe failed!" });
	}
};

module.exports = {
	countRecipes,
	filterRecipesByIngredients,
	getRandomRecipes,
	addFavorite,
	getFavorites,
	removeFavorite,
	getRecipeById,
};
