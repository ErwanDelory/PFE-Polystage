import React, { useState } from 'react';
import AuthenticationService from '../services/authentication-service';
import { Button, Container, Form } from 'react-bootstrap';
import './../styles/login.css';
import { useAuth } from '../context/auth';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faPortrait } from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthTokens } = useAuth();
  const history = useHistory();

  const handleInputEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleInputPasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/api/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('nom', data.nom);
        sessionStorage.setItem('prenom', data.prenom);
        AuthenticationService.login(data.token).then((isAuthenticated) => {
          if (!isAuthenticated) {
            alert('Identifiant ou mot de passe incorrect');
            return;
          }
          sessionStorage.setItem('isAuthenticated', isAuthenticated);
          setAuthTokens(data);
          history.push('/');
        });
      });
  };

  return (
    <div className="Login">
      <br />
      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="email">
            <Form.Label>
              <FontAwesomeIcon className="bckg-icon" icon={faPortrait} />{' '}
              Identifiant
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Saisir votre identifiant"
              autoFocus
              value={email}
              onChange={handleInputEmailChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>
              <FontAwesomeIcon className="bckg-icon" icon={faLock} /> Mot de
              passe
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Saisir votre mot de passe"
              value={password}
              onChange={handleInputPasswordChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            <FontAwesomeIcon className="bckg-icon" icon={faSignInAlt} /> Se
            connecter
          </Button>{' '}
          <Button variant="primary" href="/register">
            <FontAwesomeIcon className="bckg-icon" icon={faClipboard} />{' '}
            S'inscire
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
