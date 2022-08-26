import axios from "axios";

const API_URL = "http://192.168.1.183:7055/img/";

export const predict = async (data) => {
	try {
		const res = await axios.post(API_URL + "predict", {
			withCredentials: true,
			image: data,
		});
		return res.data;
	} catch (err) {
		throw err;
	}
};
