import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
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

const Home = () => {
  return (
    <div>
      {sessionStorage.getItem('role') === 'Etudiant' ? <HomeEtu /> : <p></p>}

      {sessionStorage.getItem('role') === 'Enseignant' ? <HomeProf /> : <p></p>}

      {sessionStorage.getItem('role') === 'Admin' ? <HomeAdmin /> : <p></p>}

      {sessionStorage.getItem('role') === 'Tuteur' ? <HomeTuteur /> : <p></p>}
    </div>
  );
};
export default Home;

const HomeProf = () => {
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
        return setData(mes.data);
      });
  }, []);

  const startEval = () => {};

  const openEval = () => {};

  const annee = [];
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  for (let i = 0; i < data.length; i++) {
    var a = new Date(data[i].datedebut).toLocaleDateString(undefined, options);
    var b = new Date(data[i].datefin).toLocaleDateString(undefined, options);
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
                    stage.idens == sessionStorage.getItem('id') ? (
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
                  {annee[stage.idstage - 1]}
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

const HomeAdmin = () => {
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
        return setData(mes.data);
      });
  }, []);

  const annee = [];
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  for (let i = 0; i < data.length; i++) {
    var a = new Date(data[i].datedebut).toLocaleDateString(undefined, options);
    var b = new Date(data[i].datefin).toLocaleDateString(undefined, options);
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
                    stage.idens == sessionStorage.getItem('id') ? (
                      <div>
                        <Button variant="warning">Lancer l'évaluation</Button>{' '}
                        <Button variant="info">Visualiser l'évaluation</Button>
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
                  {annee[stage.idstage - 1]}
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

const HomeTuteur = () => {
  return (
    <div>
      <p>Salut Tuteur</p>
      <p>
        Récupérer la liste des stages du tuteur entreprise (en théorie, juste 1)
      </p>
    </div>
  );
};

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
        return setData(mes.data);
      });
  }, []);

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
        sessionStorage.setItem('idstage', id);
        sessionStorage.setItem('titrestage', mes.data[0].titrestage);
        sessionStorage.setItem('description', mes.data[0].description);
        sessionStorage.setItem('entreprise', mes.data[0].nomentreprise);
        sessionStorage.setItem('niveau', mes.data[0].niveau);
        sessionStorage.setItem('annee', mes.data[0].annee);
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
        sessionStorage.setItem('datedebut', datedebut);
        sessionStorage.setItem('datefin', datefin);
        history.push('/edit');
      });
  }

  function addStage() {
    history.push('/newstage');
  }

  const annee = [];
  let img = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9];
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  for (let i = 0; i < data.length; i++) {
    var a = new Date(data[i].datedebut).toLocaleDateString(undefined, options);
    var b = new Date(data[i].datefin).toLocaleDateString(undefined, options);
    annee.push(
      <p>
        {a} - {b}
      </p>
    );
  }
  console.log(data);
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
                  <a
                    href="http://localhost:5000/api/rapport/1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="warning">Voir le rapport</Button>
                  </a>{' '}
                  <a href="http://localhost:5000/api/dlrapport/1">
                    <Button variant="info">Télécharger le rapport</Button>
                  </a>
                </Card.Body>
                <Card.Footer className="text-center">
                  {annee[stage.idstage - 1]}
                </Card.Footer>
              </Card>
              <br />
            </Col>
          ))}
          <Col>
            <Card
              style={{ width: '35rem' }}
              onClick={addStage}
              className="addStage"
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
                <Button variant="warning" disabled>
                  Voir le rapport
                </Button>{' '}
                <Button variant="info" disabled>
                  Télécharger le rapport
                </Button>
              </Card.Body>
              <Card.Footer className="text-center">
                <p>25/12/2020 - 25/12/2021</p>
              </Card.Footer>
            </Card>
            <br />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
