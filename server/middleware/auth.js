const jwt = require("jsonwebtoken");
const config = process.env;

const auth = (req, res, next) => {
	const token = req.headers["x-access-token"];
	if (!token) {
		return res.status(403).json({ message: "Token is required for login" });
	}
	try {
		const decoded = jwt.verify(token, config.TOKEN_KEY);
		req.user = decoded;
		if (req.user.role === "guest") {
			return res.status(403).json({
				message: "You are not authorized to access this resource",
			});
		}
		next();
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Token is not valid" });
	}
};

module.exports = auth;
