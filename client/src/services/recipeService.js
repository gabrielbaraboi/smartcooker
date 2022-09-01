import axios from "axios";
import { authHeader } from "./authentication/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const getRandomRecipes = async () => {
	try {
		const res = await axios.get(API_URL + "random");

		return res.data;
	} catch (err) {
		throw err;
	}
};

export const getRecipeById = async (id) => {
	try {
		const res = await axios.get(API_URL + id);

		return res.data;
	} catch (err) {
		throw err;
	}
};

export const getFavorites = async () => {
	const data = await AsyncStorage.getItem("user");
	let user = JSON.parse(data);
	if (user.role === "guest") return;
	try {
		const headers = await authHeader();
		const res = await axios.get(API_URL + "favorite/get", {
			headers: headers,
		});

		return res.data;
	} catch (err) {
		throw err;
	}
};

export const addFavorite = async (recipeId) => {
	try {
		const headers = await authHeader();
		const res = await axios.post(
			API_URL + "favorite/add",
			{ recipeId },
			{
				headers: headers,
			},
		);

		return res.data;
	} catch (err) {
		throw err;
	}
};

export const removeFavorite = async (recipeId) => {
	try {
		const headers = await authHeader();
		const res = await axios.post(
			API_URL + "favorite/remove",
			{ recipeId },
			{
				headers: headers,
			},
		);

		return res.data;
	} catch (err) {
		throw err;
	}
};
