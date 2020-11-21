import React, { Component, useState, useEffect } from "react";
import AuthenticationService from "../services/authentication-service";
import "./../styles/navbar.css";
import Navbar from 'react-bootstrap/Navbar';
import img from "./../img/polytech.png";

class NavbarLogout extends Component {
  render() {
    return (
      <div>

      </div>
    ); 
  }
}

class NavbarLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nom: sessionStorage.getItem('nom'),
      prenom: sessionStorage.getItem('prenom')
    };
  }

  logout() {
    sessionStorage.clear()
    AuthenticationService.logout();
  }

  render() {
    return (
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          L'utilisateur connecté est:&nbsp;
        </Navbar.Text>
        <Navbar.Text style={{ color: 'black' }}>
          {this.state.nom} {this.state.prenom} |&nbsp;
        </Navbar.Text>
        <Navbar.Text onClick={this.logout}>
          <a href="/login">Déconnexion</a>
        </Navbar.Text>
      </Navbar.Collapse>
    );
  }
}

const NavbarPolystage = ({isConnected}) => {
  return(
    <nav>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={img}
            width="100"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Polystage
        </Navbar.Brand>
        {!isConnected 
          ? <NavbarLogout />
          : <NavbarLogin />
        }
      </Navbar>
    </nav>
  );
}
export default NavbarPolystage;

/*import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "../services/authentication-service";
import "./../styles/navbar.css";
import Navbar from 'react-bootstrap/Navbar';
import img from "./../img/polytech.png";

class NavbarLogout extends Component {
  render() {
    return (
      <div>

      </div>
    ); 
  }
}

class NavbarLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nom: sessionStorage.getItem('nom'),
      prenom: sessionStorage.getItem('prenom')
    };
  }

  logout() {
    sessionStorage.clear()
    AuthenticationService.logout();
  }

  render() {
    return (
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          L'utilisateur connecté est:&nbsp;
        </Navbar.Text>
        <Navbar.Text style={{ color: 'black' }}>
          {this.state.nom} {this.state.prenom} |&nbsp;
        </Navbar.Text>
        <Navbar.Text onClick={this.logout}>
          <a href="/login">Déconnexion</a>
        </Navbar.Text>
      </Navbar.Collapse>
    );
  }
}

const NavbarPolystage = () => {
  const [auth, setAuth] = useState(sessionStorage.getItem("isAuthenticated"));

  useEffect(() => {
    window.addEventListener('storage', () => {
      console.log("test");
      setAuth(sessionStorage.getItem("isAuthenticated"));
    });

})

  return(
    <nav>
      <Navbar bg="light" variant="light">
        <Navbar.Brand>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            <img
              alt=""
              src={img}
              width="100"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Polystage
          </Link>
        </Navbar.Brand>
        
        {auth === 'true' &&
          <NavbarLogin />
        }
      </Navbar>
    </nav>
  );
}
export default NavbarPolystage;*/

