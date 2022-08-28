import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../services/authentication/auth.provider";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import Recipe from "../components/Recipe";
import {
	addFavorite,
	getFavorites,
	getRandomRecipes,
	removeFavorite,
} from "../services/recipeService";
import { IconButton, Text } from "react-native-paper";

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
					<View key={recipe._id}>
						<Recipe key={recipe._id} recipe={recipe} />
						<IconButton
							icon="heart"
							color={isFavorite(recipe) ? "red" : "black"}
							size={30}
							onPress={() =>
								!isFavorite(recipe)
									? addFavoriteRecipe(recipe._id)
									: removeFavoriteRecipe(recipe._id)
							}
						/>
						<IconButton
							icon="open-in-new"
							color="black"
							size={30}
							onPress={() => {
								navigation.navigate("Single", { recipe });
							}}
						/>
					</View>
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
