import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import heart from "../../images/heart-white.svg";
import heartFull from "../../images/heart-full.svg";

const MovieCard = ({ movie }) => {
	const heartFullFav = useRef();
	const heartFav = useRef();

	useEffect(() => {
		let favorites = JSON.parse(window.sessionStorage.getItem("favorites"));
		if (favorites) {
			favorites.forEach((favorite) => {
				if (favorite === movie.imdbID) {
					heartFullFav.current.classList.add("view");
					heartFav.current.src = heartFull;
				}
			});
		}
	}, []);

	let content = (
		<Link className='card-link' to={`/${movie.imdbID}`}>
			<div
				className='card'
				style={{ backgroundImage: `url(${movie.Poster})` }}
				key={movie.imdbID}>
				<img
					ref={heartFullFav}
					className='heart-full'
					alt='heart icon'
					src={heartFull}
				/>
				<div className='movie-info'>
					<img ref={heartFav} alt='heart icon' src={heart} />
					<h2>{movie.Title}</h2>
					<p>{movie.Year}</p>
				</div>
			</div>
		</Link>
	);

	return content;
};

export default MovieCard;
