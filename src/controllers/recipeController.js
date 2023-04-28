import {
	addDoc,
	setDoc,
	doc,
	collection,
	getDocs,
	deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

export const addNewRecipe = async recipe => {
	await addDoc(collection(db, 'recipes'), recipe);
};

export const getRecipes = async () => {
	const querySnapshot = await getDocs(collection(db, 'recipes'));

	const recipes = querySnapshot.docs.map(doc => {
		return { ...doc.data(), id: doc.id };
	});
	return recipes;
};

export const updateRecipe = async recipe => {
	await setDoc(doc(db, 'recipes', recipe.id), {
		title: recipe.title,
		description: recipe.description,
		ingredient1: recipe.ingredient1,
		ingredient2: recipe.ingredient2,
		ingredient3: recipe.ingredient3,
		ingredient4: recipe.ingredient4,
		ingredient5: recipe.ingredient5,
		ingredient6: recipe.ingredient6,
		ingredient7: recipe.ingredient7,
	});
};

export const deleteRecipe = async id => {
	await deleteDoc(doc(db, 'recipes', id));
};
