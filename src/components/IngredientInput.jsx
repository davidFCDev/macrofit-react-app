import React from 'react';

const IngredientInput = ({
	ingredient,
	weight,
	handleWeightChange,
	handleInputChange,
}) => {
	return (
		<section className='inputs flex gap-1'>
			<input
				type='text'
				value={ingredient}
				onChange={handleInputChange}
				className='bg-neutral-100 px-3 py-2 focus:outline-none rounded'
				placeholder='ingredient'
			/>
			<input
				type='number'
				value={weight}
				onChange={handleWeightChange}
				className='bg-neutral-100 px-3 py-2 focus:outline-none w-16 rounded'
				placeholder='g'
			/>
		</section>
	);
};

export default IngredientInput;
