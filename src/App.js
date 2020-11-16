import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style/css/main.css";
import Home from "./components/Home/Home";

const App = () => {
	let content = (
		<Router>
			<div className='app-container'>
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					{/* <Route path='/:id' component={}></Route> */}
				</Switch>
			</div>
		</Router>
	);

	return content;
};

export default App;
