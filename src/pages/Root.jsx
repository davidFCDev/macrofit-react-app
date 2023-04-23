import React from 'react';

const Root = () => {
	return (
		<section className='w-full flex my-20 justify-center gap-20'>
			<div className='px-10 py-10 w-96 flex flex-col gap-2'>
				<h1 className='text-3xl font-bold text-lime-700 flex gap-2'>Macro AI<img src='https://static.vecteezy.com/system/resources/previews/018/764/128/original/chatgpt-logo-open-ai-icon-with-chatbot-artificial-intelligence-openai-chatbot-icon-chatgpt-openai-icon-artificial-intelligence-smart-ai-virtual-smart-assistant-bot-free-vector.jpg' alt='openai' className='w-5 h-5'/></h1>
				<h2 className='text-lg font-semibold italic'>your healthy app</h2>
				<p className='leading-5 text-sm'>
					Aute amet veniam officia reprehenderit labore ea in. Officia consequat
					sint excepteur sit amet magna officia voluptate sint reprehenderit
					adipisicing voluptate ut. Eiusmod quis velit id nulla magna quis sunt
					aliquip est cupidatat.{' '}
				</p>
			</div>
			<img
				src='https://i.pinimg.com/736x/a6/d5/c4/a6d5c485165bcdb7055cb801a9d1728b.jpg'
				alt='image'
				className='w-80 h-52 rounded-full'
			/>
		</section>
	);
};

export default Root;
