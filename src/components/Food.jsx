import React, { useState } from 'react';
import FoodInputs from './IngredientInput';
import { getIngredient } from '../controllers/macroController';
import { BiSearchAlt2 } from 'react-icons/bi';
import { GrPowerReset } from 'react-icons/gr';
import { generateIngredientGPT } from '../controllers/gptController';
import { DotPulse } from '@uiball/loaders';

const Food = () => {
	const [foodData, setFoodData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [ingredient, setIngredient] = useState('');
	const [weight, setWeight] = useState('');
	const [message, setMessage] = useState('');

	const handleSearchClick = async () => {
		setLoading(true);
		const message = await generateIngredientGPT(ingredient);

		if (ingredient) {
			setTimeout(() => {
				getIngredient(ingredient, weight)
					.then(data => {
						setMessage(message);
						setFoodData(data);
						setError(null);
						setLoading(false);
					})
					.catch(error => {
						setError(error.message);
						setFoodData(null);
						setLoading(false);
					});
			}, 300);
		} else {
			setError('Please enter an ingredient to search.');
			setFoodData(null);
			setLoading(false);
		}
	};

	const handleRestart = () => {
		setFoodData(null);
		setError(null);
		setLoading(false);
		setIngredient('');
		setWeight('');
	};

	const handleInputChange = event => {
		setIngredient(event.target.value);
	};

	const handleWeightChange = event => {
		setWeight(event.target.value);
	};

	return (
		<div className='w-full px-10 py-4 text-neutral-600 '>
			<div className='flex flex-col'>
				<div className='flex gap-1'>
					<FoodInputs
						ingredient={ingredient}
						weight={weight}
						loading={loading}
						handleInputChange={handleInputChange}
						handleWeightChange={handleWeightChange}
						handleSearchClick={handleSearchClick}
					/>

					<button onClick={handleSearchClick} className='user-btn px-3 rounded'>
						{loading ? (
							<img
								src='https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif'
								alt='gif'
								className='w-5'
							/>
						) : (
							<BiSearchAlt2 className='text-white text-xl' />
						)}
					</button>

					<button
						onClick={handleRestart}
						className='border border-neutral-600 hover:bg-red-500 text-white px-3 rounded'
					>
						<GrPowerReset className='text-white text-xl' />
					</button>
				</div>

				{error && <div className='text-xs italic p-1'>Error: {error}</div>}
				{!foodData && !error && (
					<div className='text-xs italic p-1'>
						Please enter an ingredient to search.
					</div>
				)}
			</div>

			{foodData && (
				<div className='flex justify-between items-center py-14'>
					<div className='flex flex-col gap-1 w-44'>
						<h2 className='text-xl font-semibold italic px-2 py-1 bg-neutral-600 text-white rounded-md'>
							{foodData.hints[0].food.label}
							<span className='text-sm font-light'>({weight}g)</span>
						</h2>
						<div className='flex flex-col gap-1'>
							<p className='text-sm bg-lime-100 px-2 py-1 rounded-md'>
								Total Calories:{' '}
								<span className='font-bold'>
									{Math.round(
										(foodData.hints[0].food.nutrients.ENERC_KCAL * weight) / 100
									)}
									g
								</span>
							</p>
							<p className='text-sm bg-lime-200 px-2 py-1 rounded-md'>
								Carbohidrates:{' '}
								<span className='font-bold'>
									{Math.round(
										(foodData.hints[0].food.nutrients.CHOCDF * weight) / 100
									)}
									g
								</span>
							</p>
							<p className='text-sm bg-lime-300 px-2 py-1 rounded-md'>
								Protein:{' '}
								<span className='font-bold'>
									{Math.round(
										(foodData.hints[0].food.nutrients.PROCNT * weight) / 100
									)}
									g
								</span>
							</p>
							<p className='text-sm bg-lime-400 px-2 py-1 rounded-md'>
								Fat:{' '}
								<span className='font-bold'>
									{Math.round(
										(foodData.hints[0].food.nutrients.FAT * weight) / 100
									)}
									g
								</span>
							</p>
						</div>
					</div>

					<img
						src={foodData.hints[0].food.image}
						alt='food'
						className='w-40 rounded-md shadow'
					/>
					<div className='flex flex-col items-center'>
						<img
							src='https://img.freepik.com/vector-premium/futuro-robot-aguacate-dibujos-animados_185029-592.jpg?w=2000'
							alt='bot'
							className='w-14 rounded-full transform animate-bounce'
						/>
						<div className='p-3 w-40 rounded shadow shadow-neutral-200 border border-lime-500'>
							<p className='italic text-sm'>{message}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Food;
