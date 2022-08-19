const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	username: { type: String, required: true, minlength: 2 },
	role: { type: String, required: true, default: "user" },
});

module.exports = mongoose.model("User", UserSchema);
