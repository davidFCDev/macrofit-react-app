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
	const prompt = `Do it in less than fifty words. Based on your intake of ${totalCalories} calories, ${totalProtein} grams of protein, ${totalCarbs} grams of carbs, and ${totalFat} grams of fat, here are some suggestions for improving your nutrition:`;

	const completion = await openai.createCompletion({
		model: 'text-davinci-003',
		max_tokens: 100,
		prompt,
	});

	return completion.data.choices[0].text;
}

export async function generateIngredientGPT(ingredient) {
	const completion = await openai.createCompletion({
		model: 'text-davinci-003',
		max_tokens: 30,
		prompt: `Tell me in less than fifteen words, about the nutrition values and benefits of ${ingredient}\n\n ...`,
	});

	return completion.data.choices[0].text;
}
