import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
  // TODO: Recherche des tuteurs en retard
  // TODO: Recherche des élèves en retard

  return (
    <div>
      <Container>
        <h3>Administration</h3>
        <Card className="center" style={{ width: '70rem' }}>
          <Card.Header>Gestion des retards</Card.Header>
          <Card.Body>
            <Card.Title>Tuteurs</Card.Title>
            <Card.Text>
              Nom et prénom du tuteur
              <span className="warning green">
                Mail d'avertissement déjà envoyé&nbsp;
                <FontAwesomeIcon className="bckg-icon" icon={faCheck} />
              </span>
              <span className="warning red">
                Évaluation à faire&nbsp;
                <FontAwesomeIcon className="bckg-icon" icon={faTimes} />
              </span>
            </Card.Text>
            <Card.Text>Aucun tuteur n'est en retard !</Card.Text>
            <Card.Title>Élèves</Card.Title>
            <Card.Text>
              Nom et prénom de l'élève
              <span className="warning green">
                Mail d'avertissement déjà envoyé&nbsp;
                <FontAwesomeIcon className="bckg-icon" icon={faCheck} />
              </span>
              <span className="warning red">
                Rapport à télécharger&nbsp;
                <FontAwesomeIcon className="bckg-icon" icon={faTimes} />
              </span>
              <span className="warning red">
                Présentation à télécharger&nbsp;
                <FontAwesomeIcon className="bckg-icon" icon={faTimes} />
              </span>
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
        <div className="text-center">
          <Button variant="warning">Envoyer les mails de rappel</Button>
        </div>
      </Container>
    </div>
  );
};
export default Admin;
