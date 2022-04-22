import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import AccountNavigator from "./AccountNavigator";
import { StyleSheet } from "react-native";
import { AuthContext } from "../services/authentication/auth.provider";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const Navigation = () => {
	const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
	const { getItem } = useAsyncStorage("user");
	const [checking, setIsChecking] = useState(true);

	useEffect(() => {
		const checkIfUserIsLoggedIn = async () => {
			const item = await getItem();

			// user is logged in
			if (item !== null) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}

			setIsChecking(false);
		};

		checkIfUserIsLoggedIn();
	}, []);

	// if (checking) {
	// 	return (
	// 		<View style={styles.container}>
	// 			<ActivityIndicator />
	// 		</View>
	// 	);
	// }

	return (
		<NavigationContainer>
			{isLoggedIn ? <AppNavigator /> : <AccountNavigator />}
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Navigation;
