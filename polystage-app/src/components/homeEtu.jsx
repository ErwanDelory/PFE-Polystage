import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
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

const HomeEtu = () => {
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
        updateRetard();
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
        return setData(stages);
      });
  }, []);

  const updateRetard = () => {
    fetch('http://localhost:5000/api/retardeleve', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((mes) => {
        const data = mes.data;
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].rapport === 1 &&
            data[i].presentation === 1 &&
            sessionStorage.getItem('id') === `${data[i].iduti}`
          ) {
            fetch(
              `http://localhost:5000/api/retardeleve/${sessionStorage.getItem(
                'id'
              )}`,
              {
                method: 'DELETE',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                },
              }
            ).then((res) => res.json());
          }
        }
      });
  };

  function modify(id) {
    fetch('http://localhost:5000/api/stage/' + id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((mes) => {
        let datedebut =
          new Date(mes.data[0].datedebut).getDate() +
          '-' +
          (new Date(mes.data[0].datedebut).getMonth() + 1) +
          '-' +
          new Date(mes.data[0].datedebut).getFullYear();
        let datefin =
          new Date(mes.data[0].datefin).getDate() +
          '-' +
          (new Date(mes.data[0].datedebut).getMonth() + 1) +
          '-' +
          new Date(mes.data[0].datefin).getFullYear();
        let datedebut2 = new Date(mes.data[0].datedebut);
        let datefin2 = new Date(mes.data[0].datefin);
        history.push({
          pathname: '/edit',
          state: {
            idstage: id,
            titrestage: mes.data[0].titrestage,
            description: mes.data[0].description,
            entreprise: mes.data[0].nomentreprise,
            niveau: mes.data[0].niveau,
            annee: mes.data[0].annee,
            datedebut: datedebut,
            datefin: datefin,
            datedebut2: datedebut2,
            datefin2: datefin2,
            token: sessionStorage.getItem('id'),
          },
        });
      });
  }

  const openRapport = (id) => {
    axios(`http://localhost:5000/api/rapport/${id}`, {
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

  const openPresentation = (id) => {
    axios(`http://localhost:5000/api/presentation/${id}`, {
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

  function addStage() {
    history.push('/newstage');
  }

  let img = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9];

  return (
    <div>
      <Container>
        <br />
        <h3>Liste des stages des étudiants</h3>
        <Row xs={1} md={2}>
          {data?.map((stage) => (
            <Col key={stage.idstage}>
              <Card style={{ width: '35rem' }}>
                <Card.Img variant="top" src={img[stage.idstage - 1]} />
                <Card.Header className="text-center">
                  Année {stage.annee} - {stage.niveau}A
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    {stage.titrestage}{' '}
                    {
                      // eslint-disable-next-line
                      stage.ideleve == sessionStorage.getItem('id') ? (
                        <Button
                          variant="danger"
                          onClick={() => modify(stage.idstage)}
                        >
                          <FontAwesomeIcon
                            className="bckg-icon"
                            icon={faEdit}
                            size="xs"
                          />
                        </Button>
                      ) : (
                        <Button
                          disabled
                          variant="danger"
                          onClick={() => modify(stage.idstage)}
                        >
                          <FontAwesomeIcon
                            className="bckg-icon"
                            icon={faEdit}
                            size="xs"
                          />
                        </Button>
                      )
                    }
                  </Card.Title>
                  <Card.Text>
                    <small className="text-muted">{stage.nomentreprise}</small>
                    <br />
                    {stage.description}
                  </Card.Text>
                  <div className="text-center">
                    {stage.cheminrapport ? (
                      <Button
                        variant="warning"
                        onClick={() => openRapport(stage.idstage)}
                      >
                        Voir le rapport
                      </Button>
                    ) : (
                      <Button disabled variant="warning">
                        Voir le rapport
                      </Button>
                    )}{' '}
                    {stage.cheminpres ? (
                      <Button
                        variant="info"
                        onClick={() => openPresentation(stage.idstage)}
                      >
                        Ouvrir la présentation
                      </Button>
                    ) : (
                      <Button disabled variant="info">
                        Ouvrir la présentation
                      </Button>
                    )}
                  </div>
                </Card.Body>
                <Card.Footer className="text-center">
                  {stage.datedebut} - {stage.datefin}
                </Card.Footer>
              </Card>
              <br />
            </Col>
          ))}
          <Col>
            <Card
              style={{ width: '35rem' }}
              onClick={addStage}
              className="addStage pointer"
            >
              <Card.Img variant="top" src={img9} />
              <Card.Header className="text-center">Année ???? - ?A</Card.Header>
              <Card.Body>
                <Card.Title>
                  Ajouter un stage{' '}
                  <Button variant="danger" disabled>
                    <FontAwesomeIcon
                      className="bckg-icon"
                      icon={faEdit}
                      size="xs"
                    />
                  </Button>
                </Card.Title>
                <Card.Text>
                  <small className="text-muted">Entreprise</small>
                  <br />
                  ...
                </Card.Text>
                <div className="text-center">
                  <Button variant="warning" disabled>
                    Voir le rapport
                  </Button>{' '}
                  <Button variant="info" disabled>
                    Ouvrir la présentation
                  </Button>
                </div>
              </Card.Body>
              <Card.Footer className="text-center">
                25/12/2020 - 25/12/2021
              </Card.Footer>
            </Card>
            <br />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default HomeEtu;
