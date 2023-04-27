import {
	addNewRecipe,
	deleteRecipe,
	getRecipes,
	updateRecipe,
} from '../controllers/recipeController';
import { useEffect, useState } from 'react';
import { ImPencil2 } from 'react-icons/im';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPen } from 'react-icons/bs';

const Recipes = () => {
	const [recipe, setRecipe] = useState({
		title: '',
		description: '',
		ingredient1: '',
		ingredient2: '',
		ingredient3: '',
		ingredient4: '',
		ingredient5: '',
		ingredient6: '',
		ingredient7: '',
	});
	const [recipes, setRecipes] = useState([]);
	const [mode, setMode] = useState('add');

	const createNewRecipe = async () => {
		await addNewRecipe(recipe);
		setRecipe({ title: '', description: '' });
		initializeRecipes();
	};

	const initializeRecipes = () => {
		getRecipes()
			.then(t => setRecipes([...t]))
			.catch(e => console.error(e));
	};

	const editRecipe = id => {
		setMode('update');
		const recipeToEdit = recipes.find(t => t.id === id);
		setRecipe({ ...recipeToEdit });
	};

	const updateExistingRecipe = async () => {
		await updateRecipe(recipe);
		setRecipe({ title: '', description: '' });
		initializeRecipes();
		setMode('add');
	};

	const removeRecipe = async id => {
		await deleteRecipe(id);
		initializeRecipes();
	};

	useEffect(() => {
		initializeRecipes();
	}, []);
	return (
		<div className='flex flex-col gap-5 w-full px-10 py-4 text-neutral-600'>
			<h2 className='font-semibold text-xl italic flex gap-2 items-center'>
				New recipe <BsPen className='w-4' />
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
			<div className='grid'>
				{recipes.map(r => (
					<div
						key={r.id}
						className='flex flex-col gap-2 bg-neutral-100 rounded-md p-2'
					>
						<div className=''>
							<div className='flex flex-col gap-2 text-xs'>
								<h3 className='font-semibold'>{r.title}</h3>
								<h4>Ingredients:</h4>
								<div>
									<p>{r.ingredient1}</p>
									<p>{r.ingredient2}</p>
									<p>{r.ingredient3}</p>
									<p>{r.ingredient4}</p>
									<p>{r.ingredient5}</p>
									<p>{r.ingredient6}</p>
									<p>{r.ingredient7}</p>
									<p>{r.description}</p>
								</div>
							</div>
							<div className='flex gap-2'>
								<button
									className='user-btn text-white font-semibold py-1 rounded-md'
									onClick={() => editRecipe(r.id)}
								>
									<ImPencil2 />
								</button>
								<button
									className='user-btn text-white font-semibold py-1 rounded-md'
									onClick={() => removeRecipe(r.id)}
								>
									<RiDeleteBin6Line />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Recipes;
