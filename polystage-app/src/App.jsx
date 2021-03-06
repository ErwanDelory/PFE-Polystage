import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import Login from './pages/login';
import Error from './pages/error';
import './styles/app.css';
import Register from './pages/register';
import Home from './pages/home';
import Edit from './pages/edit';
import NavbarPolystage from './components/navbar';
import { AuthContext } from './context/auth';
import NewStage from './pages/newStage';
import Admin from './pages/admin';
import EvalStage from './pages/evalStage';
import EvalCompetences from './pages/evalCompetences';
import Footer from './components/footer';

const App = () => {
  const existingToken = sessionStorage.getItem('token');
  const [authTokens, setAuthTokens] = useState(existingToken);

  const setTokens = (data) => {
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div className="content">
          <NavbarPolystage isConnected={!!authTokens} />
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/register" component={Register} />
            <PrivateRoute exact path="/edit" component={Edit} />
            <PrivateRoute exact path="/newstage" component={NewStage} />
            {sessionStorage.getItem('role') === 'Admin' && (
              <PrivateRoute exact path="/admin" component={Admin} />
            )}
            <PrivateRoute exact path="/evalstage" component={EvalStage} />
            <PrivateRoute exact path="/evalcomp" component={EvalCompetences} />
            <Route exact path="/error" component={Error} />
          </Switch>
        </div>
        <Footer title={'Copyright © 2021 - Polystage'} />
      </Router>
    </AuthContext.Provider>
  );
};
export default App;
