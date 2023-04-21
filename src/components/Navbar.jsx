import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IoMdLogOut } from 'react-icons/io';
import { RxDashboard } from 'react-icons/rx';
import { toast } from 'react-hot-toast';

const Navbar = () => {
	const { user, logout } = useAuth();
	const handleLogout = async () => {
		try {
			await logout();
			toast.success('See you soon!');
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<nav className='w-full'>
			<div className='nav flex justify-between items-center px-6 border-black'>
				<Link to='/'>
					<img src='/logo.png' alt='logo' className='w-32' />
				</Link>
				{user ? (
					<div className='flex items-center gap-3'>
						<p className='text-white'>{user.email}</p>
						<Link to='/dashboard'>
							<p className='bg-slate-100 text-neutral-800 px-3 py-2 rounded-sm hover:bg-slate-300 shadow'>
								<RxDashboard />
							</p>
						</Link>
						<button
							className='bg-slate-100 text-neutral-800 px-3 py-2 rounded-sm hover:bg-slate-300 shadow'
							onClick={handleLogout}
						>
							<IoMdLogOut />
						</button>
					</div>
				) : (
					<div className='flex gap-3 font-semibold text-sm'>
						<Link to='/login'>
							<p className='bg-slate-100 text-neutral-800 px-4 py-2 rounded-sm hover:bg-slate-300 shadow'>
								Login
							</p>
						</Link>
						<Link to='/register'>
							<p className='bg-slate-100 text-neutral-800 px-4 py-2 rounded-sm hover:bg-slate-300 shadow'>
								Register
							</p>
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
