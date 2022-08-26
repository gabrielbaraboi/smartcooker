const mongoose = require("mongoose");

var RecipeSchema = new mongoose.Schema({
	title: { type: String, required: true, minlength: 2 },
	directions: [{ type: String, required: true, minlength: 2 }],
	ingredients: [{ type: String, required: true, minlength: 2 }],
	ingredients_clean: [{ type: String, required: true, minlength: 2 }],
	categories: [{ type: String, required: true, minlength: 2 }],
	desc: { type: String, required: true, minlength: 2 },
	fat: { type: Number, required: true },
	calories: { type: Number, required: true },
	protein: { type: Number, required: true },
	sodium: { type: Number, required: true },
	rating: { type: Number, required: true },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
