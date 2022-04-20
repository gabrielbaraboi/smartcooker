import React, { useState } from "react";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import BackButton from "../../components/BackButton";
import { emailValidator } from "../../utils/emailValidator";

const ResetPasswordScreen = ({ navigation }) => {
	const [email, setEmail] = useState({ value: "", error: "" });

	const sendResetPasswordEmail = () => {
		const emailError = emailValidator(email.value);
		if (emailError) {
			setEmail({ ...email, error: emailError });
			return;
		}
		navigation.navigate("LoginScreen");
	};

	return (
		<Background>
			<BackButton goBack={navigation.goBack} />
			<Logo />
			<Header>Restore Password</Header>
			<TextInput
				label="Email"
				returnKeyType="done"
				value={email.value}
				onChangeText={(text) => setEmail({ value: text, error: "" })}
				error={!!email.error}
				errorText={email.error}
				autoCapitalize="none"
				autoCompleteType="email"
				textContentType="emailAddress"
				keyboardType="email-address"
				description="You will receive email with password reset link."
			/>
			<Button
				mode="contained"
				onPress={sendResetPasswordEmail}
				style={{ marginTop: 16 }}
			>
				Send Instructions
			</Button>
		</Background>
	);
};

export default ResetPasswordScreen;
