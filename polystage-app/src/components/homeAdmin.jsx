import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import fr from 'timeago.js/lib/lang/fr';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Notyf } from 'notyf';

const HomeAdmin = () => {
  timeago.register('fr', fr);
  const [data, setData] = useState([]);
  const history = useHistory();
  const notyf = new Notyf({
    duration: 3000,
    position: {
      x: 'right',
      y: 'top',
    },
  });

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

  const startEval = (id, idtuteur, ideleve, rapport, pres) => {
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
      (value.getDate() % 28) +
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
      }).then((res) => {
        res.json();
        sendMailTuteur(idtuteur);
      });

      if (rapport && !pres) {
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
            rapport: 1,
            presentation: 0,
            autoeval: 0,
          }),
        }).then((res) => {
          res.json();
          sendMailEleve(ideleve);
          //history.go(0);
        });
      } else if (!rapport && pres) {
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
            presentation: 1,
            autoeval: 0,
          }),
        }).then((res) => {
          res.json();
          sendMailEleve(ideleve);
          //history.go(0);
        });
      } else if (rapport && pres) {
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
            rapport: 1,
            presentation: 1,
            autoeval: 0,
          }),
        }).then((res) => {
          res.json();
          //history.go(0);
        });
      } else {
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
          sendMailEleve(ideleve);
          //history.go(0);
        });
      }
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

  const sendMailTuteur = (id) => {
    fetch(`http://localhost:5000/api/user/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((mes) => {
        const name = mes.data[0].nom + ' ' + mes.data[0].prenom;
        fetch('http://localhost:5000/api/sendMail/tuteur', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
          body: JSON.stringify({ name: name }),
        }).then((res) => {
          res.json();
        });
      });
  };

  const sendMailEleve = (id) => {
    fetch(`http://localhost:5000/api/user/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((mes) => {
        const name = mes.data[0].nom + ' ' + mes.data[0].prenom;
        fetch('http://localhost:5000/api/sendMail/eleve', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
          body: JSON.stringify({ name: name }),
        }).then((res) => {
          res.json();
          notyf.success('Emails de notification envoyés !');
          //history.go(0);
          setTimeout(redirect, 2500);
        });
      });
  };

  const redirect = () => {
    history.go(0);
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
                            stage.ideleve,
                            stage.cheminrapport,
                            stage.cheminpres
                          )
                        }
                      >
                        <FontAwesomeIcon className="bckg-icon" icon={faPlay} />{' '}
                        Lancer l'évaluation
                      </Button>
                    ) : (
                      <Button variant="warning" disabled>
                        <FontAwesomeIcon className="bckg-icon" icon={faPlay} />{' '}
                        Lancer l'évaluation
                      </Button>
                    )
                  }{' '}
                  {stage.chemineval ? (
                    <Button
                      variant="info"
                      onClick={() => openEval(stage.idstage)}
                    >
                      <FontAwesomeIcon
                        className="bckg-icon"
                        icon={faFolderOpen}
                      />{' '}
                      Visualiser l'évaluation
                    </Button>
                  ) : (
                    <Button disabled variant="info">
                      <FontAwesomeIcon
                        className="bckg-icon"
                        icon={faFolderOpen}
                      />{' '}
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
export default HomeAdmin;
