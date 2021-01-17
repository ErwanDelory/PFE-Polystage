import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Container, Form } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { Notyf } from 'notyf';

const NewStage = () => {
  // TODO: Réfléchir: Upload des documents => Gérer le cas lors du lancement de l'évaluation pour ne pas avoir un retard

  registerLocale('fr', fr);
  const [niveau, setNiveau] = useState(3);
  const [annee, setAnnee] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [adresse, setAdresse] = useState('');
  const [mail, setMail] = useState('');
  const [confidentiel, setConfidentiel] = useState('');
  const history = useHistory();
  const notyf = new Notyf({
    duration: 3000,
    position: {
      x: 'right',
      y: 'top',
    },
  });

  const handleInputNiveauChange = (event) => {
    const { value } = event.target;
    setNiveau(value);
  };

  const handleInputAnneeChange = (event) => {
    const { value } = event.target;
    setAnnee(value);
  };

  const handleInputDateDebutChange = (date) => {
    const d =
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    setStartDate(date);
    setDateDebut(d);
  };

  const handleInputDateFinChange = (date) => {
    const d =
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    setEndDate(date);
    setDateFin(d);
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

  const handleInputAdresseChange = (event) => {
    const { value } = event.target;
    setAdresse(value);
  };

  const handleInputMailChange = (event) => {
    const { value } = event.target;
    setMail(value);
  };

  const handleInputConfidentielChange = (event) => {
    const { value } = event.target;
    setConfidentiel(value);
  };

  const redirect = () => {
    history.push('/');
  };

  const onSubmit = (event) => {
    const dateD = dateDebut.split('-');
    const dateF = dateFin.split('-');
    const debut = dateD[2] + '-' + dateD[1] + '-' + dateD[0];
    const fin = dateF[2] + '-' + dateF[1] + '-' + dateF[0];
    event.preventDefault();
    if (
      !niveau ||
      !annee ||
      !dateDebut ||
      !dateFin ||
      !titre ||
      !description ||
      !entreprise ||
      !adresse ||
      !mail ||
      !confidentiel
    ) {
      notyf.error('Information incorrecte !');
      return;
    }
    fetch('http://localhost:5000/api/newstage', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: JSON.stringify({
        ideleve: sessionStorage.getItem('id'),
        niveau: niveau,
        annee: annee,
        idtuteur: 5,
        idens: 4,
        datedebut: debut,
        datefin: fin,
        titrestage: titre,
        description: description,
        nomentreprise: entreprise,
        adressestage: adresse,
        adremailstage: mail,
        cheminrapport: '',
        cheminpres: '',
        chemineval: '',
        chemincomp: '',
        confidentiel: confidentiel,
      }),
    }).then((res) => {
      res.json();
      notyf.success('Ajout du stage réussi !');
      setTimeout(redirect, 3000);
    });
  };

  return (
    <div className="newStage">
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
          <Form.Group controlId="adresse">
            <Form.Label>Adresse de l'entreprise</Form.Label>
            <Form.Control
              type="text"
              name="entreprise"
              placeholder="Saisir l'adresse de l'entreprise'"
              value={adresse}
              onChange={handleInputAdresseChange}
            />
          </Form.Group>
          <Form.Group controlId="mail">
            <Form.Label>Saisir l'adresse mail durant le stage</Form.Label>
            <Form.Control
              type="email"
              name="entreprise"
              placeholder="Saisir l'adresse mail durant le stage"
              value={mail}
              onChange={handleInputMailChange}
            />
          </Form.Group>
          <Form.Group controlId="niveau">
            <Form.Label>Niveau</Form.Label>
            <Form.Control
              as="select"
              name="niveau"
              value={niveau}
              onChange={handleInputNiveauChange}
            >
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
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
            <DatePicker
              dateFormat="dd-MM-yyyy"
              selected={startDate}
              onChange={handleInputDateDebutChange}
              locale="fr"
              closeOnScroll={true}
            />
          </Form.Group>

          <Form.Group controlId="dateFin">
            <Form.Label>Date de fin</Form.Label>
            <DatePicker
              dateFormat="dd-MM-yyyy"
              selected={endDate}
              onChange={handleInputDateFinChange}
              locale="fr"
              closeOnScroll={true}
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

          <Button variant="info" type="submit">
            Ajouter le stage
          </Button>
        </Form>
      </Container>
    </div>
  );
};
export default NewStage;
