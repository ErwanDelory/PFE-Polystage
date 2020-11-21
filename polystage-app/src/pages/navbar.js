import React, { Component, useState, useEffect } from "react";
import AuthenticationService from "../services/authentication-service";
import "./../styles/navbar.css";
import Navbar from 'react-bootstrap/Navbar';
import img from "./../img/polytech.png";

class NavbarLogout extends Component {
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
      <div>
        <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">
      <img
        alt=""
        src="/logo.svg"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      React Bootstrap
    </Navbar.Brand>
  </Navbar>
        <p>L'utilisateur connecté est: {this.state.nom}</p>
        <a href="/login"><p onClick={this.logout}>Déconnexion</p></a>
      </div>
    ); 
  }
}

class NavbarLogin extends Component {
  render() {
    return (
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          L'utilisateur connecté est: 
        </Navbar.Text>
        <Navbar.Text>
          Mark Otto
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
        {auth &&
          <NavbarLogin />
        }
      </Navbar>
    </nav>
  );
}
export default NavbarPolystage;