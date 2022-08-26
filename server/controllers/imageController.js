const spawn = require("child_process").spawn;
const sharp = require("sharp");

const prediction = async (req, res) => {
	try {
		const { image } = req.body;

		var img = new Buffer.alloc(image.length, image, "base64");
		sharp(img)
			.resize(224, 224)
			.toBuffer()
			.then((resizedImageBuffer) => {
				let resizedImageData = resizedImageBuffer.toString("base64");
				let resizedBase64 = `${resizedImageData}`;
				const process = spawn("python", [
					"./python/main.py",
					resizedBase64,
				]);

				process.stdout.on("data", function (data) {
					const result = data.toString();
					res.status(200).json(result.replace(/\D/g, ""));
				});
			});
	} catch (err) {
		console.log(err);
	}
};

module.exports = { prediction };
