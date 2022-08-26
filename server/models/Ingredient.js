const mongoose = require("mongoose");

var IngredientSchema = new mongoose.Schema({
	model_id: { type: String, required: true },
	name: { type: String, required: true, minlength: 2 },
	display_name: { type: String, required: true, minlength: 2 },
});

module.exports = mongoose.model("Ingredient", IngredientSchema);
