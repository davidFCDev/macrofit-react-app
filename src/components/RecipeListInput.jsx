import { useDashboard } from '../context/DashboardContext';

const RecipeListInput = () => {
	const { recipes, selectedRecipe, setSelectedRecipe, loading, setLoading, setToggleMacros, toggleMacros } =
		useDashboard();

	const handleSelectRecipe = event => {
		setLoading(true);
		setSelectedRecipe(null);
		setToggleMacros(false);
		setTimeout(() => {
			setSelectedRecipe(event.target.value);
			setLoading(false);
		}, 1000);
	};

	return (
		<>
			{loading ? (
				<div className='text-center'>
					<p className='italic text-xs flex items-center gap-2'>searching...</p>
				</div>
			) : (
				<select
					value={selectedRecipe}
					onChange={handleSelectRecipe}
					className='text-xs bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-lime-200'
				>
					<option value={null}>select your recipe...</option>
					{recipes.map(recipe => (
						<option key={recipe.id} value={recipe.title}>
							{recipe.title}
						</option>
					))}
				</select>
			)}
		</>
	);
};

export default RecipeListInput;
