import React from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';
import Header from '../Header';
import Login from './Login';
import Home from '../Homepage/Home';
import Register from './Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from './ErrorPage';
import BlogPost from '../BlogPost/BlogPost';
import BlogPostForm from './BlogPostForm';
import Footer from '../Footer';
import Container from 'react-bootstrap/Container';

const RoutesComponent = () => {
	return (
		<BrowserRouter>
			<Container fluid style={{ padding: '0px', minHeight: '100vh' }}>
				<Header />
				<HashRouter>
					<Route path="/" element={<Home />} />
					<Route
						path="/createpost"
						element={
							<RequireAuth loginPath={'/login'}>
								<BlogPostForm />
							</RequireAuth>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/blogposts/:id" element={<BlogPost />} />
					<Route path="*" element={<ErrorPage />} />
				</HashRouter>
			</Container>
			<Footer />
		</BrowserRouter>
	);
};
export default RoutesComponent;
