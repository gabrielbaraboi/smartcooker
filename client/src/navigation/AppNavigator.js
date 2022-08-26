import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import UploadImageScreen from "../screens/UploadImageScreen";
import { StyleSheet } from "react-native";
import { theme } from "../core/theme";
import { createStackNavigator } from "@react-navigation/stack";
import RecommendationScreen from "../screens/RecommendationScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Home = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Home") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "Profile") {
						iconName = focused ? "person" : "person-outline";
					} else if (route.name === "Upload Image") {
						iconName = "camera";
						size = size * 1;
					}

					return (
						<Ionicons name={iconName} size={size} color={color} />
					);
				},
				tabBarActiveTintColor: "white",
				tabBarInactiveTintColor: "white",
				tabBarShowLabel: false,
				tabBarStyle: {
					position: "absolute",
					bottom: 20,
					left: 20,
					right: 20,
					elevation: 0,
					borderRadius: 30,
					backgroundColor: "#292929",
					height: 70,
					...styles.shadow,
				},
			})}
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen
				name="Upload Image"
				component={UploadImageScreen}
				options={{
					tabBarIconStyle: {
						backgroundColor: "#fe5454",
						height: 80,
						width: 50,
						marginTop: 10,
						marginBottom: 10,
						borderRadius: 50,
						...styles.shadow,
					},
				}}
			/>
			<Tab.Screen name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
	);
};

const AppNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				component={Home}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="RecommendationScreen"
				component={RecommendationScreen}
			/>
			{/* <Stack.Screen name="Settings" component={Settings} /> */}
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
	shadow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},
});

export default AppNavigator;
