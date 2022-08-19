const spawn = require("child_process").spawn;

const prediction = async (req, res) => {
	try {
		const { image } = req.body;
		const process = spawn("python", ["./python/main.py", image]);

		process.stdout.on("data", function (data) {
			const result = data.toString();
			res.status(200).json(result.split("\n"));
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports = { prediction };
