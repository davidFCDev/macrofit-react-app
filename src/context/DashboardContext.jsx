import React, { useContext, createContext, useEffect, useState } from 'react';
import {
	addNewRecipe,
	deleteRecipe,
	getRecipes,
	updateRecipe,
} from '../controllers/recipeController';
import Food from '../components/Food';

const dashboardContext = createContext();

export const useDashboard = () => {
	const context = useContext(dashboardContext);
	if (!context) {
		throw new Error('useAuth must be used within a AuthProvider');
	}
	return context;
};

export function DashboardProvider({ children }) {
	const [component, setComponent] = useState(<Food />);
	const [active, setActive] = useState(0);

	const renderComponent = (e, i) => {
		setComponent(e);
		setActive(i);
	};

	const [recipe, setRecipe] = useState({
		title: '',
		description: '',
		ingredient1: '',
		weight1: '',
		ingredient2: '',
		weight2: '',
		ingredient3: '',
		weight3: '',
		ingredient4: '',
		weight4: '',
		ingredient5: '',
		weight5: '',
		ingredient6: '',
		weight6: '',
		ingredient7: '',
		weight7: '',
	});
	const [recipes, setRecipes] = useState([]);
	const [mode, setMode] = useState('add');

	const createNewRecipe = async () => {
		await addNewRecipe(recipe);
		setRecipe({
			title: '',
			description: '',
			ingredient1: '',
			weight1: '',
			ingredient2: '',
			weight2: '',
			ingredient3: '',
			weight3: '',
			ingredient4: '',
			weight4: '',
			ingredient5: '',
			weight5: '',
			ingredient6: '',
			weight6: '',
			ingredient7: '',
			weight7: '',
		});
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
		<dashboardContext.Provider
			value={{
				createNewRecipe,
				editRecipe,
				updateExistingRecipe,
				initializeRecipes,
				removeRecipe,
				renderComponent,
				recipe,
				recipes,
				mode,
				component,
				setComponent,
				active,
				setActive,
				setRecipe,
				setMode,
				setRecipes,
			}}
		>
			{children}
		</dashboardContext.Provider>
	);
}
