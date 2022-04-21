import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";

const HomeScreen = ({ navigation }) => {
	const [user, setUser] = useState({});

	// const getData = async () => {
	// 	try {
	// 		const value = await AsyncStorage.getItem("user");
	// 		if (value !== null) {
	// 			setUser(value);
	// 		}
	// 	} catch (e) {
	// 		// error reading value
	// 	}
	// };

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
			<Button
				mode="outlined"
				onPress={() =>
					navigation.reset({
						index: 0,
						routes: [{ name: "AccountScreen" }],
					})
				}
			>
				Logout
			</Button>
		</Background>
	);
};

export default HomeScreen;
