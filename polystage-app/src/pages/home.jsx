import React, { Component } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import img from './../img/stage-0.jpg';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem('token'),
      data: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/stages', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.state.token,
      },
    })
      .then((res) => res.json())
      .then((mes) => {
        this.setState({ data: mes.data });
      });
  }

  render() {
    return (
      <div>
        <Container>
          <p>Liste des stages</p>
          <ul>
            {this.state.data?.map((stage) => (
              <li>
                <Card style={{ width: '30rem' }}>
                  <Card.Img variant="top" src={img} />
                  <Card.Header>
                    Année {stage.annee} - {stage.niveau}A
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{stage.titrestage}</Card.Title>
                    <Card.Text>
                      <small className="text-muted">{stage.identreprise}</small>
                      <br />
                      {stage.description}
                    </Card.Text>
                    <Button variant="primary">Voir le rapport</Button>
                  </Card.Body>
                  <Card.Footer>
                    {stage.datedebut} - {stage.datefin}
                  </Card.Footer>
                </Card>
              </li>
            ))}
          </ul>

          <Link to="/error">Retourner à erreur</Link>
        </Container>
      </div>
    );
  }
}
