import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
//import { useLocation } from 'react-router-dom';

const HomeTuteur = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  //const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:5000/api/stages', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //Authorization: 'Bearer ' + location.state.token,
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((mes) => {
        let stages = [];
        let j = 0;
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        };
        for (let i = 0; i < mes.data.length; i++) {
          // eslint-disable-next-line
          if (mes.data[i].idtuteur == sessionStorage.getItem('id')) {
            var a = new Date(mes.data[i].datedebut).toLocaleDateString(
              undefined,
              options
            );
            var b = new Date(mes.data[i].datefin).toLocaleDateString(
              undefined,
              options
            );
            stages[j] = mes.data[i];
            stages[j].datedebut = a;
            stages[j].datefin = b;
            j++;
          }
        }
        console.log(stages);
        return setData(stages);
      });
  }, []);

  const redirectEvalEleve = (nom, prenom) => {
    history.push({
      pathname: '/evalstage',
      state: { nom: nom, prenom: prenom, token: sessionStorage.getItem('id') },
    });
  };

  const redirectEvalComp = (nom, prenom) => {
    history.push({
      pathname: '/evalcomp',
      state: { nom: nom, prenom: prenom, token: sessionStorage.getItem('id') },
    });
  };

  return (
    <div>
      <Container>
        <br />
        <h3>Stage effectué</h3>
        <Row xs={1} md={1}>
          {data?.map((stage) => (
            <Col key={stage.idstage}>
              <Card style={{ width: '50vw' }} className="text-center center">
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
                  <Button
                    variant="warning"
                    onClick={() => redirectEvalEleve(stage.nom, stage.prenom)}
                  >
                    Lancer l'évaluation de l'élève
                  </Button>{' '}
                  <Button
                    variant="info"
                    onClick={() => redirectEvalComp(stage.nom, stage.prenom)}
                  >
                    Lancer l'évalution des compétences
                  </Button>
                  <br />
                  <br />
                  <Button disabled variant="warning">
                    Visualiser l'évaluation de l'élève
                  </Button>{' '}
                  <Button disabled variant="info">
                    Visualiser l'évaluation des compétences
                  </Button>
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
export default HomeTuteur;
