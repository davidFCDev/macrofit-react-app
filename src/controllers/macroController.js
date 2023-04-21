import axios from 'axios';

export const getIngredient = async (ingredient, weight) => {
	try {
		const response = await axios.get(import.meta.env.VITE_API_URL, {
			params: {
				app_id: import.meta.env.VITE_API_ID,
				app_key: import.meta.env.VITE_API_KEY,
				ingr: ingredient,
				weight,
			},
		});
		return response.data;
	} catch (error) {
		throw new Error('Unable to fetch food data.');
	}
};

export const getNutrients = (data, weight) => {
	return {
		name: data.hints[0].food.label,
		weight,
		calories: Math.round(
			(data.hints[0].food.nutrients.ENERC_KCAL * weight) / 100
		),
		protein: Math.round((data.hints[0].food.nutrients.PROCNT * weight) / 100),
		carbs: Math.round((data.hints[0].food.nutrients.CHOCDF * weight) / 100),
		fat: Math.round((data.hints[0].food.nutrients.FAT * weight) / 100),
	};
};

export const addNutrients = (ingredientList, newIngredient, property) => {
	return Math.round(
		ingredientList.reduce((acc, curr) => acc + curr[property], 0) +
			newIngredient[property]
	);
};

export const delNutrients = (ingredientList, ingredientToRemove, property) => {
	return Math.round(
		ingredientList.reduce((acc, curr) => {
			if (curr === ingredientToRemove) {
				return acc;
			}
			return acc + curr[property];
		}, 0)
	);
};
