import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Alert, Button, Container, Form } from 'react-bootstrap';

const NewStage = () => {
  const [niveau, setNiveau] = useState('');
  const [annee, setAnnee] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [confidentiel, setConfidentiel] = useState('');
  const [message, setMessage] = useState('');
  const [stateError, setStateError] = useState(false);
  const [stateSuccess, setStateSucces] = useState(false);
  const history = useHistory();

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
  const handleInputTitreChange = (event) => {
    const { value } = event.target;
    setTitre(value);
  };

  const handleInputDescriptionChange = (event) => {
    const { value } = event.target;
    setDescription(value);
  };

  const handleInputEntrepriseChange = (event) => {
    const { value } = event.target;
    setEntreprise(value);
  };

  const handleInputConfidentielChange = (event) => {
    const { value } = event.target;
    setConfidentiel(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/api/newstage', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: JSON.stringify({
        ideleve: null,
      }),
    });
  };

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
              value={titre}
              onChange={handleInputTitreChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description du stage</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Saisir la description du stage"
              value={description}
              onChange={handleInputDescriptionChange}
            />
          </Form.Group>
          <Form.Group controlId="entreprise">
            <Form.Label>Entreprise</Form.Label>
            <Form.Control
              type="text"
              name="entreprise"
              placeholder="Saisir le nom de l'entreprise"
              value={entreprise}
              onChange={handleInputEntrepriseChange}
            />
          </Form.Group>
          <Form.Group controlId="niveau">
            <Form.Label>Niveau</Form.Label>
            <Form.Control
              type="text"
              name="niveau"
              placeholder="Saisir votre année"
              value={niveau}
              onChange={handleInputNiveauChange}
            />
          </Form.Group>
          <Form.Group controlId="annee">
            <Form.Label>Année</Form.Label>
            <Form.Control
              type="text"
              name="annee"
              placeholder="Saisir l'année du stage"
              value={annee}
              onChange={handleInputAnneeChange}
            />
          </Form.Group>
          <Form.Group controlId="dateDebut">
            <Form.Label>Date de début</Form.Label>
            <Form.Control
              type="text"
              name="dateDebut"
              placeholder="Saisir la date de début du stage"
              value={dateDebut}
              onChange={handleInputDateDebutChange}
            />
          </Form.Group>
          <Form.Group controlId="dateFin">
            <Form.Label>Date de fin</Form.Label>
            <Form.Control
              type="text"
              name="dateFin"
              placeholder="Saisir la date de fin du stage"
              value={dateFin}
              onChange={handleInputDateFinChange}
            />
          </Form.Group>
          <Form.Group controlId="dateFin">
            <Form.Label>Confidentiel</Form.Label>
            <Form.Control
              type="text"
              name="confidentiel"
              placeholder="Saisir 1 si le projet est confidentiel, sinon 0"
              value={confidentiel}
              onChange={handleInputConfidentielChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Mettre à jour
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
export default NewStage;