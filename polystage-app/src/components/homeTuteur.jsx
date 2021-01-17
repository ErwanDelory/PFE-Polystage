import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import axios from 'axios';

const HomeTuteur = () => {
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
            if (mes.data[i].chemincomp && mes.data[i].chemineval) {
              removeRetard();
            }
          }
        }
        return setData(stages);
      });
  }, []);

  const removeRetard = () => {
    fetch(
      `http://localhost:5000/api/retardtuteur/${sessionStorage.getItem('id')}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      }
    ).then((res) => res.json());
  };

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

  const openEval = (id) => {
    console.log(id);
    axios(`http://localhost:5000/api/eval/rapport/${id}`, {
      method: 'GET',
      responseType: 'blob',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    })
      .then((response) => {
        const file = new Blob([response.data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openComp = (id) => {
    axios(`http://localhost:5000/api/comp/rapport/${id}`, {
      method: 'GET',
      responseType: 'blob',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    })
      .then((response) => {
        const file = new Blob([response.data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
      .catch((error) => {
        console.log(error);
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
                      {stage.chemineval ? (
                        <Button
                          disabled
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
                        </Button>
                      ) : (
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
                        </Button>
                      )}{' '}
                      {stage.chemincomp ? (
                        <Button
                          disabled
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
                      ) : (
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
                      )}
                      <br />
                      <br />
                      {stage.chemineval ? (
                        <Button
                          variant="warning"
                          onClick={() => openEval(stage.idstage)}
                        >
                          Visualiser l'évaluation de l'élève
                        </Button>
                      ) : (
                        <Button disabled variant="warning">
                          Visualiser l'évaluation de l'élève
                        </Button>
                      )}{' '}
                      {stage.chemincomp ? (
                        <Button
                          variant="info"
                          onClick={() => openComp(stage.idstage)}
                        >
                          Visualiser l'évaluation des compétences
                        </Button>
                      ) : (
                        <Button disabled variant="info">
                          Visualiser l'évaluation des compétences
                        </Button>
                      )}
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
