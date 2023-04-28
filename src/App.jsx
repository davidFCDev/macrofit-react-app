import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './pages/ProtectedRoute';
import Root from './pages/Root';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { DashboardProvider } from './context/DashboardContext';

function App() {
	return (
		<main>
			<AuthProvider>
				<DashboardProvider>
					<Navbar />
					<div className='flex min-h-screen main'>
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
				</DashboardProvider>
			</AuthProvider>
			<Toaster />
		</main>
	);
}

export default App;
