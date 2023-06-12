import React, { useEffect, useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { ImPencil2 } from 'react-icons/im';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegListAlt } from 'react-icons/fa';
import AddRecipePage from './AddRecipePage';
import { getIngredient, getNutrients } from '../controllers/macroController';
import inputRecipeList from '../components/RecipeListInput';

const RecipeListPage = () => {
	const [ingredientList, setIngredientList] = useState([]);
	const [nutrients, setNutrients] = useState({
		calories: 0,
		protein: 0,
		carbs: 0,
		fat: 0,
	});
	const {
		recipes,
		removeRecipe,
		editRecipe,
		initializeRecipes,
		renderComponent,
		selectedRecipe,
		toggleMacros,
		setToggleMacros,
	} = useDashboard();

	useEffect(() => {
		initializeRecipes();
	}, []);

	useEffect(() => {
		if (!selectedRecipe) {
			return;
		}

		const recipe = recipes.find(recipe => recipe.title === selectedRecipe);

		if (!recipe) {
			return setIngredientList([]);
		}

		const newIngredients = [];

		const addIngredient = async (ingredientName, weight) => {
			try {
				const data = await getIngredient(ingredientName, weight);
				const newIngredient = getNutrients(data, weight);
				newIngredients.push(newIngredient);
			} catch (error) {
				console.error('error', error);
			}
		};

		const addAllIngredients = async () => {
			for (let i = 1; i <= 10; i++) {
				const ingredientName = recipe['ingredient' + i];
				const weight = recipe['weight' + i];

				if (ingredientName && weight) {
					await addIngredient(ingredientName, weight);
				}
			}

			setIngredientList(newIngredients);
		};

		addAllIngredients();
	}, [selectedRecipe]);

	useEffect(() => {
		const newNutrients = {
			calories: 0,
			protein: 0,
			carbs: 0,
			fat: 0,
		};

		ingredientList.forEach(ingredient => {
			newNutrients.calories += ingredient.calories;
			newNutrients.protein += ingredient.protein;
			newNutrients.carbs += ingredient.carbs;
			newNutrients.fat += ingredient.fat;
		});

		setNutrients(newNutrients);
	}, [ingredientList]);

	const renderRecipe = () => {
		if (!selectedRecipe) {
			return null;
		}

		const recipe = recipes.find(recipe => recipe.title === selectedRecipe);

		if (!recipe) {
			return (
				<div className='w-full flex flex-col items-center justify-center gap-6'>
					<h2 className='italic text-lime-800'>Recipe not found!</h2>
					<img
						src='https://img.freepik.com/vector-premium/futuro-robot-aguacate-dibujos-animados_185029-592.jpg?w=2000'
						alt='penguin'
						className='w-52 rounded-full'
					/>
				</div>
			);
		}

		return (
			<div className='bg-neutral-100 rounded w-80'>
				<div className='flex flex-col gap-2 text-xs'>
					<div className='flex justify-between bg-neutral-600 px-4 py-2 rounded-t'>
						<h3 className='font-bold text-lg text-white'>{recipe.title}</h3>
						<div className='flex gap-2'>
							<button
								className='text-white font-semibold p-2 rounded-full hover:bg-neutral-500'
								onClick={() => {
									renderComponent(<AddRecipePage />);
									editRecipe(recipe.id);
								}}
							>
								<ImPencil2 />
							</button>
							<button
								className='text-white font-semibold p-2 rounded-full hover:bg-neutral-500'
								onClick={() => removeRecipe(recipe.id)}
							>
								<RiDeleteBin6Line />
							</button>
						</div>
					</div>

					<div className='px-4 py-2 flex flex-col gap-6'>
						<div className='flex justify-between p-2'>
							<div className='flex flex-col gap-2 rounded'>
								<h3 className='text-sm font-semibold italic'>Ingredients:</h3>
								<div className='text-xs w-28'>
									{Object.entries(recipe).map(
										([key, value], index) =>
											key.startsWith('ingredient') &&
											value && (
												<p key={index} className='flex justify-between'>
													{value}{' '}
													<span>
														{recipe['weight' + key.slice(10)]
															? recipe['weight' + key.slice(10)] + 'g'
															: '0 g'}
													</span>
												</p>
											)
									)}
								</div>
							</div>

							{!toggleMacros && (
								<div className='p-3 h-10 font-semibold rounded bg-lime-200 hover:bg-lime-300 hover:cursor-pointer'>
									<button onClick={setToggleMacros}>Get macros</button>
								</div>
							)}

							{toggleMacros && (
								<div>
									<div className='flex gap-1 font-bold text-[10px]'>
										<div className='flex flex-col items-center'>
											<p className='p-1'>Cal</p>
											<div className='bg-lime-400 rounded-sm py-1 px-2'>
												{nutrients.calories}
											</div>
										</div>
										<div className='flex flex-col items-center'>
											<p className='p-1'>P</p>
											<div className='bg-red-400 rounded-sm py-1 px-2'>
												{nutrients.protein}
											</div>
										</div>
										<div className='flex flex-col items-center'>
											<p className='p-1'>CH</p>
											<div className='bg-blue-400 rounded-sm py-1 px-2'>
												{nutrients.carbs}
											</div>
										</div>
										<div className='flex flex-col items-center'>
											<p className='p-1'>F</p>
											<div className='bg-yellow-400 rounded-sm py-1 px-2'>
												{nutrients.fat}
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
						<div className='flex flex-col gap-2 p-2 rounded'>
							<h3 className='text-sm font-semibold italic'>Elaboration:</h3>
							<p className='text-xs'>{recipe.description}</p>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<section className='flex justify-between px-10 py-4 w-full'>
			<div className='flex flex-col gap-4'>
				<h2 className='font-semibold text-xl italic flex gap-2 items-center'>
					Recipe List <FaRegListAlt />
				</h2>
				{inputRecipeList()}
			</div>
			{renderRecipe()}
		</section>
	);
};

export default RecipeListPage;
