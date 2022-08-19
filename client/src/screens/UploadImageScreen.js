import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Button, Image, Linking, StyleSheet, Text, View } from "react-native";
import axios from "axios";

function VisionScreen() {
	const [image, setImage] = useState(null);
	const [status, setStatus] = useState(null);

	const predict = async (data) => {
		try {
			const res = await axios.post(
				"http://192.168.1.183:7055/img/predict",
				{
					withCredentials: true,
					image: data,
				},
			);
			return res.data;
		} catch (err) {
			throw err;
		}
	};

	const takePictureAsync = async () => {
		const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
			base64: true,
		});
		if (!cancelled) {
			setImage(uri);
			setStatus("Loading...");
			try {
				const result = await predict(base64);
				setStatus(result);
			} catch (error) {
				console.log(error);
				setStatus(`Error: ${error.message}`);
			}
		} else {
			setImage(null);
			setStatus(null);
		}
	};

	const pickImage = async () => {
		const { cancelled, uri, base64 } =
			await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				// allowsEditing: true,
				quality: 0.5,
				base64: true,
			});

		if (!cancelled) {
			setImage(uri);
			setStatus("Loading...");
			try {
				await predict(base64)
					.then((result) => {
						setStatus(result[0]);
						console.log(result[0]);
					})
					.catch((error) => {
						console.log(error);
						setStatus(`Error: ${error.message}`);
					});
			} catch (error) {
				console.log(error);
				setStatus(`Error: ${error.message}`);
			}
		} else {
			setImage(null);
			setStatus(null);
		}
	};

	return (
		<View style={styles.container}>
			{image && <Image style={styles.image} source={{ uri: image }} />}
			{status && <Text style={styles.text}>{status}</Text>}
			<Button onPress={takePictureAsync} title="Take a Picture" />
			<Button onPress={pickImage} title="Select a Picture" />
		</View>
	);
}

export default function UploadImageScreen() {
	const [permission, request] = ImagePicker.useMediaLibraryPermissions({
		get: true,
	});

	const requestPermission = async () => {
		if (permission.status === "denied") {
			Linking.openSettings();
		} else {
			request();
		}
	};

	if (!permission) {
		return null;
	}

	if (!permission.granted) {
		return (
			<View style={styles.container}>
				<Text>
					You have not granted permission to use the camera on this
					device!
				</Text>
				<Button
					onPress={requestPermission}
					title="Request Permission"
				/>
			</View>
		);
	}

	return <VisionScreen />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: 300,
		height: 300,
	},
	text: {
		margin: 5,
	},
});
