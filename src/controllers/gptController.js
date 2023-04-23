import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';

const axiosInstance = axios.create({
	headers: {
		'User-Agent':
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
	},
});

const configuration = new Configuration({
	apiKey: import.meta.env.VITE_OPENAI_API_KEY,
	httpClient: axiosInstance,
});
const openai = new OpenAIApi(configuration);

export async function generateValorationGPT(
	totalCalories,
	totalProtein,
	totalCarbs,
	totalFat
) {
	const proteinPercent = ((totalProtein * 4) / totalCalories) * 100;
	const carbPercent = ((totalCarbs * 4) / totalCalories) * 100;
	const fatPercent = ((totalFat * 9) / totalCalories) * 100;

	let message = '';

	if (proteinPercent < 10) {
		message += 'Aumenta la ingesta de proteínas o te quedas en los huesos... ';
	}

	if (carbPercent < 45 || carbPercent > 65) {
		message +=
			'Cuidado con los carbohidratos, mantén un equilibrio en tu dieta... ';
	}

	if (fatPercent > 35) {
		message += 'Reduce la cantidad de grasas saturadas que consumes... ';
	}

	if (message === '') {
		message = '¡Excelente! Tu dieta es equilibrada y saludable... ';
	}

	const completion = await openai.createCompletion({
		model: 'text-davinci-003',
		max_tokens: 100,
		prompt: `Total Calories: ${totalCalories}\nTotal Protein: ${totalProtein}\nTotal Carbs: ${totalCarbs}\nTotal Fat: ${totalFat}\n\n${message}`,
	});

	return completion.data.choices[0].text;
}

export async function generateIngredientGPT(ingredient) {
	const completion = await openai.createCompletion({
		model: 'text-davinci-003',
		max_tokens: 30,
		prompt: `Tell me in less than fifteen words and always starts with a capital letter, about the nutrition values and benefits of ${ingredient}\n\n ...`,
	});

	return completion.data.choices[0].text;
}
