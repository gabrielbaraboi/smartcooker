import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

const TAB_ICON = {
	Home: "home",
	Profile: "person-outline",
	Settings: "settings",
};

const Tab = createBottomTabNavigator();

const createScreenOptions = ({ route }) => {
	const iconName = TAB_ICON[route.name];

	return {
		tabBarIcon: ({ size, color }) => (
			<Ionicons name={iconName} size={size} color={color} />
		),
	};
};

const AppNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={createScreenOptions}
			tabBarOptions={{
				activeTintColor: "#e91e63",
				inactiveTintColor: "gray",
				showLabel: false,
				style: {
					backgroundColor: "#fff",
					borderTopColor: "#e91e63",
					borderTopWidth: 1,
					height: 60,
				},
			}}
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
			<Tab.Screen name="Settings" component={SettingsScreen} />
		</Tab.Navigator>
	);
};

export default AppNavigator;
