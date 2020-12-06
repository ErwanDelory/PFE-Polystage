import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Alert, Button, Container, Form } from 'react-bootstrap';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastname, setLastName] = useState('');
  const [firstname, setFirstName] = useState('');
  const [role, setRole] = useState('Enseignant');
  const [message, setMessage] = useState('');
  const [stateError, setStateError] = useState(false);
  const [stateSuccess, setStateSucces] = useState(false);
  const history = useHistory();

  const handleInputEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleInputPasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleInputLastNameChange = (event) => {
    const { value } = event.target;
    setLastName(value);
  };

  const handleInputFirstNameChange = (event) => {
    const { value } = event.target;
    setFirstName(value);
  };

  const handleInputRoleChange = (event) => {
    const { value } = event.target;
    setRole(value);
  };

  const redirect = () => {
    history.push('/login');
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, lastname, firstname, role }),
    }).then((res) => {
      if (!email || !password || !lastname || !firstname) {
        setMessage('Information incorrecte.');
        setStateError(true);
        setStateSucces(false);
        return;
      }
      res.json();
      setMessage('Inscription réussie !');
      setStateSucces(true);
      setStateError(false);
      setTimeout(redirect, 3000);
    });
  };

  return (
    <div className="Login">
      <br />
      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Mail</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Saisir votre adresse mail"
              autoFocus
              value={email}
              onChange={handleInputEmailChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Saisir votre mot de passe"
              value={password}
              onChange={handleInputPasswordChange}
            />
          </Form.Group>
          <Form.Group controlId="lastname">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              placeholder="Saisir votre nom"
              value={lastname}
              onChange={handleInputLastNameChange}
            />
          </Form.Group>
          <Form.Group controlId="firstname">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              placeholder="Saisir votre prénom"
              value={firstname}
              onChange={handleInputFirstNameChange}
            />
          </Form.Group>
          <Form.Group controlId="role">
            <Form.Label>Rôle</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={role}
              onChange={handleInputRoleChange}
            >
              <option>Enseignant</option>
              <option>Etudiant</option>
              <option>Tuteur</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            S'inscire
          </Button>
        </Form>
        <br />
        {message && stateError ? (
          <Alert variant="danger">{message}</Alert>
        ) : (
          <p></p>
        )}
        {message && stateSuccess ? (
          <Alert variant="success">{message}</Alert>
        ) : (
          <p></p>
        )}
      </Container>
    </div>
  );
};
export default Register;
