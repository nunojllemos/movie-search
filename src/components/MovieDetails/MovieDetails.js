import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import back from "../../images/back-button.svg";
import Spinner from "../Spinner/Spinner";
import NotFound from "../404/NotFound";

const MovieDetails = ({ match }) => {
	const [movie, setMovie] = useState();
	const [loading, setLoading] = useState(true);
	const fav = useRef(null);
	const isFavorite = useRef(false);
	const id = match.params.id;
	let favorites;

	if (JSON.parse(window.sessionStorage.getItem("favorites"))) {
		favorites = JSON.parse(window.sessionStorage.getItem("favorites"));
		favorites.forEach((movieID) => {
			if (movieID === id) {
				isFavorite.current = true;
			}
		});
	}

	let content = <Spinner />;

	const toggleFavorite = (id) => {
		// checks if there's any value in session storage
		if (!favorites || favorites.length === 0) {
			// creates session storage
			window.sessionStorage.setItem("favorites", JSON.stringify([id]));

			// changes UI
			favoriteInterface(fav, "fav", "not-fav");
			isFavorite.current = true;
		} else {
			if (!isFavorite.current) {
				// if not, adds to favorites
				favorites.push(id);
				window.sessionStorage.setItem("favorites", JSON.stringify(favorites));

				// UI changes
				favoriteInterface(fav, "fav", "not-fav");
			} else {
				// if yes, removes from favorites
				const index = favorites.indexOf(id);
				favorites.splice(index, 1);
				window.sessionStorage.setItem("favorites", JSON.stringify(favorites));

				// UI changes
				favoriteInterface(fav, "not-fav", "fav");
			}
		}
	};

	const favoriteInterface = (ref, add, remove) => {
		ref.current.classList.add(add);
		ref.current.classList.remove(remove);
	};

	useEffect(() => {
		// fetch data
		axios.get(`http://www.omdbapi.com/?apikey=443f62b0&i=${id}`).then((res) => {
			if (res.data.Response === "True") {
				setMovie(res.data);
				setLoading(false);
			} else {
				setMovie("");
				setLoading(false);
			}
		});
	}, [id]);

	if (!loading) {
		if (movie !== "") {
			content = (
				<div className='movie-details-container'>
					<Link className='back-home-link' to='/'>
						<img className='back-home-img' src={back} alt='' />
						<span className='back-home-span'>Back to Search</span>
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
										ref={fav}
										onClick={() => {
											toggleFavorite(id);
										}}
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
