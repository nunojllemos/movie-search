import React from "react";
import Spinner from "../Spinner/Spinner";

const LandPage = ({ loading }) => {
	console.log("landpage");
	let content = <Spinner />;

	if (!loading) {
		content = (
			<div className='land-page-wrapper'>
				<div className='land-page-image'></div>
				<h2>
					<span>Search</span> & <span>Love</span>
				</h2>
				<p className='slogan'>
					Your favorite movies are waiting for your approbation.
				</p>
			</div>
		);
	}

	return content;
};

export default LandPage;
