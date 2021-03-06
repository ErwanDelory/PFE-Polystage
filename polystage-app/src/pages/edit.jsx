import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Button, Card, Container, Form } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { Notyf } from 'notyf';

const Edit = () => {
  registerLocale('fr', fr);
  const location = useLocation();
  const [retard, setRetard] = useState([]);
  const [stageTitle, setStageTitle] = useState(location.state.titrestage);
  const [description, setDescription] = useState(location.state.description);
  const [entreprise, setEntreprise] = useState(location.state.entreprise);
  const [niveau, setNiveau] = useState(location.state.niveau);
  const [annee, setAnnee] = useState(location.state.annee);
  const [dateDebut, setDateDebut] = useState(location.state.datedebut);
  const [dateFin, setDateFin] = useState(location.state.datefin);
  const [startDate, setStartDate] = useState(location.state.datedebut2);
  const [endDate, setEndDate] = useState(location.state.datefin2);
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
        notyf.error('Information incorrecte !');
        return;
      }
      res.json();
      notyf.success('Modification réussie !');
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
      notyf.success('Suppression réussie !');
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
            <Card className="text-center">
              <Card.Header>Titre du stage</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form.Control
                    type="text"
                    name="stageTitle"
                    placeholder="Saisir le titre du stage"
                    autoFocus
                    value={stageTitle}
                    onChange={handleInputStageTitleChange}
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
          {retard?.map((data) => (
            <div key={data.iduti}>
              {sessionStorage.getItem('id') === `${data.iduti}` ? (
                <div>
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
                      <Card.Header>
                        Importer la présentation de stage
                      </Card.Header>
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
                </div>
              ) : null}
            </div>
          ))}
          <Button variant="info" type="submit">
            Mettre à jour
          </Button>{' '}
          <Button variant="danger" onClick={deleteStage}>
            Supprimer
          </Button>
        </Form>
      </Container>
    </div>
  );
};
export default Edit;
