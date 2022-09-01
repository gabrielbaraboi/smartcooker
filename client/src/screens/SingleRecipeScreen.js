import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { theme } from "../core/theme";
import Paragraph from "../components/Paragraph";
import { ScrollView } from "react-native-gesture-handler";
import {
	addFavorite,
	getFavorites,
	removeFavorite,
} from "../services/recipeService";

const SingleRecipeScreen = (props) => {
	const [user, setUser] = useState({});
	const [recipe, setRecipe] = useState(props.route.params.recipe);
	const [favoriteRecipes, setFavoriteRecipes] = useState([]);

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

	useEffect(() => {
		loadFavoritesData();
	}, []);

	const loadFavoritesData = () => {
		getFavorites(user?._id)
			.then((res) => {
				setFavoriteRecipes(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const isFavorite = (recipe) => {
		return (
			favoriteRecipes.length > 0 &&
			favoriteRecipes.some((f) => f._id === recipe._id)
		);
	};

	const addFavoriteRecipe = (recipeId) => {
		addFavorite(recipeId)
			.then(() => {
				loadFavoritesData();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const removeFavoriteRecipe = (recipeId) => {
		removeFavorite(recipeId)
			.then(() => {
				loadFavoritesData();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	console.log(recipe);

	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.header}>
					<Text style={styles.title}>{recipe?.title}</Text>
					{user.role !== "guest" && (
						<IconButton
							icon="heart"
							color={
								isFavorite(recipe)
									? theme.colors.primary
									: theme.colors.secondary
							}
							size={30}
							onPress={() =>
								!isFavorite(recipe)
									? addFavoriteRecipe(recipe._id)
									: removeFavoriteRecipe(recipe._id)
							}
						/>
					)}
				</View>
				<View style={styles.units}>
					{recipe?.calories ? (
						<Text style={styles.unit}>
							{recipe?.calories + ` kcal`}
						</Text>
					) : null}
					{recipe?.fat ? (
						<Text style={styles.unit}>{recipe?.fat + ` fat`}</Text>
					) : null}
					{recipe?.protein ? (
						<Text style={styles.unit}>
							{recipe?.protein + ` protein`}
						</Text>
					) : null}
					{recipe?.carbs ? (
						<Text style={styles.unit}>
							{recipe?.sodium + ` sodium`}
						</Text>
					) : null}
					{recipe?.rating ? (
						<Text style={styles.unit}>
							{recipe?.rating + `/5 rating`}
						</Text>
					) : null}
				</View>
				<View style={styles.body}>
					{recipe.desc && (
						<View>
							<Paragraph style={styles.paragraph}>
								Description
							</Paragraph>
							<Text style={styles.description}>
								{recipe?.desc}
							</Text>
						</View>
					)}
					{recipe.ingredients.length > 0 && (
						<View>
							<Paragraph style={styles.paragraph}>
								Ingredients
							</Paragraph>
							<Text style={styles.ingredients}>
								{recipe?.ingredients.map((ingredient) => (
									<Text
										key={ingredient}
										style={styles.ingredient}
									>
										{ingredient + "\n"}
									</Text>
								))}
							</Text>
						</View>
					)}
					{recipe.directions.length > 0 && (
						<View>
							<Paragraph style={styles.paragraph}>
								Directions
							</Paragraph>
							<Text style={styles.directions}>
								{recipe?.directions.map((direction) => (
									<Text
										key={direction}
										style={styles.direction}
									>
										{direction + " "}
									</Text>
								))}
							</Text>
						</View>
					)}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		margin: 10,
		borderRadius: 10,
		backgroundColor: "#fff",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "left",
		maxWidth: "90%",
	},
	paragraph: {
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "left",
		marginTop: 10,
	},
	units: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginTop: 10,
	},
	unit: {
		backgroundColor: theme.colors.primary,
		color: "#fff",
		padding: 8,
		paddingTop: 4,
		paddingBottom: 4,
		borderRadius: 15,
		fontSize: 12,
		marginRight: 10,
	},
	description: {
		fontSize: 14,
		textAlign: "left",
	},
	ingredients: {
		fontSize: 14,
		textAlign: "left",
	},
	ingredient: {
		fontSize: 14,
		textAlign: "left",
		marginBottom: 5,
	},
	directions: {
		justifyContent: "space-around",
		fontSize: 14,
		textAlign: "left",
	},
});

export default SingleRecipeScreen;
