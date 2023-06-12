import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Alert } from '../components/Alert';
import { toast } from 'react-hot-toast';

const RegisterPage = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const { signup } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState('');

	const handleChange = ({ target: { name, value } }) => {
		setUser({
			...user,
			[name]: value,
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setError('');
		try {
			await signup(user.email, user.password);
			navigate('/dashboard');
			toast.success('Registered!');
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className='w-full max-w-xs m-auto'>
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

				<button
					type='submit'
					className='user-btn text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
				>
					Register
				</button>
			</form>
			<p className='my-4 text-sm flex justify-between px-3 font-light'>
				Already have an account?
				<Link to='/login' className='font-semibold'>
					Login
				</Link>
			</p>
		</div>
	);
};

export default RegisterPage;
