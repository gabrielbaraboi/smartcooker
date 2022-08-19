const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
	try {
		const { email, username, password } = req.body;
		console.log(req.body);

		if (!(email && username && password)) {
			return res
				.status(400)
				.json({ message: "All inputs are required!" });
		}

		if (await isEmailAlreadyUsed(email))
			return res.status(400).json({ message: "Email already used!" });

		await User.create({
			email: email.toLowerCase(),
			username,
			password: await encryptPass(password),
		});
		res.status(200).json({ message: "User created successfully!" });
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Register failed!" });
	}
};

const loginUser = async (req, res) => {
	console.log(req.body);
	try {
		let responseUser;
		const { email, password } = req.body;

		if (!(email && password)) {
			res.status(400).json({ message: "All inputs are required!" });
		}

		const user = await User.findOne({ email });

		if (user && (await bcrypt.compare(password, user.password))) {
			responseUser = {
				id: user._id,
				email: user.email,
				username: user.username,
				role: user.role,
			};
			responseUser.accessToken = generateToken(responseUser);
			console.log(email, "logged in");
			res.status(200).json({ user: responseUser });
		} else {
			res.status(400).json({ message: "Invalid email or password!" });
		}
	} catch (err) {
		console.log(err);
	}
};

const guestLogin = async (req, res) => {
	try {
		let responseUser;

		responseUser = {
			username: "Guest",
			role: "guest",
		};
		responseUser.accessToken = generateToken(responseUser);
		console.log("guest logged in");
		res.status(200).json({ user: responseUser });
	} catch (err) {
		console.log(err);
	}
};

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).json({ users });
	} catch (err) {
		console.log(err);
	}
};

async function encryptPass(pass) {
	encryptedPassword = await bcrypt.hash(pass, 10);
	return encryptedPassword;
}

function generateToken(accType) {
	const token = jwt.sign({ _id: accType.id }, process.env.TOKEN_KEY, {
		expiresIn: 86400,
	});
	return token;
}

async function isEmailAlreadyUsed(email) {
	const user = await User.findOne({ email });
	if (user) return true;

	return false;
}

module.exports = {
	registerUser,
	loginUser,
	getAllUsers,
	guestLogin,
};
