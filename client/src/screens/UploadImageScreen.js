import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
	Button,
	Image,
	Linking,
	ScrollView,
	StyleSheet,
	Text,
	View,
	Modal,
	Pressable,
	Picker,
} from "react-native";
import { getIngredients } from "../services/ingredientService";
import PredictedElement from "../components/PredictedElement";
import { predict } from "../services/predictionService";
import { IconButton } from "react-native-paper";

function VisionScreen({ navigation }) {
	const [images, setImages] = useState([]);
	const [statuses, setStatuses] = useState([]);
	const [predictions, setPredictions] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [editId, setEditId] = useState(null);
	const [ingredients, setIngredients] = useState([]);

	useEffect(() => {
		getIngredients()
			.then((res) => {
				setIngredients(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const takePictureAsync = async () => {
		const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
			base64: true,
		});
		if (!cancelled) {
			setImages((images) => [...images, uri]);
			try {
				const result = await predict(base64);
				setStatuses((statuses) => [...statuses, result]);
				setPredictions((predictions) => [...predictions, result]);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const pickImage = async () => {
		const { cancelled, uri, base64 } =
			await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 1,
				base64: true,
			});

		if (!cancelled) {
			setImages((images) => [...images, uri]);
			try {
				const result = await predict(base64);
				setPredictions((predictions) => [...predictions, result]);
			} catch (error) {
				console.log(error);
			}
		} else {
			setImages(images.slice(0, -1));
		}
	};

	const deletePrediction = (index) => {
		setImages(images.filter((_, i) => i !== index));
		setPredictions(predictions.filter((_, i) => i !== index));
	};

	const editPrediction = (index) => {
		setEditId(index);
		setModalVisible(true);
	};

	function addPredictionsToArray() {
		let array = [];
		predictions.forEach((prediction) => {
			array.push(ingredients[parseInt(prediction)]?.name);
		});
		return array;
	}

	return (
		<View style={styles.container}>
			<Modal
				animationType="slide-up"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<IconButton
							icon={"close"}
							onPress={() => setModalVisible(!modalVisible)}
							style={styles.closeButton}
						/>
						<Text style={styles.modalText}>Edit</Text>
						<Picker
							selectedValue={editId && editId.toString()}
							style={{ height: 50, width: 150 }}
							onValueChange={(itemValue, itemIndex) => {
								let newPredictions = [...predictions];
								newPredictions[editId] = itemValue;
								setPredictions(newPredictions);
							}}
						>
							{ingredients.map((ingredient) => (
								<Picker.Item
									key={ingredient?.model_id}
									label={ingredient?.display_name}
									value={ingredient?.model_id}
								/>
							))}
						</Picker>
					</View>
				</View>
			</Modal>
			<ScrollView>
				<View style={styles.images}>
					{images.length > 0 &&
						images.map((image, index) => (
							<View key={index} style={styles.predict}>
								<PredictedElement
									image={image}
									status={
										ingredients[
											parseInt(predictions[index])
										]?.display_name
									}
								/>
								<View style={styles.buttons}>
									<IconButton
										icon="delete"
										onPress={() => deletePrediction(index)}
										size={22}
									/>
									<IconButton
										icon="pencil"
										onPress={() => {
											editPrediction(index);
										}}
										size={22}
									/>
								</View>
							</View>
						))}
				</View>
				{images.length === 0 && (
					<View style={styles.predict}>
						<Text style={styles.text}>No images to show.</Text>
					</View>
				)}
			</ScrollView>
			<View style={styles.imageButtons}>
				<Button onPress={takePictureAsync} title="Take" />
				<Button onPress={pickImage} title="Select" />
				<Button
					onPress={() => {
						setImages([]);
						setPredictions([]);
					}}
					title="Clear"
					disabled={predictions.length === 0}
				/>
				<Button
					onPress={() =>
						navigation.navigate("RecommendationScreen", {
							predictions: addPredictionsToArray(),
						})
					}
					title="Search"
					disabled={predictions.length === 0}
				/>
			</View>
		</View>
	);
}

export default function UploadImageScreen({ navigation }) {
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

	return <VisionScreen navigation={navigation} />;
}

const styles = StyleSheet.create({
	container: {
		height: "88%",
		width: "100%",
		alignContent: "center",
	},
	images: {
		flexDirection: "row",
		flex: 1,
		flexWrap: "wrap",
	},
	predict: {
		flexBasis: "22%",
		margin: 5,
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
	imageButtons: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		margin: 10,
	},
	text: {
		fontSize: 20,
		textAlign: "center",
		margin: 10,
		color: "black",
	},
	modalView: {
		margin: 20,
		marginTop: 200,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	closeButton: {
		alignSelf: "flex-end",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});
