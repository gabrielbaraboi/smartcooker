import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/account/AccountScreen";
import LoginScreen from "../screens/account/LoginScreen";
import RegisterScreen from "../screens/account/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import ResetPasswordScreen from "../screens/account/ResetPasswordScreen";

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
			<Stack.Screen name="HomeScreen" component={HomeScreen} />
			<Stack.Screen name="LoginScreen" component={LoginScreen} />
			<Stack.Screen name="RegisterScreen" component={RegisterScreen} />
			<Stack.Screen
				name="ResetPasswordScreen"
				component={ResetPasswordScreen}
			/>
		</Stack.Navigator>
	);
};

export default AccountNavigator;
