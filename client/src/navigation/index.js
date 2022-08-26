import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import AccountNavigator from "./AccountNavigator";
import { AuthContext } from "../services/authentication/auth.provider";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const Navigation = () => {
	const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
	const { getItem } = useAsyncStorage("user");

	useEffect(() => {
		const checkIfUserIsLoggedIn = async () => {
			const item = await getItem();

			if (item !== null) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		};

		checkIfUserIsLoggedIn();
	}, []);

	return (
		<NavigationContainer>
			{isLoggedIn ? <AppNavigator /> : <AccountNavigator />}
		</NavigationContainer>
	);
};

export default Navigation;
