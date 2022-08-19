import * as React from "react";
import Navigation from "./src/navigation";
import AuthProvider from "./src/services/authentication/auth.provider";

export default function App() {
	return (
		<AuthProvider>
			<Navigation />
		</AuthProvider>
	);
}
