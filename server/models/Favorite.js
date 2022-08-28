const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

module.exports = mongoose.model("Favorite", FavoriteSchema);
