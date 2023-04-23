import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { GrPowerReset } from 'react-icons/gr';
import { VscAdd } from 'react-icons/vsc';
import FoodInputs from './IngredientInput';
import {
	addNutrients,
	delNutrients,
	getIngredient,
	getNutrients,
} from '../controllers/macroController';

import { toast } from 'react-hot-toast';
import { generateValorationGPT } from '../controllers/gptController';

const Menu = () => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [ingredient, setIngredient] = useState('');
	const [weight, setWeight] = useState('');
	const [ingredientList, setIngredientList] = useState([]);
	const [totalCalories, setTotalCalories] = useState(0);
	const [totalProtein, setTotalProtein] = useState(0);
	const [totalCarbs, setTotalCarbs] = useState(0);
	const [totalFat, setTotalFat] = useState(0);
	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleRate = async () => {
		if (ingredientList.length > 1) {
			setIsLoading(true);
			const newMessage = await generateValorationGPT(
				totalCalories,
				totalProtein,
				totalCarbs,
				totalFat
			);
			setMessage(newMessage);
		} else {
			toast.error('Please add at least 2 ingredients to use GPT.');
		}
		setIsLoading(false);
	};

	const handleSearchClick = () => {
		if (ingredient) {
			setLoading(true);
			setTimeout(() => {
				getIngredient(ingredient, weight)
					.then(data => {
						const newIngredient = getNutrients(data, weight);
						setIngredientList([...ingredientList, newIngredient]);
						setError(null);
						setLoading(false);
						setTotalCalories(
							addNutrients(ingredientList, newIngredient, 'calories')
						);
						setTotalProtein(
							addNutrients(ingredientList, newIngredient, 'protein')
						);
						setTotalCarbs(addNutrients(ingredientList, newIngredient, 'carbs'));
						setTotalFat(addNutrients(ingredientList, newIngredient, 'fat'));
					})
					.catch(error => {
						setError(error.message);
						setLoading(false);
					});
			}, 100);
		} else {
			setError('Please enter an ingredient to search.');
		}
	};

	const handleDeleteClick = () => {
		setError(null);
		setLoading(false);
		setIngredient('');
		setWeight('');
		setIngredientList([]);
		setMessage('');
	};

	const handleDeleteIngredient = index => {
		const ingredientToRemove = ingredientList[index];
		const newIngredientList = [...ingredientList];
		newIngredientList.splice(index, 1);
		setMessage('');
		setIngredientList(newIngredientList);
		setTotalCalories(
			delNutrients(newIngredientList, ingredientToRemove, 'calories')
		);
		setTotalProtein(
			delNutrients(newIngredientList, ingredientToRemove, 'protein')
		);
		setTotalCarbs(delNutrients(newIngredientList, ingredientToRemove, 'carbs'));
		setTotalFat(delNutrients(newIngredientList, ingredientToRemove, 'fat'));
	};

	const handleInputChange = event => {
		setIngredient(event.target.value);
	};

	const handleWeightChange = event => {
		setWeight(event.target.value);
	};

	return (
		<section className='flex w-full px-10 py-4 justify-between'>
			<div className='flex flex-col w-full'>
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
							<VscAdd className='text-white text-xl' />
						)}
					</button>

					<button
						onClick={handleDeleteClick}
						className='border border-neutral-700 hover:bg-red-500 text-white px-3 rounded'
					>
						<GrPowerReset className='text-white text-xl' />
					</button>

					<button
						onClick={handleRate}
						className='border border-neutral-700 bg-red-500 hover:bg-red-400 text-white rounded w-10'
					>
						<img
							src='https://static.vecteezy.com/system/resources/previews/021/608/790/non_2x/chatgpt-logo-chat-gpt-icon-on-black-background-free-vector.jpg'
							alt='gpt'
							className='w-full hover:scale-110 transform transition duration-500 ease-in-out'
						/>
					</button>

					{isLoading && <p className='flex items-center px-3'>Pensando...</p>}
				</div>

				{error && <div className='text-xs italic p-1'>Error: {error}</div>}
				{!ingredient && !error && (
					<div className='text-xs italic p-1'>
						Please enter an ingredient to search.
					</div>
				)}

				<div className='flex items-start py-6'>
					{ingredientList.length > 0 && (
						<div className='w-full'>
							<div className='flex flex-col gap-1 w-44'>
								<h2 className='text-xl font-semibold italic px-3 py-1 bg-neutral-600 text-white rounded-md'>
									Results
								</h2>
								<div className='flex flex-col gap-1'>
									<p className='text-sm bg-lime-100 px-3 py-1 rounded-md'>
										Total Calories:{' '}
										<span className='font-bold'>{totalCalories}</span>
									</p>
									<p className='text-sm bg-lime-100 px-3 py-1 rounded-md'>
										Carbohidrates:{' '}
										<span className='font-bold'>{totalCarbs}</span>
									</p>
									<p className='text-sm bg-lime-100 px-3 py-1 rounded-md'>
										Protein: <span className='font-bold'>{totalProtein}</span>
									</p>
									<p className='text-sm bg-lime-100 px-3 py-1 rounded-md'>
										Fat: <span className='font-bold'>{totalFat}</span>
									</p>
								</div>
							</div>
						</div>
					)}
					{ingredientList.length > 0 && (
						<div className='grid grid-cols-3 gap-1 w-full'>
							{ingredientList.map((ingredient, index) => (
								<div
									className='flex justify-between items-center px-2 py-1 bg-neutral-600 text-white rounded-md'
									key={index}
								>
									<p className='font-semibold italic'>{ingredient.name}</p>
									<button onClick={() => handleDeleteIngredient(index)}>
										<RxCross2 className='text-lg pt-1 hover:scale-x-125' />
									</button>
								</div>
							))}
						</div>
					)}
				</div>
				{message && (
					<div className=' italic px-2 py-2 rounded border border-lime-500 flex gap-2 items-center'>
						<img
							src='https://img.freepik.com/vector-premium/futuro-robot-aguacate-dibujos-animados_185029-592.jpg?w=2000'
							alt='bot'
							className='w-14 rounded-full'
						/>
						<p className='text-xs'>{message}</p>
					</div>
				)}
			</div>
		</section>
	);
};

export default Menu;
