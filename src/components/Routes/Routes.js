import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';
import Header from '../Header';
import Login from './Login';
import Home from '../Homepage/Home';
import Register from './Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import MessageForm from './MessageForm';
import Post from '../../Post';
import ErrorPage from './ErrorPage';

const RoutesComponent = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/createpost"
					element={
						<RequireAuth loginPath={'/login'}>
							<MessageForm />
						</RequireAuth>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/posts/:id" element={<Post />} />
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	);
};
export default RoutesComponent;
