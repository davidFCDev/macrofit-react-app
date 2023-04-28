import React from 'react';
import { useDashboard } from '../context/DashboardContext';

const IngredientRecipe = () => {
	const { recipe, setRecipe } = useDashboard();

	return (
		<div className='flex gap-1'>
			<input
				type='text'
				id='ingredient'
				name='ingredient'
				placeholder='ingredient'
				className='bg-neutral-100 px-2 py-1 focus:outline-none focus:bg-neutral-200'
				value={recipe.ingredient1}
				onChange={e => setRecipe({ ...recipe, ingredient1: e.target.value })}
			></input>
			<input
				type='number'
				id='weight'
				name='weight'
				placeholder='g'
				className='bg-neutral-100 px-2 py-1 focus:outline-none focus:bg-neutral-200 w-20'
				value={recipe.weight1}
				onChange={e => setRecipe({ ...recipe, weight1: e.target.value })}
			></input>
		</div>
	);
};

export default IngredientRecipe;
