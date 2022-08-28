import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

const Recipe = ({ recipe }) => {
	return (
		<View style={styles.recipe}>
			<Text style={styles.title}>{recipe?.title}</Text>
			<Text style={styles.desc}>{recipe?.desc}</Text>
			<IngredientsList ingredients={recipe?.ingredients} />
		</View>
	);
};

function IngredientsList({ ingredients }) {
	return (
		<View style={styles.ingredients}>
			{ingredients &&
				ingredients.map((ingredient, index) => (
					<Text style={styles.ingredientName} key={index}>
						{ingredient}
					</Text>
				))}
		</View>
	);
}

export default Recipe;

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		overflow: "hidden",
		marginBottom: 10,
	},
	ingredients: {
		marginBottom: 8,
		marginRight: 15,
		marginLeft: 15,
	},
	ingredient: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
		padding: 8,
		borderRadius: 4,
		backgroundColor: "#f5f5f5",
	},
	recipe: {
		flex: 1,
		padding: 8,
		margin: 8,
		borderRadius: 4,
		backgroundColor: "#eee",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 8,
	},
	description: {
		fontSize: 15,
		marginBottom: 16,
	},
});
