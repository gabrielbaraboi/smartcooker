import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import Recipe from "../components/Recipe";
import {
	addFavorite,
	getFavorites,
	getRandomRecipes,
	removeFavorite,
} from "../services/recipeService";
import { Button, IconButton, Text } from "react-native-paper";
import { theme } from "../core/theme";

const HomeScreen = ({ navigation }) => {
	const [user, setUser] = useState({});
	const [recipes, setRecipes] = useState([]);
	const [refreshing, setRefreshing] = useState(true);
	const [favoriteRecipes, setFavoriteRecipes] = useState([]);
	const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("user");
			return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getData().then((data) => {
			setUser(data);
		});
	}, []);

	useEffect(() => {
		loadRecipesData();
	}, []);

	const loadRecipesData = () => {
		getRandomRecipes()
			.then((res) => {
				setRecipes(res);
				setRefreshing(false);
			})
			.catch((err) => {
				console.log(err);
			});
		getFavorites(user?._id)
			.then((res) => {
				setFavoriteRecipes(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

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

	return (
		<View style={styles.container}>
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={loadRecipesData}
					/>
				}
			>
				{recipes.map((recipe) => (
					<View key={recipe._id} style={styles.recipe}>
						<Recipe key={recipe._id} recipe={recipe} />
						<View style={styles.buttons}>
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
							<Button
								icon="open-in-new"
								color="white"
								onPress={() => {
									navigation.navigate("Recipe", { recipe });
								}}
								style={styles.button}
							>
								View
							</Button>
						</View>
					</View>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "85%",
		width: "100%",
		alignContent: "center",
	},
	recipe: {
		flexBasis: "22%",
		margin: 5,
		padding: 5,
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: "white",
		borderRadius: 10,
		shadowColor: "#00000030",
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},
	buttons: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	button: {
		backgroundColor: theme.colors.primary,
	},
});

export default HomeScreen;
