import React from "react";
import Spinner from "../Spinner/Spinner";

const LandPage = ({ loading }) => {
	let content = <Spinner />;

	if (!loading) {
		content = (
			<div className='land-page-wrapper'>
				<div className='land-page-image'></div>
				<h2>
					<span>Search</span> it! <br />
					<span>Find</span> it. <span>Love</span> it.
				</h2>
			</div>
		);
	}

	return content;
};

export default LandPage;
