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
				headerShown: false,
			}}
		>
			<Stack.Screen name="AccountScreen" component={AccountScreen} />
			<Stack.Screen name="LoginScreen" component={LoginScreen} />
			<Stack.Screen name="RegisterScreen" component={RegisterScreen} />
		</Stack.Navigator>
	);
};

export default AccountNavigator;
