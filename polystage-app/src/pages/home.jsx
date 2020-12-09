import React, { Component } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import img0 from './../img/stage-0.jpg';
import img1 from './../img/stage-1.jpg';
import img2 from './../img/stage-2.jpg';
import img3 from './../img/stage-3.jpg';
import img4 from './../img/stage-4.jpg';
import img5 from './../img/stage-5.jpg';
import img6 from './../img/stage-6.jpg';
import img7 from './../img/stage-7.jpg';
import img8 from './../img/stage-8.jpg';
import img9 from './../img/stage-9.jpg';

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

  seeRapport(event) {
    event.preventDefault();
    const token = sessionStorage.getItem('token');
    console.log(token);
    fetch(`http://localhost:5000/api/rapport/1`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/pdf',
        Authorization: 'Bearer ' + token,
      },
    }).then((res) => res.json());
  }

  render() {
    const annee = [];
    let img = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9];
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    for (let i = 0; i < this.state.data.length; i++) {
      var a = new Date(this.state.data[i].datedebut).toLocaleDateString(
        undefined,
        options
      );
      var b = new Date(this.state.data[i].datefin).toLocaleDateString(
        undefined,
        options
      );
      annee.push(
        <p>
          {a} - {b}
        </p>
      );
    }

    return (
      <div>
        <Container>
          <br />
          <h3>Liste des stages</h3>
          <Row xs={1} md={2}>
            {this.state.data?.map((stage) => (
              <Col>
                <Card style={{ width: '35rem' }}>
                  <Card.Img variant="top" src={img[stage.idstage - 1]} />
                  <Card.Header className="text-center">
                    Année {stage.annee} - {stage.niveau}A
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{stage.titrestage}</Card.Title>
                    <Card.Text>
                      <small className="text-muted">{stage.entreprise}</small>
                      <br />
                      {stage.description}
                    </Card.Text>
                    <Button variant="warning" onClick={this.seeRapport}>
                      Voir le rapport
                    </Button>{' '}
                    <Button variant="info" onClick={this.seeRapport}>
                      Télécharger le rapport
                    </Button>
                  </Card.Body>
                  <Card.Footer className="text-center">
                    {annee[stage.idstage - 1]}
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}
/*import React, { Component, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import img0 from './../img/stage-0.jpg';
import img1 from './../img/stage-1.jpg';
import img2 from './../img/stage-2.jpg';
import img3 from './../img/stage-3.jpg';
import img4 from './../img/stage-4.jpg';
import img5 from './../img/stage-5.jpg';
import img6 from './../img/stage-6.jpg';
import img7 from './../img/stage-7.jpg';
import img8 from './../img/stage-8.jpg';
import img9 from './../img/stage-9.jpg';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/stages', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((mes) => {
        setData(mes.data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <p>Salut</p>
    </div>
  );
};
export default Home;*/
