import React from 'react';

const Root = () => {
	return (
		<section className='w-full flex my-20 justify-center gap-10'>
			<div className='px-10 py-10 w-96 flex flex-col gap-2 text-neutral-600'>
				<h1 className='text-3xl font-bold text-lime-600 flex gap-2 right-8 relative'>
					Macro AI
					<img
						src='https://static.vecteezy.com/system/resources/previews/018/764/128/original/chatgpt-logo-open-ai-icon-with-chatbot-artificial-intelligence-openai-chatbot-icon-chatgpt-openai-icon-artificial-intelligence-smart-ai-virtual-smart-assistant-bot-free-vector.jpg'
						alt='openai'
						className='w-6 h-6 relative top-2'
					/>
				</h1>
				<h2 className='text-lg font-semibold italic relative right-4'>Your healthy app</h2>
				<p className='leading-5 text-xs'>
					This app is designed to be your go-to resource for everything related
					to macronutrients. Whether you are looking to learn more about the
					role of macronutrients in your diet, or you need help understanding
					how to balance your intake of carbohydrates, proteins, and fats, we
					have you covered.{' '}
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
