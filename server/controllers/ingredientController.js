const Ingredient = require("../models/Ingredient");

const createIngredient = async (req, res) => {
	try {
		const { model_id, name, display_name } = req.body;

		if (!(model_id && name && display_name)) {
			return res
				.status(400)
				.json({ message: "All inputs are required!" });
		}

		if (await Ingredient.findOne({ model_id })) {
			return res.status(400).json({ message: "Model id already used!" });
		}

		await Ingredient.create({
			model_id,
			name,
			display_name,
		});

		res.status(200).json({ message: "Ingredient created successfully!" });
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Create ingredient failed!" });
	}
};

const getAllIngredients = async (req, res) => {
	try {
		const ingredients = await Ingredient.find();
		res.status(200).json(ingredients);
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Get ingredients failed!" });
	}
};

module.exports = { createIngredient, getAllIngredients };
