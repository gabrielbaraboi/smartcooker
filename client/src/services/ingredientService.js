import axios from "axios";

const API_URL = "http://192.168.1.183:7055/ingredient/";

export const getIngredients = async () => {
	try {
		const res = await axios.get(API_URL + "all");
		return res.data;
	} catch (err) {
		throw err;
	}
};
