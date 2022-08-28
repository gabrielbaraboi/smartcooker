import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { View, Text } from "react-native";
import { getRecipeById } from "../services/recipeService";

const SingleRecipeScreen = (props) => {
	const [user, setUser] = useState({});
	const [recipe, setRecipe] = useState(props.route.params.recipe);

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

	useEffect(() => {}, []);

	return (
		<View>
			<Text>{recipe?.title}</Text>
		</View>
	);
};

export default SingleRecipeScreen;
