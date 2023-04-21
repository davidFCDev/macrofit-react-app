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
	};

	const handleDeleteIngredient = index => {
		const ingredientToRemove = ingredientList[index];
		const newIngredientList = [...ingredientList];
		newIngredientList.splice(index, 1);
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
			<div className='flex flex-col gap-3 w-full'>
				<div>
					<h2 className=' text-2xl'>- List a complete menu -</h2>
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
							<VscAdd className='text-white text-xl' />
						)}
					</button>

					<button
						onClick={handleDeleteClick}
						className='border border-neutral-700 hover:bg-red-500 text-white px-3 rounded'
					>
						<GrPowerReset className='text-white text-xl' />
					</button>
				</div>

				{error && <div className='text-xs italic p-1'>Error: {error}</div>}
				{!ingredient && !error && (
					<div className='text-xs italic p-1'>
						Please enter an ingredient to search.
					</div>
				)}

				<div className='flex items-start py-3'>
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
			</div>
		</section>
	);
};

export default Menu;
