const mongoose = require("mongoose");

var MealSchema = new mongoose.Schema({
	name: { type: String, required: true, minlength: 2 },
	description: { type: String, required: true, minlength: 2 },
	ingredients: { type: [mongoose.Schema.Types.ObjectId], ref: "Ingredient" },
	image: { type: String, required: false, minlength: 2 },
	category: { type: [mongoose.Schema.Types.ObjectId], ref: "MealCategory" },
});

module.exports = mongoose.model("Meal", MealSchema);
