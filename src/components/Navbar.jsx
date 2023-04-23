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
			<div className='bg-neutral-700 flex justify-between items-center px-10 border-black'>
				<Link to='/' className='py-1'>
					<h1 className='logo flex items-center'>
						MACRO<span className='text-lime-500'>AI</span>
						<img
							src='https://img.freepik.com/vector-premium/futuro-robot-aguacate-dibujos-animados_185029-592.jpg?w=2000'
							alt='bot'
							className='w-7 h-7 rounded-full shadow shadow-neutral-700 ml-2 hover:animate-spin'
						/>
					</h1>
				</Link>
				{user ? (
					<div className='flex items-center gap-3'>
						<p className='text-white'>{user.email}</p>
						<Link to='/dashboard'>
							<p className='bg-lime-600 text-white px-3 py-2 rounded-sm hover:bg-lime-500 shadow'>
								<RxDashboard />
							</p>
						</Link>
						<button
							className='bg-lime-600 text-white px-3 py-2 rounded-sm hover:bg-lime-500 shadow'
							onClick={handleLogout}
						>
							<IoMdLogOut />
						</button>
					</div>
				) : (
					<div className='flex gap-3 font-semibold text-sm'>
						<Link to='/login'>
							<p className='bg-lime-600 text-white px-4 py-2 rounded-sm hover:bg-lime-500 shadow'>
								Login
							</p>
						</Link>
						<Link to='/register'>
							<p className='bg-lime-600 text-white px-4 py-2 rounded-sm hover:bg-lime-500 shadow'>
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
