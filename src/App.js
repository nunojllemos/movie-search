import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style/css/main.css";
import Home from "./components/Home/Home";
import Aside from "./components/Aside/Aside";
import MovieDetails from "./components/MovieDetails/MovieDetails";

const App = () => {
	let content = (
		<Router>
			<div className='app-container'>
				<Switch>
					<Route exact path='/' component={Home}></Route>
					<Route path='/:id' component={MovieDetails}></Route>
				</Switch>
				<Aside />
			</div>
		</Router>
	);

	return content;
};

export default App;
