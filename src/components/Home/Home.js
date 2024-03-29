import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Search from "../Search/Search";
import LandPage from "../LandPage/LandPage";
import MoviesList from "../MoviesList/MoviesList";

const Home = () => {
	// session storage
	const setSessionStorageData = (data) => {
		window.sessionStorage.setItem("search", JSON.stringify(data));
	};

	// state
	const [search, setSearch] = useState(
		JSON.parse(window.sessionStorage.getItem("search"))
			? JSON.parse(window.sessionStorage.getItem("search"))
			: ""
	);
	const [moviesList, setMoviesList] = useState([]);
	const [loading, setLoading] = useState();

	const isFirstLoad = useRef(true);

	const handleSubmit = (search) => {
		setSearch(search);
	};

	const fetchData = () => {
		const searchResult = axios
			.get(`https://www.omdbapi.com/?apikey=be290818&s=${search}`)
			.then((res) => {
				if (res.data.Response === "True") {
					// store results found in moviesList state
					setMoviesList(res.data.Search);
					setSessionStorageData(search);
					setLoading(false);
				} else {
					// no results found
					setMoviesList([]);
					setLoading(false);
				}
			});

		return searchResult;
	};

	useEffect(() => {
		if (window.sessionStorage.getItem("search")) {
			isFirstLoad.current = false;
		}

		if (isFirstLoad.current) {
			isFirstLoad.current = false;
		} else {
			setLoading(true);
			fetchData();
		}
	}, [search]);

	// content
	let content = (
		<>
			<Search handleSubmit={handleSubmit} />
			{!search ? (
				<LandPage loading={loading} />
			) : (
				<MoviesList path={"/"} loading={loading} moviesList={moviesList} />
			)}
		</>
	);

	return content;
};

export default Home;
