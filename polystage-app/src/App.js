import React, { Component } from "react";
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import Login from "./pages/login";
import Error from "./pages/error";
import "./styles/bootstrap.min.css";
import "./styles/custom.css";
import Register from "./pages/register";
import Home from "./pages/home";

class App extends Component {
	render() {
		return (
			<div>
				<p>ici c'est la navbar</p>
				<Switch>
					<PrivateRoute path="/" component={Home} />
					<Route path="/login" component={Login} />
					<PrivateRoute path="/register" component={Register} />
					<PrivateRoute path="/error" component={Error} />
				</Switch>
			</div>
		);
	}
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
