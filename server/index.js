require("dotenv").config();
require("./config/database.js").connect();

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const listener = app.listen(7055, function () {
	console.log("Listening on port " + listener.address().port);
});

const authenticantion = require("./routes/userRoutes");

app.use(bodyParser.json());
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	}),
);
app.use(cookieParser());

app.use("/auth", authenticantion);

module.exports = app;
