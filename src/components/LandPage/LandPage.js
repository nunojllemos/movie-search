import React from "react";

const LandPage = () => {
	let content = "";

	if (!window.sessionStorage.getItem("search")) {
		content = (
			<div className='land-page-wrapper'>
				<div className='land-page-image'></div>
				<h2>Search it!</h2>
			</div>
		);
	}
	return content;
};

export default LandPage;
