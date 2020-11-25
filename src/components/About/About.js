import React from "react";

const About = () => {
	let content = (
		<div className='about-container'>
			<section className='bg-about'></section>
			<section className='info-about'>
				<h2>About me</h2>
				<div className='dash'></div>
				<p>
					My name is Nuno and I am turning into a frontend developer.
					<br />
					More of my projects can be reached{" "}
					<a target='blank' href='https://github.com/nunojllemos/'>
						here
					</a>
					.
				</p>
				<h2>About the project</h2>
				<div className='dash'></div>
				<p>
					This app is a personal project fully based on{" "}
					<a target='blank' href='https://significa.co/'>
						Significa
					</a>{" "}
					interviews challenge. It was developed using Sass and React JS.
					<br />
					Code is all available in this{" "}
					<a target='blank' href='https://github.com/nunojllemos/movie-search'>
						repository
					</a>
					.
				</p>
			</section>
		</div>
	);

	return content;
};

export default About;
