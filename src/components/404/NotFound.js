import React from "react";
import { Link } from "react-router-dom";
import "../../style/css/main.css";

const NotFound = () => {
	const setSessionStorage = () => {
		window.sessionStorage.removeItem("search");
	};

	let content = (
		<div className='wrapper'>
			<div className='image'></div>
			<div className='info'>
				<h2>404</h2>
				<div className='dash'></div>
				<p>The page you are looking for could not be found.</p>
			</div>
		</div>
	);

	return content;
};

export default NotFound;
