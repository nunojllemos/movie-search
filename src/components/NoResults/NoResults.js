import React from "react";

const NoResults = () => {
	return (
		<div className='no-results-wrapper'>
			<div className='bg-image'>
				<h2>No results!</h2>
				<div className='dash'></div>
				<p>No results for the searched movie.</p>
			</div>
		</div>
	);
};

export default NoResults;
