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
	});
};

export const deleteRecipe = async id => {
	await deleteDoc(doc(db, 'recipes', id));
};
