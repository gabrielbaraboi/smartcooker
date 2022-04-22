import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { theme } from "../core/theme";

export default function Error({ errorText }) {
	return (
		<View style={styles.container}>
			{errorText ? <Text style={styles.error}>{errorText}</Text> : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	error: {
		fontSize: 13,
		color: theme.colors.error,
	},
});
