import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

const HomeTuteur = () => {
  // TODO: Réinitialisation du retard si "ok" (if chemin eval ok & chemin comp ok)
  // TODO: Bloquer "lancer" si visualiser "ok"

  const [data, setData] = useState([]);
  const history = useHistory();

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
        return setData(stages);
      });
  }, []);

  const redirectEvalEleve = (nom, prenom, entreprise, id) => {
    history.push({
      pathname: '/evalstage',
      state: {
        nom: nom,
        prenom: prenom,
        entreprise: entreprise,
        id: id,
        token: sessionStorage.getItem('id'),
      },
    });
  };

  const redirectEvalComp = (nom, prenom, id) => {
    history.push({
      pathname: '/evalcomp',
      state: {
        nom: nom,
        prenom: prenom,
        id: id,
        token: sessionStorage.getItem('id'),
      },
    });
  };

  return (
    <div>
      <Container>
        <br />
        <h3>Stage effectué</h3>
        <Row xs={1} md={1}>
          {data?.map((stage) => (
            <div key={stage.idstage}>
              {stage.evallancee ? (
                <Col key={stage.idstage}>
                  <Card
                    style={{ width: '50vw' }}
                    className="text-center center"
                  >
                    <Card.Header>
                      {stage.nom} {stage.prenom}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{stage.titrestage}</Card.Title>
                      <Card.Text>
                        <small className="text-muted">
                          {stage.nomentreprise}
                        </small>
                        <br />
                        {stage.description}
                      </Card.Text>
                      <Button
                        variant="warning"
                        onClick={() =>
                          redirectEvalEleve(
                            stage.nom,
                            stage.prenom,
                            stage.nomentreprise,
                            stage.ideleve
                          )
                        }
                      >
                        Lancer l'évaluation de l'élève
                      </Button>{' '}
                      <Button
                        variant="info"
                        onClick={() =>
                          redirectEvalComp(
                            stage.nom,
                            stage.prenom,
                            stage.ideleve
                          )
                        }
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
              ) : (
                <p></p>
              )}
            </div>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default HomeTuteur;
