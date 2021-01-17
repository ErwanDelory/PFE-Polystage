import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import fr from 'timeago.js/lib/lang/fr';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';

const HomeProf = () => {
  timeago.register('fr', fr);
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

  const startEval = (id, idtuteur, ideleve) => {
    const value = new Date();
    const month = value.getMonth() + 1;
    const hours = value.getHours() - 1;
    let date =
      value.getFullYear() +
      '-' +
      month +
      '-' +
      value.getDate() +
      ' ' +
      hours +
      ':' +
      value.getMinutes() +
      ':' +
      value.getSeconds();
    let dateLimite =
      value.getFullYear() +
      '-' +
      (month + 1) +
      '-' +
      value.getDate() +
      ' ' +
      hours +
      ':' +
      value.getMinutes() +
      ':' +
      value.getSeconds();
    fetch('http://localhost:5000/api/starteval', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: JSON.stringify({
        evallancee: date,
        datelimiteeval: dateLimite,
        idstage: id,
      }),
    }).then((res) => {
      res.json();

      console.log('idtuteur = ' + idtuteur);
      fetch('http://localhost:5000/api/retardtuteur', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: JSON.stringify({
          iduti: idtuteur,
          mailenvoye: 1,
        }),
      }).then((res) => res.json());

      fetch('http://localhost:5000/api/retardeleve', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: JSON.stringify({
          iduti: ideleve,
          mailenvoye: 1,
          rapport: 0,
          presentation: 0,
          autoeval: 0,
        }),
      }).then((res) => {
        res.json();
        history.go(0);
      });
    });
  };

  const openEval = (id) => {
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
                    stage.idens == sessionStorage.getItem('id') &&
                    stage.evallancee === null ? (
                      <Button
                        variant="warning"
                        onClick={() =>
                          startEval(
                            stage.idstage,
                            stage.idtuteur,
                            stage.ideleve
                          )
                        }
                      >
                        Lancer l'évaluation
                      </Button>
                    ) : (
                      <Button variant="warning" disabled>
                        Lancer l'évaluation
                      </Button>
                    )
                  }{' '}
                  {stage.chemineval ? (
                    <Button
                      variant="info"
                      onClick={() => openEval(stage.idstage)}
                    >
                      Visualiser l'évaluation
                    </Button>
                  ) : (
                    <Button disabled variant="info">
                      Visualiser l'évaluation
                    </Button>
                  )}
                  <br />
                  {stage.evallancee !== null && (
                    <div>
                      L'évaluation a été lancée{' '}
                      <TimeAgo datetime={stage.evallancee} locale="fr" />
                    </div>
                  )}
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
