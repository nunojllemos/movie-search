import React from "react";

const NoResults = ({ path }) => {
	let content = (
		<div className='no-results-wrapper'>
			<div className='bg-image'>
				<h2>No {path === "/" ? "results!" : "Favorites!"}</h2>
				<div className='dash'></div>
				<p>
					Sorry!{" "}
					{path === "/"
						? "No results for the searched movie."
						: "No Favorites were saved yet!"}
				</p>
			</div>
		</div>
	);

	return content;
};

export default NoResults;
