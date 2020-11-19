import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Search from "../Search/Search";
import LandPage from "../LandPage/LandPage";
import MoviesList from "../MoviesList/MoviesList";

const Home = () => {
	// session storage
	const getSessionStorageData = (data) => {
		return JSON.parse(window.sessionStorage.getItem(data));
	};

	const setSessionStorageData = (data) => {
		window.sessionStorage.setItem("search", JSON.stringify(data));
	};

	// state
	const [search, setSearch] = useState("");
	const [moviesList, setMoviesList] = useState([]);
	const [loading, setLoading] = useState(true);
	const firstLoad = useRef(true);

	const handleSubmit = (search) => {
		setSearch(search);
	};

	const fetchData = (title) => {
		setLoading(true);

		const searchResult = axios
			.get(`http://www.omdbapi.com/?apikey=443f62b0&s=${title}`)
			.then((res) => {
				if (res.data.Response === "True") {
					// store results found in moviesList state
					setMoviesList(res.data.Search);
					setSessionStorageData(title);
					setLoading(false);
				} else {
					// no results found
					setMoviesList([]);
					setLoading(false);
				}
			});

		return searchResult;
	};

	// Lifecycle
	useEffect(() => {
		if (!firstLoad.current) {
			fetchData(search);
		}

		if (firstLoad.current) {
			if (getSessionStorageData("search") !== null) {
				setSearch(getSessionStorageData("search"));
			}
			firstLoad.current = false;
		}
	}, [search]);

	// content
	let content = (
		<>
			<Search handleSubmit={handleSubmit} />
			{firstLoad.current ? (
				<LandPage />
			) : (
				<MoviesList loading={loading} moviesList={moviesList} />
			)}
		</>
	);

	return content;
};

export default Home;
