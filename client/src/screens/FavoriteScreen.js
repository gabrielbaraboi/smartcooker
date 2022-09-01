import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import Recipe from "../components/Recipe";
import { getFavorites } from "../services/recipeService";
import { Button } from "react-native-paper";
import { theme } from "../core/theme";
import Paragraph from "../components/Paragraph";

const FavoritesScreen = ({ navigation }) => {
	const [user, setUser] = useState({});
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
		loadFavoritesData();
	}, []);

	const loadFavoritesData = () => {
		getFavorites(user?._id)
			.then((res) => {
				setFavoriteRecipes(res);
				setRefreshing(false);
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
						onRefresh={loadFavoritesData}
					/>
				}
			>
				{favoriteRecipes.length > 0 ? (
					favoriteRecipes.map((recipe) => (
						<View key={recipe._id} style={styles.recipe}>
							<Recipe key={recipe._id} recipe={recipe} />
							<View style={styles.buttons}>
								<Button
									icon="open-in-new"
									color="white"
									onPress={() => {
										navigation.navigate("Recipe", {
											recipe,
										});
									}}
									style={styles.button}
								>
									View
								</Button>
							</View>
						</View>
					))
				) : (
					<View style={styles.noRecipes}>
						<Paragraph style={styles.noRecipesText}>
							You have no favorite recipes.
						</Paragraph>
					</View>
				)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
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
	noRecipes: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	noRecipesText: {
		fontSize: 20,
	},
});

export default FavoritesScreen;
