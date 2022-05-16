import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Routes/Login';
import Home from './components/Homepage/Home';
import Register from './components/Routes/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import MessageForm from './components/Routes/MessageForm';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Header></Header>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/createpost" element={<MessageForm />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
