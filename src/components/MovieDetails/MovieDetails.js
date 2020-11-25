import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import back from "../../images/back-button.svg";
import Spinner from "../Spinner/Spinner";
import NotFound from "../404/NotFound";

const MovieDetails = ({ match }) => {
	const [movie, setMovie] = useState();
	const [loading, setLoading] = useState(true);
	const favoriteDiv = useRef(null);
	const isFavorite = useRef(false);
	const pathname = useRef(window.location.pathname);
	const id = match.params.id;

	let favorites = window.sessionStorage.getItem("favorites")
		? JSON.parse(window.sessionStorage.getItem("favorites"))
		: null;

	if (favorites) {
		favorites.forEach((favoriteMovie) => {
			if (favoriteMovie === id) {
				isFavorite.current = true;
			}
		});
	}

	const toggleFavorite = () => {
		// checks if there's any value in session storage
		if (!favorites || favorites.length === 0) {
			// creates session storage
			window.sessionStorage.setItem("favorites", JSON.stringify([id]));
			favorites = JSON.parse(window.sessionStorage.getItem("favorites"));

			// changes UI
			changeFavoriteButton(favoriteDiv, "fav", "not-fav");
			isFavorite.current = true;
		} else {
			if (isFavorite.current) {
				// removes from favorites
				const index = favorites.indexOf(id);
				favorites.splice(index, 1);
				window.sessionStorage.setItem("favorites", JSON.stringify(favorites));

				// UI changes
				changeFavoriteButton(favoriteDiv, "not-fav", "fav");

				isFavorite.current = false;
			} else {
				// adds to favorites
				favorites.push(id);
				window.sessionStorage.setItem("favorites", JSON.stringify(favorites));

				// UI changes
				changeFavoriteButton(favoriteDiv, "fav", "not-fav");

				isFavorite.current = true;
			}
		}

		console.log(favorites);
	};

	const changeFavoriteButton = (ref, add, remove) => {
		ref.current.classList.add(add);
		ref.current.classList.remove(remove);
	};

	useEffect(() => {
		axios
			.get(`https://www.omdbapi.com/?apikey=443f62b0&i=${id}`)
			.then((res) => {
				if (res.data.Response === "True") {
					setMovie(res.data);
					setLoading(false);
				} else {
					setMovie("");
					setLoading(false);
				}
			});
	}, [id]);

	let content = <Spinner />;

	console.log(pathname);
	console.log(`/${id}`);

	if (!loading) {
		if (movie !== "") {
			content = (
				<div className='movie-details-container'>
					<Link
						className='back-home-link'
						to={pathname.current === `/favorites/${id}` ? "/favorites" : "/"}>
						<img className='back-home-img' src={back} alt='' />
						<span className='back-home-span'>
							Back to{" "}
							{pathname.current === `/favorites/${id}` ? "Favorites" : "Search"}
						</span>
					</Link>

					<div className='movie-data-container'>
						<section className='movie-info-container'>
							<ul>
								<li>
									<h2>{movie.Runtime}</h2>
								</li>
								<li>
									<h2>{movie.Year}</h2>
								</li>
								<li>
									<div className='movie-rate'>{movie.Rated}</div>
								</li>
							</ul>
							<h1>{movie.Title}</h1>
							<ul>
								<li>
									<div className='rating-container'>
										<div className='imdb icon'></div>
										<div className='rating'>
											{movie.Ratings.length > 0
												? movie.Ratings[0].Value
												: "N/A"}
										</div>
									</div>
								</li>
								<li>
									<div className='rating-container'>
										<div className='rotten-tomatoes icon'></div>
										<div className='rating'>
											{movie.Ratings.length > 1
												? movie.Ratings[1].Value
												: "N/A"}
										</div>
									</div>
								</li>
								<li className='favorite-container'>
									<div
										ref={favoriteDiv}
										onClick={toggleFavorite}
										className={
											isFavorite.current ? "bg-heart fav" : "bg-heart not-fav"
										}></div>
								</li>
							</ul>
							<div className='movie-info'>
								<div className='plot'>
									<h3 className='title'>Plot</h3>
									<p className='text'>{movie.Plot}</p>
								</div>
								<div>
									<h3 className='title'>Cast</h3>
									<p className='text'>{movie.Actors}</p>
								</div>
								<div>
									<h3 className='title'>Genre</h3>
									<p className='text'>{movie.Genre}</p>
								</div>
								<div>
									<h3 className='title'>Director</h3>
									<p className='text'>{movie.Director}</p>
								</div>
							</div>
						</section>
						<section className='movie-poster-container'>
							<div className='movie-poster'>
								<img src={movie.Poster} alt='' />
							</div>
						</section>
					</div>
				</div>
			);
		} else {
			content = <NotFound />;
		}
	}

	return content;
};

export default MovieDetails;
