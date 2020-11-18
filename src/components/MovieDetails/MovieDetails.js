import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import back from "../../images/back-button.svg";
import Spinner from "../Spinner/Spinner";
import NotFound from "../404/NotFound";

const MovieDetails = ({ match }) => {
	const [movie, setMovie] = useState();
	const [loading, setLoading] = useState(true);
	const id = match.params.id;

	let content = <Spinner />;

	useEffect(() => {
		return axios
			.get(`http://www.omdbapi.com/?apikey=443f62b0&i=${id}`)
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

	if (!loading) {
		if (movie !== "") {
			content = (
				<div className='movie-details-container'>
					<Link to='/'>
						<img className='back-home' src={back} alt='' />
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
								<li>Favorite</li>
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
