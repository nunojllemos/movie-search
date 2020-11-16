import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Search from "../Search/Search";
import LandPage from "../LandPage/LandPage";
import Footer from "../Footer/Footer";

const Home = () => {
	const [search, setSearch] = useState("");
	const [moviesList, setMoviesList] = useState([]);
	const firstLoad = useRef(true);

	const handleSubmit = (search) => {
		setSearch(search);
		console.log(search);
	};

	const fetchData = (search) => {
		const searchResult = axios
			.get(`http://www.omdbapi.com/?apikey=443f62b0&s=${search}`)
			.then((res) => {
				if (res.data.Response === "True") {
					// store results found in moviesList state
					setMoviesList(res.data.Search);
				} else {
					// no results found
					setMoviesList([]);
				}
			});

		return searchResult;
	};

	useEffect(() => {
		if (!firstLoad.current) {
			fetchData(search);
		} else {
			firstLoad.current = false;
		}
	}, [search]);

	// content
	let content = (
		<>
			<Search handleSubmit={handleSubmit} />
			{firstLoad.current ? <LandPage /> : <h1>MOVIE LIST</h1>}
			<Footer />
		</>
	);

	return content;
};

export default Home;
