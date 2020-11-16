import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Search from "../Search/Search";
import LandPage from "../LandPage/LandPage";
import Footer from "../Footer/Footer";
import MoviesList from "../MoviesList/MoviesList";

const Home = () => {
	const [search, setSearch] = useState("");
	const [moviesList, setMoviesList] = useState([]);
	const [loading, setLoading] = useState(false);
	const firstLoad = useRef(true);

	const handleSubmit = (search) => {
		setSearch(search);
	};

	const fetchData = (search) => {
		setLoading(true);

		const searchResult = axios
			.get(`http://www.omdbapi.com/?apikey=443f62b0&s=${search}`)
			.then((res) => {
				if (res.data.Response === "True") {
					// store results found in moviesList state
					setMoviesList(res.data.Search);
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
		} else {
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
			<Footer />
		</>
	);

	return content;
};

export default Home;
