import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import Login from "./pages/login";
import Error from "./pages/error";
import "./styles/bootstrap.min.css";
import "./styles/custom.css";
import Register from "./pages/register";
import Home from "./pages/home";
import NavbarPolystage from "./pages/navbar";
import { AuthContext } from "./context/auth";

const App = () => {
	//Ici il faut faire passer le sessionStorage token dans une fonction check token pour voir si il est encore valide (expiré et qu'il appartient au bon utilisateur)
	const existingToken = sessionStorage.getItem("token");
	const [authTokens, setAuthTokens] = useState(existingToken);
	
	const setTokens = (data) => {
		setAuthTokens(data);
	}
	return (
		<AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
			<Router>				
				<NavbarPolystage isConnected={!!authTokens} />
				<Switch>
					<PrivateRoute exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<PrivateRoute exact path="/register" component={Register} />
					<PrivateRoute exact path="/error" component={Error} />
				</Switch>
			</Router>
		</AuthContext.Provider>
	);
}
export default App;

/*function App() {
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

	//if(Login.isAu)

	return (
		<Router>
			<div>
				<p>Ici c'est la navbar</p>
				<main>{routes}</main>
			</div>
		</Router>
	)
}

export default App;*/
