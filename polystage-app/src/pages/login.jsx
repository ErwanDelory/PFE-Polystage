import React, { useState } from 'react';
import AuthenticationService from '../services/authentication-service';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useAuth } from '../context/auth';
import { useHistory } from 'react-router';
import { Notyf } from 'notyf';
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
  const notyf = new Notyf({
    duration: 3000,
    position: {
      x: 'right',
      y: 'top',
    },
  });

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
        AuthenticationService.login(data.token).then((isAuthenticated) => {
          if (!isAuthenticated) {
            notyf.error('Identifiant ou mot de passe incorrect.');
            setEmail('');
            setPassword('');
            sessionStorage.clear();
            return;
          }
          sessionStorage.setItem('nom', data.nom);
          sessionStorage.setItem('prenom', data.prenom);
          sessionStorage.setItem('role', data.role);
          sessionStorage.setItem('id', data.ideleve);
          setAuthTokens(data);
          history.push({
            pathname: '/',
            state: {
              token: data.token,
              nom: data.nom,
              prenom: data.prenom,
              role: data.role,
              id: data.id,
            },
          });
        });
      });
  };

  return (
    <div className="login">
      <br />
      <Container>
        <Form onSubmit={onSubmit}>
          <Card className="text-center">
            <Card.Header>Connexion</Card.Header>
            <Card.Body>
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
                <Form.Text className="text-muted">
                  Votre identifiant ne sera pas partagé !
                </Form.Text>
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
                <Form.Text className="text-muted">
                  Votre mot de passe est sécurisé !
                </Form.Text>
              </Form.Group>
            </Card.Body>
            <Card.Footer>
              <Button variant="info" type="submit">
                <FontAwesomeIcon className="bckg-icon" icon={faSignInAlt} /> Se
                connecter
              </Button>{' '}
              <Button variant="warning" href="/register">
                <FontAwesomeIcon className="bckg-icon" icon={faClipboard} />{' '}
                S'inscire
              </Button>
            </Card.Footer>
          </Card>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
