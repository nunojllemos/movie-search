import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import NoResults from "../NoResults/NoResults";
import Spinner from "../Spinner/Spinner";

const MoviesList = ({ moviesList, loading }) => {
	let content;
	if (loading) {
		content = <Spinner />;
	} else {
		content =
			moviesList.length !== 0 ? (
				<div className='movies-list'>
					{moviesList.map((movie) => {
						return <MovieCard movie={movie} />;
					})}
				</div>
			) : (
				(content = <NoResults />)
			);
	}
	return content;
};

export default MoviesList;