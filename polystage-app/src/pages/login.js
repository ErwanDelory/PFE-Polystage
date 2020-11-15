import React, { /*useState,*/ Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import './../styles/login.css'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/api/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => {
      if (res.status === 200) {
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Identifiant ou mot de passe incorrect');
    })
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  render() {
    return (
      <div className="Login">
        <Container>
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Identifiant</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Saisir votre identifiant"
                autoFocus
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Saisir votre mot de passe"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!this.validateForm}>
              Se connecter
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

/*function Login() {

  var isAuthenticated = false;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const paylod = {
      email: email,
      password: password
    }

    fetch('http://localhost:5000/api/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paylod)
    })
    .then(res => res.json())
    .then((data) => {
      isAuthenticated = true;
    })
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
export default Login;*/


