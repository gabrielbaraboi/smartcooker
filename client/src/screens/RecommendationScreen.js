import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

import Background from "../components/Background";
import Paragraph from "../components/Paragraph";
import { getIngredients } from "../services/ingredientService";
import { filterRecipes } from "../services/recipeService";

const RecommendationScreen = (props) => {
	const [predictions, setPredictions] = useState(
		props.route.params.predictions,
	);
	const [ingredients, setIngredients] = useState([]);
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		getIngredients()
			.then((res) => {
				setIngredients(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		let filterQuery = [];
		ingredients.length > 0 &&
			predictions.forEach((prediction) => {
				filterQuery.push(ingredients[parseInt(prediction)].name);
			});

		filterRecipes(filterQuery)
			.then((res) => {
				setRecipes(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [ingredients, predictions]);

	return (
		<View style={styles.container}>
			<ScrollView>
				{recipes.length > 0 &&
					recipes.map((recipe, index) => (
						<Paragraph key={recipe._id}>
							{index +
								1 +
								" " +
								recipe.title +
								"- " +
								recipe.ingredients_clean.length +
								"/" +
								predictions.length}
						</Paragraph>
					))}
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
