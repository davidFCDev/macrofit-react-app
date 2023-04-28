import { BsPen } from 'react-icons/bs';
import { useDashboard } from '../context/DashboardContext';

const Recipes = () => {
	const { recipe, setRecipe, createNewRecipe, updateExistingRecipe, mode } =
		useDashboard();

	return (
		<div className='flex flex-col gap-5 w-full px-10 py-4 text-neutral-600'>
			<h2 className='font-semibold text-xl italic flex gap-2 items-center'>
				{mode === 'add' ? 'New' : 'Update'} recipe <BsPen className='w-4' />
			</h2>
			<div className='flex flex-col gap-2 w-full'>
				<input
					type='text'
					id='title'
					name='title'
					placeholder='title'
					className='bg-neutral-100 rounded-md px-2 py-1 focus:outline-none focus:bg-neutral-200'
					value={recipe.title}
					onChange={e => setRecipe({ ...recipe, title: e.target.value })}
				/>
				<div className='flex gap-4'>
					<div className='flex flex-col gap-1 text-sm'>
						<input
							type='text'
							id='ingredient'
							name='ingredient'
							placeholder='ingredient'
							className='bg-neutral-100 rounded-md px-2 py-1 focus:outline-none focus:bg-neutral-200'
							value={recipe.ingredient1}
							onChange={e =>
								setRecipe({ ...recipe, ingredient1: e.target.value })
							}
						></input>
						<input
							type='text'
							id='ingredient'
							name='ingredient'
							placeholder='...'
							className='bg-neutral-100 rounded-md px-2 py-1 focus:outline-none focus:bg-neutral-200'
							value={recipe.ingredient2}
							onChange={e =>
								setRecipe({ ...recipe, ingredient2: e.target.value })
							}
						></input>
						<input
							type='text'
							id='ingredient'
							name='ingredient'
							placeholder='...'
							className='bg-neutral-100 rounded-md px-2 py-1 focus:outline-none focus:bg-neutral-200'
							value={recipe.ingredient3}
							onChange={e =>
								setRecipe({ ...recipe, ingredient3: e.target.value })
							}
						></input>
						<input
							type='text'
							id='ingredient'
							name='ingredient'
							placeholder='...'
							className='bg-neutral-100 rounded-md px-2 py-1 focus:outline-none focus:bg-neutral-200'
							value={recipe.ingredient4}
							onChange={e =>
								setRecipe({ ...recipe, ingredient4: e.target.value })
							}
						></input>
						<input
							type='text'
							id='ingredient'
							name='ingredient'
							placeholder='...'
							className='bg-neutral-100 rounded-md px-2 py-1 focus:outline-none focus:bg-neutral-200'
							value={recipe.ingredient5}
							onChange={e =>
								setRecipe({ ...recipe, ingredient5: e.target.value })
							}
						></input>
						<input
							type='text'
							id='ingredient'
							name='ingredient'
							placeholder='...'
							className='bg-neutral-100 rounded-md px-2 py-1 focus:outline-none focus:bg-neutral-200'
							value={recipe.ingredient6}
							onChange={e =>
								setRecipe({ ...recipe, ingredient6: e.target.value })
							}
						></input>
						<input
							type='text'
							id='ingredient'
							name='ingredient'
							placeholder='...'
							className='bg-neutral-100 rounded-md px-2 py-1 focus:outline-none focus:bg-neutral-200'
							value={recipe.ingredient7}
							onChange={e =>
								setRecipe({ ...recipe, ingredient7: e.target.value })
							}
						></input>
						<button
							className='user-btn text-white font-semibold py-1 rounded-md'
							onClick={() =>
								mode === 'add' ? createNewRecipe() : updateExistingRecipe()
							}
						>
							{mode === 'add' ? 'Add' : 'Update'}
						</button>
					</div>
					<textarea
						type='text'
						id='description'
						name='description'
						placeholder='description'
						className='bg-neutral-100 rounded-md px-2 py-1 focus:outline-none focus:bg-neutral-200 w-full text-sm'
						rows={8}
						value={recipe.description}
						onChange={e =>
							setRecipe({ ...recipe, description: e.target.value })
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default Recipes;
