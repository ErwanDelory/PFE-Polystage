import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faPortrait } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserTag } from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastname, setLastName] = useState('');
  const [firstname, setFirstName] = useState('');
  const [role, setRole] = useState('Enseignant');
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
        notyf.error('Information incorrecte !');

        return;
      }
      res.json();
      notyf.success('Inscription réussie !');
      setTimeout(redirect, 3000);
    });
  };

  return (
    <div className="register">
      <br />
      <Container>
        <Form onSubmit={onSubmit}>
          <Card className="text-center">
            <Card.Header>Inscription</Card.Header>
            <Card.Body>
              <Form.Group controlId="email">
                <Form.Label>
                  <FontAwesomeIcon className="bckg-icon" icon={faPortrait} />{' '}
                  Mail
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Saisir votre adresse mail"
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
              <Form.Group controlId="lastname">
                <Form.Label>
                  <FontAwesomeIcon className="bckg-icon" icon={faUser} /> Nom
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  placeholder="Saisir votre nom"
                  value={lastname}
                  onChange={handleInputLastNameChange}
                />
              </Form.Group>
              <Form.Group controlId="firstname">
                <Form.Label>
                  <FontAwesomeIcon className="bckg-icon" icon={faUser} /> Prénom
                </Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  placeholder="Saisir votre prénom"
                  value={firstname}
                  onChange={handleInputFirstNameChange}
                />
              </Form.Group>
              <Form.Group controlId="role">
                <Form.Label>
                  <FontAwesomeIcon className="bckg-icon" icon={faUserTag} />{' '}
                  Rôle
                </Form.Label>
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
            </Card.Body>
            <Card.Footer>
              <Button variant="info" type="submit">
                <FontAwesomeIcon className="bckg-icon" icon={faClipboard} />{' '}
                S'inscire
              </Button>{' '}
              <Button variant="warning" href="/login">
                <FontAwesomeIcon className="bckg-icon" icon={faHome} /> Accueil
              </Button>
            </Card.Footer>
          </Card>
        </Form>
      </Container>
    </div>
  );
};
export default Register;
