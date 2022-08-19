import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function Recipe(recipe) {
	return (
		<View style={styles.recipe}>
			<Text style={styles.title}>{recipe.title}</Text>
			<Image source={{ uri: recipe.image }} style={styles.image} />
			<Text style={styles.description}>
				{recipe.description.slice(0, 50)}
			</Text>
			<IngredientsList ingredients={recipe.ingredients} />
		</View>
	);
}

function IngredientsList({ ingredients }) {
	return (
		<View style={styles.ingredients}>
			{ingredients.map((ingredient) => (
				<Ingredient key={ingredient.id} {...ingredient} />
			))}
		</View>
	);
}

function Ingredient({ name, quantity, unit }) {
	return (
		<View style={styles.ingredient}>
			<Text style={styles.ingredientName}>{name}</Text>
			<Text style={styles.ingredientQuantity}>
				{quantity} {unit}
			</Text>
		</View>
	);
}

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
