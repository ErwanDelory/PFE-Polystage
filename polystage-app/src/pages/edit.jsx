import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Alert, Button, Container, Form } from 'react-bootstrap';

const Edit = () => {
  const [stageTitle, setStageTitle] = useState(
    sessionStorage.getItem('titrestage')
  );
  const [description, setDescription] = useState(
    sessionStorage.getItem('description')
  );
  const [entreprise, setEntreprise] = useState(
    sessionStorage.getItem('entreprise')
  );
  const [niveau, setNiveau] = useState(sessionStorage.getItem('niveau'));
  const [annee, setAnnee] = useState(sessionStorage.getItem('annee'));
  const [dateDebut, setDateDebut] = useState(
    sessionStorage.getItem('datedebut')
  );
  const [dateFin, setDateFin] = useState(sessionStorage.getItem('datefin'));
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

  const redirect = () => {
    sessionStorage.removeItem('idstage');
    sessionStorage.removeItem('titrestage');
    sessionStorage.removeItem('description');
    sessionStorage.removeItem('entreprise');
    sessionStorage.removeItem('niveau');
    sessionStorage.removeItem('annee');
    sessionStorage.removeItem('datedebut');
    sessionStorage.removeItem('datefin');
    history.push('/');
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const dateD = dateDebut.split('-');
    const dateF = dateFin.split('-');
    const debut = dateD[2] + '-' + dateD[1] + '-' + dateD[0];
    const fin = dateF[2] + '-' + dateF[1] + '-' + dateF[0];

    const id = sessionStorage.getItem('idstage');
    fetch('http://localhost:5000/api/editstage', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: JSON.stringify({
        idstage: id,
        titrestage: stageTitle,
        description: description,
        niveau: niveau,
        annee: annee,
        datedebut: debut,
        datefin: fin,
        nomentreprise: entreprise,
      }),
    }).then((res) => {
      if (
        !stageTitle ||
        !description ||
        !niveau ||
        !annee ||
        !dateDebut ||
        !dateFin ||
        !entreprise
      ) {
        setMessage('Information incorrecte.');
        setStateError(true);
        setStateSucces(false);
        return;
      }
      res.json();
      setMessage('Modification réussie !');
      setStateSucces(true);
      setStateError(false);
      setTimeout(redirect, 3000);
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
export default Edit;
