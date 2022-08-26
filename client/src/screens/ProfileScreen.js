import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { View, Text } from "react-native";
import Background from "../components/Background";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { AuthContext } from "../services/authentication/auth.provider";

const ProfileScreen = () => {
	const [user, setUser] = useState({});
	const { setIsLoggedIn } = useContext(AuthContext);

	const logout = async () => {
		await AsyncStorage.removeItem("user");
		setIsLoggedIn(false);
	};

	const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("user");
			return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch (e) {
			// error reading value
		}
	};

	useEffect(() => {
		getData().then((data) => {
			setUser(data);
		});
	}, []);

	return (
		<Background>
			<Paragraph>
				Hello, {user?.username} {"\n"} Role: {user?.role}
			</Paragraph>
			<Button mode="outlined" onPress={logout}>
				Logout
			</Button>
		</Background>
	);
};

export default ProfileScreen;
