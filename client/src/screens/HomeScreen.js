import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../services/authentication/auth.provider";
import { ScrollView, StyleSheet, View } from "react-native";
import Recipe from "../components/Recipe";

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
			console.log(jsonValue !== null ? JSON.parse(jsonValue) : null);
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

	const recipes = [
		{
			id: 1,
			title: "Pizza",
			image: "https://www.simplyrecipes.com/thmb/8caxM88NgxZjz-T2aeRW3xjhzBg=/2000x1125/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-8f256746d649404baa36a44d271329bc.jpg",
			description:
				"Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven.",
			ingredients: [
				{
					id: 1,
					name: "Dough",
					quantity: "1",
					unit: "kg",
				},
				{
					id: 2,
					name: "Tomato",
					quantity: "1",
					unit: "kg",
				},
				{
					id: 3,
					name: "Cheese",
					quantity: "1",
					unit: "kg",
				},
			],
		},
		{
			id: 2,
			title: "Pizza",
			image: "https://www.simplyrecipes.com/thmb/8caxM88NgxZjz-T2aeRW3xjhzBg=/2000x1125/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-8f256746d649404baa36a44d271329bc.jpg",
			description:
				"Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven.",
			ingredients: [
				{
					id: 1,
					name: "Dough",
					quantity: "1",
					unit: "kg",
				},
				{
					id: 2,
					name: "Tomato",
					quantity: "1",
					unit: "kg",
				},
				{
					id: 3,
					name: "Cheese",
					quantity: "1",
					unit: "kg",
				},
			],
		},
		{
			id: 3,
			title: "Pizza",
			image: "https://www.simplyrecipes.com/thmb/8caxM88NgxZjz-T2aeRW3xjhzBg=/2000x1125/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-8f256746d649404baa36a44d271329bc.jpg",
			description:
				"Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven.",
			ingredients: [
				{
					id: 1,
					name: "Dough",
					quantity: "1",
					unit: "kg",
				},
				{
					id: 2,
					name: "Tomato",
					quantity: "1",
					unit: "kg",
				},
				{
					id: 3,
					name: "Cheese",
					quantity: "1",
					unit: "kg",
				},
			],
		},
		{
			id: 4,
			title: "Pizza",
			image: "https://www.simplyrecipes.com/thmb/8caxM88NgxZjz-T2aeRW3xjhzBg=/2000x1125/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-8f256746d649404baa36a44d271329bc.jpg",
			description:
				"Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven.",
			ingredients: [
				{
					id: 1,
					name: "Dough",
					quantity: "1",
					unit: "kg",
				},
				{
					id: 2,
					name: "Tomato",
					quantity: "1",
					unit: "kg",
				},
				{
					id: 3,
					name: "Cheese",
					quantity: "1",
					unit: "kg",
				},
			],
		},
		{
			id: 5,
			title: "Pizza",
			image: "https://www.simplyrecipes.com/thmb/8caxM88NgxZjz-T2aeRW3xjhzBg=/2000x1125/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-8f256746d649404baa36a44d271329bc.jpg",
			description:
				"Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven.",
			ingredients: [
				{
					id: 1,
					name: "Dough",
					quantity: "1",
					unit: "kg",
				},
				{
					id: 2,
					name: "Tomato",
					quantity: "1",
					unit: "kg",
				},
				{
					id: 3,
					name: "Cheese",
					quantity: "1",
					unit: "kg",
				},
			],
		},
		{
			id: 6,
			title: "Pizza",
			image: "https://www.simplyrecipes.com/thmb/8caxM88NgxZjz-T2aeRW3xjhzBg=/2000x1125/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-8f256746d649404baa36a44d271329bc.jpg",
			description:
				"Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven.",
			ingredients: [
				{
					id: 1,
					name: "Dough",
					quantity: "1",
					unit: "kg",
				},
				{
					id: 2,
					name: "Tomato",
					quantity: "1",
					unit: "kg",
				},
				{
					id: 3,
					name: "Cheese",
					quantity: "1",
					unit: "kg",
				},
			],
		},
	];

	return (
		<View style={styles.container}>
			<ScrollView>
				{recipes.map((recipe) => (
					<Recipe key={recipe.id} {...recipe} />
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "85%",
	},
});

export default HomeScreen;
