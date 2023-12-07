// Import functions
import LandingPage from "./pages/LandingPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import UserData from "./pages/UserData.tsx";
import PsychData from "./pages/PsychData.tsx";
import AppData from "./pages/AppData.tsx";
import AppPage from "./pages/AppPage.tsx";
import SessionOngoing from "./pages/SessionOngoing.tsx";

// import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
//import theme from "./styles/theme.ts";
//import RequireAuth from "../src/auth/requireAuth.tsx"

function App() {
	return (
		<ChakraProvider>
			<Router>
				<Routes>
					<Route path="/">
						{/* public routes l*/}
						<Route path="/" element={<LandingPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/userdata" element={<UserData />} />
						<Route path="/psychdata" element={<PsychData />} />
						<Route path="/appdata" element={<AppData />} />
						<Route path="/apppage" element={<AppPage />} />
						<Route path="/session" element={<SessionOngoing />} />
					</Route>
				</Routes>
			</Router>
		</ChakraProvider>
	);
}

export default App;
