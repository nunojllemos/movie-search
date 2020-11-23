import React, { useEffect, useState } from "react";
import axios from "axios";
// import Spinner from "../Spinner/Spinner";
// import NoResults from "../NoResults/NoResults";
// import MovieCard from "../MovieCard/MovieCard";
import MoviesList from "../MoviesList/MoviesList";

const Favorites = () => {
	let favorites = JSON.parse(window.sessionStorage.getItem("favorites"))
		? JSON.parse(window.sessionStorage.getItem("favorites"))
		: null;
	const [loading, setLoading] = useState(true);
	const [favoriteMovies, setFavoriteMovies] = useState([]);

	useEffect(() => {
		let movies = [];
		let i = 0;

		if (favorites) {
			favorites.map((id) => {
				return axios
					.get(`http://www.omdbapi.com/?apikey=443f62b0&i=${id}`)
					.then((res) => {
						if (res.data.Response === "True") {
							if (i + 1 !== favorites.length) {
								i++;
								movies.push(res.data);
							} else {
								movies.push(res.data);
								setFavoriteMovies(movies);
								setLoading(false);
							}
						}
					});
			});
		} else {
			setLoading(false);
		}
	}, []);

	// if (!loading) {
	// 	if (favoriteMovies.length > 0) {
	// 		return favoriteMovies.map((movie) => {
	// 			return <MovieCard movie={movie} />;
	// 		});
	// 	} else {
	// 		return <NoResults />;
	// 	}
	// } else {
	// 	return <Spinner />;
	// }

	return <MoviesList loading={loading} moviesList={favoriteMovies} />;
};

export default Favorites;
