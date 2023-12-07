// Import functions
import LandingPage from "./pages/LandingPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import UserData from "./pages/UserData.tsx";
import PsychData from "./pages/PsychData.tsx";
import AppData from "./pages/AppData.tsx";
import AppPage from "./pages/AppPage.tsx";
import SessionOngoing from "./pages/SessionOngoing.tsx";
import MoviesPage from "./pages/MoviesPage.tsx";
import { AuthProvider } from './auth/AuthContext';

// import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
	return (
		<ChakraProvider>
		<AuthProvider>
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
						<Route path="/moviespage" element={<MoviesPage />} />
					</Route>
				</Routes>
			</Router>
		</AuthProvider>
		</ChakraProvider>
	);
}

export default App;
