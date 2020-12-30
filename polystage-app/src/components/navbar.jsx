import React, { Component } from 'react';
import AuthenticationService from '../services/authentication-service';
import { Nav, Navbar } from 'react-bootstrap';
import img from './../img/polytech.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'react-bootstrap';

class NavbarLogout extends Component {
  render() {
    return <div></div>;
  }
}

class NavbarLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: sessionStorage.getItem('nom'),
      prenom: sessionStorage.getItem('prenom'),
      role: sessionStorage.getItem('role'),
    };
  }

  logout() {
    sessionStorage.clear();
    AuthenticationService.logout();
  }

  render() {
    return (
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text style={{ color: 'black' }}>
          {this.state.nom} {this.state.prenom}{' '}
          <Badge variant="info">{this.state.role}</Badge> |&nbsp;
        </Navbar.Text>
        <Navbar.Text onClick={this.logout}>
          <a href="/login">
            <FontAwesomeIcon className="bckg-icon" icon={faSignOutAlt} />{' '}
            Déconnexion
          </a>
        </Navbar.Text>
      </Navbar.Collapse>
    );
  }
}

const NavbarNav = () => {
  function clear() {}

  return (
    <Nav className="mr-auto">
      <Nav.Link href="/" onClick={clear}>
        Accueil
      </Nav.Link>
      {sessionStorage.getItem('role') === 'Admin' && (
        <Nav.Link href="/admin" onClick={clear}>
          Administrateur
        </Nav.Link>
      )}
    </Nav>
  );
};

const NavbarPolystage = ({ isConnected }) => {
  function clear() {
    sessionStorage.removeItem('idstage');
    sessionStorage.removeItem('titrestage');
    sessionStorage.removeItem('description');
    sessionStorage.removeItem('entreprise');
    sessionStorage.removeItem('niveau');
    sessionStorage.removeItem('annee');
    sessionStorage.removeItem('datedebut');
    sessionStorage.removeItem('datefin');
  }

  return (
    <nav>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/" onClick={clear}>
          <img
            alt=""
            src={img}
            width="100"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Polystage
        </Navbar.Brand>
        {!isConnected ? <p></p> : <NavbarNav />}
        {!isConnected ? <NavbarLogout /> : <NavbarLogin />}
      </Navbar>
    </nav>
  );
};
export default NavbarPolystage;
