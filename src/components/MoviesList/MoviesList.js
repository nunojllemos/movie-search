import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import NoResults from "../NoResults/NoResults";

const MoviesList = ({ moviesList }) => {
	let content =
		moviesList.length !== 0 ? (
			<div className='movies-list'>
				{moviesList.map((movie) => {
					return <MovieCard movie={movie} />;
				})}
			</div>
		) : (
			<NoResults />
		);

	return content;
};

export default MoviesList;
