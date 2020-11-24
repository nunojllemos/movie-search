import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
	const home = useRef();
	const about = useRef();

	const setLineThroughLink = () => {
		switch (window.location.pathname) {
			case "/":
				home.current.classList.add("line-through");
				about.current.classList.remove("line-through");
				break;
			case "/about":
				home.current.classList.remove("line-through");
				about.current.classList.add("line-through");
				break;
			default:
				home.current.classList.remove("line-through");
				about.current.classList.remove("line-through");
				break;
		}
	};

	const clearSearchData = () => {
		if (window.sessionStorage.getItem("search")) {
			window.sessionStorage.removeItem("search");
		}
	};

	useEffect(() => {
		setLineThroughLink();
	}, []);

	let content = (
		<header onClick={setLineThroughLink}>
			<nav>
				<ul>
					<li>
						<Link
							onClick={clearSearchData}
							ref={home}
							className='nav-link'
							to='/'>
							Home
						</Link>
					</li>
					<li>
						<Link
							className='nav-link'
							to='/favorites'
							onClick={clearSearchData}>
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
