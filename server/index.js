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

const authenticantion = require("./routes/authRoutes");
const image = require("./routes/imageRoutes");

app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser({ limit: "50mb" }));
app.use(express.json());
app.use(
	cors({
		origin: "http://192.168.237.10:19000",
		credentials: true,
	}),
);
app.use(cookieParser());

app.use("/auth", authenticantion);
app.use("/img", image);

module.exports = app;
