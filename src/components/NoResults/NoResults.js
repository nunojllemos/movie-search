import React from "react";

const NoResults = () => {
	let content = (
		<div className='no-results-wrapper'>
			<div className='bg-image'>
				<h2>No results!</h2>
				<div className='dash'></div>
				<p>Sorry! No results for the searched movie.</p>
			</div>
		</div>
	);

	return content;
};

export default NoResults;
