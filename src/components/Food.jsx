import React,{ useState } from 'react';
import { getIngredient } from '../controllers/macroController';
import { BiSearchAlt2 } from 'react-icons/bi';
import { GrPowerReset } from 'react-icons/gr';
import { FaAngleDoubleRight } from 'react-icons/fa';
import FoodInputs from './IngredientInput';

const Food = () => {
	const [foodData, setFoodData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [ingredient, setIngredient] = useState('');
	const [weight, setWeight] = useState('');

	const handleSearchClick = () => {
		if (ingredient) {
			setLoading(true);
			setTimeout(() => {
				getIngredient(ingredient, weight)
					.then(data => {
						setFoodData(data);
						setError(null);
						setLoading(false);
					})
					.catch(error => {
						setError(error.message);
						setFoodData(null);
						setLoading(false);
					});
			}, 200);
		} else {
			setError('Please enter an ingredient to search.');
			setFoodData(null);
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
			<div className='flex flex-col gap-3'>
				<div>
					<h2 className=' text-2xl'>- Search an ingredient -</h2>
				</div>
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
				<div className='flex justify-between py-5'>
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
								</span>
							</p>
							<p className='text-sm bg-lime-100 px-2 py-1 rounded-md'>
								Carbohidrates:{' '}
								<span className='font-bold'>
									{Math.round(
										(foodData.hints[0].food.nutrients.CHOCDF * weight) / 100
									)}
								</span>
							</p>
							<p className='text-sm bg-lime-100 px-2 py-1 rounded-md'>
								Protein:{' '}
								<span className='font-bold'>
									{Math.round(
										(foodData.hints[0].food.nutrients.PROCNT * weight) / 100
									)}
								</span>
							</p>
							<p className='text-sm bg-lime-100 px-2 py-1 rounded-md'>
								Fat:{' '}
								<span className='font-bold'>
									{Math.round(
										(foodData.hints[0].food.nutrients.FAT * weight) / 100
									)}
								</span>
							</p>
						</div>
					</div>

					<div className='flex items-center'>
						<FaAngleDoubleRight className='text-3xl text-neutral-600' />
					</div>

					<img
						src={foodData.hints[0].food.image}
						alt='food'
						className='w-40 rounded shadow'
					/>
				</div>
			)}
		</div>
	);
};

export default Food;
