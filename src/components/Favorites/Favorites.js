import React, { useEffect, useState } from "react";
import axios from "axios";
import MoviesList from "../MoviesList/MoviesList";

const Favorites = () => {
	let favorites = JSON.parse(window.sessionStorage.getItem("favorites"))
		? JSON.parse(window.sessionStorage.getItem("favorites"))
		: null;
	const [loading, setLoading] = useState(true);
	const [favoriteMovies, setFavoriteMovies] = useState([]);

	useEffect(() => {
		let movies = [];
		let elementsCount = 0;

		console.log(favorites);

		if (favorites) {
			if (favorites.length > 0) {
				favorites.map((id) => {
					return axios
						.get(`https://www.omdbapi.com/?apikey=443f62b0&i=${id}`)
						.then((res) => {
							if (res.data.Response === "True") {
								if (elementsCount + 1 !== favorites.length) {
									elementsCount++;
									movies.push(res.data);
								} else {
									movies.push(res.data);
									setFavoriteMovies(movies);
									setLoading(false);
								}
							} else {
								setLoading(false);
							}
						});
				});
			} else {
				setLoading(false);
			}
		} else {
			setLoading(false);
		}
	}, []);

	return (
		<MoviesList
			path={"/favorites/"}
			loading={loading}
			moviesList={favoriteMovies}
		/>
	);
};

export default Favorites;
