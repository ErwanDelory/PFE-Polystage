import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Notyf } from 'notyf';

const Admin = () => {
  const [tuteur, setTuteur] = useState([]);
  const [eleve, setEleve] = useState([]);
  const notyf = new Notyf({
    duration: 3000,
    position: {
      x: 'right',
      y: 'top',
    },
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/retardtuteur', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((mes) => {
        return setTuteur(mes.data);
      });

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
        return setEleve(mes.data);
      });
  }, []);

  const sendMail = () => {
    if (tuteur.length > 0) {
      for (let i = 0; i < tuteur.length; i++) {
        let name = tuteur[i].nom + ' ' + tuteur[i].prenom;
        fetch('http://localhost:5000/api/sendMail/tuteur', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
          body: JSON.stringify({ name: name }),
        }).then((res) => res.json());
      }
    }

    if (eleve.length > 0) {
      for (let i = 0; i < eleve.length; i++) {
        let name = eleve[i].nom + ' ' + eleve[i].prenom;
        fetch('http://localhost:5000/api/sendMail/eleve', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
          body: JSON.stringify({ name: name }),
        }).then((res) => res.json());
      }
    }

    notyf.success('Emails de notification envoyés !');
  };

  //console.log(tuteur);
  console.log(eleve);
  return (
    <div>
      <Container>
        <h3>Administration</h3>
        <Card className="center" style={{ width: '70rem' }}>
          <Card.Header>Gestion des retards</Card.Header>
          <Card.Body>
            <Card.Title>Tuteurs</Card.Title>

            {tuteur.length !== 0 ? (
              <div>
                {tuteur?.map((data) => (
                  <Card.Text key={data.id}>
                    {data.prenom} {data.prenom}
                    <span className="warning green">
                      Mail d'avertissement déjà envoyé&nbsp;
                      <FontAwesomeIcon className="bckg-icon" icon={faCheck} />
                    </span>
                    <span className="warning red">
                      Évaluation à faire&nbsp;
                      <FontAwesomeIcon className="bckg-icon" icon={faTimes} />
                    </span>
                  </Card.Text>
                ))}
              </div>
            ) : (
              <Card.Text>Aucun tuteur n'est en retard !</Card.Text>
            )}

            <Card.Title>Élèves</Card.Title>
            {eleve.length !== 0 ? (
              <div>
                {eleve?.map((data) => (
                  <Card.Text key={data.id}>
                    {data.prenom} {data.nom}
                    <span className="warning green">
                      Mail d'avertissement déjà envoyé&nbsp;
                      <FontAwesomeIcon className="bckg-icon" icon={faCheck} />
                    </span>
                    {data.rapport === 1 ? (
                      <span className="warning green">
                        Rapport déposé&nbsp;
                        <FontAwesomeIcon className="bckg-icon" icon={faCheck} />
                      </span>
                    ) : (
                      <span className="warning red">
                        Rapport à télécharger&nbsp;
                        <FontAwesomeIcon className="bckg-icon" icon={faTimes} />
                      </span>
                    )}
                    {data.presentation === 1 ? (
                      <span className="warning green">
                        Présentation déposé<em></em>&nbsp;
                        <FontAwesomeIcon className="bckg-icon" icon={faCheck} />
                      </span>
                    ) : (
                      <span className="warning red">
                        Présentation à télécharger&nbsp;
                        <FontAwesomeIcon className="bckg-icon" icon={faTimes} />
                      </span>
                    )}
                  </Card.Text>
                ))}
              </div>
            ) : (
              <Card.Text>Aucun élève n'est en retard !</Card.Text>
            )}
          </Card.Body>
        </Card>
        <br />
        <div className="text-center">
          <Button variant="warning" onClick={sendMail}>
            <FontAwesomeIcon className="bckg-icon" icon={faPaperPlane} />{' '}
            Envoyer les mails de rappel
          </Button>
        </div>
      </Container>
    </div>
  );
};
export default Admin;
