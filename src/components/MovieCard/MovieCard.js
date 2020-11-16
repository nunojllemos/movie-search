import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
	let content = (
		<Link className='card-link' to={`/${movie.imdbID}`}>
			<div
				className='card'
				style={{ backgroundImage: `url(${movie.Poster})` }}
				key={movie.imdbID}>
				<div className='movie-info'>
					<h2>{movie.Title}</h2>
					<p>{movie.Year}</p>
				</div>
			</div>
		</Link>
	);

	return content;
};

export default MovieCard;
