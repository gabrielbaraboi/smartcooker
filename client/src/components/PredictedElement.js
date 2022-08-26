import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

export default function PredictedElement({ image, status }) {
	return (
		<View style={styles.container}>
			<Image source={{ uri: image }} style={styles.image} />
			<Text style={styles.text}>{status}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		margin: 10,
		marginBottom: 0,
		backgroundColor: "#fff",
	},
	image: {
		width: 60,
		height: 60,
	},
	text: {
		color: "black",
		fontSize: 12,
		textAlign: "center",
	},
});
