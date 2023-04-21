import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';
import Root from './pages/Root';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import React from 'react';

function App() {
	return (
		<main>
			<AuthProvider>
				<Navbar />
				<div className='bg-neutral-200 flex min-h-screen'>
					<Routes>
						<Route path='/' element={<Root />} />
						<Route
							path='/dashboard'
							element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							}
						/>
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
					</Routes>
				</div>
			</AuthProvider>
			<Toaster />
		</main>
	);
}

export default App;
