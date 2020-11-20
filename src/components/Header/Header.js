import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Header = () => {
	const home = useRef();
	const about = useRef();

	console.log("render");

	const lineThroughLink = () => {
		if (window.location.pathname === "/") {
			console.log("in");
			home.current.classList.add("line-through");
			about.current.classList.remove("line-through");
		} else if (window.location.pathname === "/about") {
			home.current.classList.remove("line-through");
			about.current.classList.add("line-through");
		} else {
			home.current.classList.remove("line-through");
			about.current.classList.remove("line-through");
		}
	};

	const clearSearchData = () => {
		if (window.location.pathname !== "/") {
			if (window.sessionStorage.getItem("search")) {
				window.sessionStorage.removeItem("search");
			}
		}
	};

	let content = (
		<header onClick={lineThroughLink}>
			<nav>
				<ul>
					<li>
						<Link
							onClick={clearSearchData}
							ref={home}
							className='nav-link line-through'
							to='/'>
							Home
						</Link>
					</li>
					<li>
						<Link className='nav-link' to='/favorites'>
							<div className='fav-circle'></div>
						</Link>
					</li>
					<li>
						<Link ref={about} className='nav-link' to='/about'>
							About
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);

	return content;
};

export default Header;
