import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.183:7055/auth/";

export const login = async (data) => {
	try {
		const res = await axios.post(API_URL + "login", data, {
			withCredentials: true,
		});
		if (res.data.user.accessToken) {
			const user = JSON.stringify(res.data.user);
			await AsyncStorage.setItem("user", user);
		}
		return res;
	} catch (err) {
		throw err;
	}
};

export const guestLogin = async () => {
	try {
		const res = await axios.post(API_URL + "guestLogin", {
			withCredentials: true,
		});
		if (res.data.user.accessToken) {
			const user = JSON.stringify(res.data.user);
			await AsyncStorage.setItem("user", user);
		}
		return res;
	} catch (err) {
		throw err;
	}
};

export const register = async (data) => {
	try {
		const res = await axios.post(API_URL + "register", data);
		return res;
	} catch (err) {
		throw err;
	}
};
