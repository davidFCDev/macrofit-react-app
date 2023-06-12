import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { DashboardProvider } from './context/DashboardContext';
import ProtectedRoute from './pages/ProtectedRoute';
import Root from './pages/Root';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

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
										<DashboardPage />
									</ProtectedRoute>
								}
							/>
							<Route path='/login' element={<LoginPage />} />
							<Route path='/register' element={<RegisterPage />} />
						</Routes>
					</div>
				</DashboardProvider>
			</AuthProvider>
			<Toaster />
		</main>
	);
}

export default App;
