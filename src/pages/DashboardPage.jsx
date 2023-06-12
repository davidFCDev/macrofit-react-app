import { useAuth } from '../context/AuthContext';
import { MdMenuBook, MdRestaurantMenu } from 'react-icons/md';
import { GiFruitBowl } from 'react-icons/gi';
import Macros from './MenuPage';
import SearchIngredientPage from './SearchIngredientPage';

import AddRecipePage from './AddRecipePage';
import RecipeListPage from './RecipeListPage';
import { RiPlayListAddLine } from 'react-icons/ri';
import { useDashboard } from '../context/DashboardContext';

const DashboardPage = () => {
	// const { logout, user } = useAuth();
	const { component, setComponent, active, setActive, setSelectedRecipe } = useDashboard();

	const renderComponent = (e, i) => {
		setComponent(e);
		setActive(i);
		setSelectedRecipe('');
	};

	return (
		<div className='w-full flex flex-col py-3 px-10 gap-3 text-neutral-700 bg-neutral-200'>
			<header className='w-full bg-white rounded-md py-2'>
				<h1 className='dash-title font-bold text-xl text-center tracking-widest'>
					DASHBOARD
				</h1>
			</header>

			<main className='flex gap-3'>
				<section className='flex flex-col gap-2'>
					<div
						className={`flex justify-between px-4 py-5 bg-white shadow-sm w-96 rounded-md border-2 hover:bg-neutral-100 hover:cursor-pointer ${
							active === 0 ? 'border-lime-600' : ''
						}`}
						onClick={() => renderComponent(<SearchIngredientPage />, 0)}
					>
						<div className=' flex flex-col gap-2'>
							<h2 className='text-sm font-semibold uppercase'>Ingredient</h2>
							<hr className='border w-10 border-neutral-400' />
							<p className='text-xs italic'>
								Check the values of an ingredient.
							</p>
						</div>
						<button className='cssbuttons-io-button'>
							<GiFruitBowl className='text-2xl' />
						</button>
					</div>

					<div
						className={`flex justify-between px-4 py-5 bg-white shadow-sm w-96 rounded-md border-2 hover:bg-neutral-100 hover:cursor-pointer ${
							active === 1 ? 'border-lime-600' : ''
						}`}
						onClick={() => renderComponent(<Macros />, 1)}
					>
						<div className=' flex flex-col gap-2'>
							<h2 className='text-sm font-semibold uppercase'>Menu</h2>
							<hr className='border w-10 border-neutral-400' />
							<p className='text-xs italic'>
								Set a menu and get all your macros.
							</p>
						</div>
						<button className='cssbuttons-io-button'>
							<MdRestaurantMenu className='text-2xl' />
						</button>
					</div>

					<div
						className={`flex justify-between px-4 py-5 bg-white shadow-sm w-96 rounded-md border-2 hover:bg-neutral-100 hover:cursor-pointer ${
							active === 2 ? 'border-lime-600' : ''
						}`}
						onClick={() => renderComponent(<AddRecipePage />, 2)}
					>
						<div className=' flex flex-col gap-2'>
							<h2 className='text-sm font-semibold uppercase'>Recipe</h2>
							<hr className='border w-10 border-neutral-400' />
							<p className='text-xs italic'>Add your best recipes.</p>
						</div>
						<button className='cssbuttons-io-button'>
							<RiPlayListAddLine className='text-2xl' />
						</button>
					</div>

					<div
						className={`flex justify-between px-4 py-5 bg-white shadow-sm w-96 rounded-md border-2 hover:bg-neutral-100 hover:cursor-pointer ${
							active === 3 ? 'border-lime-600' : ''
						}`}
						onClick={() => renderComponent(<RecipeListPage />, 3)}
					>
						<div className=' flex flex-col gap-2'>
							<h2 className='text-sm font-semibold uppercase'>Recipe list</h2>
							<hr className='border w-10 border-neutral-400' />
							<p className='text-xs italic'>
								Check all your recipes in database.
							</p>
						</div>
						<button className='cssbuttons-io-button'>
							<MdMenuBook className='text-2xl' />
						</button>
					</div>
				</section>

				<section className='w-full bg-white rounded-md flex px-4 py-4'>
					{component}
				</section>
			</main>
		</div>
	);
};

export default DashboardPage;
