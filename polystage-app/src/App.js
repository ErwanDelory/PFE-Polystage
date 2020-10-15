import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "./pages/login";
import Error from "./pages/error";
import "./styles/bootstrap.min.css";
import "./styles/custom.css";
import Register from "./pages/register";

function App() {
	return (
		<Router>
			<div>
				<p>Ici c'est la navbar</p>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route exact path="/error" component={Error} />
				</Switch>
			</div>
		</Router>
	)
}

export default App;
