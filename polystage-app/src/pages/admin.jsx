import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';

const Admin = () => {
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
              <span className="warning">Mail d'avertissement déjà envoyé</span>
              <span className="warning">Évaluation à faire</span>
            </Card.Text>
            <Card.Title>Élèves</Card.Title>
            <Card.Text>
              Nom et prénom de l'élève
              <span className="warning">Mail d'avertissement déjà envoyé</span>
              <span className="warning">Rapport à télécharger</span>
              <span className="warning">Présentation à télécharger</span>
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
        <Button variant="warning">Envoyer les mails de rappel</Button>
      </Container>
    </div>
  );
};
export default Admin;
