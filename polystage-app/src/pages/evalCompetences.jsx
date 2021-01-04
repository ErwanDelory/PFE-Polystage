import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const EvalCompetences = () => {
  const location = useLocation();
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/competences', {
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
      .then((mes) => {
        return setQuestion(mes.data);
      });
  }, []);

  return (
    <div>
      <Container>
        <h3>
          Évaluation des compétences de l'élève {location.state.prenom}{' '}
          {location.state.nom}
        </h3>
        <Form>
          <h4>Titre de la catégorie</h4>
          <Row xs={1} md={2}>
            {question?.map((data) => (
              <Col key={data.idcompetence}>
                <Form.Group>
                  <Form.Label>
                    {data.sigle}: {data.libelle}
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Check
                      type="radio"
                      label={data.libelle1}
                      name={data.idcompetence}
                      id="formHorizontalRadios1"
                    />
                    <Form.Check
                      type="radio"
                      label={data.libelle2}
                      name={data.idcompetence}
                      id="formHorizontalRadios2"
                    />
                    <Form.Check
                      type="radio"
                      label={data.libelle3}
                      name={data.idcompetence}
                      id="formHorizontalRadios3"
                    />
                    <Form.Check
                      type="radio"
                      label={data.libelle4}
                      name={data.idcompetence}
                      id="formHorizontalRadios4"
                    />
                    <Form.Check
                      type="radio"
                      label={data.libelle5}
                      name={data.idcompetence}
                      id="formHorizontalRadios5"
                    />
                  </Col>
                </Form.Group>
              </Col>
            ))}
          </Row>
          <Button variant="primary" type="submit">
            Envoyer
          </Button>
        </Form>
      </Container>
    </div>
  );
};
export default EvalCompetences;
