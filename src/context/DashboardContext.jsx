import React, { useContext, createContext, useEffect, useState } from 'react';
import {
	addNewRecipe,
	deleteRecipe,
	getRecipes,
	updateRecipe,
} from '../controllers/recipeController';
import { toast } from 'react-hot-toast';
import SearchIngredientPage from '../pages/SearchIngredientPage';

const dashboardContext = createContext();

export const useDashboard = () => {
	const context = useContext(dashboardContext);
	if (!context) {
		throw new Error('useAuth must be used within a AuthProvider');
	}
	return context;
};

export function DashboardProvider({ children }) {
	const [component, setComponent] = useState(<SearchIngredientPage />);
	const [toggleMacros, setToggleMacros] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [active, setActive] = useState(0);
	const [selectedRecipe, setSelectedRecipe] = useState('');
	const [recipes, setRecipes] = useState([]);
	const [mode, setMode] = useState('add');
	const initialState = {
		title: '',
		description: '',
		ingredient1: '',
		weight1: 0,
		ingredient2: '',
		weight2: 0,
		ingredient3: '',
		weight3: 0,
		ingredient4: '',
		weight4: 0,
		ingredient5: '',
		weight5: 0,
		ingredient6: '',
		weight6: 0,
		ingredient7: '',
		weight7: 0,
	};
	const [recipe, setRecipe] = useState(initialState);

	const renderComponent = (e, i) => {
		setComponent(e);
		setActive(i);
	};

	const createNewRecipe = async () => {
		await addNewRecipe(recipe);
		setRecipe(initialState);
		toast.success('Recipe added successfully!');
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
		toast.success('Recipe updated successfully!');
		initializeRecipes();
		setMode('add');
		setRecipe(initialState);
	};

	const removeRecipe = async id => {
		await deleteRecipe(id);
		toast.success('Recipe deleted successfully!');
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
				setSelectedRecipe,
				setComponent,
				setActive,
				setRecipe,
				setMode,
				setRecipes,
				setError,
				setLoading,
				setToggleMacros,
				toggleMacros,
				error,
				loading,
				recipe,
				recipes,
				mode,
				component,
				selectedRecipe,
				active,
			}}
		>
			{children}
		</dashboardContext.Provider>
	);
}
