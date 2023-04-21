import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Alert } from './Alert';
import { toast } from 'react-hot-toast';

const login = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const { login, loginWithGoogle, resetPassword } = useAuth();
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();
		setError('');
		try {
			await login(user.email, user.password);
			navigate('/dashboard');
			toast.success('Welcome!');
		} catch (error) {
			setError(error.message);
		}
	};

	const handleChange = ({ target: { value, name } }) =>
		setUser({ ...user, [name]: value });

	const handleGoogleSignin = async () => {
		try {
			await loginWithGoogle();
			navigate('/dashboard');
		} catch (error) {
			setError(error.message);
		}
	};

	const handleResetPassword = async e => {
		e.preventDefault();
		if (!user.email) return setError('Write an email to reset password');
		try {
			await resetPassword(user.email);
			setError('We sent you an email. Check your inbox');
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className='login w-full max-w-xs m-auto'>
			{error && <Alert message={error} />}

			<form
				onSubmit={handleSubmit}
				className='bg-white shadow-sm shadow-neutral-400 rounded px-8 pt-6 pb-8 mb-4'
			>
				<div className='mb-4'>
					<label
						htmlFor='email'
						className='block text-neutral-500 text-md font-bold mb-2'
					>
						Email
					</label>
					<input
						type='email'
						name='email'
						id='email'
						onChange={handleChange}
						placeholder='youremail@company.tld'
						className='appearance-none border border-gray-300 rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-slate-50 placeholder:text-gray-300'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='password'
						className='block text-neutral-500 text-md font-bold mb-2'
					>
						Password
					</label>
					<input
						type='password'
						name='password'
						id='password'
						onChange={handleChange}
						placeholder='*************'
						className='appearance-none border border-gray-300 rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-slate-50 placeholder:text-gray-300'
					/>
				</div>

				<div className='flex items-center justify-between'>
					<button
						type='submit'
						className='user-btn text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
					>
						Sign In
					</button>
					<a
						href='#!'
						onClick={handleResetPassword}
						className='inline-block align-baseline font-bold text-sm text-neutral-500 hover:text-neutral-400'
					>
						Forgot Password?
					</a>
				</div>
			</form>
			<button
				onClick={handleGoogleSignin}
				className='bg-slate-50 hover:bg-slate-200 flex justify-center gap-2 items-center text-black shadow-sm shadow-neutral-400 rounded py-1 w-full'
			>
				<span className='text-sm py-1'>Login with Google</span>
				<img
					src='https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png'
					alt='google logo'
					className='w-5 inline-block'
				/>
			</button>
			<p className='my-4 text-sm flex justify-between px-3 font-light'>
				Do not have an account?
				<Link to='/register' className='font-semibold'>
					Register
				</Link>
			</p>
		</div>
	);
};

export default login;
