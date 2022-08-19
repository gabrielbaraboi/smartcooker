import React from "react";
import Background from "../../components/Background";
import Header from "../../components/Header";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import { guestLogin } from "../../services/authentication/auth.service";
import { AuthContext } from "../../services/authentication/auth.provider";

const AccountScreen = ({ navigation }) => {
	const { setIsLoggedIn } = React.useContext(AuthContext);

	return (
		<Background>
			<Logo />
			<Header>SmartCooker</Header>
			<Paragraph>The easiest way to find out what to cook.</Paragraph>
			<Button
				mode="contained"
				onPress={() => navigation.navigate("LoginScreen")}
			>
				Login
			</Button>
			<Button
				mode="outlined"
				onPress={() =>
					guestLogin()
						.then(() => {
							setIsLoggedIn(true);
						})
						.catch((err) => {
							// setError(err.response.data.message);
							console.log(error);
						})
				}
			>
				Guest Login
			</Button>
			<Button
				mode="outlined"
				onPress={() => navigation.navigate("RegisterScreen")}
			>
				Sign Up
			</Button>
		</Background>
	);
};

export default AccountScreen;
