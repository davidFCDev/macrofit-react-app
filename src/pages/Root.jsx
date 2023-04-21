import React from 'react';

const Root = () => {
	return (
		<section className='w-full flex my-28 justify-center gap-10'>
			<div className='px-10 py-10 w-96 flex flex-col gap-2'>
				<h1 className='text-3xl font-bold text-lime-800'>Macrofit</h1>
				<h2 className='text-lg font-semibold'>La aplicación saludable</h2>
				<p className='leading-5 text-sm'>
					Aute amet veniam officia reprehenderit labore ea in. Officia consequat
					sint excepteur sit amet magna officia voluptate sint reprehenderit
					adipisicing voluptate ut. Eiusmod quis velit id nulla magna quis sunt
					aliquip est cupidatat.{' '}
				</p>
			</div>
			<img
				src='https://blog.genesis.es/wp-content/uploads/2019/12/AdobeStock_2368943222.jpeg'
				alt='image'
				className='w-96 h-60 rounded-lg shadow-md'
			/>
		</section>
	);
};

export default Root;
