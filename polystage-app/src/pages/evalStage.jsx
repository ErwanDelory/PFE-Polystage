import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import RadiosForm from '../components/radiosForm';
import RadiosFormBis from '../components/radiosForm2';

const EvalStage = () => {
  // TODO: Récupération des données
  // TODO: Réalisation du fichier avec les réponses obtenues

  const location = useLocation();

  // eslint-disable-next-line
  useEffect(() => {
    fetch('http://localhost:5000/api/questions', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.data);
      });
  }, []);

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
                value={location.state.nom}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="prenom">
              <Form.Label>Prénom de l'élève</Form.Label>
              <Form.Control
                style={{ width: '90%' }}
                type="text"
                placeholder="Saisir le prénom de l'élève"
                value={location.state.prenom}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="entreprise">
              <Form.Label>Nom de l'entreprise</Form.Label>
              <Form.Control
                style={{ width: '90%' }}
                type="text"
                placeholder="Saisir le nom de l'entreprise"
                value={location.state.entreprise}
                disabled
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
              value={'1'}
            />
            <RadiosForm
              question={'Mise en oeuvre de ses connaissances'}
              value={'2'}
            />
            <RadiosForm
              question={'Aptitudes à acquérir de nouvelles connaissances'}
              value={'3'}
            />
            <RadiosForm
              question={
                'Méthodologie / organisation du travail, gestion de projet'
              }
              value={'4'}
            />
            <RadiosForm
              question={
                'Synhtèse et communication des résultats, maîtrise des outils de communication'
              }
              value={'5'}
            />
            <RadiosForm
              question={
                'Réalisation des objectifs - Qualité du travail réalisé'
              }
              value={'6'}
            />
            <RadiosForm
              question={
                "Autonomie -initiative / créativité / ouverture d'esprit"
              }
              value={'7'}
            />
            <RadiosForm question={"Capacité à s'intégrer dans une équipe"} />
            <RadiosForm
              question={
                'Communication sur ses activités et capacité à rendre compte'
              }
              value={'8'}
            />
            <RadiosForm
              question={'Prise en compte des enjeux métiers et économiques'}
              value={'9'}
            />
            <RadiosForm
              question={
                "Appropriation des valeurs, codes et de la culture de l'équipe et de l'organisation"
              }
              value={'10'}
            />
            <RadiosForm
              question={'Attitude / assiduité / ponctualité'}
              value={'11'}
            />
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
                  name="13"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="radio"
                  label="Au dessus de la moyenne"
                  name="13"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  type="radio"
                  label="À la moyenne"
                  name="13"
                  id="formHorizontalRadios3"
                />
                <Form.Check
                  type="radio"
                  label="En dessous de la moyenne"
                  name="13"
                  id="formHorizontalRadios3"
                />
                <Form.Check
                  type="radio"
                  label="Parmi les plus mauvais"
                  name="13"
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
              value={'14'}
            />
            <RadiosFormBis
              question={
                "Sur l'accueil d'un élève en contrat de professionnalisation pour l'année prochaine?"
              }
              value={'15'}
            />
          </Row>
          <h4>Après le stage</h4>
          <Row xs={1} md={2}>
            <RadiosFormBis
              question={
                "L'entreprise a-t-elle fait une proposition d'emploi au stagiaire?"
              }
              value={'16'}
            />
            <Form.Group>
              <Form.Label>
                Si une proposition a été faite, quel est le type de contrat?
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="CDI"
                  name="17"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="radio"
                  label="CDD"
                  name="17"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  type="radio"
                  label="Prolongation du stage"
                  name="17"
                  id="formHorizontalRadios3"
                />
                <Form.Check
                  type="radio"
                  label="Contrat de thèse entreprise"
                  name="17"
                  id="formHorizontalRadios3"
                />
                <Form.Check
                  type="radio"
                  label="VIE"
                  name="17"
                  id="formHorizontalRadios3"
                />
              </Col>
            </Form.Group>
            <RadiosFormBis
              question={
                "L'entreprise ne recrute pas sur le profil du stagiaire"
              }
              value={'18'}
            />
            <RadiosFormBis
              question={
                "La stagiaire aurait pu être recruté si l'entreprise avait eu un poste à pourvoir"
              }
              value={'19'}
            />
            <RadiosFormBis
              question={"Le stagiaire n'a pas été retenu pour un recrutement"}
              value={'20'}
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
              value={'21'}
            />
            <RadiosFormBis
              question={'Souhaitez-vous participer à la soutenance?'}
              value={'22'}
            />
            <RadiosFormBis
              question={
                'Si oui, seriez-vous disponible pour participer au repas le jeudi 12 septembre à midi?'
              }
              value={'23'}
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
