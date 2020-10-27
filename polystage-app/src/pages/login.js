import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import './../styles/login.css'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Identifiant</Form.Label>
            <Form.Control
              type="email"
              placeholder="Saisir votre identifiant"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Saisir votre mot de passe"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!validateForm()}>
            Se connecter
          </Button>
        </Form>
      </Container>
    </div>
  );
}
export default Login;


