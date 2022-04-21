const mongoose = require("mongoose");

const { MONGO_URI } = process.env;
mongoose.set("returnOriginal", false);
exports.connect = () => {
	mongoose
		.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("Connected to Database");
		})
		.catch((error) => {
			console.log("DB connection failed");
			console.error(error);
			process.exit(1);
		});
};
