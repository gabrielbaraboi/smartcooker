const mongoose = require("mongoose");

var MealCategorySchema = new mongoose.Schema({
	name: { type: String, required: true, minlength: 2 },
	description: { type: String, required: true, minlength: 2 },
	image: { type: String, required: false, minlength: 2 },
});

module.exports = mongoose.model("MealCategory", MealCategorySchema);
