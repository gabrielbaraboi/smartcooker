import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/account/AccountScreen";
import LoginScreen from "../screens/account/LoginScreen";
import RegisterScreen from "../screens/account/RegisterScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="AccountScreen"
			screenOptions={{
				headerShown: true,
			}}
		>
			<Stack.Screen name="AccountScreen" component={AccountScreen} />
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Register" component={RegisterScreen} />
		</Stack.Navigator>
	);
};

export default AccountNavigator;
