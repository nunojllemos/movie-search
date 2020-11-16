import React, { useState } from "react";

const Search = ({ handleSubmit }) => {
	const [search, setSearch] = useState();

	const handleInputChange = (e) => {
		setSearch(e.target.value);
	};

	let content = (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(search);
			}}>
			<input
				placeholder='Search...'
				className='input'
				type='text'
				onChange={handleInputChange}
			/>
		</form>
	);

	return content;
};

export default Search;
