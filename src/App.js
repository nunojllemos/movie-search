import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style/css/main.css";
import Home from "./components/Home/Home";
import Aside from "./components/Aside/Aside";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Favorites from "./components/Favorites/Favorites";
import About from "./components/About/About";
import Header from "./components/Header/Header";

const App = () => {
	let content = (
		<Router>
			<div className='app-container'>
				<Header />
				<Switch>
					<Route exact path='/' component={Home}></Route>
					<Route exact path='/about' component={About}></Route>
					<Route exact path='/favorites' component={Favorites}></Route>
					<Route path='/:id' component={MovieDetails}></Route>
				</Switch>
				<Aside />
			</div>
		</Router>
	);

	return content;
};

export default App;
