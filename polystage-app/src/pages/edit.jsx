import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Alert, Button, Container, Form } from 'react-bootstrap';

const Edit = () => {
  const location = useLocation();
  const [retard, setRetard] = useState([]);
  const [stageTitle, setStageTitle] = useState(location.state.titrestage);
  const [description, setDescription] = useState(location.state.description);
  const [entreprise, setEntreprise] = useState(location.state.entreprise);
  const [niveau, setNiveau] = useState(location.state.niveau);
  const [annee, setAnnee] = useState(location.state.annee);
  const [dateDebut, setDateDebut] = useState(location.state.datedebut);
  const [dateFin, setDateFin] = useState(location.state.datefin);
  const [message, setMessage] = useState('');
  const [stateError, setStateError] = useState(false);
  const [stateSuccess, setStateSucces] = useState(false);
  const [fileRapport, setFileRapport] = useState();
  const [filePresentation, setFilePresentation] = useState();
  const history = useHistory();

  useEffect(() => {
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
        return setRetard(mes.data);
      });
  }, []);

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

  const onChangeHandlerRapport = (event) => {
    return setFileRapport(event.target.files[0]);
  };

  const onChangeHandlerPresentation = (event) => {
    return setFilePresentation(event.target.files[0]);
  };

  const redirect = () => {
    history.goBack();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const dateD = dateDebut.split('-');
    const dateF = dateFin.split('-');
    const debut = dateD[2] + '-' + dateD[1] + '-' + dateD[0];
    const fin = dateF[2] + '-' + dateF[1] + '-' + dateF[0];

    fetch('http://localhost:5000/api/editstage', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: JSON.stringify({
        idstage: location.state.idstage,
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
      if (fileRapport) {
        uploadRapport();
      }
      if (filePresentation) {
        uploadPresentation();
      }
      setTimeout(redirect, 3000);
    });
  };

  const deleteStage = () => {
    const id = location.state.idstage;
    fetch(`http://localhost:5000/api/stage/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    }).then((res) => {
      res.json();
      setMessage('Suppression réussie !');
      setStateSucces(true);
      setStateError(false);
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
        updateRetardRapport();
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
        updateRetardPresentation();
      })
      .catch((error) => console.log('error', error));
  };

  const updateRetardRapport = () => {
    fetch(
      `http://localhost:5000/api/retardeleve/rapport/${sessionStorage.getItem(
        'id'
      )}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: JSON.stringify({ rapport: 1 }),
      }
    ).then((res) => res.json());
  };

  const updateRetardPresentation = () => {
    fetch(
      `http://localhost:5000/api/retardeleve/presentation/${sessionStorage.getItem(
        'id'
      )}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: JSON.stringify({ presentation: 1 }),
      }
    ).then((res) => res.json());
  };

  return (
    <div className="editStage">
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
          {retard?.map((data) => (
            <div key={data.iduti}>
              {sessionStorage.getItem('id') === `${data.iduti}` ? (
                <div>
                  <Form.Group>
                    <Form.File
                      id="exampleFormControlFile1"
                      label="Importer le rapport de stage"
                      onChange={onChangeHandlerRapport}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.File
                      id="exampleFormControlFile2"
                      label="Importer la présentation de stage"
                      onChange={onChangeHandlerPresentation}
                    />
                  </Form.Group>
                </div>
              ) : (
                <p></p>
              )}
            </div>
          ))}
          <Button variant="info" type="submit">
            Mettre à jour
          </Button>{' '}
          <Button variant="danger" onClick={deleteStage}>
            Supprimer
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
