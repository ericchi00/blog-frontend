import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
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
		<HashRouter basename={`/${process.env.REACT_APP_PUBLIC_URL}`}>
			<Container fluid style={{ padding: '0px', minHeight: '100vh' }}>
				<Header />
				<Routes>
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
				</Routes>
			</Container>
			<Footer />
		</HashRouter>
	);
};
export default RoutesComponent;
