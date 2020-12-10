import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Alert, Button, Container, Form } from 'react-bootstrap';

const Edit = (id) => {
  const [data, setData] = useState('');
  const [stageTitle, setStageTitle] = useState('CGO');
  const [description, setDescription] = useState('gjiro');
  const [entreprise, setEntreprise] = useState('');
  const [niveau, setNiveau] = useState('');
  const [annee, setAnnee] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [message, setMessage] = useState('');
  const [stateError, setStateError] = useState(false);
  const [stateSuccess, setStateSucces] = useState(false);
  const history = useHistory();

  const handleInputStageTitleChange = (event) => {
    const { value } = event.target;
    setStageTitle(value);
  };

  const handleInputDescriptionChange = (event) => {
    const { value } = event.target;
    setDescription(value);
  };

  const handleInputEntrepriseChange = (event) => {
    const { value } = event.target;
    setEntreprise(value);
  };

  const handleInputNiveauChange = (event) => {
    const { value } = event.target;
    setNiveau(value);
  };

  const handleInputAnneeChange = (event) => {
    const { value } = event.target;
    setAnnee(value);
  };

  const handleInputDateDebutChange = (event) => {
    const { value } = event.target;
    setDateDebut(value);
  };

  const handleInputDateFinChange = (event) => {
    const { value } = event.target;
    setDateFin(value);
  };

  useEffect(() => {
    const id = sessionStorage.getItem('idstage');
    fetch('http://localhost:5000/api/stage/' + id, {
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

  const redirect = () => {
    history.push('/');
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };
  console.log(data[0]?.idstage);
  //setEntreprise(data[0]?.entreprise);
  return (
    <div>
      <br />
      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="stageTitle">
            <Form.Label>Titre du stage</Form.Label>
            <Form.Control
              type="text"
              name="stageTitle"
              placeholder="Saisir le titre du stage"
              autoFocus
              value={stageTitle}
              onChange={handleInputStageTitleChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description du stage</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Saisir votre mot de passe"
              value={description}
              onChange={handleInputDescriptionChange}
            />
          </Form.Group>
          <Form.Group controlId="entreprise">
            <Form.Label>Entreprise</Form.Label>
            <Form.Control
              type="text"
              name="entreprise"
              placeholder="Saisir votre nom"
              value={entreprise}
              onChange={handleInputEntrepriseChange}
            />
          </Form.Group>
          <Form.Group controlId="niveau">
            <Form.Label>Niveau</Form.Label>
            <Form.Control
              type="text"
              name="niveau"
              placeholder="Saisir votre prénom"
              value={niveau}
              onChange={handleInputNiveauChange}
            />
          </Form.Group>
          <Form.Group controlId="annee">
            <Form.Label>Année</Form.Label>
            <Form.Control
              type="text"
              name="annee"
              placeholder="Saisir votre prénom"
              value={annee}
              onChange={handleInputAnneeChange}
            />
          </Form.Group>
          <Form.Group controlId="dateDebut">
            <Form.Label>Date de début</Form.Label>
            <Form.Control
              type="text"
              name="dateDebut"
              placeholder="Saisir votre prénom"
              value={dateDebut}
              onChange={handleInputDateDebutChange}
            />
          </Form.Group>
          <Form.Group controlId="dateFin">
            <Form.Label>Date de fin</Form.Label>
            <Form.Control
              type="text"
              name="dateFin"
              placeholder="Saisir votre prénom"
              value={dateFin}
              onChange={handleInputDateFinChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            S'inscire
          </Button>
        </Form>
        <br />
        {message && stateError ? (
          <Alert variant="danger">{message}</Alert>
        ) : (
          <p></p>
        )}
        {message && stateSuccess ? (
          <Alert variant="success">{message}</Alert>
        ) : (
          <p></p>
        )}
      </Container>
    </div>
  );
};
export default Edit;
