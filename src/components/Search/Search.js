import React, { useState, useEffect, useRef } from "react";

const Search = ({ handleSubmit }) => {
	const [search, setSearch] = useState("");
	const input = useRef();
	const clear = useRef();
	const label = useRef();

	const handleInputChange = (e) => {
		if (input.current.value !== "") {
			clear.current.classList.add("show");
		} else {
			clear.current.classList.remove("show");
		}

		setSearch(e.target.value);
	};

	const handleInputFocus = () => {
		label.current.classList.add("up");
	};

	const handleInputOutOfFocus = () => {
		if (input.current.value === "") {
			label.current.classList.remove("up");
		}
	};

	const clearInput = () => {
		if (input.current.value !== "") {
			input.current.value = "";
			setSearch("");
			clear.current.classList.remove("show");
			input.current.focus();
		}
	};

	useEffect(() => {
		if (window.sessionStorage.getItem("search")) {
			document.querySelector("input[type=text]").value = JSON.parse(
				window.sessionStorage.getItem("search")
			);
		}

		if (input.current.value !== "") {
			clear.current.classList.add("show");
			label.current.classList.add("up");
		}
	}, []);

	let content = (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(search);
			}}>
			<label ref={label} htmlFor='movie'>
				search
			</label>
			<input
				autoComplete='off'
				name='movie'
				className='input'
				type='text'
				onChange={handleInputChange}
				onFocus={handleInputFocus}
				onBlur={handleInputOutOfFocus}
				ref={input}
			/>
			<p onClick={clearInput} ref={clear} className='delete-input-data'>
				clear
			</p>
		</form>
	);

	return content;
};

export default Search;
