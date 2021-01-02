import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const HomeProf = () => {
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:5000/api/stages', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + location.state.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((mes) => {
        let stages = [];
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        };
        for (let i = 0; i < mes.data.length; i++) {
          var a = new Date(mes.data[i].datedebut).toLocaleDateString(
            undefined,
            options
          );
          var b = new Date(mes.data[i].datefin).toLocaleDateString(
            undefined,
            options
          );
          stages[i] = mes.data[i];
          stages[i].datedebut = a;
          stages[i].datefin = b;
        }
        console.log(stages);
        return setData(stages);
      });
  }, []);

  const startEval = () => {};

  const openEval = () => {};

  return (
    <div>
      <Container>
        <br />
        <h3>Liste des stages des étudiants</h3>
        <Row xs={1} md={2}>
          {data?.map((stage) => (
            <Col key={stage.idstage}>
              <Card style={{ width: '35rem' }} className="text-center">
                <Card.Header>
                  {stage.nom} {stage.prenom}
                </Card.Header>
                <Card.Body>
                  <Card.Title>{stage.titrestage}</Card.Title>
                  <Card.Text>
                    <small className="text-muted">{stage.nomentreprise}</small>
                    <br />
                    {stage.description}
                  </Card.Text>
                  {
                    // eslint-disable-next-line
                    stage.idens == location.state.id ? (
                      <div>
                        <Button variant="warning" onClick={startEval}>
                          Lancer l'évaluation
                        </Button>{' '}
                        <Button variant="info" onClick={openEval}>
                          Visualiser l'évaluation
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Button disabled variant="warning">
                          Lancer l'évaluation
                        </Button>{' '}
                        <Button disabled variant="info">
                          Visualiser l'évaluation
                        </Button>
                      </div>
                    )
                  }
                </Card.Body>
                <Card.Footer className="text-center">
                  {stage.datedebut} - {stage.datefin}
                </Card.Footer>
              </Card>
              <br />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default HomeProf;
