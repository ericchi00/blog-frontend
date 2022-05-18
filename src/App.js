import React from 'react';
import { AuthProvider } from 'react-auth-kit';
import RoutesComponent from './components/Routes/Routes';
import Header from './components/Header';

const App = () => {
	return (
		<>
			<AuthProvider authType={'localstorage'} authName={'_auth'}>
				<RoutesComponent />
			</AuthProvider>
		</>
	);
};

export default App;
