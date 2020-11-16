import React from "react";

const Spinner = () => {
	return (
		<svg
			className='spinner'
			width='50px'
			height='50px'
			viewBox='0 0 50 50'
			xmlns='http://www.w3.org/2000/svg'>
			<circle
				className='path'
				fill='none'
				strokeWidth='4'
				strokeLinecap='round'
				cx='25'
				cy='25'
				r='15'></circle>
		</svg>
	);
};

export default Spinner;
