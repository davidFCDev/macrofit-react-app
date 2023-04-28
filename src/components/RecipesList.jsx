import React, { useEffect, useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { ImPencil2 } from 'react-icons/im';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegListAlt } from 'react-icons/fa';
import Recipes from './Recipes';

const RecipesList = () => {
	const {
		recipes,
		removeRecipe,
		editRecipe,
		initializeRecipes,
		renderComponent,
	} = useDashboard();
	const [selectedRecipe, setSelectedRecipe] = useState('');

	useEffect(() => {
		initializeRecipes();
	}, []);

	const renderRecipeList = () => {
		return (
			<select
				value={selectedRecipe}
				onChange={event => setSelectedRecipe(event.target.value)}
				className='text-xs bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-lime-200'
			>
				<option value={null}>select your recipe...</option>
				{recipes.map(recipe => (
					<option key={recipe.id} value={recipe.title}>
						{recipe.title}
					</option>
				))}
			</select>
		);
	};

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
								className='user-btn text-white font-semibold p-2 rounded-full'
								onClick={() => {
									renderComponent(<Recipes />);
									editRecipe(recipe.id);
								}}
							>
								<ImPencil2 />
							</button>
							<button
								className='bg-red-500 hover:bg-red-400 text-white font-semibold p-2 rounded-full'
								onClick={() => removeRecipe(recipe.id)}
							>
								<RiDeleteBin6Line />
							</button>
						</div>
					</div>
					<div className='px-4 py-2 flex flex-col gap-2'>
						<h3 className='text-sm font-semibold italic'>Ingredients:</h3>
						<div className='text-'>
							<p>{recipe.ingredient1}</p>
							<p>{recipe.ingredient2}</p>
							<p>{recipe.ingredient3}</p>
							<p>{recipe.ingredient4}</p>
							<p>{recipe.ingredient5}</p>
							<p>{recipe.ingredient6}</p>
							<p>{recipe.ingredient7}</p>
						</div>
						<h3 className='text-sm font-semibold italic'>Elaboration:</h3>
						<p>{recipe.description}</p>
					</div>
				</div>
			</div>
		);
	};

	return (
		<section className='flex justify-between px-10 py-4 w-full'>
			<div className='flex flex-col gap-4'>
				<h2 className='font-semibold text-xl italic flex gap-2 items-center'>
					Recipes List <FaRegListAlt />
				</h2>
				{renderRecipeList()}
			</div>
			{renderRecipe()}
		</section>
	);
};

export default RecipesList;
