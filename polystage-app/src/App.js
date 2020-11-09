import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from "./pages/login";
import Error from "./pages/error";
import "./styles/bootstrap.min.css";
import "./styles/custom.css";
import Register from "./pages/register";
import Home from "./pages/home";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		setIsLoggedIn(isLoggedIn => isLoggedIn = false);
	}, []);

	let routes;
	if(isLoggedIn) {
		routes = (
			<Switch>
				<Route path="/" component={Home} />
				<Route path="/register" component={Register} />
				<Route exact path="/error" component={Error} />
			</Switch>
		)
	} else {
		routes = (
			<Switch>
				<Route exact path="/login" component={Login} />
				<Redirect to="/login" component={Login} />
			</Switch>
		)
	}

	return (
		<Router>
			<div>
				<p>Ici c'est la navbar</p>
				<main>{routes}</main>
			</div>
		</Router>
	)
}

export default App;
