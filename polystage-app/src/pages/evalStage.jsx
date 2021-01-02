import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import RadiosForm from '../components/radiosForm';
import RadiosFormBis from '../components/radiosForm2';

const EvalStage = () => {
  const location = useLocation();

  // eslint-disable-next-line
  useEffect(() => {
    fetch('http://localhost:5000/api/questions', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + location.state.token,
      },
    }).then((res) => {
      return res.json();
    });
  }, [location.state.token]);

  return (
    <div>
      <Container>
        <h3>
          Évaluation de l'élève {location.state.prenom} {location.state.nom}
        </h3>
        <Form>
          <h4>Identification</h4>
          <Row xs={1} md={2}>
            <Form.Group controlId="nom">
              <Form.Label>Nom de l'élève</Form.Label>
              <Form.Control
                style={{ width: '90%' }}
                type="text"
                placeholder="Saisir le nom de l'élève"
              />
            </Form.Group>
            <Form.Group controlId="prenom">
              <Form.Label>Prénom de l'élève</Form.Label>
              <Form.Control
                style={{ width: '90%' }}
                type="text"
                placeholder="Saisir le prénom de l'élève"
              />
            </Form.Group>
            <Form.Group controlId="entreprise">
              <Form.Label>Nom de l'entreprise</Form.Label>
              <Form.Control
                style={{ width: '90%' }}
                type="text"
                placeholder="Saisir le nom de l'entreprise"
              />
            </Form.Group>
            <Form.Group controlId="ville">
              <Form.Label>Ville / Pays</Form.Label>
              <Form.Control
                style={{ width: '90%' }}
                type="text"
                placeholder="Saisir la ville ou le pays du stage"
              />
            </Form.Group>
            <Form.Group controlId="tuteur">
              <Form.Label>Nom et prénom du tuteur de stage</Form.Label>
              <Form.Control
                style={{ width: '90%' }}
                type="text"
                placeholder="Saisir le nom et le prénom du tuteur de stage"
              />
            </Form.Group>
            <Form.Group controlId="poste">
              <Form.Label>Poste du tuteur de stage</Form.Label>
              <Form.Control
                style={{ width: '90%' }}
                type="text"
                placeholder="Saisir le poste du tuteur"
              />
            </Form.Group>
            <Form.Group controlId="courriel">
              <Form.Label>Email du tuteur</Form.Label>
              <Form.Control
                style={{ width: '90%' }}
                type="text"
                placeholder="Saisir l'email du tuteur"
              />
            </Form.Group>
            <Form.Group controlId="telephone">
              <Form.Label>Téléphone du tuteur</Form.Label>
              <Form.Control
                style={{ width: '90%' }}
                type="text"
                placeholder="Saisir le numéro de téléphone"
              />
            </Form.Group>
            <Form.Group controlId="sujet">
              <Form.Label>Sujet du stage</Form.Label>
              <Form.Control
                style={{ width: '90%' }}
                type="text"
                placeholder="Saisir le sujet de stage en quelques mots"
              />
            </Form.Group>
          </Row>

          <h4>Évaluation des compétences</h4>
          <Row xs={1} md={2}>
            <RadiosForm
              question={"Capacité d'analyse / compréhension des problèmes"}
            />
            <RadiosForm question={'Mise en oeuvre de ses connaissances'} />
            <RadiosForm
              question={'Aptitudes à acquérir de nouvelles connaissances'}
            />
            <RadiosForm
              question={
                'Méthodologie / organisation du travail, gestion de projet'
              }
            />
            <RadiosForm
              question={
                'Synhtèse et communication des résultats, maîtrise des outils de communication'
              }
            />
            <RadiosForm
              question={
                'Réalisation des objectifs - Qualité du travail réalisé'
              }
            />
            <RadiosForm
              question={
                "Autonomie -initiative / créativité / ouverture d'esprit"
              }
            />
            <RadiosForm question={"Capacité à s'intégrer dans une équipe"} />
            <RadiosForm
              question={
                'Communication sur ses activités et capacité à rendre compte'
              }
            />
            <RadiosForm
              question={'Prise en compte des enjeux métiers et économiques'}
            />
            <RadiosForm
              question={
                "Appropriation des valeurs, codes et de la culture de l'équipe et de l'organisation"
              }
            />
            <RadiosForm question={'Attitude / assiduité / ponctualité'} />
          </Row>

          <h4>Appréciation globale sur le stage</h4>
          <Row xs={1} md={2}>
            <Form.Group controlId="surstagiaire">
              <Form.Label>Sur le stagiaire</Form.Label>
              <Form.Control
                style={{ width: '90%' }}
                type="text"
                placeholder="Sur le stagiaire"
              />
            </Form.Group>
            <Form.Group controlId="surstage">
              <Form.Label>Sur le déroulé du stage</Form.Label>
              <Form.Control
                style={{ width: '90%' }}
                type="text"
                placeholder="Sur le déroulé du stage"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Classement du stagiaire parmi les stagiaires du même niveau
                accueillis par votre entreprise
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Parmi les meilleurs"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="radio"
                  label="Au dessus de la moyenne"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  type="radio"
                  label="À la moyenne"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                />
                <Form.Check
                  type="radio"
                  label="En dessous de la moyenne"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                />
                <Form.Check
                  type="radio"
                  label="Parmi les plus mauvais"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                />
              </Col>
            </Form.Group>
            <Form.Group controlId="conseils">
              <Form.Label>Quels conseils pour ce futur ingénieur ?</Form.Label>
              <Form.Control
                style={{ width: '90%' }}
                type="text"
                placeholder="Quels conseils pour ce futur ingénieur"
              />
            </Form.Group>
            <Form.Group controlId="formation">
              <Form.Label>Sur la formation de Polytech Marseille</Form.Label>
              <Form.Control
                style={{ width: '90%' }}
                type="text"
                placeholder="Sur la formation"
              />
            </Form.Group>
            <RadiosFormBis
              question={"Sur l'accueil d'un stagiaire pour l'année prochaine?"}
            />
            <RadiosFormBis
              question={
                "Sur l'accueil d'un élève en contrat de professionnalisation pour l'année prochaine?"
              }
            />
          </Row>
          <h4>Après le stage</h4>
          <Row xs={1} md={2}>
            <RadiosFormBis
              question={
                "L'entreprise a-t-elle fait une proposition d'emploi au stagiaire?"
              }
            />
            <Form.Group>
              <Form.Label>
                Si une proposition a été faite, quel est le type de contrat?
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="CDI"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="radio"
                  label="CDD"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  type="radio"
                  label="Prolongation du stage"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                />
                <Form.Check
                  type="radio"
                  label="Contrat de thèse entreprise"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                />
                <Form.Check
                  type="radio"
                  label="VIE"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                />
              </Col>
            </Form.Group>
            <RadiosFormBis
              question={
                "L'entreprise ne recrute pas sur le profil du stagiaire"
              }
            />
            <RadiosFormBis
              question={
                "La stagiaire aurait pu être recruté si l'entreprise avait eu un poste à pourvoir"
              }
            />
            <RadiosFormBis
              question={"Le stagiaire n'a pas été retenu pour un recrutement"}
            />
            <Form.Group controlId="autres">
              <Form.Label>Autres</Form.Label>
              <Form.Control
                style={{ width: '90%' }}
                type="text"
                placeholder="Autres:"
              />
            </Form.Group>
          </Row>
          <h4>Soutenance de stage</h4>
          <Row xs={1} md={2}>
            <RadiosFormBis
              question={'Le rapport de stage est-il confidentiel?'}
            />
            <RadiosFormBis
              question={'Souhaitez-vous participer à la soutenance?'}
            />
            <RadiosFormBis
              question={
                'Si oui, seriez-vous disponible pour participer au repas le jeudi 12 septembre à midi?'
              }
            />
            <Form.Group controlId="autres">
              <Form.Label>
                Si oui, indiquez le nombre de personnes qui participeront
              </Form.Label>
              <Form.Control
                style={{ width: '90%' }}
                type="text"
                placeholder="Si oui, indiquez le nombre de personnes qui participeront"
              />
            </Form.Group>
            <Form.Group controlId="autres">
              <Form.Label>
                Avez-vous des impératifs horaires éventuels?
              </Form.Label>
              <Form.Control
                style={{ width: '90%' }}
                type="text"
                placeholder="Avez-vous des impératifs horaires éventuels?"
              />
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit">
            Envoyer
          </Button>
        </Form>
      </Container>
    </div>
  );
};
export default EvalStage;
