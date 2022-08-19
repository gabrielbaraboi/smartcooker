import React, { useState } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import ImageMapper from "react-native-image-mapper";

const getRandomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (var i = 0; i < 6; i++)
		color += letters[Math.floor(Math.random() * 16)];
	return color;
};

const TestScreen = () => {
	//State for the selected area
	const [selectedAreaId, setSelectedAreaId] = useState([]);
	const [width, setWidth] = useState("");
	const [height, setHeight] = useState("");
	const windowHeight = Dimensions.get("window").height;
	const windowWidth = Dimensions.get("window").width;
	const imgSource = "https://i.imgur.com/NMRo90R.jpg";

	const mapperAreaClickHandler = async (item, idx, event) => {
		const currentSelectedAreaId = selectedAreaId;
		if (Array.isArray(currentSelectedAreaId)) {
			const indexInState = currentSelectedAreaId.indexOf(item.id);
			if (indexInState !== -1) {
				console.log("Removing id", item.id);
				setSelectedAreaId([
					...currentSelectedAreaId.slice(0, indexInState),
					...currentSelectedAreaId.slice(indexInState + 1),
				]);
			} else {
				alert(`Clicked Item Id: ${item.id}`);
				console.log("Setting Id", item.id);
				setSelectedAreaId([...currentSelectedAreaId, item.id]);
			}
		} else {
			if (item.id === currentSelectedAreaId) {
				setSelectedAreaId(null);
			} else {
				setSelectedAreaId(item.id);
			}
		}
	};

	Image.getSize(
		imgSource,
		(Width, Height) => {
			setWidth(Width);
			setHeight(Height);
		},
		(errorMsg) => {
			console.log(errorMsg);
		},
	);

	return (
		<View>
			<ImageMapper
				imgHeight={height - windowHeight / 2}
				imgWidth={width - windowWidth / 2}
				imgSource={{
					uri: imgSource,
				}}
				imgMap={RECTANGLE_MAP}
				onPress={(item, idx, event) =>
					mapperAreaClickHandler(item, idx, event)
				}
				containerStyle={{ flex: 1 }}
				selectedAreaId={selectedAreaId}
				multiselect
			/>
		</View>
	);
};

export default TestScreen;

// Maps to Create Clickable Areas
const RECTANGLE_MAP = [
	{
		id: "0",
		name: "Left Foot",
		shape: "rectangle",
		x2: 110,
		y2: 540,
		x1: 80,
		y1: 500,
		prefill: getRandomColor(),
		fill: "blue",
	},
	{
		id: "1",
		name: "Right Foot",
		shape: "rectangle",
		x2: 155,
		y2: 540,
		x1: 125,
		y1: 500,
		prefill: getRandomColor(),
		fill: "blue",
	},
	{
		id: "2",
		name: "Left Knee",
		shape: "rectangle",
		x2: 110,
		y2: 400,
		x1: 80,
		y1: 370,
		prefill: getRandomColor(),
		fill: "blue",
	},
	{
		id: "3",
		name: "Right Knee",
		shape: "rectangle",
		x2: 155,
		y2: 400,
		x1: 125,
		y1: 370,
		prefill: getRandomColor(),
		fill: "blue",
	},
	{
		id: "4",
		name: "Stomach",
		shape: "rectangle",
		x2: 155,
		y2: 240,
		x1: 80,
		y1: 165,
		prefill: getRandomColor(),
		fill: "blue",
	},
	{
		id: "5",
		name: "Left Hand",
		shape: "rectangle",
		x2: 40,
		y2: 315,
		x1: 5,
		y1: 250,
		prefill: getRandomColor(),
		fill: "blue",
	},
	{
		id: "6",
		name: "Right Hand",
		shape: "rectangle",
		x2: 235,
		y2: 315,
		x1: 200,
		y1: 250,
		prefill: getRandomColor(),
		fill: "blue",
	},
	{
		id: "7",
		name: "Face",
		shape: "rectangle",
		x2: 145,
		y2: 70,
		x1: 90,
		y1: 30,
		prefill: getRandomColor(),
		fill: "blue",
	},
	{
		id: "8",
		name: "Head",
		shape: "rectangle",
		x2: 145,
		y2: 30,
		x1: 90,
		y1: 0,
		prefill: getRandomColor(),
		fill: "blue",
	},
];
