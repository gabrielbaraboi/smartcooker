const mongoose = require("mongoose");

var IngredientSchema = new mongoose.Schema({
	name: { type: String, required: true, minlength: 2 },
	description: { type: String, required: true, minlength: 2 },
	category: { type: String, required: true, minlength: 2 },
});

module.exports = mongoose.model("Ingredient", IngredientSchema);
