import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import AccountNavigator from "./AccountNavigator";

const Navigation = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	return (
		<NavigationContainer>
			{isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
		</NavigationContainer>
	);
};

export default Navigation;
