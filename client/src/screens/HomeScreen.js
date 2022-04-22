import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { AuthContext } from "../services/authentication/auth.provider";

const HomeScreen = () => {
	const [user, setUser] = useState({});
	const { setIsLoggedIn } = React.useContext(AuthContext);

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
			<Logo />
			<Header>Let’s start</Header>
			<Paragraph>Hello, {user.username}</Paragraph>
			<Button mode="outlined" onPress={logout}>
				Logout
			</Button>
		</Background>
	);
};

export default HomeScreen;
