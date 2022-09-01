import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const Recipe = ({ recipe }) => {
	return (
		<View style={styles.recipe}>
			<Text style={styles.title}>{recipe?.title}</Text>
			<Text style={styles.desc}>
				{recipe.desc
					? recipe.desc.split(" ").slice(0, 30).join(" ") + "..."
					: recipe.directions
							.join(" ")
							.split(" ")
							.slice(0, 30)
							.join(" ") + "..."}
			</Text>
		</View>
	);
};

export default Recipe;

const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
		color: "black",
	},
	desc: {
		fontSize: 15,
		marginBottom: 4,
		color: "black",
	},
});
