import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Card, Container, Form } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { Notyf } from 'notyf';

const NewStage = () => {
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
  const [fileRapport, setFileRapport] = useState();
  const [filePresentation, setFilePresentation] = useState();
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

  const onChangeHandlerRapport = (event) => {
    return setFileRapport(event.target.files[0]);
  };

  const onChangeHandlerPresentation = (event) => {
    return setFilePresentation(event.target.files[0]);
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
      if (fileRapport) {
        uploadRapport();
      }
      if (filePresentation) {
        uploadPresentation();
      }
      setTimeout(redirect, 3000);
    });
  };

  const uploadRapport = () => {
    const formData = new FormData();
    formData.append('file', fileRapport, 'Test.pdf');

    var requestOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: formData,
      redirect: 'follow',
    };

    fetch(
      `http://localhost:5000/api/upload/${sessionStorage.getItem(
        'nom'
      )}/${sessionStorage.getItem('prenom')}/${annee}/${niveau}/rapport`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log('error', error));
  };

  const uploadPresentation = () => {
    const formData = new FormData();
    formData.append('file', filePresentation, 'Test.pdf');

    var requestOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: formData,
      redirect: 'follow',
    };

    fetch(
      `http://localhost:5000/api/upload/${sessionStorage.getItem(
        'nom'
      )}/${sessionStorage.getItem('prenom')}/${annee}/${niveau}/presentation`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <div className="newStage">
      <br />
      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="stageTitle">
            <Card className="text-center">
              <Card.Header>Titre du stage</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form.Control
                    type="text"
                    name="stageTitle"
                    placeholder="Saisir le titre du stage"
                    autoFocus
                    value={titre}
                    onChange={handleInputTitreChange}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Form.Group>
          <Form.Group controlId="description">
            <Card className="text-center">
              <Card.Header>Description du stage</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form.Control
                    type="text"
                    name="description"
                    placeholder="Saisir la description du stage"
                    value={description}
                    onChange={handleInputDescriptionChange}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Form.Group>
          <Form.Group controlId="entreprise">
            <Card className="text-center">
              <Card.Header>Entreprise</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form.Control
                    type="text"
                    name="entreprise"
                    placeholder="Saisir le nom de l'entreprise"
                    value={entreprise}
                    onChange={handleInputEntrepriseChange}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Form.Group>
          <Form.Group controlId="adresse">
            <Card className="text-center">
              <Card.Header>Adresse de l'entreprise</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form.Control
                    type="text"
                    name="entreprise"
                    placeholder="Saisir l'adresse de l'entreprise'"
                    value={adresse}
                    onChange={handleInputAdresseChange}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Form.Group>
          <Form.Group controlId="mail">
            <Card className="text-center">
              <Card.Header>Adresse mail durant le stage</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form.Control
                    type="email"
                    name="entreprise"
                    placeholder="Saisir l'adresse mail durant le stage"
                    value={mail}
                    onChange={handleInputMailChange}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Form.Group>
          <Form.Group controlId="niveau">
            <Card className="text-center">
              <Card.Header>Niveau</Card.Header>
              <Card.Body>
                <Card.Text>
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
                </Card.Text>
              </Card.Body>
            </Card>
          </Form.Group>
          <Form.Group controlId="annee">
            <Card className="text-center">
              <Card.Header>Année</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form.Control
                    type="text"
                    name="annee"
                    placeholder="Saisir l'année du stage"
                    value={annee}
                    onChange={handleInputAnneeChange}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Form.Group>
          <Form.Group controlId="dateDebut">
            <Card className="text-center">
              <Card.Header>Date de début</Card.Header>
              <Card.Body>
                <Card.Text>
                  <DatePicker
                    dateFormat="dd-MM-yyyy"
                    selected={startDate}
                    onChange={handleInputDateDebutChange}
                    locale="fr"
                    closeOnScroll={true}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Form.Group>

          <Form.Group controlId="dateFin">
            <Card className="text-center">
              <Card.Header>Date de fin</Card.Header>
              <Card.Body>
                <Card.Text>
                  <DatePicker
                    dateFormat="dd-MM-yyyy"
                    selected={endDate}
                    onChange={handleInputDateFinChange}
                    locale="fr"
                    closeOnScroll={true}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Form.Group>

          <Form.Group controlId="confidentiel">
            <Card className="text-center">
              <Card.Header>Confidentiel</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form.Control
                    type="text"
                    name="confidentiel"
                    placeholder="Saisir 1 si le projet est confidentiel, sinon 0"
                    value={confidentiel}
                    onChange={handleInputConfidentielChange}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Form.Group>

          <Form.Group>
            <Card className="text-center">
              <Card.Header>Importer le rapport de stage</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form.File
                    id="exampleFormControlFile1"
                    onChange={onChangeHandlerRapport}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Form.Group>
          <Form.Group>
            <Card className="text-center">
              <Card.Header>Importer la présentation de stage</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form.File
                    id="exampleFormControlFile2"
                    onChange={onChangeHandlerPresentation}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
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
