const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	username: { type: String, required: true, minlength: 2 },
});

module.exports = mongoose.model("User", UserSchema);
