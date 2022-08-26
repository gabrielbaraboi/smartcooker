const Recipe = require("../models/Recipe");

const filterRecipesByIngredients = async (req, res) => {
	try {
		let { ingredients } = req.query;
		if (typeof ingredients === "string") {
			ingredients = ingredients.split(",");
		}

		console.log(ingredients);

		if (!ingredients) {
			return res
				.status(400)
				.json({ message: "Ingredients are required!" });
		}

		const recipes = await Recipe.find({
			ingredients_clean: { $in: ingredients },
		});

		const results = sortRecipes(recipes, ingredients);

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

const getRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.find().sort({ rating: -1 });

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

module.exports = { countRecipes, filterRecipesByIngredients, getRecipes };
