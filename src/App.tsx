import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AvatarPicker from "./pages/Register/AvatarPicker";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Chat />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/avatar" element={<AvatarPicker />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;