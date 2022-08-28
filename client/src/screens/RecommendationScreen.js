import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import Recipe from "../components/Recipe";

import Background from "../components/Background";
import Paragraph from "../components/Paragraph";
import { getIngredients } from "../services/ingredientService";
import { filterRecipes } from "../services/recipeService";

const RecommendationScreen = (props) => {
	const [predictions, setPredictions] = useState(
		props.route.params.predictions,
	);
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		filterRecipes(predictions)
			.then((res) => {
				setRecipes(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [predictions]);

	return (
		<View style={styles.container}>
			<ScrollView>
				{recipes && recipes.length > 0 ? (
					recipes.map((recipe) => (
						<Recipe key={recipe._id} recipe={recipe} />
					))
				) : (
					<Text>No recipes found</Text>
				)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
	},
	text: {
		fontSize: 20,
		textAlign: "center",
		margin: 10,
		color: "black",
	},
});

export default RecommendationScreen;
