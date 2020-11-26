import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import heart from "../../images/heart-white.svg";
import heartFull from "../../images/heart-full.svg";
import noImage from "../../images/no-photo.svg";

const MovieCard = ({ movie, path }) => {
	const heartFullFav = useRef();
	const heartFav = useRef();
	const favorites = JSON.parse(window.sessionStorage.getItem("favorites"));

	useEffect(() => {
		if (favorites) {
			favorites.forEach((favoriteMovie) => {
				if (favoriteMovie === movie.imdbID) {
					heartFullFav.current.classList.add("view");
					heartFav.current.src = heartFull;
				}
			});
		}
	}, []);

	let content = (
		<Link className='card-link' to={`${path}${movie.imdbID}`}>
			<div
				className='card'
				style={{
					backgroundImage: `url(${
						movie.Poster !== "N/A" ? movie.Poster : noImage
					})`,
					backgroundSize: `${movie.Poster !== "N/A" ? "cover" : "50%"}`,
				}}
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
