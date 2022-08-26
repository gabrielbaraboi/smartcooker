import axios from "axios";

const API_URL = "http://192.168.1.183:7055/recipe/";

export const filterRecipes = async (ingredients) => {
	try {
		const res = await axios.get(API_URL + "filter", {
			params: {
				ingredients: ingredients,
			},
		});

		return res.data;
	} catch (err) {
		throw err;
	}
};
